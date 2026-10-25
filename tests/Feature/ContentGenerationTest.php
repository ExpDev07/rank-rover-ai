<?php

namespace Tests\Feature;

use App\Content\ContentGenerationStatus;
use App\Events\ContentRevisionStatusChangedEvent;
use App\Jobs\GenerateContentJob;
use App\Jobs\TweakContentJob;
use App\Models\App;
use App\Models\Content;
use App\Models\ContentRevision;
use App\Models\User;
use App\Services\AiContentService;
use Error;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Mockery;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Resources\Chat;
use OpenAI\Responses\Chat\CreateResponse;
use PHPUnit\Framework\Attributes\DataProvider;
use Psr\Log\AbstractLogger;
use RuntimeException;
use Stringable;
use Tests\TestCase;

class ContentGenerationTest extends TestCase
{
    use RefreshDatabase;

    private const FAILURE = 'Content generation failed. Please try again.';
    private const TWEAK = 'PRIVATE_TWEAK make the ending more practical';
    private const SECRET = 'sk-PRIVATE_PROVIDER_SECRET';

    private array $notifications = [];
    private AbstractLogger $logger;

    protected function setUp(): void
    {
        parent::setUp();

        // Run the real jobs and event dispatcher, but never deliver broadcasts.
        Queue::fake();
        $this->logger = new class extends AbstractLogger
        {
            public array $entries = [];

            public function log($level, string|Stringable $message, array $context = []): void
            {
                $this->entries[] = [$level, (string) $message, $context];
            }
        };
        Log::swap($this->logger);

        Event::listen(ContentRevisionStatusChangedEvent::class, function (ContentRevisionStatusChangedEvent $event): void {
            // Snapshot now: both notifications reference the same mutable model.
            $revision = $event->revision->fresh();
            $content = $revision->content;
            $this->notifications[] = [
                'payload' => $event->broadcastWith(),
                'channels' => array_map(fn ($channel) => $channel->name, $event->broadcastOn()),
                'persisted_status' => $revision->status,
                'queued' => $content->content_queued,
                'current_id' => $content->current_revision_id,
            ];
        });
    }

    #[DataProvider('successfulArticles')]
    public function test_jobs_save_validated_articles_and_preserve_conversations_and_revisions(
        string $operation,
        string $payload,
        string $expectedContent,
        bool $withHistory,
        bool $onlyAudience,
    ): void {
        [$content, $source, $earlier] = $this->fixture($withHistory, $onlyAudience);
        $response = $this->response($payload);
        $messages = $this->expectedMessages($operation, $source, $onlyAudience);
        OpenAI::fake([$response]);

        $this->job($operation, $content, $source)->handle();

        $revision = $this->assertCompleted($content, $operation, $source, $earlier, ContentGenerationStatus::Generated);
        $this->assertSame($expectedContent, $revision->content_md);
        $this->assertNull($revision->status_text);
        $this->assertSame([...$messages, $response->toArray()['choices'][0]['message']], $revision->messages);
        $this->assertRequest($operation, $messages);
        $this->assertPrivateDataNotLogged();
    }

    public static function successfulArticles(): iterable
    {
        $valid = '{"title":"PRIVATE_RESPONSE_TITLE","content":"## PRIVATE_GENERATED_ARTICLE\\nUseful body"}';
        $repaired = '{"content":"PRIVATE_REPAIRED_ARTICLE"';

        yield 'initial generation' => ['generate', $valid, "## PRIVATE_GENERATED_ARTICLE\nUseful body", false, false];
        yield 'generation preserves previous revisions' => ['generate', $valid, "## PRIVATE_GENERATED_ARTICLE\nUseful body", true, false];
        yield 'audience-only generation preserves prompt' => ['generate', $valid, "## PRIVATE_GENERATED_ARTICLE\nUseful body", false, true];
        yield 'tweak appends to full source history' => ['tweak', $valid, "## PRIVATE_GENERATED_ARTICLE\nUseful body", true, false];
        yield 'generation repairs truncated JSON' => ['generate', $repaired, 'PRIVATE_REPAIRED_ARTICLE', true, false];
        yield 'tweak repairs truncated JSON' => ['tweak', $repaired, 'PRIVATE_REPAIRED_ARTICLE', true, false];
    }

    #[DataProvider('failedArticles')]
    public function test_provider_and_invalid_payload_failures_are_recoverable_without_exposing_private_data(
        string $operation,
        ?string $payload,
    ): void {
        [$content, $source, $earlier] = $this->fixture(true);
        OpenAI::fake([
            $payload === null
                ? new RuntimeException(self::SECRET.' PRIVATE_USER_HISTORY PRIVATE_PROVIDER_RESPONSE')
                : $this->response($payload),
        ]);

        $this->job($operation, $content, $source)->handle();

        $this->assertFailed($content, $operation, $source, $earlier);
        $this->assertRequest($operation, $this->expectedMessages($operation, $source));
        $this->assertPrivateDataNotLogged();
    }

