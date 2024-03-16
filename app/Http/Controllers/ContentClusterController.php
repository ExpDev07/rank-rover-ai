<?php

namespace App\Http\Controllers;

use Ahc\Json\Fixer;
use App\Http\Requests\CreateContentClusterRequest;
use App\Models\App;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;

class ContentClusterController extends Controller
{

    /**
     * Handles creating a content cluster.
     */
    public function handleCreate(App $app, CreateContentClusterRequest $request)
    {
        $data = $request->validated();

        $cluster = $app->contentClusters()->create($data);

        $generatedRecommendations = $this->generateRecommendations(
            $app->name,
            $app->description,
            $app->target_audience,
            $data['language'],
        )['recommendations']['titles'];

        $cluster->contents()->createMany(collect($generatedRecommendations)->map(fn ($r) => [
            ...$r,
            'app_id' => $app->id,
            'language' => $data['language'],
            'size' => $data['size'],
            'format' => $data['format'],
            'only_target_audience' => $data['only_target_audience'] ?? false,
            'content_queued' => false,
        ]));

        return redirect()->to("/app/{$app->slug}/content?show_cluster={$cluster->id}");
    }

    /**
     * Generates the content.
     */
    private function generateRecommendations(string $appName, string $appDesc, string $targetAudience, string $language, int $amount = 8)
    {
        // the messages
        $messages = [];
        $messages[] = ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'];
        $messages[] = ['role' => 'user', 'content' => "Please generate $amount titles for SEO content with keywords also for the following app:\n\n- **App name:** $appName\n- **App description:** $appDesc\n- **Target Audience:** $targetAudience\n- **Language:** $language\n\nPlease return it as an json array of objects in the format of { title, keywords } where title is a string and keywords is an array. Make sure to include the keywords, and that the json keys are not padded with spacing!\n\nThank you!"];


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
            'recommendations' => json_decode((new Fixer)->fix($response['choices'][0]['message']['content']), true),
        ];
    }

}
