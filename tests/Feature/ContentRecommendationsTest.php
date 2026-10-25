<?php

namespace Tests\Feature;

use App\Models\App;
use App\Models\Content;
use App\Models\ContentCluster;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Resources\Chat;
use OpenAI\Responses\Chat\CreateResponse;
use PHPUnit\Framework\Attributes\DataProvider;
use RuntimeException;
use Tests\TestCase;

class ContentRecommendationsTest extends TestCase
{
    use RefreshDatabase;

    private const GENERATION_ERROR = 'Content generation failed. Please try again.';

    private App $selectedApp;

    protected function setUp(): void
    {
        parent::setUp();

        Bus::fake();
        Queue::fake();
        Log::spy();
        OpenAI::fake();

        $owner = User::factory()->create();
        DB::table('subscriptions')->insert([
            'user_id' => $owner->id,
            'type' => 'default',
            'stripe_id' => 'sub_recommendations_'.$owner->id,
            'stripe_status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->selectedApp = $owner->apps()->create([
            'name' => 'Private recommendation app',
            'description' => 'Private app description',
            'target_audience' => 'Private marketing audience',
            'main_language' => 'en',
        ]);
        $this->actingAs($owner);
    }

    public static function audienceSettings(): array
    {
        return [
            'app context' => [false],
            'audience only' => [true],
            'optional flag omitted' => [null],
        ];
    }

    #[DataProvider('audienceSettings')]
    public function test_success_preserves_fields_redirect_and_exact_provider_request(?bool $audienceOnly): void
    {
        $titles = $this->titles();
        OpenAI::fake([$this->response(json_encode(['titles' => $titles], JSON_THROW_ON_ERROR))]);
        $payload = $this->payload();
        if ($audienceOnly === null) {
            unset($payload['only_target_audience']);
        } else {
            $payload['only_target_audience'] = $audienceOnly;
        }

        $response = $this->post($this->endpoint(), $payload);

        $cluster = $this->selectedApp->contentClusters()->sole();
        $response->assertRedirect($this->formUrl().'?show_cluster='.$cluster->id)
            ->assertSessionHasNoErrors();
        $this->assertDatabaseCount('content_clusters', 1);
        $this->assertDatabaseCount('contents', count($titles));
        $this->assertSame($this->selectedApp->id, $cluster->app_id);
        $this->assertSame($payload['language'], $cluster->language);
        foreach ($cluster->contents()->orderBy('id')->get() as $index => $content) {
            $this->assertContentFields($content, $cluster, $titles[$index], $audienceOnly ?? false);
        }
        $this->assertProviderRequest($audienceOnly ?? false);
        $this->assertNoBackgroundWorkOrLogs();
    }

    public function test_repairable_recommendations_are_accepted_before_saving(): void
    {
        OpenAI::fake([$this->response('{"titles":[{"title":"Repaired title","keywords":["SEO"]}')]);

        $response = $this->post($this->endpoint(), $this->payload());

        $cluster = $this->selectedApp->contentClusters()->sole();
        $response->assertRedirect($this->formUrl().'?show_cluster='.$cluster->id)->assertSessionHasNoErrors();
        $this->assertDatabaseCount('contents', 1);
        $this->assertContentFields($cluster->contents()->sole(), $cluster, [
            'title' => 'Repaired title', 'keywords' => ['SEO'],
        ], false);
    }

    public static function invalidRecommendations(): array
    {
        $valid = ['title' => 'Valid first title', 'keywords' => ['SEO']];
        $cases = [
            'unrepairable JSON' => '{"titles": INVALID_PRIVATE_PAYLOAD}',
            'empty provider content' => '',
            'blank provider content' => " \n\t ",
            'missing titles' => '{}',
            'empty titles' => '{"titles":[]}',
            'null titles' => '{"titles":null}',
            'object instead of list' => '{"titles":{"0":{"title":"Title","keywords":["SEO"]}}}',
        ];
        foreach ([
            'missing title' => ['keywords' => ['SEO']],
            'blank title' => ['title' => " \n", 'keywords' => ['SEO']],
            'non-string title' => ['title' => 123, 'keywords' => ['SEO']],
            'missing keywords' => ['title' => 'Invalid second title'],
            'empty keywords' => ['title' => 'Invalid second title', 'keywords' => []],
            'non-list keywords' => ['title' => 'Invalid second title', 'keywords' => 'SEO'],
            'blank keyword' => ['title' => 'Invalid second title', 'keywords' => ['SEO', ' ']],
            'non-string keyword' => ['title' => 'Invalid second title', 'keywords' => ['SEO', 123]],
            'non-object entry' => 'Invalid second title',
        ] as $name => $invalid) {
            $cases['partially invalid / '.$name] = json_encode(['titles' => [$valid, $invalid]], JSON_THROW_ON_ERROR);
        }

        return array_map(fn (string $payload): array => [$payload], $cases);
    }