    public static function failedArticles(): iterable
    {
        foreach (['generate', 'tweak'] as $operation) {
            foreach ([
                'provider exception with secret' => null,
                'missing article content' => '{"title":"PRIVATE_RESPONSE_TITLE"}',
                'empty article content' => '{"content":""}',
                'whitespace article content' => '{"content":" \\n\\t "}',
                'null article content' => '{"content":null}',
                'numeric article content' => '{"content":42}',
                'array article content' => '{"content":["PRIVATE_PROVIDER_RESPONSE"]}',
                'object article content' => '{"content":{"text":"PRIVATE_PROVIDER_RESPONSE"}}',
                'list instead of object' => '[{"content":"PRIVATE_PROVIDER_RESPONSE"}]',
                'unrepairable JSON' => '{"content": INVALID_PRIVATE_PROVIDER_RESPONSE}',
            ] as $name => $payload) {
                yield $operation.' '.$name => [$operation, $payload];
            }
        }
    }

    #[DataProvider('missingMessages')]
    public function test_missing_provider_messages_leave_an_errored_revision(string $operation, array $envelope): void
    {
        [$content, $source, $earlier] = $this->fixture(true);

        // The typed SDK response cannot represent a missing/malformed message.
        // Fake the same facade boundary, leaving transport validation in place.
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

        $this->job($operation, $content, $source)->handle();

        $this->assertFailed($content, $operation, $source, $earlier);
        $this->assertPrivateDataNotLogged();
    }

    public static function missingMessages(): iterable
    {
        foreach (['generate', 'tweak'] as $operation) {
            foreach ([
                'no choices' => [],
                'empty choices' => ['choices' => []],
                'missing message' => ['choices' => [[]]],
                'null message' => ['choices' => [['message' => null]]],
                'missing message content' => ['choices' => [['message' => ['role' => 'assistant']]]],
                'null message content' => ['choices' => [['message' => ['content' => null]]]],
                'blank message content' => ['choices' => [['message' => ['content' => " \n\t"]]]],
                'non-string message content' => ['choices' => [['message' => ['content' => ['PRIVATE_PROVIDER_RESPONSE']]]]],
            ] as $name => $envelope) {
                yield $operation.' '.$name => [$operation, $envelope];
            }
        }
    }

    #[DataProvider('operations')]
    public function test_services_are_resolved_after_deserialization_and_non_exception_throwables_are_handled(string $operation): void
    {
        [$content, $source, $earlier] = $this->fixture(true);
        $job = unserialize(serialize($this->job($operation, $content, $source)));
        $service = Mockery::mock(AiContentService::class);
        $service->shouldReceive('article')->once()
            ->with($this->expectedMessages($operation, $source), $operation === 'generate')
            ->andThrow(new Error(self::SECRET.' PRIVATE_SERVICE_ERROR'));
        $this->app->instance(AiContentService::class, $service);

        $job->handle();

        $this->assertFailed($content, $operation, $source, $earlier);
        $this->assertPrivateDataNotLogged();
    }

    public static function operations(): iterable
    {
        yield 'generate' => ['generate'];
        yield 'tweak' => ['tweak'];
    }

    private function fixture(bool $withHistory, bool $onlyAudience = false): array
    {
        $app = App::query()->create([
            'user_id' => User::factory()->create()->id,
            'name' => 'PRIVATE_APP_NAME',
            'description' => 'PRIVATE_APP_DESCRIPTION',
            'target_audience' => 'PRIVATE_TARGET_AUDIENCE',
            'main_language' => 'en',
        ]);
        $content = $app->contents()->create([
            'language' => 'en',
            'format' => 'article',
            'size' => 'short',
            'title' => 'PRIVATE_ARTICLE_TITLE',
            'keywords' => ['PRIVATE_KEYWORD_ONE', 'PRIVATE_KEYWORD_TWO'],
            'only_target_audience' => $onlyAudience,
            'content_queued' => true,
        ]);
        $source = null;
        $earlier = [];

        if ($withHistory) {
            $messages = [
                ['role' => 'system', 'content' => 'PRIVATE_SYSTEM_HISTORY'],
                ['role' => 'user', 'content' => 'PRIVATE_USER_HISTORY'],
                ['role' => 'assistant', 'content' => '{"content":"PRIVATE_OLDER_ARTICLE"}'],
            ];
            $older = $content->revisions()->create([
                'status' => ContentGenerationStatus::Generated,
                'content_md' => 'PRIVATE_OLDER_ARTICLE',
                'messages' => $messages,
            ]);
            $source = $content->revisions()->create([
                'parent_id' => $older->id,
                'status' => ContentGenerationStatus::Generated,
                'content_md' => 'PRIVATE_SOURCE_ARTICLE',
                'messages' => [
                    ...$messages,
                    ['role' => 'user', 'content' => 'PRIVATE_EARLIER_TWEAK'],
                    ['role' => 'assistant', 'content' => '{"content":"PRIVATE_SOURCE_ARTICLE"}'],
                ],
            ]);
            $content->currentRevision()->associate($source);
            $content->save();
            foreach ([$older, $source] as $revision) {
                $earlier[$revision->id] = $revision->fresh()->getRawOriginal();
            }
        }

        return [$content, $source, $earlier];
    }

