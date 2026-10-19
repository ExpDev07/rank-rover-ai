<?php

namespace Tests\Feature;

use App\Jobs\GenerateContentJob;
use App\Models\App;
use App\Models\Content;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiAndQueueCompatibilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_sanctum_authenticated_users_can_retrieve_their_profile(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $this->getJson('/api/user')
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('email', $user->email);
    }

    public function test_content_generation_job_dispatches_and_serializes(): void
    {
        Queue::fake();

        $app = App::query()->create([
            'user_id' => User::factory()->create()->id,
            'name' => 'Rank Rover',
            'slug' => 'rank-rover',
            'description' => 'SEO content platform',
            'target_audience' => 'Marketing teams',
            'main_language' => 'en',
        ]);

        $content = Content::query()->create([
            'app_id' => $app->id,
            'slug' => 'laravel-upgrade',
            'language' => 'en',
            'format' => 'article',
            'size' => 'short',
            'title' => 'Laravel upgrade',
            'keywords' => ['laravel', 'upgrade'],
        ]);

        GenerateContentJob::dispatch($content);

        Queue::assertPushed(GenerateContentJob::class, function (GenerateContentJob $job): bool {
            return unserialize(serialize($job)) instanceof GenerateContentJob;
        });
    }
}
