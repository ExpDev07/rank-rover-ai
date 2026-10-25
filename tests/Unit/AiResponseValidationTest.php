<?php

namespace Tests\Unit;

use App\Services\AiContentService;
use App\Services\AiResponseValidationException;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Resources\Chat;
use OpenAI\Responses\Chat\CreateResponse;
use PHPUnit\Framework\Attributes\DataProvider;
use RuntimeException;
use Tests\TestCase;

class AiResponseValidationTest extends TestCase
{
    public function test_generation_returns_validated_markdown_and_original_conversation_with_the_assistant_appended(): void
    {
        $payload = '{"title":"Article","content":"  ## Private article\\nBody  ","ignored":"value"}';
        $response = $this->response($payload);
        OpenAI::fake([$response]);
        Log::shouldReceive('log')->never();
        Log::shouldReceive('info')->never();
        Log::shouldReceive('error')->never();
        $messages = $this->messages();

        $result = $this->service()->article($messages, true);

        $this->assertSame("  ## Private article\nBody  ", $result['content']);
        $this->assertSame([...$messages, $response->toArray()['choices'][0]['message']], $result['messages']);
        $this->assertCount(2, $messages);
        $this->assertRequest($messages, true);
    }

    public function test_tweak_repairs_truncated_json_and_preserves_history_and_request_options(): void
    {
        $payload = '{"content":"Revised article"';
        OpenAI::fake([$this->response($payload)]);
        $messages = [
            ...$this->messages(),
            ['role' => 'assistant', 'content' => '{"content":"Earlier article"}'],
            ['role' => 'user', 'content' => 'Original tweak instruction'],
        ];

        $result = $this->service()->article($messages, false);

        $this->assertSame('Revised article', $result['content']);
        $this->assertSame($messages, array_slice($result['messages'], 0, -1));
        $this->assertSame($payload, $result['messages'][4]['content']);
        $this->assertRequest($messages, false);
    }

    #[DataProvider('invalidArticles')]
    public function test_invalid_articles_fail_with_a_controlled_exception(string $payload): void
    {
        OpenAI::fake([$this->response($payload)]);

        $this->assertControlledFailure(fn () => $this->service()->article($this->messages(), true));
    }

    public static function invalidArticles(): array
    {
        return [
            'missing content' => ['{"title":"Only title"}'],
            'empty content' => ['{"content":""}'],
            'whitespace content' => ['{"content":" \\n\\t "}'],
            'null content' => ['{"content":null}'],
            'numeric content' => ['{"content":123}'],
            'boolean content' => ['{"content":true}'],
            'array content' => ['{"content":["text"]}'],
            'object content' => ['{"content":{"text":"text"}}'],
            'article list' => ['[{"content":"text"}]'],
            'scalar root' => ['"article"'],
            'null root' => ['null'],
            'unrepairable JSON' => ['{"content": invalid PRIVATE_PAYLOAD}'],
        ];
    }

    #[DataProvider('missingEnvelopes')]
    public function test_missing_or_malformed_provider_messages_fail_cleanly_for_both_operations(array $envelope): void
    {
        // Typed SDK fixtures cannot represent malformed envelopes. Swap only the
        // facade boundary so the production envelope validation is still exercised.
        OpenAI::swap(new class($envelope)
        {
            public function __construct(private array $envelope) {}

            public function chat(): self
            {
                return $this;
            }

            public function create(array $options): self
            {
                return $this;
            }

            public function toArray(): array
            {
                return $this->envelope;
            }
        });

        $this->assertControlledFailure(fn () => $this->service()->article($this->messages(), true));
        $this->assertControlledFailure(fn () => $this->service()->recommendations($this->messages(), true));
    }

    public static function missingEnvelopes(): array
    {
        return [
            'missing choices' => [[]],
            'empty choices' => [['choices' => []]],
            'missing message' => [['choices' => [[]]]],
            'null message' => [['choices' => [['message' => null]]]],
            'scalar message' => [['choices' => [['message' => 'PRIVATE_PAYLOAD']]]],
            'missing content' => [['choices' => [['message' => ['role' => 'assistant']]]]],
            'null content' => [['choices' => [['message' => ['content' => null]]]]],
            'blank content' => [['choices' => [['message' => ['content' => " \n\t"]]]]],
            'non-string content' => [['choices' => [['message' => ['content' => ['private']]]]]],
        ];
    }

    public function test_recommendations_are_whitelisted_and_preserve_provider_values_without_enforcing_eight_titles(): void
    {
        $titles = [
            ['title' => ' First title ', 'keywords' => [' keyword ', 'SEO']],
            ['title' => 'Second title', 'keywords' => ['content']],
        ];
        $injected = array_map(fn (array $title): array => $title + [
            'app_id' => 999, 'content_cluster_id' => 123, 'content_queued' => true,
            'current_revision_id' => 456, 'user_id' => 789,
        ], $titles);
        OpenAI::fake([$this->response(json_encode(['titles' => $injected], JSON_THROW_ON_ERROR))]);

        $this->assertSame($titles, $this->service()->recommendations($this->messages(), true));
        $this->assertRequest($this->messages(), true);
    }

