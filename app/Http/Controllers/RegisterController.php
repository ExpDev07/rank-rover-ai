<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{

    /**
     * Renders the register page.
     */
    public function render()
    {
        return Inertia::render('app/register');
    }

}
