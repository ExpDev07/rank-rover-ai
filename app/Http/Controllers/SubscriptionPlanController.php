<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionPlanController extends Controller
{

    /**
     * Renders the subscription plans.
     */
    public function render()
    {
        return Inertia::render('app/select-plan', [
            'subscription_plans' => SubscriptionPlan::query()->get(),
        ]);
    }

    /**
     * Handles checking out the subscription plan.
     */
    public function handleCheckout(Request $request, SubscriptionPlan $plan)
    {
        $subscription = $request->user()->newSubscription($plan->key, $plan->stripe_id);
        $checkout = $subscription->checkout([
            'success_url' => url('/thank-you'),
            'cancel_url' => url('/select-plan'),
        ]);

        return Inertia::location($checkout->redirect());
    }

}
