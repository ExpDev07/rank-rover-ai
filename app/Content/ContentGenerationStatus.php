<?php

namespace App\Content;

enum ContentGenerationStatus: string
{

    case Idle = 'idle';
    case Generating = 'generating';
    case Generated = 'generated';
    case Errored = 'errored';

}
