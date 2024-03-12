<?php

namespace App\Jobs;

use App\Content\ContentStatus;
use App\Models\Content;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
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
        $this->content->status = ContentStatus::Generating;
        $this->content->save();

        try {
            $generatedContent = $this->generateContent(
                language: 'english',
                writingStyle: 'professional',
                title: $this->content->title,
                keywords: $this->content->keywords,
                targetAudience: $this->content->app->target_audience,
            );

            $this->content->content_md = $generatedContent['content'];
            $this->content->status = ContentStatus::Generated;
        } catch (Exception $error) {
            $this->content->status = ContentStatus::Errored;
        } finally {
            $this->content->save();
        }
    }

    /**
     * Generates the content.
     */
    private function generateContent(string $language, string $title, string $writingStyle, string $targetAudience, array $keywords) {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'],
                ['role' => 'user', 'content' => "I am developing an AI-powered app named RankRover.ai, designed to generate SEO-optimized articles for businesses to help them drive traffic to their website. The app leverages advanced AI to create engaging content that resonates with the target audience and ranks well on search engines.\n\nGiven the context, please generate an article with the following specifications:\n\n- **Language:** $language\n-**Title:** $title\n- **Keywords:** " . implode(', ', $keywords) . " (please incorporate these keywords naturally into the content to optimize for SEO)\n- **Writing Style:** $writingStyle (e.g., professional, casual, informative, persuasive)\n- **Target Audience:** $targetAudience (a brief description of the target audience for a more tailored content creation.)\nThe article should be structured with a clear introduction, body (with subheadings for better readability), and conclusion. Include calls to action where appropriate.\n\nPlease return in the format of json looking like { title, keywords, content } where keywords is an array and content is the content in markdown format. DO NOT wrap the returned json in ```json, just return it raw.\n\nThank you!"]
            ]
        ]);

        return json_decode($response['choices'][0]['message']['content'], true);
    }

}
