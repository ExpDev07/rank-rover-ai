<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class AppController extends Controller
{

    /**
     * Renders the app page.
     */
    public function render()
    {
        $article = $this->generateArticle(
            language: 'norwegian',
            writingStyle: 'academic',
            targetAudience: 'people aged 16-50 with an STD that would like to anonomously notify their previous sexual partners that they tested positive',
            returnFormat: 'json',
            keywords: ['std', 'std testing', 'notify partner of std'],
        );

        return Inertia::render('app/index', [
            'article' => $article,
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
     * Generates the article.
     */
    private function generateArticle(string $language, string $writingStyle, string $targetAudience, string $returnFormat, array $keywords) {
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'],
                ['role' => 'user', 'content' => "I am developing an AI-powered app named RankRover.ai, designed to generate SEO-optimized articles for businesses to help them drive traffic to their website. The app leverages advanced AI to create engaging content that resonates with the target audience and ranks well on search engines.\n\nGiven the context, please generate an article with the following specifications:\n\n- **Language:** $language\n- **Keywords:** " . implode(', ', $keywords) . " (please incorporate these keywords naturally into the content to optimize for SEO)\n- **Writing Style:** $writingStyle (e.g., professional, casual, informative, persuasive)\n- **Target Audience:** $targetAudience (a brief description of the target audience for a more tailored content creation.)\nThe article should be structured with a clear introduction, body (with subheadings for better readability), and conclusion. Include calls to action where appropriate.\n\nPlease format the output as $returnFormat. If the format is semantic HTML, ensure to use appropriate headings, paragraphs, and semantic tags for SEO. If the format is JSON, structure the content with fields for the title and paragraphs with their headings if any.\n\nThank you!"]
            ]
        ]);

        return $response['choices'][0]['message']['content'];
    }

}
