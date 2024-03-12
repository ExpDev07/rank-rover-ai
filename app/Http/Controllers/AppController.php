<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAppRequest;
use App\Http\Requests\UpdateAppRequest;
use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'apps' => Auth::user()->apps()->get(),
        ]);
    }

    /**
     * Renders the app page.
     */
    public function renderShow(App $app)
    {
        return Inertia::render('app/apps/show', [
            'app' => $app,
            'content' => $app->contents,
        ]);
    }

    /**
     * Creates a new app.
     */
    public function handleCreate(CreateAppRequest $request)
    {
        $data = $request->validated();

        $app = Auth::user()->apps()->create($data);

        return redirect()->to("/app/{$app->slug}");
    }

    /**
     * Handles updating the app.
     */
    public function handleUpdate(App $app, UpdateAppRequest $request)
    {
        $data = $request->validated();

        $app->update($data);

        return redirect()->back();
    }

}
