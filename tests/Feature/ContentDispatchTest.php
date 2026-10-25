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
use Closure;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Testing\Fakes\QueueFake;
use Illuminate\Testing\TestResponse;
use Illuminate\Validation\ValidationException;
use Mockery;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Resources\Chat;
use OpenAI\Responses\Chat\CreateResponse;
use PHPUnit\Framework\Attributes\DataProvider;
use RuntimeException;
use Tests\TestCase;

class ContentDispatchTest extends TestCase
{
    // Real commits are essential here; RefreshDatabase's wrapping transaction
    // would conceal production after-commit timing.
    use DatabaseMigrations;

    private const FAILURE = 'Content generation failed. Please try again.';
    private const SECRET = 'PRIVATE_DISPATCH_CREDENTIAL';

    private App $selectedApp;

    protected function setUp(): void
    {
        parent::setUp();

        OpenAI::fake();
        Event::fake([ContentRevisionStatusChangedEvent::class]);
        $owner = User::factory()->create();
        DB::table('subscriptions')->insert([
            'user_id' => $owner->id,
            'type' => 'default',
            'stripe_id' => 'sub_dispatch_'.$owner->id,
            'stripe_status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->selectedApp = $owner->apps()->create([
            'name' => 'Dispatch app',
            'description' => 'Content dispatch regression fixtures',
            'target_audience' => 'Marketing teams',
            'main_language' => 'en',
        ]);
        $this->actingAs($owner);
    }

    public static function operations(): iterable
    {
        foreach (['create', 'write', 'retry', 'tweak'] as $operation) {
            yield $operation => [$operation];
        }
    }

    public static function transactionCases(): iterable
    {
        foreach (self::operations() as [$operation]) {
            foreach ([false, true] as $outer) {
                yield $operation.($outer ? ' outer transaction' : ' standalone') => [$operation, $outer];
            }
        }
    }

    #[DataProvider('transactionCases')]
    public function test_deferred_queue_observes_committed_prepared_state(string $operation, bool $outer): void
    {
        [$content, $history] = $this->fixture($operation);
        $observed = [];
        $this->observeDeferredQueue(function ($job) use (&$observed): void {
            $persisted = $this->selectedApp->contents()->sole();
            $observed[] = [get_class($job), DB::transactionLevel(), $persisted->content_queued, $persisted->current_revision_id];
            // A deferred worker can restore the actual job's model identifiers.
            $this->assertInstanceOf(get_class($job), unserialize(serialize($job)));
        });

        if ($outer) {
            DB::beginTransaction();
        }
        $response = $this->submit($operation, $content);
        $persisted = $this->selectedApp->contents()->sole();
        $this->assertRedirect($response, $operation, $persisted);
        $this->assertTrue($persisted->content_queued);
        $this->assertNull($persisted->current_revision_id);

        if ($outer) {
            $this->assertSame([], $observed);
            Queue::assertNothingPushed();
            DB::commit();
        }

        $this->assertSame([[$this->jobClass($operation), 0, true, null]], $observed);
        Queue::assertPushed($this->jobClass($operation), 1);
        $this->assertHistory($persisted, $history);
        $this->assertShow($persisted, true, null);
        OpenAI::assertNothingSent();
    }

    #[DataProvider('operations')]
    public function test_outer_rollback_cancels_dispatch_and_restores_database_state(string $operation): void
    {
        [$content, $history] = $this->fixture($operation);
        $this->observeDeferredQueue(function (): void {
            $this->fail('A rolled-back operation must not reach the queue.');
        });
        DB::beginTransaction();

        $this->submit($operation, $content)->assertRedirect()->assertSessionHasNoErrors();
        Queue::assertNothingPushed();
        DB::rollBack();

        Queue::assertNothingPushed();
        if ($content === null) {
            $this->assertDatabaseCount('contents', 0);
        } else {
            $persisted = $content->fresh();
            $this->assertFalse($persisted->content_queued);
            $this->assertSame($content->current_revision_id, $persisted->current_revision_id);
            $this->assertHistory($persisted, $history);
        }
        OpenAI::assertNothingSent();
    }

