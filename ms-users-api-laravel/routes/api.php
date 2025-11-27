<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * @OA\Get(
 *     path="/api/health",
 *     summary="Health Check",
 *     description="Verifica se a API está funcionando corretamente",
 *     operationId="healthCheck",
 *     tags={"Health"},
 *     @OA\Response(
 *         response=200,
 *         description="API está funcionando",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="ok"),
 *             @OA\Property(property="timestamp", type="string", format="date-time", example="2025-01-15T10:30:00Z")
 *         )
 *     )
 * )
 */
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public routes (no authentication required)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/refresh-token', [AuthController::class, 'refreshToken']);
Route::post('/auth/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/auth/password-reset/request', [AuthController::class, 'forgotPassword']);
Route::post('/auth/password-reset/reset', [AuthController::class, 'resetPassword']);
Route::post('/auth/register-school', [AuthController::class, 'registerSchool']); // Sistema separado para escolas
Route::post('/auth/register-teacher', [AuthController::class, 'registerTeacher']); // Sistema separado para docentes

// Protected routes (authentication required)
Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout-all', [AuthController::class, 'logoutAll']);
    Route::get('/auth/me', [AuthController::class, 'me']);
});

// Logout (usa refresh token, não precisa de auth)
Route::post('/auth/logout', [AuthController::class, 'logout']);

// Admin routes (require API Secret)
// Estas rotas são usadas por outros microserviços (ms-shocoll-api) para gerenciar professores
Route::middleware([\App\Http\Middleware\AuthenticateApiSecret::class])->prefix('admin')->group(function () {
    Route::apiResource('teachers', \App\Http\Controllers\Admin\TeacherController::class);
});

