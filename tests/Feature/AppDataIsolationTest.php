<?php

namespace Tests\Feature;

use App\Content\ContentGenerationStatus;
use App\Jobs\GenerateContentJob;
use App\Jobs\TweakContentJob;
use App\Models\App;
use App\Models\Content;
use App\Models\ContentCluster;
use App\Models\ContentRevision;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Illuminate\Testing\TestResponse;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Resources\Chat;
use OpenAI\Responses\Chat\CreateResponse;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AppDataIsolationTest extends TestCase
{
    use RefreshDatabase;

    private User $owner;
    private User $otherUser;
    private App $selectedApp;
    private App $secondApp;
    private App $foreignApp;
    private Content $selectedContent;
    private Content $secondContent;
    private Content $foreignContent;
    private ContentCluster $selectedCluster;
    private ContentCluster $secondCluster;
    private ContentCluster $foreignCluster;

    protected function setUp(): void
    {
        parent::setUp();

        // Catch both normal queued work and accidental synchronous bus dispatch.
        Bus::fake();
        Queue::fake();
        OpenAI::fake([$this->recommendationResponse()]);

        $this->owner = $this->subscribedUser();
        $this->otherUser = $this->subscribedUser();
        $this->selectedApp = $this->createApp($this->owner, 'Selected');
        $this->secondApp = $this->createApp($this->owner, 'Second');
        $this->foreignApp = $this->createApp($this->otherUser, 'Foreign');

        $this->selectedCluster = $this->createCluster($this->selectedApp);
        $this->secondCluster = $this->createCluster($this->secondApp);
        $this->foreignCluster = $this->createCluster($this->foreignApp);

        $this->selectedContent = $this->createContent($this->selectedApp, 'Selected private article', $this->selectedCluster);
        $this->secondContent = $this->createContent($this->secondApp, 'Second private article', $this->secondCluster);
        $this->foreignContent = $this->createContent($this->foreignApp, 'Foreign private article', $this->foreignCluster);

        foreach ([$this->selectedContent, $this->secondContent, $this->foreignContent] as $content) {
            $this->addGeneratedRevision($content);
        }
    }

    public static function appRoutes(): iterable
    {
        foreach (['app show', 'app update', 'content list', 'content create', 'content show', 'content write', 'content retry', 'content tweak', 'cluster create'] as $operation) {
            yield $operation => [$operation];
        }
    }

    public static function deniedAppRoutes(): iterable
    {
        foreach (self::appRoutes() as $name => [$operation]) {
            yield $name.' with valid input' => [$operation, false];
            if (in_array($operation, ['app update', 'content list', 'content create', 'content tweak', 'cluster create'], true)) {
                yield $name.' with malformed input' => [$operation, true];
            }
        }
    }

    #[DataProvider('appRoutes')]
    public function test_subscribed_owner_can_use_each_app_route(string $operation): void
    {
        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();
        $unrelated = $this->unrelatedAppSnapshot();
        $source = $this->selectedContent->currentRevision;
        $sourceAttributes = $source->getRawOriginal();
        $contentCount = Content::query()->count();
        $clusterCount = ContentCluster::query()->count();

        $response = $this->requestOperation($operation, $this->selectedApp, $this->selectedContent);

        switch ($operation) {
            case 'app show':
                $response->assertOk()
                    ->assertJsonPath('component', 'app/apps/show')
                    ->assertJsonPath('props.app.id', $this->selectedApp->id);
                $this->assertSame([$this->selectedContent->id], array_column($response->json('props.content'), 'id'));
                $this->assertNoSideEffects($before);
                break;
            case 'content list':
                $response->assertOk()
                    ->assertJsonPath('component', 'app/content/index')
                    ->assertJsonPath('props.app.id', $this->selectedApp->id)
                    ->assertJsonPath('props.content_cluster', null);
                $this->assertSame([$this->selectedContent->id], array_column($response->json('props.content'), 'id'));
                $this->assertNoSideEffects($before);
                break;
            case 'content show':
                $response->assertOk()
                    ->assertJsonPath('component', 'app/content/show')
                    ->assertJsonPath('props.app.id', $this->selectedApp->id)
                    ->assertJsonPath('props.content.id', $this->selectedContent->id)
                    ->assertJsonPath('props.content.current_revision.id', $source->id);
                $this->assertNoSideEffects($before);
                break;
            case 'app update':
                $response->assertRedirect($this->appUrl($this->selectedApp))->assertSessionHasNoErrors();
                $this->assertDatabaseHas('apps', [
                    'id' => $this->selectedApp->id,
                    'user_id' => $this->owner->id,
                    ...$this->updatePayload(),
                ]);
                Bus::assertNothingDispatched();
                OpenAI::assertNothingSent();
                break;
            case 'content create':
                $created = $this->selectedApp->contents()->where('title', $this->contentPayload()['title'])->sole();
                $response->assertRedirect($this->contentUrl($this->selectedApp, $created))->assertSessionHasNoErrors();
                $this->assertSame($contentCount + 1, Content::query()->count());
                $this->assertNull($created->cluster_id);
                $this->assertTrue($created->content_queued);
                $this->assertSame($this->contentPayload()['keywords'], $created->keywords);
                Bus::assertDispatched(GenerateContentJob::class, 1);
                Bus::assertNotDispatched(TweakContentJob::class);
                OpenAI::assertNothingSent();
                break;
            case 'content write':
            case 'content retry':
            case 'content tweak':
                $response->assertRedirect($this->appUrl($this->selectedApp))->assertSessionHasNoErrors();
                $this->assertTrue($this->selectedContent->fresh()->content_queued);
                $this->assertNull($this->selectedContent->fresh()->current_revision_id);
                $this->assertSame($sourceAttributes, $source->fresh()->getRawOriginal());
                $this->assertSame($contentCount, Content::query()->count());
                Bus::assertDispatched($operation === 'content tweak' ? TweakContentJob::class : GenerateContentJob::class, 1);
                Bus::assertNotDispatched($operation === 'content tweak' ? GenerateContentJob::class : TweakContentJob::class);
                OpenAI::assertNothingSent();
                break;
            case 'cluster create':
                $cluster = $this->selectedApp->contentClusters()->whereKeyNot($this->selectedCluster->id)->sole();
                $response->assertRedirect($this->appUrl($this->selectedApp).'/content?show_cluster='.$cluster->id)
                    ->assertSessionHasNoErrors();
                $this->assertSame($clusterCount + 1, ContentCluster::query()->count());
                $this->assertSame($contentCount + 2, Content::query()->count());
                $recommendations = $cluster->contents()->orderBy('id')->get();
                $this->assertSame(['Isolation recommendations one', 'Isolation recommendations two'], $recommendations->pluck('title')->all());
                foreach ($recommendations as $content) {
                    $this->assertSame($this->selectedApp->id, $content->app_id);
                    $this->assertSame('en', $content->language);
                    $this->assertSame('article', $content->format->value);
                    $this->assertSame('short', $content->size->value);
                    $this->assertFalse($content->only_target_audience);
                    $this->assertFalse($content->content_queued);
                    $this->assertNull($content->current_revision_id);
                    $this->assertNotEmpty($content->keywords);
                }
                OpenAI::assertSent(Chat::class, 1);
                Bus::assertNothingDispatched();
                break;
        }

        $this->assertSame($unrelated, $this->unrelatedAppSnapshot(), 'An owner workflow changed an unrelated app.');
        Queue::assertNothingPushed();
    }

    #[DataProvider('deniedAppRoutes')]
    public function test_other_subscribed_user_gets_404_before_validation_or_work(string $operation, bool $malformed): void
    {
        $this->actingAs($this->otherUser);
        $before = $this->databaseSnapshot();

        $this->requestOperation($operation, $this->selectedApp, $this->selectedContent, $malformed)
            ->assertNotFound()
            ->assertDontSee($this->selectedApp->description)
            ->assertDontSee($this->selectedContent->title)
            ->assertDontSee($this->selectedContent->currentRevision->content_md);

        $this->assertNoSideEffects($before);
    }

    public static function mismatchedContentRoutes(): iterable
    {
        foreach (['content show', 'content write', 'content retry', 'content tweak'] as $operation) {
            foreach (['same owner', 'another account'] as $scope) {
                yield $operation.' / '.$scope => [$operation, $scope, false];
                if ($operation === 'content tweak') {
                    yield $operation.' / '.$scope.' / malformed tweak' => [$operation, $scope, true];
                }
            }
        }
    }

    #[DataProvider('mismatchedContentRoutes')]
    public function test_nested_content_must_belong_to_selected_app(string $operation, string $scope, bool $malformed): void
    {
        $this->actingAs($this->owner);
        $content = $scope === 'same owner' ? $this->secondContent : $this->foreignContent;
        $before = $this->databaseSnapshot();

        $this->requestOperation($operation, $this->selectedApp, $content, $malformed)
            ->assertNotFound()
            ->assertDontSee($content->title)
            ->assertDontSee($content->currentRevision->content_md);

        $this->assertNoSideEffects($before);
    }

    public function test_content_list_includes_only_selected_apps_queued_or_revised_content(): void
    {
        $queued = $this->createContent($this->selectedApp, 'Selected queued');
        $queued->update(['content_queued' => true]);
        $queuedAndRevised = $this->createContent($this->selectedApp, 'Selected queued and revised');
        $queuedAndRevised->update(['content_queued' => true]);
        $this->addGeneratedRevision($queuedAndRevised);
        $this->createContent($this->selectedApp, 'Selected unwritten');

        foreach ([$this->secondApp, $this->foreignApp] as $app) {
            $this->createContent($app, $app->name.' queued')->update(['content_queued' => true]);
            $this->createContent($app, $app->name.' unwritten');
            $both = $this->createContent($app, $app->name.' queued and revised');
            $both->update(['content_queued' => true]);
            $this->addGeneratedRevision($both);
        }

        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();
        $response = $this->get($this->appUrl($this->selectedApp).'/content', ['X-Inertia' => 'true']);

        $response->assertOk()->assertJsonPath('props.app.id', $this->selectedApp->id);
        $this->assertEqualsCanonicalizing(
            [$this->selectedContent->id, $queued->id, $queuedAndRevised->id],
            array_column($response->json('props.content'), 'id'),
        );
        foreach ($response->json('props.content') as $content) {
            $this->assertSame($this->selectedApp->id, $content['app_id']);
        }
        $this->assertNoSideEffects($before);
    }

    public function test_valid_selected_cluster_returns_its_own_contents_including_unwritten_recommendations(): void
    {
        $unwritten = $this->createContent($this->selectedApp, 'Selected cluster unwritten', $this->selectedCluster);
        $this->createContent($this->selectedApp, 'Outside selected cluster');
        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();

        $response = $this->get($this->appUrl($this->selectedApp).'/content?show_cluster='.$this->selectedCluster->id, ['X-Inertia' => 'true']);

        $response->assertOk()
            ->assertJsonPath('component', 'app/content/index')
            ->assertJsonPath('props.content_cluster.id', $this->selectedCluster->id)
            ->assertJsonPath('props.content_cluster.app_id', $this->selectedApp->id);
        $this->assertEqualsCanonicalizing(
            [$this->selectedContent->id, $unwritten->id],
            array_column($response->json('props.content_cluster.contents'), 'id'),
        );
        $this->assertSame([$this->selectedContent->id], array_column($response->json('props.content'), 'id'));
        $this->assertNoSideEffects($before);
    }

    public static function invalidClusters(): iterable
    {
        yield 'missing cluster' => ['missing'];
        yield 'cluster in another app of same owner' => ['same owner'];
        yield 'cluster in another account' => ['another account'];
    }

    #[DataProvider('invalidClusters')]
    public function test_missing_or_foreign_selected_cluster_returns_404(string $scope): void
    {
        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();

        $this->get($this->appUrl($this->selectedApp).'/content?show_cluster='.$this->clusterIdFor($scope), ['X-Inertia' => 'true'])
            ->assertNotFound()
            ->assertDontSee($this->secondContent->title)
            ->assertDontSee($this->foreignContent->title);

        $this->assertNoSideEffects($before);
    }

    public static function validClusterAssociations(): iterable
    {
        yield 'cluster omitted' => [false];
        yield 'cluster belongs to selected app' => [true];
    }

    #[DataProvider('validClusterAssociations')]
    public function test_content_creation_accepts_omitted_or_selected_app_cluster(bool $withCluster): void
    {
        $this->actingAs($this->owner);
        $unrelated = $this->unrelatedAppSnapshot();
        $count = Content::query()->count();
        $payload = $this->contentPayload();
        if ($withCluster) {
            $payload['cluster_id'] = $this->selectedCluster->id;
        }

        $response = $this->postJson($this->appUrl($this->selectedApp).'/content', $payload);

        $content = $this->selectedApp->contents()->where('title', $payload['title'])->sole();
        $response->assertRedirect($this->contentUrl($this->selectedApp, $content))->assertSessionHasNoErrors();
        $this->assertSame($count + 1, Content::query()->count());
        $this->assertSame($withCluster ? $this->selectedCluster->id : null, $content->cluster_id);
        $this->assertTrue($content->content_queued);
        $this->assertNull($content->current_revision_id);
        Bus::assertDispatched(GenerateContentJob::class, 1);
        Bus::assertNotDispatched(TweakContentJob::class);
        Queue::assertNothingPushed();
        OpenAI::assertNothingSent();
        $this->assertSame($unrelated, $this->unrelatedAppSnapshot());
    }

    #[DataProvider('invalidClusters')]
    public function test_invalid_submitted_cluster_has_validation_error_without_writes_or_jobs(string $scope): void
    {
        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();

        $this->postJson($this->appUrl($this->selectedApp).'/content', [
            ...$this->contentPayload(),
            'cluster_id' => $this->clusterIdFor($scope),
        ])->assertUnprocessable()->assertJsonValidationErrors('cluster_id');

        $this->assertNoSideEffects($before);
    }

    #[DataProvider('invalidClusters')]
    public function test_invalid_cluster_form_submission_returns_cluster_session_error(string $scope): void
    {
        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();
        $url = $this->appUrl($this->selectedApp).'/content';

        $this->from($url)->post($url, [
            ...$this->contentPayload(),
            'cluster_id' => $this->clusterIdFor($scope),
        ])->assertRedirect($url)->assertSessionHasErrors('cluster_id');

        $this->assertNoSideEffects($before);
    }

    public function test_guest_app_page_redirects_to_login_without_side_effects(): void
    {
        $before = $this->databaseSnapshot();

        $this->get($this->appUrl($this->selectedApp))->assertRedirect('/login');

        $this->assertNoSideEffects($before);
    }

    public function test_unsubscribed_user_is_redirected_from_app_list_to_plan_selection(): void
    {
        $this->actingAs(User::factory()->create());
        $before = $this->databaseSnapshot();

        $this->get('/apps')->assertRedirect('/select-plan');

        $this->assertNoSideEffects($before);
    }

    #[DataProvider('appRoutes')]
    public function test_unsubscribed_owner_cannot_bypass_subscription_gate_on_app_routes(string $operation): void
    {
        DB::table('subscriptions')->where('user_id', $this->owner->id)->delete();
        $this->actingAs($this->owner);
        $before = $this->databaseSnapshot();

        $this->requestOperation($operation, $this->selectedApp, $this->selectedContent)->assertRedirect('/select-plan');

        $this->assertNoSideEffects($before);
    }

    private function requestOperation(string $operation, App $app, Content $content, bool $malformed = false): TestResponse
    {
        $base = $this->appUrl($app);
        $contentUrl = $this->contentUrl($app, $content);
        [$method, $url, $payload] = match ($operation) {
            'app show' => ['GET', $base, []],
            'app update' => ['PUT', $base, $this->updatePayload()],
            'content list' => ['GET', $base.'/content'.($malformed ? '?show_cluster=missing' : ''), []],
            'content create' => ['POST', $base.'/content', $this->contentPayload()],
            'content show' => ['GET', $contentUrl, []],
            'content write' => ['POST', $contentUrl.'/write', []],
            'content retry' => ['POST', $contentUrl.'/retry', []],
            'content tweak' => ['POST', $contentUrl.'/tweak', ['tweak' => 'Add a short practical example.']],
            'cluster create' => ['POST', $base.'/content-cluster', $this->clusterPayload()],
        };

        if ($method === 'GET') {
            return $this->get($url, ['X-Inertia' => 'true']);
        }

        if ($malformed) {
            $payload = match ($operation) {
                'content create' => ['cluster_id' => ['invalid'], 'keywords' => 'not-an-array'],
                'content tweak' => ['tweak' => []],
                default => [],
            };
        }

        return $this->withHeader('Referer', $base)->json($method, $url, $payload);
    }

    private function subscribedUser(): User
    {
        $user = User::factory()->create();
        DB::table('subscriptions')->insert([
            'user_id' => $user->id,
            'type' => 'default',
            'stripe_id' => 'sub_isolation_'.$user->id,
            'stripe_status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $user;
    }

    private function createApp(User $owner, string $name): App
    {
        return $owner->apps()->create([
            'name' => $name.' isolation app',
            'description' => $name.' confidential application description',
            'target_audience' => $name.' marketing teams',
            'main_language' => 'en',
        ]);
    }

    private function createCluster(App $app): ContentCluster
    {
        return $app->contentClusters()->create(['language' => 'en']);
    }

    private function createContent(App $app, string $title, ?ContentCluster $cluster = null): Content
    {
        return $app->contents()->create([
            ...$this->contentPayload(),
            'title' => $title,
            'cluster_id' => $cluster?->id,
            'content_queued' => false,
        ]);
    }

    private function addGeneratedRevision(Content $content): ContentRevision
    {
        $article = $content->title.' confidential generated body';
        $revision = $content->revisions()->create([
            'status' => ContentGenerationStatus::Generated,
            'content_md' => $article,
            'messages' => [
                ['role' => 'system', 'content' => 'You assist with SEO content creation.'],
                ['role' => 'user', 'content' => 'Write '.$content->title],
                ['role' => 'assistant', 'content' => json_encode(['content' => $article], JSON_THROW_ON_ERROR)],
            ],
        ]);
        $content->currentRevision()->associate($revision);
        $content->save();

        return $revision;
    }

    private function contentPayload(): array
    {
        return [
            'language' => 'en',
            'size' => 'short',
            'format' => 'article',
            'title' => 'New owner isolation article',
            'keywords' => ['isolation', 'ownership'],
            'only_target_audience' => false,
        ];
    }

    private function clusterPayload(): array
    {
        return [
            'language' => 'en',
            'size' => 'short',
            'format' => 'article',
            'only_target_audience' => false,
        ];
    }

    private function updatePayload(): array
    {
        return [
            'name' => 'Updated selected isolation app',
            'description' => 'Updated owner description',
            'target_audience' => 'Updated owner audience',
        ];
    }

    private function recommendationResponse(): CreateResponse
    {
        // v0.21 supports typed response fixtures and resource-level request assertions.
        return CreateResponse::fake([
            'choices' => [[
                'index' => 0,
                'message' => [
                    'role' => 'assistant',
                    'content' => json_encode(['titles' => [
                        ['title' => 'Isolation recommendations one', 'keywords' => ['app isolation', 'ownership']],
                        ['title' => 'Isolation recommendations two', 'keywords' => ['content boundaries']],
                    ]], JSON_THROW_ON_ERROR),
                ],
                'finish_reason' => 'stop',
            ]],
        ]);
    }

    private function clusterIdFor(string $scope): int
    {
        return match ($scope) {
            'missing' => (int) ContentCluster::query()->max('id') + 1000,
            'same owner' => $this->secondCluster->id,
            'another account' => $this->foreignCluster->id,
        };
    }

    private function appUrl(App $app): string
    {
        return '/app/'.$app->slug;
    }

    private function contentUrl(App $app, Content $content): string
    {
        return $this->appUrl($app).'/content/'.$content->slug;
    }

    private function databaseSnapshot(): array
    {
        $snapshot = [];
        foreach (['users', 'subscriptions', 'subscription_items', 'apps', 'content_clusters', 'contents', 'content_revisions', 'content_recommendations', 'jobs', 'failed_jobs'] as $table) {
            $snapshot[$table] = DB::table($table)->orderBy('id')->get()->map(fn ($row) => (array) $row)->all();
        }

        return $snapshot;
    }

    private function unrelatedAppSnapshot(): array
    {
        $appIds = [$this->secondApp->id, $this->foreignApp->id];
        $contentIds = DB::table('contents')->whereIn('app_id', $appIds)->pluck('id');
        $clusterIds = DB::table('content_clusters')->whereIn('app_id', $appIds)->pluck('id');
        $queries = [
            'apps' => DB::table('apps')->whereIn('id', $appIds),
            'contents' => DB::table('contents')->whereIn('app_id', $appIds),
            'content_clusters' => DB::table('content_clusters')->whereIn('app_id', $appIds),
            'content_revisions' => DB::table('content_revisions')->whereIn('content_id', $contentIds),
            'content_recommendations' => DB::table('content_recommendations')->whereIn('cluster_id', $clusterIds),
        ];
        $snapshot = [];
        foreach ($queries as $table => $query) {
            $snapshot[$table] = $query->orderBy('id')->get()->map(fn ($row) => (array) $row)->all();
        }

        return $snapshot;
    }

    private function assertNoSideEffects(array $before): void
    {
        $this->assertSame($before, $this->databaseSnapshot(), 'A denied or read-only request changed persisted records.');
        Bus::assertNothingDispatched();
        Queue::assertNothingPushed();
        OpenAI::assertNothingSent();
    }
}
