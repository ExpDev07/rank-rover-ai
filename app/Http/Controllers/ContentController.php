<?php

namespace App\Http\Controllers;

use App\Content\ContentStatus;
use App\Http\Requests\CreateContentRequest;
use App\Jobs\GenerateContentJob;
use App\Models\App;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class ContentController extends Controller
{

    /**
     * Renders the content index page.
     */
    public function renderIndex(App $app)
    {
        return Inertia::render('app/content/index', [
            'app' => $app,
            'content' => $app->contents,
        ]);
    }

    /**
     * Renders the content page.
     */
    public function renderShow(App $app, Content $content)
    {
        return Inertia::render('app/content/show', [
            'app' => $app,
            'content' => $content,
        ]);
    }

    /**
     * Handles creating content.
     */
    public function handleCreate(App $app, CreateContentRequest $request)
    {
        $data = $request->validated();

        $content = $app->contents()->create(array_merge($data, [
            'status' => ContentStatus::Idle,
        ]));

        dispatch(new GenerateContentJob($content));

        return redirect()->to("/app/{$app->slug}/content");
    }

    /**
     * Recommends a title for the content.
     */
    private function recommendTitle(string $appDescription)
    {

    }

    /**
     * Recommends keywords to write about from the app description.
     */
    private function recommendKeywords(string $appDescription)
    {

    }

}
