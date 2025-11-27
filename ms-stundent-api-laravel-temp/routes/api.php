<?php

use Illuminate\Http\Request;
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
 *     description="Verifica se a API está funcionando",
 *     operationId="healthCheck",
 *     tags={"Health"},
 *     @OA\Response(
 *         response=200,
 *         description="API está funcionando",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="ok"),
 *             @OA\Property(property="service", type="string", example="ms-student-api"),
 *             @OA\Property(property="timestamp", type="string", format="date-time")
 *         )
 *     )
 * )
 */
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'ms-student-api',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Public routes - Instituições (não requerem autenticação)
Route::get('/institutions', [\App\Http\Controllers\InstitutionController::class, 'index']);
Route::get('/institutions/{id}', [\App\Http\Controllers\InstitutionController::class, 'show']);

// Public routes - Cursos (não requerem autenticação)
Route::get('/courses/{id}', [\App\Http\Controllers\CourseController::class, 'show']);

// Protected routes (require JWT authentication)
Route::middleware([\App\Http\Middleware\AuthenticateApi::class])->group(function () {
    /**
     * @OA\Get(
     *     path="/api/me",
     *     summary="Obter perfil do usuário autenticado",
     *     description="Retorna os dados do estudante autenticado, incluindo status dos documentos",
     *     operationId="getProfile",
     *     tags={"Profile"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Perfil do usuário",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="user",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", example="uuid"),
     *                 @OA\Property(property="student_id", type="string", example="ST2025000001"),
     *                 @OA\Property(property="email", type="string", example="teste@example.com"),
     *                 @OA\Property(property="name", type="string", example="Nome do Estudante"),
     *                 @OA\Property(property="role", type="string", example="student"),
     *                 @OA\Property(property="email_verified", type="boolean", example=true),
     *                 @OA\Property(property="is_active", type="boolean", example=true),
     *                 @OA\Property(property="has_all_documents", type="boolean", example=false),
     *                 @OA\Property(property="first_access", type="boolean", example=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Token não fornecido ou inválido")
     *         )
     *     )
     * )
     */
    Route::get('/me', function (Request $request) {
        $user = $request->user();
        $hasAllDocuments = $user->hasAllRequiredDocuments();
        
        return response()->json([
            'status' => 'success',
            'user' => [
                'id' => $user->id,
                'student_id' => $user->student_id,
                'email' => $user->email,
                'name' => $user->name,
                'role' => $user->role,
                'email_verified' => $user->email_verified,
                'is_active' => $user->is_active,
                'has_all_documents' => $hasAllDocuments,
                'first_access' => !$hasAllDocuments,
            ],
        ]);
    });

    // Student Documents routes
    Route::prefix('documents')->group(function () {
        Route::get('/check-first-access', [\App\Http\Controllers\StudentDocumentController::class, 'checkFirstAccess']);
        Route::post('/upload', [\App\Http\Controllers\StudentDocumentController::class, 'upload']);
        Route::get('/', [\App\Http\Controllers\StudentDocumentController::class, 'index']);
    });
    
    // Matrículas
    Route::apiResource('enrollments', \App\Http\Controllers\EnrollmentController::class)->only(['index', 'store']);
    
    // Inscrições em Exames
    Route::apiResource('exam-registrations', \App\Http\Controllers\ExamRegistrationController::class)->only(['index', 'store']);

    // Propinas/Fees
    Route::get('/fees', [\App\Http\Controllers\FeeController::class, 'index']);

    // TODO: Adicionar rotas para:
    // - GET /api/grades
    // - GET /api/scholarships
    // - POST /api/scholarships
});

// API Secret routes (for inter-service communication)
Route::middleware([\App\Http\Middleware\AuthenticateApiSecret::class])->prefix('student')->group(function () {
    Route::get('/{studentId}/grades', [\App\Http\Controllers\StudentGradeController::class, 'getGradesByStudentId']);
    Route::get('/{studentId}/fees', [\App\Http\Controllers\FeeController::class, 'getByStudentId']);
    Route::post('/{studentId}/fees/bulk', [\App\Http\Controllers\FeeController::class, 'bulkCreate']);
});