    private function job(string $operation, Content $content, ?ContentRevision $source): GenerateContentJob|TweakContentJob
    {
        return $operation === 'generate'
            ? new GenerateContentJob($content)
            : new TweakContentJob($source, self::TWEAK);
    }

    private function assertFailed(Content $content, string $operation, ContentRevision $source, array $earlier): void
    {
        $revision = $this->assertCompleted($content, $operation, $source, $earlier, ContentGenerationStatus::Errored);
        $this->assertNull($revision->content_md);
        $this->assertSame(self::FAILURE, $revision->status_text);
        $this->assertSame([], $revision->messages);
        $this->assertStringNotContainsString(self::SECRET, json_encode($revision->toArray(), JSON_THROW_ON_ERROR));
    }

    private function assertCompleted(
        Content $content,
        string $operation,
        ?ContentRevision $source,
        array $earlier,
        ContentGenerationStatus $status,
    ): ContentRevision {
        $content = $content->fresh();
        $revision = $content->currentRevision;
        $this->assertNotNull($revision);
        $this->assertFalse($content->content_queued);
        $this->assertSame($status, $revision->status);
        $this->assertSame($content->id, $revision->content_id);
        $this->assertSame($operation === 'tweak' ? $source->id : null, $revision->parent_id);
        $this->assertNotContains($revision->id, array_keys($earlier));
        $this->assertSame(count($earlier) + 1, $content->revisions()->count());
        foreach ($earlier as $id => $attributes) {
            $this->assertSame($attributes, ContentRevision::query()->findOrFail($id)->getRawOriginal());
        }
        $this->assertSame([
            [
                'payload' => ['id' => $revision->id, 'status' => ContentGenerationStatus::Generating],
                'channels' => ['private-contentRevisions.'.$revision->id],
                'persisted_status' => ContentGenerationStatus::Generating,
                'queued' => true,
                'current_id' => $revision->id,
            ],
            [
                'payload' => ['id' => $revision->id, 'status' => $status],
                'channels' => ['private-contentRevisions.'.$revision->id],
                'persisted_status' => $status,
                'queued' => false,
                'current_id' => $revision->id,
            ],
        ], $this->notifications);

        return $revision;
    }

    private function expectedMessages(string $operation, ?ContentRevision $source, bool $onlyAudience = false): array
    {
        if ($operation === 'tweak') {
            return [...$source->messages, [
                'role' => 'user',
                'content' => 'Please make the following tweak to the content: "'.self::TWEAK.'". DO NOT change the way you return ANY of the format. Return in the exact same format as you did before, only change the actual content (article).',
            ]];
        }

        $context = $onlyAudience ? '' : "I am creating PRIVATE_APP_NAME, description: PRIVATE_APP_DESCRIPTION.\n\n";
        $instruction = <<<'PROMPT'
Given the context, please generate SEO optimized content for the provided keywords with the following specifications:

- **Language:** en
- **Title:** PRIVATE_ARTICLE_TITLE
- **Keywords:** PRIVATE_KEYWORD_ONE, PRIVATE_KEYWORD_TWO (please incorporate these keywords naturally into the content to optimize for SEO)
- **Target Audience:** PRIVATE_TARGET_AUDIENCE
- **Type of content (essay, article, listicle, etc):** article
- **Length of content:** short (short (300 words), medium (1000 words), long (1500 words), extra long (3000 words))

The content should be well and professionally written, with human touches. Depending on the type of content, it should be structured accordingly

Please return in the format of JSON where it looks like {"title": "", "content": ""} where content is the content in markdown format (do not include # title in content). Please ensure that the markdown (md) format is valid and correct.

Thank you!
PROMPT;

        return [
            ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'],
            ['role' => 'user', 'content' => $context.$instruction],
        ];
    }

    private function assertRequest(string $operation, array $messages): void
    {
        $expected = ['model' => 'gpt-4-turbo-preview'];
        if ($operation === 'generate') {
            $expected['response_format'] = ['type' => 'json_object'];
        }
        $expected['messages'] = $messages;

        OpenAI::assertSent(Chat::class, 1);
        OpenAI::assertSent(Chat::class, fn (string $method, array $options): bool => $method === 'create' && $options === $expected);
    }

    private function response(string $payload): CreateResponse
    {
        return CreateResponse::fake([
            'choices' => [[
                'index' => 0,
                'message' => ['role' => 'assistant', 'content' => $payload],
                'finish_reason' => 'stop',
            ]],
        ]);
    }

    private function assertPrivateDataNotLogged(): void
    {
        $logs = serialize($this->logger->entries);
        foreach ([
            'PRIVATE_', self::SECRET,
            'You are a highly skilled AI',
            'Given the context, please generate',
            'Please make the following tweak',
        ] as $privateText) {
            $this->assertStringNotContainsString($privateText, $logs);
        }
    }
}
