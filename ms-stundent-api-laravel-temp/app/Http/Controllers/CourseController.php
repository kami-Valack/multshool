<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses/{id}",
     *     summary="Obter detalhes de um curso",
     *     description="Retorna os detalhes completos de um curso, incluindo disciplinas e exames de admissão",
     *     operationId="getCourse",
     *     tags={"Courses"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="include_subjects",
     *         in="query",
     *         description="Incluir disciplinas do curso",
     *         required=false,
     *         @OA\Schema(type="boolean", default=false)
     *     ),
     *     @OA\Parameter(
     *         name="include_exams",
     *         in="query",
     *         description="Incluir exames de admissão do curso",
     *         required=false,
     *         @OA\Schema(type="boolean", default=false)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do curso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Curso não encontrado"
     *     )
     * )
     */
    public function show(Request $request, string $id): JsonResponse
    {
        try {
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            // Buscar detalhes do curso
            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($schoolApiUrl . '/admin/courses/' . $id);

            if (!$response->successful()) {
                if ($response->status() === 404) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Curso não encontrado',
                    ], 404);
                }

                Log::error('Erro ao buscar curso', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao buscar curso',
                ], 500);
            }

            $data = $response->json();
            $course = $data['course'] ?? $data;

            // Buscar disciplinas se solicitado
            if ($request->boolean('include_subjects', false)) {
                try {
                    // Buscar disciplinas pela rota admin (pública com API Secret)
                    $subjectsResponse = Http::withHeaders([
                        'X-API-Secret' => $apiSecret,
                    ])->get($schoolApiUrl . '/admin/courses/' . $id . '/subjects');

                    if ($subjectsResponse->successful()) {
                        $subjectsData = $subjectsResponse->json();
                        $course['subjects'] = $subjectsData['subjects'] ?? $subjectsData['data'] ?? [];
                    } else {
                        Log::warning('Erro ao buscar disciplinas do curso', [
                            'course_id' => $id,
                            'status' => $subjectsResponse->status(),
                            'body' => $subjectsResponse->body(),
                        ]);
                        $course['subjects'] = [];
                    }
                } catch (\Exception $e) {
                    Log::warning('Exceção ao buscar disciplinas do curso', [
                        'course_id' => $id,
                        'error' => $e->getMessage(),
                    ]);
                    $course['subjects'] = [];
                }
            }

            // Buscar exames de admissão se solicitado
            if ($request->boolean('include_exams', false)) {
                try {
                    $examsResponse = Http::withHeaders([
                        'X-API-Secret' => $apiSecret,
                    ])->get($schoolApiUrl . '/admin/courses/' . $id . '/admission-exams');

                    if ($examsResponse->successful()) {
                        $examsData = $examsResponse->json();
                        $course['admission_exams'] = $examsData['exams'] ?? [];
                    }
                } catch (\Exception $e) {
                    Log::warning('Erro ao buscar exames de admissão do curso', [
                        'course_id' => $id,
                        'error' => $e->getMessage(),
                    ]);
                    $course['admission_exams'] = [];
                }
            }

            return response()->json([
                'status' => 'success',
                'course' => $course,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar curso', [
                'id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar curso',
            ], 500);
        }
    }
}

