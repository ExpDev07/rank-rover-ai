<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'cluster_id' => ['integer'],
            'recommendation_id' => ['integer'],
            'language' => ['required'],
            'title' => ['required'],
            'keywords' => ['required', 'array'],
        ];
    }

}
