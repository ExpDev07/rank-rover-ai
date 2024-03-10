<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateContentRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class ContentController extends Controller
{

    /**
     * Renders the content index page.
     */
    public function renderIndex()
    {
        return Inertia::render('app/content/index');
    }

    /**
     * Renders the content page.
     */
    public function renderContent()
    {
        $content = $this->generateContent(
            language: 'english',
            title: 'How SEO can drive organic traffic to your app',
            writingStyle: 'academic',
            targetAudience: 'small businesses that wish to gain more organic traffic',
            keywords: ['seo', 'organic traffic', 'backlinking'],
        );

        return Inertia::render('app/content/show', [
            'content' => $content,
        ]);
    }

    /**
     * Handles submission.
     */
    public function submit(CreateContentRequest $request)
    {
        $content = $this->generateContent(
            language: 'english',
            title: '',
            writingStyle: '',
            targetAudience: '',
            keywords: [],
        );

        return Inertia::render('app/index', [
            'article' => $content,
        ]);
    }

    /**
     * Recommends a title for the content.
     */
    private function recommendTitle(string $appDescription)
    {

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