    public static function synchronousCases(): iterable
    {
        foreach (self::transactionCases() as $name => [$operation, $outer]) {
            foreach ([false, true] as $fails) {
                yield $name.($fails ? ' handled failure' : ' success') => [$operation, $outer, $fails];
            }
        }
    }

    #[DataProvider('synchronousCases')]
    public function test_real_sync_jobs_keep_terminal_queue_and_revision_state(string $operation, bool $outer, bool $fails): void
    {
        config(['queue.default' => 'sync']);
        [$content, $history] = $this->fixture($operation);
        $sourceId = $content?->current_revision_id;
        OpenAI::fake([$fails ? new RuntimeException(self::SECRET) : CreateResponse::fake([
            'choices' => [[
                'index' => 0,
                'message' => ['role' => 'assistant', 'content' => '{"content":"Completed article"}'],
                'finish_reason' => 'stop',
            ]],
        ])]);

        if ($outer) {
            DB::beginTransaction();
        }
        $response = $this->submit($operation, $content);
        if ($outer) {
            OpenAI::assertNothingSent();
            $this->assertTrue($this->selectedApp->contents()->sole()->content_queued);
            DB::commit();
        }

        $persisted = $this->selectedApp->contents()->sole();
        $this->assertRedirect($response, $operation, $persisted);
        $this->assertFalse($persisted->content_queued);
        $revision = $persisted->currentRevision;
        $this->assertNotNull($revision);
        $this->assertNotContains($revision->id, array_keys($history));
        $this->assertSame($operation === 'tweak' ? $sourceId : null, $revision->parent_id);
        $this->assertSame($fails ? ContentGenerationStatus::Errored : ContentGenerationStatus::Generated, $revision->status);
        $this->assertSame($fails ? null : 'Completed article', $revision->content_md);
        $this->assertSame($fails ? self::FAILURE : null, $revision->status_text);
        $this->assertHistory($persisted, $history, 1);
        $this->assertShow($persisted, false, $revision);
        OpenAI::assertSent(Chat::class, 1);
        Event::assertDispatched(ContentRevisionStatusChangedEvent::class, 2);
    }

    public static function dispatchFailureCases(): iterable
    {
        foreach (self::operations() as [$operation]) {
            foreach ([false, true] as $json) {
                foreach ($operation === 'create' ? [false] : [false, true] as $queued) {
                    yield $operation.($json ? ' JSON' : ' form').($queued ? ' previously queued' : ' unqueued') => [$operation, $json, $queued];
                }
            }
        }
    }

    #[DataProvider('dispatchFailureCases')]
    public function test_dispatch_throw_restores_state_and_returns_generic_generation_error(string $operation, bool $json, bool $queued): void
    {
        [$content, $history] = $this->fixture($operation, $queued);
        $previousId = $content?->current_revision_id;
        $this->throwBeforeAcceptance($operation);

        $response = $this->submit($operation, $content, $json);

        if ($json) {
            $response->assertUnprocessable()->assertExactJson([
                'message' => self::FAILURE,
                'errors' => ['generation' => [self::FAILURE]],
            ]);
        } else {
            $response->assertRedirect($this->formUrl($content))
                ->assertSessionHasErrors(['generation' => self::FAILURE]);
            if ($operation === 'create' || $operation === 'tweak') {
                $response->assertSessionHasInput(
                    $operation === 'create' ? 'title' : 'tweak',
                    $operation === 'create' ? $this->payload()['title'] : 'Add a practical example.',
                );
            }
        }
        $persisted = $this->selectedApp->contents()->sole();
        $this->assertSame($queued, $persisted->content_queued);
        $this->assertSame($previousId, $persisted->current_revision_id);
        $this->assertHistory($persisted, $history);
        $this->assertShow($persisted, $queued, $persisted->currentRevision);
        OpenAI::assertNothingSent();
        Event::assertNotDispatched(ContentRevisionStatusChangedEvent::class);
    }

