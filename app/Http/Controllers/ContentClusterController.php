<?php

namespace App\Http\Controllers;

use Ahc\Json\Fixer;
use App\Http\Requests\CreateContentClusterRequest;
use App\Models\App;
use App\Models\ContentCluster;
use Illuminate\Http\Request;
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

        $cluster = $app->contentClusters()->create();

        // create recommendations if wanted
        if ($request->boolean('create_recommendations'))
        {
            return $this->handleCreateRecommendations($app, $cluster);
        }

        return back()->with([
            'content_cluster' => $cluster,
        ]);
    }

    /**
     * Handles creating content recommendations for the cluster.
     */
    public function handleCreateRecommendations(App $app, ContentCluster $cluster) {
        $generatedRecommendations = $this->generateRecommendations(
            $app->name,
            $app->description,
            $app->target_audience,
            'english'
        )['recommendations'];

        $clusterRecommendations = $cluster->recommendations()->createMany($generatedRecommendations);

        return back()->with([
            'app' => $app,
            'content_cluster' => $cluster,
            'content_cluster_recommendations' => $clusterRecommendations,
        ]);
    }

    /**
     * Generates the content.
     */
    private function generateRecommendations(string $appName, string $appDesc, string $targetAudience, string $language, int $amount = 5)
    {
        // the messages
        $messages = [];
        $messages[] = ['role' => 'system', 'content' => 'You are a highly skilled AI trained to assist with SEO content creation.'];
        $messages[] = ['role' => 'user', 'content' => "Please generate $amount titles for SEO content with keywords also for the following app:\n\n- **App name:** $appName\n- **App description:** $appDesc\n- **Target Audience:** $targetAudience\n- **Language:** $language\n\nPlease return in the format of json where it looks like [{ title, keywords }, ...] where title is a string and keywords is an array. Do not wrap it in ```json, just return it as raw text. MAKE SURE that the returned json is correct format!\n\nThank you!"];


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
            'recommendations' => json_decode((new Fixer)->fix($response['choices'][0]['message']['content']), true),
        ];
    }

}
