<?php

namespace App\Content;

enum ContentStatus: string
{

    case Generating = 'generating';
    case Generated = 'generated';
    case Error = 'error';

}
