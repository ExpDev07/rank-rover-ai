<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ApplicationAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_remains_available(): void
    {
        $this->get('/', ['X-Inertia' => 'true'])
            ->assertOk();
    }

    public function test_login_route_is_available_to_guests_and_redirects_authenticated_users(): void
    {
        $this->get('/login', ['X-Inertia' => 'true'])
            ->assertOk();

        $this->actingAs(User::factory()->create())
            ->get('/login')
            ->assertRedirect('/app');
    }

    public function test_authenticated_routes_redirect_guests_to_login(): void
    {
        $this->get('/select-plan')
            ->assertRedirect('/login');
    }

    public function test_subscription_protected_routes_redirect_unsubscribed_users(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/apps')
            ->assertRedirect('/select-plan');
    }

    public function test_subscription_protected_routes_are_available_to_subscribed_users(): void
    {
        $user = User::factory()->create();

        DB::table('subscriptions')->insert([
            'user_id' => $user->id,
            'type' => 'default',
            'stripe_id' => 'sub_test_subscription',
            'stripe_status' => 'active',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($user)
            ->get('/apps', ['X-Inertia' => 'true'])
            ->assertOk();
    }
}
