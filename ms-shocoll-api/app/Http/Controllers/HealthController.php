<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(
 *     name="Health",
 *     description="Endpoints de verificação de saúde da API"
 * )
 */
class HealthController extends Controller
{
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
     *             @OA\Property(property="service", type="string", example="ms-school-api"),
     *             @OA\Property(property="timestamp", type="string", format="date-time")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'service' => 'ms-school-api',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}