    public function test_retained_new_content_can_be_retried_after_dispatch_failure(): void
    {
        $dispatcher = $this->app->make(Dispatcher::class);
        $this->throwBeforeAcceptance('create');
        $this->submit('create', null)->assertSessionHasErrors(['generation' => self::FAILURE]);
        $content = $this->selectedApp->contents()->sole();
        $this->assertShow($content, false, null);
        $this->assertHistory($content, []);

        $this->app->instance(Dispatcher::class, $dispatcher);
        $this->observeDeferredQueue(function ($job): void {
            $this->assertInstanceOf(GenerateContentJob::class, $job);
            $this->assertSame(0, DB::transactionLevel());
            $this->assertTrue($this->selectedApp->contents()->sole()->content_queued);
        });
        // Model the next form attempt after the browser has consumed the error.
        session()->forget('errors');

        $this->submit('retry', $content)->assertRedirect($this->contentUrl($content))->assertSessionHasNoErrors();

        Queue::assertPushed(GenerateContentJob::class, 1);
        $this->assertShow($content, true, null);
        $this->assertDatabaseCount('contents', 1);
        OpenAI::assertNothingSent();
    }

    #[DataProvider('operations')]
    public function test_dispatch_throw_after_outer_commit_restores_captured_state(string $operation): void
    {
        [$content, $history] = $this->fixture($operation, $operation !== 'create');
        $this->throwBeforeAcceptance($operation);
        DB::beginTransaction();
        $this->submit($operation, $content)->assertRedirect()->assertSessionHasNoErrors();

        try {
            DB::commit();
            $this->fail('Expected a generation validation error at the outer commit.');
        } catch (ValidationException $exception) {
            $this->assertSame(['generation' => [self::FAILURE]], $exception->errors());
        }

        $this->assertSame(0, DB::transactionLevel());
        $persisted = $this->selectedApp->contents()->sole();
        $this->assertSame($operation !== 'create', $persisted->content_queued);
        $this->assertSame($content?->current_revision_id, $persisted->current_revision_id);
        $this->assertHistory($persisted, $history);
        OpenAI::assertNothingSent();
    }

    public static function invalidTweakSourceCases(): iterable
    {
        foreach ([null, ContentGenerationStatus::Idle, ContentGenerationStatus::Generating, ContentGenerationStatus::Errored] as $status) {
            foreach ([false, true] as $json) {
                foreach ([false, true] as $queued) {
                    yield ($status?->value ?? 'missing').($json ? ' JSON' : ' form').($queued ? ' queued' : ' unqueued') => [$status, $json, $queued];
                }
            }
        }
    }

    #[DataProvider('invalidTweakSourceCases')]
    public function test_tweak_requires_a_current_generated_source(?ContentGenerationStatus $status, bool $json, bool $queued): void
    {
        [$content] = $this->fixture('tweak', $queued);
        if ($status === null) {
            $content->currentRevision()->dissociate();
            $content->save();
        } else {
            $content->currentRevision->update(['status' => $status]);
        }
        // Generated history must not substitute for a missing or unfinished current revision.
        $attributes = $content->fresh()->getRawOriginal();
        $history = $content->revisions()->get()->mapWithKeys(fn ($revision) => [$revision->id => $revision->getRawOriginal()])->all();
        $this->rejectDispatch();

        $response = $this->submit('tweak', $content, $json);

        $message = 'A generated current revision is required before tweaking content.';
        if ($json) {
            $response->assertUnprocessable()->assertExactJson([
                'message' => $message,
                'errors' => ['generation' => [$message]],
            ]);
        } else {
            $response->assertRedirect($this->contentUrl($content))
                ->assertSessionHasErrors(['generation' => $message])
                ->assertSessionHasInput('tweak', 'Add a practical example.');
        }
        $this->assertRejectedTweakHasNoSideEffects($content, $attributes, $history);
    }

