<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class ContentController extends Controller
{

    /**
     * Renders the app page.
     */
    public function render()
    {
        $content = $this->generateContent(
            language: 'norwegian',
            writingStyle: 'academic',
            targetAudience: 'people aged 16-50 with an STD that would like to anonomously notify their previous sexual partners that they tested positive',
            keywords: ['std', 'std testing', 'notify partner of std'],
        );

        return Inertia::render('app/index', [
            'article' => $content,
        ]);
    }

    /**
     * Handles submission.
     */
    public function submit()
    {
        //
    }

    /**
     * Recommends keywords to write about from the app description.
     */
    private function recommendKeywords(string $appDescription)
    {

    }

    /**
     * Generates the content.
     */
    private function generateContent(string $language, string $writingStyle, string $targetAudience, array $keywords) {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'],
                ['role' => 'user', 'content' => "I am developing an AI-powered app named RankRover.ai, designed to generate SEO-optimized articles for businesses to help them drive traffic to their website. The app leverages advanced AI to create engaging content that resonates with the target audience and ranks well on search engines.\n\nGiven the context, please generate an article with the following specifications:\n\n- **Language:** $language\n- **Keywords:** " . implode(', ', $keywords) . " (please incorporate these keywords naturally into the content to optimize for SEO)\n- **Writing Style:** $writingStyle (e.g., professional, casual, informative, persuasive)\n- **Target Audience:** $targetAudience (a brief description of the target audience for a more tailored content creation.)\nThe article should be structured with a clear introduction, body (with subheadings for better readability), and conclusion. Include calls to action where appropriate.\n\nPlease return in the format of json looking like { title, keywords, content } where keywords is an array and content is the content in markdown format. DO NOT wrap the returned json in ```json, just return it raw.\n\nThank you!"]
            ]
        ]);

        return json_decode($response['choices'][0]['message']['content'], true);
    }

}
