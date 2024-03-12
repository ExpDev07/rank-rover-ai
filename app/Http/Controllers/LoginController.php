<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{

    /**
     * Renders the login page.
     */
    public function render()
    {
        return Inertia::render('app/login');
    }

    /**
     * Handles logging in.
     */
    public function handleLogin(LoginRequest $request)
    {
        $data = $request->validated();

        // Attempt to authenticate the user by their credentials.
        if (! Auth::attempt([ 'email' => $data['email'], 'password' => $data['password'] ], $data['remember_me']))
        {
            abort(503, 'Invalid credentials');
        }

        return redirect()->to('/apps');
    }

}