    public static function invalidTweakInputCases(): iterable
    {
        $inputs = [
            'missing' => [],
            'null' => ['tweak' => null],
            'empty' => ['tweak' => ''],
            'whitespace' => ['tweak' => " \t\r\n "],
            'integer' => ['tweak' => 42],
            'zero' => ['tweak' => 0],
            'float' => ['tweak' => 1.5],
            'true' => ['tweak' => true],
            'false' => ['tweak' => false],
            'empty array' => ['tweak' => []],
            'list' => ['tweak' => ['Add an example.']],
            'object' => ['tweak' => ['instruction' => 'Add an example.']],
        ];
        foreach ($inputs as $name => $input) {
            foreach ([false, true] as $json) {
                yield $name.($json ? ' JSON' : ' form') => [$input, $json];
            }
        }
    }

    #[DataProvider('invalidTweakInputCases')]
    public function test_tweak_requires_nonblank_string_input(array $input, bool $json): void
    {
        [$content, $history] = $this->fixture('tweak');
        $attributes = $content->fresh()->getRawOriginal();
        $this->rejectDispatch();
        $url = $this->contentUrl($content).'/tweak';
        $this->from($this->contentUrl($content));

        $response = $json ? $this->postJson($url, $input) : $this->post($url, $input);

        if ($json) {
            $response->assertUnprocessable()->assertJsonValidationErrors('tweak');
            $this->assertSame(['tweak'], array_keys($response->json('errors')));
        } else {
            $response->assertRedirect($this->contentUrl($content))->assertSessionHasErrors('tweak');
        }
        $this->assertRejectedTweakHasNoSideEffects($content, $attributes, $history);
    }

    public static function tweakRequestFormats(): iterable
    {
        yield 'form' => [false];
        yield 'JSON' => [true];
    }

    #[DataProvider('tweakRequestFormats')]
    public function test_valid_tweak_with_generated_current_source_is_dispatched(bool $json): void
    {
        [$content, $history] = $this->fixture('tweak');
        $this->observeDeferredQueue(function ($job): void {
            $this->assertInstanceOf(TweakContentJob::class, $job);
            $persisted = $this->selectedApp->contents()->sole();
            $this->assertTrue($persisted->content_queued);
            $this->assertNull($persisted->current_revision_id);
        });

        $this->assertRedirect($this->submit('tweak', $content, $json), 'tweak', $content);

        Queue::assertPushed(TweakContentJob::class, 1);
        $this->assertHistory($content, $history);
        OpenAI::assertNothingSent();
        Event::assertNotDispatched(ContentRevisionStatusChangedEvent::class);
    }

    private function rejectDispatch(): void
    {
        Queue::fake();
        $dispatcher = Mockery::mock(Dispatcher::class);
        $dispatcher->shouldNotReceive('dispatch');
        $this->app->instance(Dispatcher::class, $dispatcher);
    }

    private function assertRejectedTweakHasNoSideEffects(Content $content, array $attributes, array $history): void
    {
        $this->assertDatabaseCount('contents', 1);
        $this->assertSame($attributes, $content->fresh()->getRawOriginal());
        $this->assertHistory($content, $history);
        Queue::assertNothingPushed();
        OpenAI::assertNothingSent();
        Event::assertNotDispatched(ContentRevisionStatusChangedEvent::class);
    }

    private function observeDeferredQueue(Closure $observe): void
    {
        Queue::swap(new class($this->app, $observe) extends QueueFake
        {
            public function __construct($app, private Closure $observe)
            {
                parent::__construct($app);
            }

            public function push($job, $data = '', $queue = null)
            {
                ($this->observe)($job);

                return parent::push($job, $data, $queue);
            }
        });
    }

