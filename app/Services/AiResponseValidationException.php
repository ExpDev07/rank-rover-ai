<?php

namespace App\Services;

use RuntimeException;

final class AiResponseValidationException extends RuntimeException
{
    public const MESSAGE = 'Content generation failed. Please try again.';

    public function __construct()
    {
        // Deliberately do not retain a provider exception or response payload.
        parent::__construct(self::MESSAGE);
    }
}
