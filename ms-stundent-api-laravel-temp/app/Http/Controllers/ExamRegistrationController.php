<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Exam Registrations",
 *     description="Endpoints para inscrições de estudantes em exames de admissão"
 * )
 */
class ExamRegistrationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/exam-registrations",
     *     summary="Listar inscrições em exames do estudante",
     *     description="Retorna todas as inscrições em exames do estudante autenticado",
     *     operationId="listExamRegistrations",
     *     tags={"Exam Registrations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de inscrições em exames"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $student = $request->user();
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($schoolApiUrl . '/student/exam-registrations', [
                'student_id' => $student->id,
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao buscar inscrições',
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            Log::error('Erro ao listar inscrições em exames', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar inscrições: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/exam-registrations",
     *     summary="Inscrever-se em um exame de admissão",
     *     description="Cria uma nova inscrição em exame para o estudante autenticado",
     *     operationId="createExamRegistration",
     *     tags={"Exam Registrations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"admission_exam_id"},
     *             @OA\Property(property="admission_exam_id", type="string", format="uuid", example="uuid")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Inscrição criada com sucesso"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'admission_exam_id' => 'required|uuid',
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
            ])->post($schoolApiUrl . '/student/exam-registrations', [
                'student_id' => $student->id,
                'student_email' => $student->email,
                'student_name' => $student->name,
                'admission_exam_id' => $request->admission_exam_id,
            ]);

            if (!$response->successful()) {
                $errorData = $response->json();
                return response()->json([
                    'status' => 'error',
                    'message' => $errorData['message'] ?? 'Erro ao criar inscrição',
                ], $response->status());
            }

            return response()->json($response->json(), 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar inscrição em exame', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar inscrição: ' . $e->getMessage(),
            ], 500);
        }
    }
}

