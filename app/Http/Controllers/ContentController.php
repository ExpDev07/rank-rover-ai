<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateContentRequest;
use App\Http\Requests\TweakContentRequest;
use App\Jobs\GenerateContentJob;
use App\Jobs\TweakContentJob;
use App\Models\App;
use App\Models\Content;
use App\Models\ContentCluster;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{

    /**
     * Renders the content index page.
     */
    public function renderIndex(App $app, Request $request)
    {
        return Inertia::render('app/content/index', [
            'app' => $app,
            'content' => $app->contents()->latest()->where('content_queued', true)->orWhereHas('currentRevision')->get(),
            'content_cluster' => $request->has('show_cluster') ? ContentCluster::query()->with('contents.currentRevision')->findOrFail($request->integer(('show_cluster'))) : null,
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

        $content = $app->contents()->create($data);

        dispatch(new GenerateContentJob($content));
        $content->content_queued = true;
        $content->save();

        return redirect()->to("/app/{$app->slug}/content/{$content->slug}");
    }


    /**
     * Handles retrying generating the content.
     */
    public function handleWrite(App $app, Content $content)
    {
        $content->currentRevision()->dissociate();
        $content->save();

        dispatch(new GenerateContentJob($content));
        $content->content_queued = true;
        $content->save();

        return redirect()->back();
    }

    /**
     * Handles retrying generating the content.
     */
    public function handleRetry(App $app, Content $content)
    {
        $content->currentRevision()->dissociate();
        $content->save();

        dispatch(new GenerateContentJob($content));
        $content->content_queued = true;
        $content->save();

        return redirect()->back();
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
        $content->content_queued = true;
        $content->save();

        return redirect()->back();
    }

}
