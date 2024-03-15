<?php

namespace App\Jobs;

use Ahc\Json\Fixer;
use App\Content\ContentGenerationStatus;
use App\Models\ContentRevision;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;

class TweakContentJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * The revision to tweak.
     */
    private ContentRevision $revisionToTweak;

    /**
     * The tweak to make.
     */
    private string $tweak;

    /**
     * Create a new job instance.
     */
    public function __construct(ContentRevision $revisionToTweak, string $tweak)
    {
        $this->revisionToTweak = $revisionToTweak;
        $this->tweak = $tweak;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // get content
        $content = $this->revisionToTweak->content;

        // create new revision
        $newRevision = $content->revisions()->create(['parent_id' => $this->revisionToTweak->id, 'messages' => []]);
        $content->currentRevision()->associate($newRevision);
        $content->save();

        // set revision status to generating.
        $newRevision->status = ContentGenerationStatus::Generating;
        $newRevision->save();

        try {
            $generatedContent = $this->generateContent(
                tweak: $this->tweak,
            );

            $newRevision->content_md = $generatedContent['message_content_md']['content'];
            $newRevision->messages = $generatedContent['messages'];
            $newRevision->status = ContentGenerationStatus::Generated;
        } catch (Exception $error) {
            $newRevision->status = ContentGenerationStatus::Errored;
            $newRevision->status_text = $error->getMessage();
        } finally {
            $content->content_queued = true;
            $content->save();
            $newRevision->save();
        }
    }

    /**
     * Generates the content.
     */
    private function generateContent(string $tweak)
    {
        // the messages
        $messages = $this->revisionToTweak->messages;
        $messages[] = [
            'role' => 'user',
            'content' => "Please make the following tweak to the content: \"$tweak\". DO NOT change the way you return ANY of the format. Return in the exact same format as you did before, only change the actual content (article).",
        ];

        // send to openai
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4-turbo-preview',
            'messages' => $messages,
        ]);

        // keep track of new message
        $messages[] = $response['choices'][0]['message'];

        Log::info($response->toArray());

        return [
            'messages' => $messages,
            'message_content_md' => json_decode((new Fixer)->fix($response['choices'][0]['message']['content']), true),
        ];
    }


}