    private function throwBeforeAcceptance(string $operation): void
    {
        $dispatcher = Mockery::mock(Dispatcher::class);
        $dispatcher->shouldReceive('dispatch')->once()->with(Mockery::type($this->jobClass($operation)))
            ->andReturnUsing(function (): never {
                $persisted = $this->selectedApp->contents()->sole();
                $this->assertSame(0, DB::transactionLevel());
                $this->assertTrue($persisted->content_queued);
                $this->assertNull($persisted->current_revision_id);

                throw new RuntimeException(self::SECRET);
            });
        $this->app->instance(Dispatcher::class, $dispatcher);
    }

    private function fixture(string $operation, bool $queued = false): array
    {
        if ($operation === 'create') {
            return [null, []];
        }

        $content = $this->selectedApp->contents()->create([...$this->payload(), 'content_queued' => $queued]);
        $older = $content->revisions()->create([
            'status' => ContentGenerationStatus::Generated,
            'content_md' => 'Earlier article',
            'messages' => [['role' => 'assistant', 'content' => '{"content":"Earlier article"}']],
        ]);
        $source = $content->revisions()->create([
            'parent_id' => $older->id,
            'status' => ContentGenerationStatus::Generated,
            'content_md' => 'Source article',
            'messages' => [...$older->messages, ['role' => 'assistant', 'content' => '{"content":"Source article"}']],
        ]);
        $content->currentRevision()->associate($source);
        $content->save();

        return [$content, [$older->id => $older->fresh()->getRawOriginal(), $source->id => $source->fresh()->getRawOriginal()]];
    }

    private function assertHistory(Content $content, array $history, int $added = 0): void
    {
        $this->assertSame(count($history) + $added, $content->revisions()->count());
        foreach ($history as $id => $attributes) {
            $this->assertSame($attributes, ContentRevision::query()->findOrFail($id)->getRawOriginal());
        }
    }

    private function assertShow(Content $content, bool $queued, ?ContentRevision $revision): void
    {
        $response = $this->get($this->contentUrl($content), ['X-Inertia' => 'true']);
        $response->assertOk()->assertJsonPath('component', 'app/content/show')
            ->assertJsonPath('props.content.id', $content->id)
            ->assertJsonPath('props.content.content_queued', $queued)
            ->assertJsonPath('props.content.current_revision_id', $revision?->id);
        if ($revision === null) {
            $response->assertJsonPath('props.content.current_revision', null);
        } else {
            $response->assertJsonPath('props.content.current_revision.id', $revision->id)
                ->assertJsonPath('props.content.current_revision.status', $revision->status->value)
                ->assertJsonPath('props.content.current_revision.status_text', $revision->status_text);
        }
    }

    private function submit(string $operation, ?Content $content, bool $json = false): TestResponse
    {
        $url = $operation === 'create' ? $this->baseUrl() : $this->contentUrl($content).'/'.$operation;
        $payload = match ($operation) {
            'create' => $this->payload(),
            'tweak' => ['tweak' => 'Add a practical example.'],
            default => [],
        };
        $this->from($this->formUrl($content));

        return $json ? $this->postJson($url, $payload) : $this->post($url, $payload);
    }

    private function assertRedirect(TestResponse $response, string $operation, Content $content): void
    {
        $response->assertRedirect($operation === 'create' ? $this->contentUrl($content) : $this->formUrl($content))
            ->assertSessionHasNoErrors();
    }

    private function payload(): array
    {
        return [
            'language' => 'en',
            'size' => 'short',
            'format' => 'article',
            'title' => 'Dispatch article',
            'keywords' => ['dispatch', 'generation'],
            'only_target_audience' => false,
        ];
    }

    private function jobClass(string $operation): string
    {
        return $operation === 'tweak' ? TweakContentJob::class : GenerateContentJob::class;
    }

    private function baseUrl(): string
    {
        return '/app/'.$this->selectedApp->slug.'/content';
    }

    private function contentUrl(Content $content): string
    {
        return $this->baseUrl().'/'.$content->slug;
    }

    private function formUrl(?Content $content): string
    {
        return $content === null ? $this->baseUrl() : $this->contentUrl($content);
    }
}
