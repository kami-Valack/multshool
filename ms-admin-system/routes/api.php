<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * @OA\Get(
 *     path="/api/health",
 *     summary="Health Check",
 *     description="Verifica se a API está funcionando",
 *     operationId="healthCheck",
 *     tags={"Health"},
 *     @OA\Response(
 *         response=200,
 *         description="API está funcionando",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="ok"),
 *             @OA\Property(property="service", type="string", example="ms-admin-api"),
 *             @OA\Property(property="timestamp", type="string", format="date-time")
 *         )
 *     )
 * )
 */
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'ms-admin-api',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public auth routes (login não requer autenticação)
Route::post('/auth/login', [\App\Http\Controllers\AuthController::class, 'login']);

// Protected routes (require JWT authentication and admin role)
Route::middleware([\App\Http\Middleware\AuthenticateApi::class])->group(function () {
    // Auth routes (registro e logout requerem autenticação)
    Route::post('/auth/register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    /**
     * @OA\Get(
     *     path="/api/me",
     *     summary="Obter perfil do administrador autenticado",
     *     description="Retorna os dados do administrador autenticado",
     *     operationId="getProfile",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil do administrador",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", example="uuid"),
     *                 @OA\Property(property="email", type="string", example="admin@example.com"),
     *                 @OA\Property(property="name", type="string", example="Administrador"),
     *                 @OA\Property(property="role", type="string", example="admin"),
     *                 @OA\Property(property="email_verified", type="boolean", example=true),
     *                 @OA\Property(property="is_active", type="boolean", example=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Acesso negado - apenas administradores"
     *     )
     * )
     */
    Route::get('/me', function (Request $request) {
        $user = $request->user();
        
        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'role' => $user->role,
                'email_verified' => $user->email_verified,
                'is_active' => $user->is_active,
            ],
        ]);
    });

    // School management routes
    Route::get('/schools', [\App\Http\Controllers\SchoolController::class, 'index']);
    Route::get('/schools/{id}', [\App\Http\Controllers\SchoolController::class, 'show']);
    Route::post('/schools/{id}/approve', [\App\Http\Controllers\SchoolController::class, 'approve']);
    Route::post('/schools/{id}/reject', [\App\Http\Controllers\SchoolController::class, 'reject']);

    // TODO: Adicionar rotas para:
    // - Gerenciamento de usuários
    // - Gerenciamento de estudantes
    // - Aprovação/rejeição de documentos
    // - Relatórios e estatísticas
    // - Configurações do sistema
});

