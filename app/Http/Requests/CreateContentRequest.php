<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateContentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cluster_id' => [
                'integer',
                Rule::exists('content_clusters', 'id')->where('app_id', $this->route('app')->id),
            ],
            'language' => ['required'],
            'size' => ['required'],
            'format' => ['required'],
            'title' => ['required'],
            'keywords' => ['required', 'array'],
            'only_target_audience' => ['boolean'],
        ];
    }

}
