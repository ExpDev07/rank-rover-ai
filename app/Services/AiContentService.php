<?php

namespace App\Services;

use stdClass;

class AiContentService
{
    public function __construct(private AiTransport $transport) {}

    /**
     * Use JSON mode for initial generation, and omit it for tweaks.
     * Resolve this service in handle(), rather than serializing it into a job.
     *
     * @param  array<int, array<string, mixed>>  $messages
     * @return array{content: string, messages: array<int, array<string, mixed>>}
     *
     * @throws AiResponseValidationException
     */
    public function article(array $messages, bool $jsonMode): array
    {
        $response = $this->transport->request($messages, $jsonMode);
        $article = $response['data'];

        if (! $article instanceof stdClass || ! $this->nonblankString($article->content ?? null)) {
            throw new AiResponseValidationException;
        }

        $messages[] = $response['message'];

        return ['content' => $article->content, 'messages' => $messages];
    }

    /**
     * Use JSON mode for recommendations. Validate every entry before returning any.
     * Only these whitelisted fields may be passed to persistence.
     *
     * @param  array<int, array<string, mixed>>  $messages
     * @return list<array{title: string, keywords: list<string>}>
     *
     * @throws AiResponseValidationException
     */
    public function recommendations(array $messages, bool $jsonMode): array
    {
        $data = $this->transport->request($messages, $jsonMode)['data'];

        if (! $data instanceof stdClass || ! $this->nonemptyList($data->titles ?? null)) {
            throw new AiResponseValidationException;
        }

        $recommendations = [];

        foreach ($data->titles as $recommendation) {
            if (! $recommendation instanceof stdClass
                || ! $this->nonblankString($recommendation->title ?? null)
                || ! $this->nonemptyList($recommendation->keywords ?? null)) {
                throw new AiResponseValidationException;
            }

            foreach ($recommendation->keywords as $keyword) {
                if (! $this->nonblankString($keyword)) {
                    throw new AiResponseValidationException;
                }
            }

            $recommendations[] = [
                'title' => $recommendation->title,
                'keywords' => $recommendation->keywords,
            ];
        }

        return $recommendations;
    }

    private function nonblankString(mixed $value): bool
    {
        return is_string($value) && trim($value) !== '';
    }

    private function nonemptyList(mixed $value): bool
    {
        return is_array($value) && $value !== [] && array_is_list($value);
    }
}
