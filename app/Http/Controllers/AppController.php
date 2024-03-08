<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class AppController extends Controller
{

    /**
     * Renders the app page.
     */
    public function render(App $app)
    {
        return Inertia::render('app/index', [
            'app' => $app,
            'content' => $app->content,
        ]);
    }

    /**
     * Creates a new app.
     */
    public function submit()
    {
        //
    }

}
