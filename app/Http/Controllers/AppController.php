<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class AppController extends Controller
{

    /**
     * Renders the app index page.
     */
    public function renderIndex()
    {
        return Inertia::render('app/apps/index', [
            'apps' => App::query()->get(),
        ]);
    }

    /**
     * Renders the app page.
     */
    public function renderShow(App $app)
    {
        return Inertia::render('app/apps/show', [
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
