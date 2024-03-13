<?php

namespace App\Jobs;

use Ahc\Json\Fixer;
use App\Content\ContentGenerationStatus;
use App\Content\ContentStatus;
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

        try {
            $generatedContent = $this->generateContent(
                writingStyle: 'professional',
                appName: $this->content->app->name,
                appDesc: $this->content->app->desc,
                language: $this->content->language,
                targetAudience: $this->content->app->target_audience,
                title: $this->content->title,
                keywords: $this->content->keywords,
            );
            $revision->content_md = $generatedContent['message_content_md']['content'];
            $revision->messages = $generatedContent['messages'];
            $revision->status = ContentGenerationStatus::Generated;
        } catch (Exception $error) {
            $revision->status = ContentGenerationStatus::Errored;
            $revision->status_text = $error->getMessage();
        } finally {
            $revision->save();
        }
    }

    /**
     * Generates the content.
     */
    private function generateContent(string $appName, $appDesc, string $language, string $title, string $writingStyle, string $targetAudience, array $keywords)
    {
        // the messages
        $messages = [];
        $messages[] = ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'];
        $messages[] = ['role' => 'user', 'content' => "I am creating $appName, description: $appDesc.\n\nGiven the context, please generate an article with the following specifications:\n\n- **Language:** $language\n-**Title:** $title\n- **Keywords:** " . implode(', ', $keywords) . " (please incorporate these keywords naturally into the content to optimize for SEO)\n- **Writing Style:** $writingStyle (e.g., professional, casual, informative, persuasive)\n- **Target Audience:** $targetAudience (a brief description of the target audience for a more tailored content creation.)\nThe article should be structured with a clear introduction, body (with subheadings for better readability), and conclusion. Include calls to action where appropriate.\n\nPlease return in the format of json where it looks like { title, keywords, content } where keywords is an array and content is the content in markdown format (do not include # title in content). DO NOT wrap the returned json in ```json, just return it raw and make sure that it is valid.\n\nThank you!"];


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
