<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    /**
     * Renders the home page.
     */
    public function render()
    {
        return Inertia::render('home', [
            'current_users_count' => User::query()->count(),
            'current_content_count' => Content::query()->count(),
            'subscription_plans' => SubscriptionPlan::query()->get(),
        ]);
    }

}
