<?php

namespace App\Actions;

use App\Jobs\GenerateContentJob;
use App\Jobs\TweakContentJob;
use App\Models\Content;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Validation\ValidationException;
use Throwable;

class DispatchContent
{
    public function __construct(private Dispatcher $dispatcher) {}

    public function execute(Content $content, GenerateContentJob|TweakContentJob $job): void
    {
        // Include database defaults on newly created content in the snapshot.
        $content->refresh();
        $previous = [
            'content_queued' => $content->content_queued,
            'current_revision_id' => $content->current_revision_id,
        ];
        $connection = $content->getConnection();

        $connection->transaction(function () use ($connection, $content, $job, $previous): void {
            $content->content_queued = true;
            $content->currentRevision()->dissociate();
            $content->save();

            // Register inside the transaction so an enclosing rollback also cancels
            // dispatch. Even sync jobs must wait for the outermost commit.
            $connection->afterCommit(function () use ($content, $job, $previous): void {
                try {
                    // Dispatch directly: PendingDispatch defers errors to destruction.
                    $this->dispatcher->dispatch($job);
                } catch (Throwable) {
                    // Only restore dispatch state; never delete content or revisions.
                    $content->newQuery()->whereKey($content->getKey())->update($previous);

                    throw ValidationException::withMessages([
                        'generation' => 'Content generation failed. Please try again.',
                    ]);
                }

                // A synchronous job owns the terminal state. Do not save $content here.
            });
        });
    }
}