    #[DataProvider('invalidRecommendations')]
    public function test_invalid_output_delivers_only_generic_session_error_and_saves_nothing(string $output): void
    {
        OpenAI::fake([$this->response($output)]);
        $payload = $this->payload();

        $response = $this->from($this->formUrl())
            ->withHeader('X-Inertia', 'true')
            ->post($this->endpoint(), $payload);

        $response->assertRedirect($this->formUrl())
            ->assertSessionHasErrors(['generation' => self::GENERATION_ERROR])
            ->assertSessionHasInput('language', $payload['language'])
            ->assertSessionHasInput('size', $payload['size'])
            ->assertSessionHasInput('format', $payload['format'])
            ->assertSessionHasInput('only_target_audience', false);
        $this->assertSame(['generation' => [self::GENERATION_ERROR]], session('errors')->getBag('default')->messages());
        $this->assertNoRecommendationRecords();
        OpenAI::assertSent(Chat::class, 1);
        $this->assertNoBackgroundWorkOrLogs();
    }

    public function test_provider_exception_with_secret_delivers_generic_session_error_without_logging_or_records(): void
    {
        $secret = 'SECRET_PROVIDER_KEY private request and raw provider response';
        OpenAI::fake([new RuntimeException($secret)]);

        $response = $this->from($this->formUrl())->post($this->endpoint(), $this->payload());

        $response->assertRedirect($this->formUrl())
            ->assertSessionHasErrors(['generation' => self::GENERATION_ERROR])
            ->assertSessionHasInput('language', $this->payload()['language'])
            ->assertDontSee($secret);
        $this->assertSame(['generation' => [self::GENERATION_ERROR]], session('errors')->getBag('default')->messages());
        $this->assertStringNotContainsString($secret, serialize(session()->all()));
        $this->assertNoRecommendationRecords();
        $this->assertNoBackgroundWorkOrLogs();
    }

    public function test_json_clients_receive_generic_generation_validation_error(): void
    {
        OpenAI::fake([$this->response('{"titles":[]}')]);

        $this->postJson($this->endpoint(), $this->payload())
            ->assertUnprocessable()
            ->assertJsonPath('errors.generation', [self::GENERATION_ERROR]);

        $this->assertNoRecommendationRecords();
    }

