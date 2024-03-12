<?php

namespace App\Content;

enum ContentStatus: string
{

    case Idle = 'idle';
    case Generating = 'generating';
    case Generated = 'generated';
    case Errored = 'errored';

}
