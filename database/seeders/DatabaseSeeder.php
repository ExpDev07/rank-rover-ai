<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // users
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // subscription plans
        SubscriptionPlan::query()->create([
            'stripe_id' => 'price_1OtF96IOt83de95k38Nfiy7w',
            'stripe_id_prod' => 'price_1Ov4btIOt83de95kVn7F1Z6k',
            'key' => 'basic_monthly',
            'name' => 'Basic',
            'price' => '3999',
            'popular' => false,
            'description' => 'Essential features you need to get started.',
            'features' => [
                'Create one app',
                'Generate 5x content daily',
                'AI recommended keywords',
                'Tweak your content with AI',
                '24/7 support',
            ],
        ]);
        SubscriptionPlan::query()->create([
            'stripe_id' => 'price_1OtF6TIOt83de95kSBPQkEim',
            'stripe_id_prod' => 'price_1Ov4e3IOt83de95kkonHYFhF',
            'key' => 'pro_monthly',
            'name' => 'Pro',
            'price' => '5999',
            'popular' => true,
            'description' => 'Perfect for owners of small & medium businesses.',
            'features' => [
                'Create 10x apps',
                'Generate 50x content daily',
                'AI recommended keywords',
                'Tweak your content with AI',
                '24/7 support',
            ],
        ]);
        SubscriptionPlan::query()->create([
            'stripe_id' => 'price_1OtF9hIOt83de95k276O2dRx',
            'stripe_id_prod' => 'price_1Ov4eaIOt83de95k6j24m1dA',
            'key' => 'enterprise_monthly',
            'name' => 'Enterprise',
            'price' => '9999',
            'popular' => false,
            'description' => 'Dedicated support and infrastructure to fit your needs.',
            'features' => [
                'Create 50x apps',
                'Generate 100x content daily',
                'AI recommended keywords',
                'Tweak your content with AI',
                '24/7 support',
                'Priority feature requests',
            ]
        ]);
    }
}