    public function test_recommendations_support_json_repair(): void
    {
        OpenAI::fake([$this->response('{"titles":[{"title":"Title","keywords":["SEO"]}')]);

        $this->assertSame(
            [['title' => 'Title', 'keywords' => ['SEO']]],
            $this->service()->recommendations($this->messages(), true),
        );
    }

    #[DataProvider('invalidRecommendations')]
    public function test_any_invalid_recommendation_rejects_the_entire_response(string $payload): void
    {
        OpenAI::fake([$this->response($payload)]);

        $this->assertControlledFailure(fn () => $this->service()->recommendations($this->messages(), true));
    }

    public static function invalidRecommendations(): array
    {
        $valid = ['title' => 'Valid first title', 'keywords' => ['SEO']];
        $cases = [
            'missing titles' => '{}',
            'empty titles' => '{"titles":[]}',
            'null titles' => '{"titles":null}',
            'string titles' => '{"titles":"title"}',
            'object titles' => '{"titles":{"0":{"title":"Title","keywords":["SEO"]}}}',
            'sparse titles object' => '{"titles":{"1":{"title":"Title","keywords":["SEO"]}}}',
            'list root' => '[{"title":"Title","keywords":["SEO"]}]',
            'unrepairable JSON' => '{"titles": INVALID_PRIVATE_PAYLOAD}',
        ];
        foreach ([
            'null recommendation' => null,
            'string recommendation' => 'Title',
            'missing title' => ['keywords' => ['SEO']],
            'blank title' => ['title' => " \n", 'keywords' => ['SEO']],
            'numeric title' => ['title' => 12, 'keywords' => ['SEO']],
            'missing keywords' => ['title' => 'Title'],
            'empty keywords' => ['title' => 'Title', 'keywords' => []],
            'null keywords' => ['title' => 'Title', 'keywords' => null],
            'string keywords' => ['title' => 'Title', 'keywords' => 'SEO'],
            'object keywords' => ['title' => 'Title', 'keywords' => (object) ['0' => 'SEO']],
            'sparse keywords' => ['title' => 'Title', 'keywords' => [1 => 'SEO']],
            'blank keyword' => ['title' => 'Title', 'keywords' => ['SEO', " \t"]],
            'null keyword' => ['title' => 'Title', 'keywords' => ['SEO', null]],
            'numeric keyword' => ['title' => 'Title', 'keywords' => ['SEO', 42]],
            'boolean keyword' => ['title' => 'Title', 'keywords' => ['SEO', false]],
            'array keyword' => ['title' => 'Title', 'keywords' => ['SEO', ['nested']]],
        ] as $name => $invalid) {
            $cases[$name] = json_encode(['titles' => [$valid, $invalid]], JSON_THROW_ON_ERROR);
        }

        return array_map(fn (string $payload): array => [$payload], $cases);
    }

    public function test_provider_exceptions_are_generic_without_a_private_exception_chain_or_logging(): void
    {
        $privateError = new RuntimeException('SECRET_KEY private prompt and provider response');
        OpenAI::fake([$privateError, $privateError]);
        Log::shouldReceive('log')->never();
        Log::shouldReceive('info')->never();
        Log::shouldReceive('warning')->never();
        Log::shouldReceive('error')->never();

        $this->assertControlledFailure(fn () => $this->service()->article($this->messages(), false));
        $this->assertControlledFailure(fn () => $this->service()->recommendations($this->messages(), true));
    }

    private function assertControlledFailure(callable $operation): void
    {
        try {
            $operation();
        } catch (AiResponseValidationException $exception) {
            $this->assertSame('Content generation failed. Please try again.', $exception->getMessage());
            $this->assertNull($exception->getPrevious());

            return;
        }

        $this->fail('Expected a controlled AI failure.');
    }

    private function assertRequest(array $messages, bool $jsonMode): void
    {
        $expected = ['model' => 'gpt-4-turbo-preview'];
        if ($jsonMode) {
            $expected['response_format'] = ['type' => 'json_object'];
        }
        $expected['messages'] = $messages;

        OpenAI::assertSent(Chat::class, 1);
        OpenAI::assertSent(Chat::class, fn (string $method, array $options): bool => $method === 'create' && $options === $expected);
    }

    private function response(string $content): CreateResponse
    {
        return CreateResponse::fake([
            'choices' => [[
                'index' => 0,
                'message' => ['role' => 'assistant', 'content' => $content],
                'finish_reason' => 'stop',
            ]],
        ]);
    }

    private function messages(): array
    {
        return [
            ['role' => 'system', 'content' => 'Original private system prompt'],
            ['role' => 'user', 'content' => 'Original private user prompt'],
        ];
    }

    private function service(): AiContentService
    {
        return $this->app->make(AiContentService::class);
    }
}
