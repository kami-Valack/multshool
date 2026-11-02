<?php

namespace App\Http\Requests;

use App\Models\Document;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UploadDocumentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // A autorização será feita no controller via middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bi' => [
                'required',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:5120', // 5MB
            ],
            'foto_tipo' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png',
                'max:2048', // 2MB
            ],
            'habilitacao_literaria' => [
                'required',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:5120', // 5MB
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'bi.required' => 'O documento BI é obrigatório.',
            'bi.file' => 'O BI deve ser um arquivo.',
            'bi.mimes' => 'O BI deve ser um arquivo PDF, JPG, JPEG ou PNG.',
            'bi.max' => 'O BI não pode ter mais de 5MB.',

            'foto_tipo.required' => 'A foto tipo passe é obrigatória.',
            'foto_tipo.file' => 'A foto tipo passe deve ser um arquivo.',
            'foto_tipo.mimes' => 'A foto tipo passe deve ser um arquivo JPG, JPEG ou PNG.',
            'foto_tipo.max' => 'A foto tipo passe não pode ter mais de 2MB.',

            'habilitacao_literaria.required' => 'A habilitação literária é obrigatória.',
            'habilitacao_literaria.file' => 'A habilitação literária deve ser um arquivo.',
            'habilitacao_literaria.mimes' => 'A habilitação literária deve ser um arquivo PDF, JPG, JPEG ou PNG.',
            'habilitacao_literaria.max' => 'A habilitação literária não pode ter mais de 5MB.',
        ];
    }
}
