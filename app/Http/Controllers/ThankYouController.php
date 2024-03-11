<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ThankYouController extends Controller
{

    /**
     * Renders the thank you page.
     */
    public function render()
    {
        return Inertia::render('app/thank-you');
    }

}
