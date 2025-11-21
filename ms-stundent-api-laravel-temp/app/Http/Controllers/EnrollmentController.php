<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Enrollments",
 *     description="Endpoints para matrículas de estudantes em cursos"
 * )
 */
class EnrollmentController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/enrollments",
     *     summary="Listar matrículas do estudante",
     *     description="Retorna todas as matrículas do estudante autenticado",
     *     operationId="listEnrollments",
     *     tags={"Enrollments"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filtrar por status (pending, approved, rejected)",
     *         required=false,
     *         @OA\Schema(type="string", enum={"pending", "approved", "rejected"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de matrículas"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $student = $request->user();
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            $url = $schoolApiUrl . '/student/enrollments';
            $params = ['student_id' => $student->id];
            
            if ($request->has('status')) {
                $params['status'] = $request->status;
            }

            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($url, $params);

            if (!$response->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao buscar matrículas',
                ], $response->status());
            }

            $data = $response->json();
            return response()->json($data);
        } catch (\Exception $e) {
            Log::error('Erro ao listar matrículas', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar matrículas: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/enrollments",
     *     summary="Matricular-se em um curso",
     *     description="Cria uma nova matrícula para o estudante autenticado",
     *     operationId="createEnrollment",
     *     tags={"Enrollments"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"course_id"},
     *             @OA\Property(property="course_id", type="string", format="uuid", example="uuid"),
     *             @OA\Property(property="admission_exam_id", type="string", format="uuid", example="uuid", description="ID do exame de admissão (opcional)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Matrícula criada com sucesso"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|uuid',
            'admission_exam_id' => 'nullable|uuid',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $student = $request->user();
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->post($schoolApiUrl . '/student/enrollments', [
                'student_id' => $student->id,
                'student_email' => $student->email,
                'student_name' => $student->name,
                'course_id' => $request->course_id,
                'admission_exam_id' => $request->admission_exam_id,
            ]);

            if (!$response->successful()) {
                $errorData = $response->json();
                return response()->json([
                    'status' => 'error',
                    'message' => $errorData['message'] ?? 'Erro ao criar matrícula',
                ], $response->status());
            }

            return response()->json($response->json(), 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar matrícula', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar matrícula: ' . $e->getMessage(),
            ], 500);
        }
    }
}

