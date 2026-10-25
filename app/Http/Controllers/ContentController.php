<?php

namespace App\Http\Controllers;

use App\Actions\DispatchContent;
use App\Content\ContentGenerationStatus;
use App\Http\Requests\CreateContentRequest;
use App\Http\Requests\TweakContentRequest;
use App\Jobs\GenerateContentJob;
use App\Jobs\TweakContentJob;
use App\Models\App;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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
            'content' => $app->contents()->latest()->where(function ($query) {
                $query->where('content_queued', true)->orWhereHas('currentRevision');
            })->get(),
            'content_cluster' => $request->has('show_cluster') ? $app->contentClusters()->with('contents.currentRevision')->findOrFail($request->integer('show_cluster')) : null,
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
    public function handleCreate(App $app, CreateContentRequest $request, DispatchContent $dispatchContent)
    {
        $data = $request->validated();

        $content = $app->contents()->create($data);

        $dispatchContent->execute($content, new GenerateContentJob($content));

        return redirect()->to("/app/{$app->slug}/content/{$content->slug}");
    }


    /**
     * Handles retrying generating the content.
     */
    public function handleWrite(App $app, Content $content, DispatchContent $dispatchContent)
    {
        $dispatchContent->execute($content, new GenerateContentJob($content));

        return redirect()->back();
    }

    /**
     * Handles retrying generating the content.
     */
    public function handleRetry(App $app, Content $content, DispatchContent $dispatchContent)
    {
        $dispatchContent->execute($content, new GenerateContentJob($content));

        return redirect()->back();
    }

    /**
     * Handles tweaking the content.
     */
    public function handleTweak(App $app, Content $content, TweakContentRequest $request, DispatchContent $dispatchContent)
    {
        $data = $request->validated();

        $revisionToTweak = $content->currentRevision;

        if ($revisionToTweak?->status !== ContentGenerationStatus::Generated) {
            throw ValidationException::withMessages([
                'generation' => 'A generated current revision is required before tweaking content.',
            ]);
        }

        $dispatchContent->execute($content, new TweakContentJob($revisionToTweak, $data['tweak']));

        return redirect()->back();
    }

}
