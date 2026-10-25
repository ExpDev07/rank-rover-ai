<?php

namespace App\Services;

use Ahc\Json\Fixer;
use OpenAI\Laravel\Facades\OpenAI;
use Throwable;

class AiTransport
{
    /**
     * Send the caller's original conversation without changing its prompts or order.
     *
     * @param  array<int, array<string, mixed>>  $messages
     * @return array{message: array<string, mixed>, data: mixed}
     *
     * @throws AiResponseValidationException
     */
    public function request(array $messages, bool $jsonMode): array
    {
        $options = ['model' => 'gpt-4-turbo-preview'];

        if ($jsonMode) {
            $options['response_format'] = ['type' => 'json_object'];
        }

        $options['messages'] = $messages;

        try {
            $response = OpenAI::chat()->create($options)->toArray();
            $message = $response['choices'][0]['message'] ?? null;

            if (! is_array($message)
                || ! is_string($message['content'] ?? null)
                || trim($message['content']) === '') {
                throw new AiResponseValidationException;
            }

            // Decode as objects so JSON objects with numeric keys never become lists.
            $data = json_decode((new Fixer)->fix($message['content']), false, 512, JSON_THROW_ON_ERROR);

            return ['message' => $message, 'data' => $data];
        } catch (Throwable) {
            throw new AiResponseValidationException;
        }
    }
}