    public function test_provider_fields_cannot_override_relationships_request_fields_or_generation_state(): void
    {
        $foreignOwner = User::factory()->create();
        $foreignApp = $foreignOwner->apps()->create([
            'name' => 'Foreign app', 'description' => 'Foreign description',
            'target_audience' => 'Foreign audience', 'main_language' => 'en',
        ]);
        $foreignCluster = $foreignApp->contentClusters()->create(['language' => 'en']);
        $foreignContent = $foreignCluster->contents()->create([
            ...$this->payload(), 'app_id' => $foreignApp->id,
            'title' => 'Foreign title', 'keywords' => ['foreign'],
        ]);
        $foreignRevision = $foreignContent->revisions()->create(['messages' => []]);
        $before = $this->recommendationSnapshot();
        $title = $this->titles()[0];
        OpenAI::fake([$this->response(json_encode(['titles' => [[
            ...$title,
            'id' => $foreignContent->id,
            'app_id' => $foreignApp->id,
            'cluster_id' => $foreignCluster->id,
            'current_revision_id' => $foreignRevision->id,
            'user_id' => $foreignOwner->id,
            'slug' => 'injected-slug',
            'language' => 'de',
            'size' => 'extra_long',
            'format' => 'essay',
            'only_target_audience' => true,
            'content_queued' => true,
        ]]], JSON_THROW_ON_ERROR))]);

        $response = $this->post($this->endpoint(), $this->payload());

        $cluster = $this->selectedApp->contentClusters()->sole();
        $response->assertRedirect($this->formUrl().'?show_cluster='.$cluster->id)->assertSessionHasNoErrors();
        $content = $cluster->contents()->sole();
        $this->assertContentFields($content, $cluster, $title, false);
        $this->assertNotSame($foreignContent->id, $content->id);
        $this->assertNotSame('injected-slug', $content->slug);
        foreach ($before as $table => $rows) {
            foreach ($rows as $row) {
                $this->assertSame($row, (array) DB::table($table)->where('id', $row['id'])->sole());
            }
        }
        $this->assertDatabaseCount('content_clusters', 2);
        $this->assertDatabaseCount('contents', 2);
        $this->assertDatabaseCount('content_revisions', 1);
        $this->assertNoBackgroundWorkOrLogs();
    }

    public function test_provider_runs_before_any_writes_and_outside_the_persistence_transaction(): void
    {
        // RefreshDatabase may already own a transaction: compare to the baseline,
        // rather than incorrectly requiring an absolute transaction level of zero.
        $baseline = DB::connection()->transactionLevel();
        $providerCalled = false;
        $fixture = $this->response(json_encode(['titles' => $this->titles()], JSON_THROW_ON_ERROR));
        $onRequest = function (array $options) use ($baseline, &$providerCalled, $fixture): CreateResponse {
            $this->assertFalse($providerCalled, 'Expected only one provider call.');
            $providerCalled = true;
            $this->assertSame($baseline, DB::connection()->transactionLevel());
            $this->assertNoRecommendationRecords();
            $this->assertSame(['type' => 'json_object'], $options['response_format']);

            return $fixture;
        };
        OpenAI::swap(new class($onRequest)
        {
            public function __construct(private \Closure $onRequest) {}

            public function chat(): self
            {
                return $this;
            }

            public function create(array $options): CreateResponse
            {
                return ($this->onRequest)($options);
            }
        });

        $this->post($this->endpoint(), $this->payload())->assertSessionHasNoErrors()->assertRedirect();

        $this->assertTrue($providerCalled);
        $this->assertSame($baseline, DB::connection()->transactionLevel());
        $this->assertDatabaseCount('content_clusters', 1);
        $this->assertDatabaseCount('contents', 2);
    }

    public function test_mid_save_failure_rolls_back_the_cluster_and_previously_saved_content(): void
    {
        OpenAI::fake([$this->response(json_encode(['titles' => $this->titles()], JSON_THROW_ON_ERROR))]);
        $before = $this->recommendationSnapshot();
        $baseline = DB::connection()->transactionLevel();
        $dispatcher = Content::getEventDispatcher();
        Content::setEventDispatcher(clone $dispatcher);
        $attempts = 0;
        $failure = new RuntimeException('Simulated second content save failure');

        try {
            Content::creating(function (Content $content) use (&$attempts, $baseline, $failure) {
                $this->assertSame($baseline + 1, $content->getConnection()->transactionLevel());
                if (++$attempts === 2) {
                    // Prove this is a mid-save failure, after real writes occurred.
                    $this->assertDatabaseCount('content_clusters', 1);
                    $this->assertDatabaseCount('contents', 1);
                    throw $failure;
                }
            });
            $this->withoutExceptionHandling();

            try {
                $this->post($this->endpoint(), $this->payload());
                $this->fail('Expected the second content save to fail.');
            } catch (RuntimeException $exception) {
                $this->assertSame($failure, $exception);
            }
        } finally {
            Content::setEventDispatcher($dispatcher);
        }

        $this->assertSame(2, $attempts);
        $this->assertSame($before, $this->recommendationSnapshot());
        $this->assertSame($baseline, DB::connection()->transactionLevel());
        $this->assertNoRecommendationRecords();
        OpenAI::assertSent(Chat::class, 1);
        $this->assertNoBackgroundWorkOrLogs();
    }

