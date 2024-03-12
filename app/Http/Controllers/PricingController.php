<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{

    /**
     * Renders the pricing page.
     */
    public function render()
    {
        return Inertia::render('pricing', [
            'subscription_plans' => SubscriptionPlan::query()->get(),
        ]);
    }

}
