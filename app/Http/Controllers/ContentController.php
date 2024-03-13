<?php

namespace App\Http\Controllers;

use App\Content\ContentStatus;
use App\Http\Requests\CreateContentRequest;
use App\Http\Requests\TweakContentRequest;
use App\Jobs\GenerateContentJob;
use App\Jobs\TweakContentJob;
use App\Models\App;
use App\Models\Content;
use App\Models\ContentRevision;
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
            'content' => $app->contents()->latest()->get(),
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

        $content = $app->contents()->create(array_merge($data));

        dispatch(new GenerateContentJob($content));

        return redirect()->to("/app/{$app->slug}/content/{$content->slug}");
    }

    /**
     * Handles retrying generating the content.
     */
    public function handleRetry(App $app, Content $content)
    {
        $content->currentRevision()->dissociate();
        $content->save();

        dispatch(new GenerateContentJob($content));

        return redirect()->to("/app/{$app->slug}/content/{$content->slug}");
    }

    /**
     * Handles tweaking the content.
     */
    public function handleTweak(App $app, Content $content, TweakContentRequest $request)
    {
        $data = $request->validated();

        $revisionToTweak = $content->currentRevision;

        $content->currentRevision()->dissociate();
        $content->save();

        dispatch(new TweakContentJob($revisionToTweak, $data['tweak']));

        return redirect()->to("/app/{$app->slug}/content/{$content->slug}");
    }

}
