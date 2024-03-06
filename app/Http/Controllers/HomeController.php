<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    /**
     * Renders the home page.
     */
    public function render()
    {
        return Inertia::render('home');
    }

}
