<?php

namespace App\Http\Controllers\Concerns;

use App\Models\ActivityLog;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait SchoolOpsHelpers
{
    /**
     * Valida o request; em caso de falha devolve 422 no formato padrão da API.
     */
    protected function validated(Request $request, array $rules): array
    {
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            throw new HttpResponseException(response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422));
        }

        return $validator->validated();
    }

    /**
     * Regista uma entrada no log de atividade da escola.
     */
    protected function logActivity(Request $request, string $action, string $entityType, ?string $entityId = null, ?array $meta = null): void
    {
        $school = $request->user();

        ActivityLog::create([
            'school_id' => $school->id,
            'actor_id' => $school->id,
            'actor_name' => $school->name ?? $school->email ?? null,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'meta' => $meta,
            'ip' => $request->ip(),
        ]);
    }
}
