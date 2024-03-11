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
        return Inertia::render('app/register');
    }

    /**
     * Handles the registration.
     */
    public function handleRegister(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::query()->create($data);
        Auth::login($user, true);

        return redirect()->to('/select-plan');
    }

}