    private function assertContentFields(Content $content, ContentCluster $cluster, array $title, bool $audienceOnly): void
    {
        $this->assertSame($title['title'], $content->title);
        $this->assertSame($title['keywords'], $content->keywords);
        $this->assertSame($this->selectedApp->id, $content->app_id);
        $this->assertSame($cluster->id, $content->cluster_id);
        $this->assertSame($this->payload()['language'], $content->language);
        $this->assertSame($this->payload()['size'], $content->size->value);
        $this->assertSame($this->payload()['format'], $content->format->value);
        $this->assertSame($audienceOnly, $content->only_target_audience);
        $this->assertFalse($content->content_queued);
        $this->assertNull($content->current_revision_id);
        $this->assertNotEmpty($content->slug);
    }

    private function assertProviderRequest(bool $audienceOnly): void
    {
        $appName = $audienceOnly ? '' : $this->selectedApp->name;
        $appDesc = $audienceOnly ? '' : $this->selectedApp->description;
        $targetAudience = $this->selectedApp->target_audience;
        $language = $this->payload()['language'];
        $format = $this->payload()['format'];
        $expected = [
            'model' => 'gpt-4-turbo-preview',
            'response_format' => ['type' => 'json_object'],
            'messages' => [
                ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'],
                ['role' => 'user', 'content' => "Please recommend 8 amount of SEO content titles, each with its own set of recommended keywords, and using the provided context. If the app name and app description are empty, omit them from the context when recommending. Ensure there is no excessive spacing in the response. Here is the context:\n\n- **App name:** $appName\n- **App description:** $appDesc\n- **Target Audience:** $targetAudience\n- **Language:** $language\n- **Type of content (essay, article, listicle, etc):** $format\n\nPlease return your recommendations in a \"titles\" object as a JSON array of objects in the format of [{\"title\":\"titleString\", \"keywords\":[\"keyword1\", \"keyword2\"]}, { ... }] (this is only the format I want you to return in). Ensure the JSON structure is compact without unnecessary whitespace or padding in keys and values. MAKE SURE TO GENERATE 8 AMOUNT OF TITLES Thank you!"],
            ],
        ];
        OpenAI::assertSent(Chat::class, 1);
        OpenAI::assertSent(Chat::class, fn (string $method, array $options): bool => $method === 'create' && $options === $expected);
    }

    private function assertNoRecommendationRecords(): void
    {
        foreach (['content_clusters', 'contents', 'content_revisions', 'content_recommendations'] as $table) {
            $this->assertDatabaseCount($table, 0);
        }
    }

    private function assertNoBackgroundWorkOrLogs(): void
    {
        Bus::assertNothingDispatched();
        Queue::assertNothingPushed();
        foreach (['log', 'emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug'] as $method) {
            Log::shouldNotHaveReceived($method);
        }
    }

    private function recommendationSnapshot(): array
    {
        $snapshot = [];
        foreach (['content_clusters', 'contents', 'content_revisions', 'content_recommendations'] as $table) {
            $snapshot[$table] = DB::table($table)->orderBy('id')->get()->map(fn ($row) => (array) $row)->all();
        }

        return $snapshot;
    }

    private function titles(): array
    {
        return [
            ['title' => 'First private recommendation', 'keywords' => ['private SEO', 'marketing']],
            ['title' => 'Second private recommendation', 'keywords' => ['content']],
        ];
    }

    private function response(string $output): CreateResponse
    {
        return CreateResponse::fake([
            'choices' => [[
                'index' => 0,
                'message' => ['role' => 'assistant', 'content' => $output],
                'finish_reason' => 'stop',
            ]],
        ]);
    }

    private function payload(): array
    {
        return ['language' => 'fr', 'size' => 'short', 'format' => 'article', 'only_target_audience' => false];
    }

    private function formUrl(): string
    {
        return '/app/'.$this->selectedApp->slug.'/content';
    }

    private function endpoint(): string
    {
        return '/app/'.$this->selectedApp->slug.'/content-cluster';
    }
}
