<?php

namespace App\Jobs;

use Ahc\Json\Fixer;
use App\Content\ContentGenerationStatus;
use App\Content\ContentStatus;
use App\Events\ContentRevisionStatusChangedEvent;
use App\Models\Content;
use App\Models\ContentRevision;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;

class GenerateContentJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * The content.
     */
    private Content $content;

    /**
     * Create a new job instance.
     */
    public function __construct(Content $content)
    {
        $this->content = $content;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // create revision
        $revision = $this->content->revisions()->create(['messages' => []]);
        $this->content->currentRevision()->associate($revision);
        $this->content->save();

        // set revision status to generating.
        $revision->status = ContentGenerationStatus::Generating;
        $revision->save();
        broadcast(new ContentRevisionStatusChangedEvent($revision));

        try {
            $generatedContent = $this->generateContent(
                language: $this->content->language,
                format: $this->content->format,
                size: $this->content->size,
                title: $this->content->title,
                keywords: $this->content->keywords,
                targetAudience: $this->content->app->target_audience,
                appName: $this->content->only_target_audience ? '' : $this->content->app->name,
                appDesc: $this->content->only_target_audience ? '' : $this->content->app->description,
            );
            $revision->content_md = $generatedContent['message_content_md']['content'];
            $revision->messages = $generatedContent['messages'];
            $revision->status = ContentGenerationStatus::Generated;
        } catch (Exception $error) {
            $revision->content_md = null;
            $revision->status = ContentGenerationStatus::Errored;
            $revision->status_text = $error->getMessage();
        } finally {
            $revision->save();
            $this->content->content_queued = false;
            $this->content->save();
            broadcast(new ContentRevisionStatusChangedEvent($revision));
        }
    }

    /**
     * Generates the content.
     */
    private function generateContent(string $appName, string $appDesc, string $language, string $format, string $size, string $targetAudience, string $title, array $keywords)
    {
        // build app context
        $appContextInstruction = "";
        if ($appName && $appDesc) {
            $appContextInstruction = "I am creating $appName, description: $appDesc.\n\n";
        }

        $instruction = "Given the context, please generate SEO optimized content for the provided keywords with the following specifications:\n\n";
        $instruction .= "- **Language:** $language\n";
        $instruction .= "- **Title:** $title\n";
        $instruction .= "- **Keywords:** " . implode(', ', $keywords) . " (please incorporate these keywords naturally into the content to optimize for SEO)\n";
        $instruction .= "- **Target Audience:** $targetAudience\n";
        $instruction .= "- **Type of content (essay, article, listicle, etc):** $format\n";
        $instruction .= "- **Length of content:** $size (short (300 words), medium (1000 words), long (1500 words), extra long (3000 words))\n\n";
        $instruction .= "The content should be well and professionally written, with human touches. Depending on the type of content, it should be structured accordingly\n\n";
        $instruction .= "Please return in the format of JSON where it looks like {\"title\": \"\", \"content\": \"\"} where content is the content in markdown format (do not include # title in content). Please ensure that the markdown (md) format is valid and correct.\n\n";
        $instruction .= "Thank you!";

        // create prompt
        $fullPrompt = $appContextInstruction . $instruction;

        // the messages
        $messages = [];
        $messages[] = ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'];
        $messages[] = ['role' => 'user', 'content' => $fullPrompt];


        // send to openai
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4-turbo-preview',
            'response_format' => ['type' => 'json_object'],
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
