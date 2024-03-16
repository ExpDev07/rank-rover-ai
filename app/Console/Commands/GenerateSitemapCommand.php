<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemapCommand extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates the sitemap.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Sitemap::create()
            ->add(Url::create('/'))
            ->add(Url::create('/pricing'))
            ->add(Url::create('/register'))
            ->add(Url::create('/login'))
            ->add(Url::create('/blog/achieving-higher-organic-traffic-insights-from-rankroverai'))
            ->add(Url::create('/blog/from-keywords-to-content-how-rankroverai-powers-your-seo-strategy'))
            ->add(Url::create('/blog/how-rankroverai-is-revolutionizing-seo-content-creation'))
            ->writeToFile(public_path('sitemap.xml'));
    }

}
