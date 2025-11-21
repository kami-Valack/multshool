<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RefreshTokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'refreshToken' => ['required', 'string', 'size:64'],
        ];
    }

    public function messages(): array
    {
        return [
            'refreshToken.required' => 'O refresh token é obrigatório.',
            'refreshToken.size' => 'O refresh token deve ter 64 caracteres.',
        ];
    }
}

