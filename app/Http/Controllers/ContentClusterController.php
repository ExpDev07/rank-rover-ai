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
            targetAudience: $app->target_audience,
            appName: $data['only_target_audience'] ? '' : $app->name,
            appDesc: $data['only_target_audience'] ? '' : $app->description,
            language: $data['language'],
            format: $data['format'],
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
    private function generateRecommendations(string $appName, string $appDesc, string $targetAudience, string $language, string $format, int $amount = 8)
    {
        // the messages
        $messages = [];
        $messages[] = ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'];
        $messages[] = ['role' => 'user', 'content' => "Please recommend $amount amount of SEO content titles, each with its own set of recommended keywords, and using the provided context. If the app name and app description are empty, omit them from the context when recommending. Ensure there is no excessive spacing in the response. Here is the context:\n\n- **App name:** $appName\n- **App description:** $appDesc\n- **Target Audience:** $targetAudience\n- **Language:** $language\n- **Type of content (essay, article, listicle, etc):** $format\n\nPlease return your recommendations in a \"titles\" object as a JSON array of objects in the format of [{\"title\":\"titleString\", \"keywords\":[\"keyword1\", \"keyword2\"]}, { ... }] (this is only the format I want you to return in). Ensure the JSON structure is compact without unnecessary whitespace or padding in keys and values. MAKE SURE TO GENERATE $amount AMOUNT OF TITLES Thank you!"];


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
