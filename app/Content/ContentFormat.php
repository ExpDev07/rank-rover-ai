<?php

namespace App\Content;

enum ContentFormat: string
{

    case BlogPost = 'blog_post';
    case GuideAndTutorial = 'how_to_guide_and_tutorial';
    case Faq = 'frequently_asked_questions';
    case Lipsticles = 'lipsticles';

}
