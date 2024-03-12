<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\SubscriptionPlan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{

    /**
     * Renders the register page.
     */
    public function render(Request $request)
    {
        return Inertia::render('app/register', [
            'subscription_plan' => $request->has('plan') ? SubscriptionPlan::query()->where('key', $request->get('plan'))->first() : null,
        ]);
    }

    /**
     * Handles the registration.
     */
    public function handleRegister(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::query()->create($data);
        Auth::login($user, true);

        if ($subscriptionPlan = $request->post('subscription_plan')) {
            return redirect()->to("/select-plan/$subscriptionPlan/checkout");
        }

        return redirect()->to('/select-plan');
    }

}
