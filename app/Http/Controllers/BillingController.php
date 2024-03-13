<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BillingController extends Controller
{

    /**
     * Handles redirecting to the billing portal.
     */
    public function handleRedirect()
    {
        return Inertia::location(Auth::user()->redirectToBillingPortal(url('/apps')));
    }

}
