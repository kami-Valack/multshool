<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * @OA\Tag(
 *     name="Institutions",
 *     description="Endpoints para listar instituições de ensino"
 * )
 */
class InstitutionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/institutions",
     *     summary="Listar instituições de ensino",
     *     description="Retorna lista de instituições aprovadas, com opção de filtrar por tipo (superior ou médio)",
     *     operationId="listInstitutions",
     *     tags={"Institutions"},
     *     @OA\Parameter(
     *         name="institution_type",
     *         in="query",
     *         description="Filtrar por tipo de instituição (superior, medio)",
     *         required=false,
     *         @OA\Schema(type="string", enum={"superior", "medio"})
     *     ),
     *     @OA\Parameter(
     *         name="include_courses",
     *         in="query",
     *         description="Incluir cursos das instituições",
     *         required=false,
     *         @OA\Schema(type="boolean", default=false)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de instituições",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="institutions",
     *                 type="array",
     *                 @OA\Items(type="object")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erro ao buscar instituições"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            // Construir URL com filtros
            $url = $schoolApiUrl . '/admin/schools';
            $params = ['status' => 'approved'];
            
            if ($request->has('institution_type')) {
                $params['institution_type'] = $request->institution_type;
            }

            // Fazer requisição para ms-shocoll-api
            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($url, $params);

            if (!$response->successful()) {
                Log::error('Erro ao buscar instituições', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao buscar instituições',
                ], 500);
            }

            $data = $response->json();
            $institutions = $data['schools'] ?? [];

            // Se solicitado, buscar cursos para cada instituição
            if ($request->boolean('include_courses')) {
                foreach ($institutions as &$institution) {
                    try {
                        $coursesResponse = Http::withHeaders([
                            'X-API-Secret' => $apiSecret,
                        ])->get($schoolApiUrl . '/admin/schools/' . $institution['id'] . '/courses');

                        if ($coursesResponse->successful()) {
                            $coursesData = $coursesResponse->json();
                            $institution['courses'] = $coursesData['courses'] ?? [];
                        }
                    } catch (\Exception $e) {
                        Log::warning('Erro ao buscar cursos da instituição', [
                            'institution_id' => $institution['id'],
                            'error' => $e->getMessage(),
                        ]);
                        $institution['courses'] = [];
                    }
                }
            }

            return response()->json([
                'status' => 'success',
                'institutions' => $institutions,
                'total' => count($institutions),
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao listar instituições', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar instituições: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/institutions/{id}",
     *     summary="Obter detalhes de uma instituição",
     *     description="Retorna os detalhes completos de uma instituição, incluindo cursos e exames de admissão",
     *     operationId="getInstitution",
     *     tags={"Institutions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="include_courses",
     *         in="query",
     *         description="Incluir cursos da instituição",
     *         required=false,
     *         @OA\Schema(type="boolean", default=true)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes da instituição"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Instituição não encontrada"
     *     )
     * )
     */
    public function show(Request $request, string $id): JsonResponse
    {
        try {
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));

            // Buscar detalhes da instituição
            $response = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($schoolApiUrl . '/admin/schools/' . $id);

            if (!$response->successful()) {
                if ($response->status() === 404) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Instituição não encontrada',
                    ], 404);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao buscar instituição',
                ], 500);
            }

            $data = $response->json();
            $institution = $data['school'] ?? $data;

            // Buscar cursos se solicitado (padrão: true)
            if ($request->boolean('include_courses', true)) {
                try {
                    $coursesResponse = Http::withHeaders([
                        'X-API-Secret' => $apiSecret,
                    ])->get($schoolApiUrl . '/admin/schools/' . $id . '/courses');

                    if ($coursesResponse->successful()) {
                        $coursesData = $coursesResponse->json();
                        $institution['courses'] = $coursesData['courses'] ?? [];
                        
                        // Para cada curso, buscar exames de admissão
                        foreach ($institution['courses'] as &$course) {
                            try {
                                $examsResponse = Http::withHeaders([
                                    'X-API-Secret' => $apiSecret,
                                ])->get($schoolApiUrl . '/admin/courses/' . $course['id'] . '/admission-exams');

                                if ($examsResponse->successful()) {
                                    $examsData = $examsResponse->json();
                                    $course['admission_exams'] = $examsData['exams'] ?? [];
                                }
                            } catch (\Exception $e) {
                                Log::warning('Erro ao buscar exames do curso', [
                                    'course_id' => $course['id'],
                                    'error' => $e->getMessage(),
                                ]);
                                $course['admission_exams'] = [];
                            }
                        }
                    }
                } catch (\Exception $e) {
                    Log::warning('Erro ao buscar cursos da instituição', [
                        'institution_id' => $id,
                        'error' => $e->getMessage(),
                    ]);
                    $institution['courses'] = [];
                }
            }

            return response()->json([
                'status' => 'success',
                'institution' => $institution,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar instituição', [
                'institution_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar instituição: ' . $e->getMessage(),
            ], 500);
        }
    }
}


