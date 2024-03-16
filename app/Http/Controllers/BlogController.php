<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\YamlFrontMatter\YamlFrontMatter;

class BlogController extends Controller
{

    /**
     * Renders the blog index.
     */
    public function renderIndex()
    {
        return redirect()->to('/');
    }

    /**
     * Renders the blog show.
     */
    public function renderShow(string $slug)
    {
        if (! Storage::exists("/blog/$slug.md"))
        {
            return redirect()->to('/blog');
        }

        $article = YamlFrontMatter::parse(Storage::read("/blog/$slug.md"));

        return Inertia::render('blog/show', [
            'title' => $article->matter('title'),
            'description' => $article->matter('description'),
            'keywords' => explode(', ', $article->matter('keywords')),
            'content_md' =>$article->body(),
        ]);
    }

}
