<?php

namespace App\Http\Controllers;

use App\Services\SchoolApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(
 *     name="Schools",
 *     description="Gerenciamento de escolas (aprovação/rejeição)"
 * )
 */
class SchoolController extends Controller
{
    public function __construct(
        private SchoolApiService $schoolApiService
    ) {
    }

    /**
     * @OA\Get(
     *     path="/api/schools",
     *     summary="Listar todas as escolas",
     *     description="Retorna lista de todas as escolas com seus status (pending, approved, rejected)",
     *     operationId="listSchools",
     *     tags={"Schools"},
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
     *         description="Lista de escolas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="schools",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
     *                     @OA\Property(property="name", type="string", example="Escola Exemplo"),
     *                     @OA\Property(property="email", type="string", example="escola@example.com"),
     *                     @OA\Property(property="status", type="string", enum={"pending", "approved", "rejected"}, example="pending"),
     *                     @OA\Property(property="email_verified", type="boolean", example=true),
     *                     @OA\Property(property="is_active", type="boolean", example=true),
     *                     @OA\Property(property="rejection_reason", type="string", nullable=true, example=null),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-10T12:00:00Z"),
     *                     @OA\Property(property="approved_at", type="string", format="date-time", nullable=true, example=null)
     *                 )
     *             ),
     *             @OA\Property(property="total", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erro ao conectar com o serviço de escolas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Erro ao conectar com o serviço de escolas")
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
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');
        $result = $this->schoolApiService->listSchools($status);

        if ($result['status'] === 'error') {
            return response()->json($result, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json($result);
    }

    /**
     * @OA\Get(
     *     path="/api/schools/{id}",
     *     summary="Obter detalhes de uma escola",
     *     description="Retorna os detalhes completos de uma escola",
     *     operationId="getSchool",
     *     tags={"Schools"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes da escola",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="school",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
     *                 @OA\Property(property="name", type="string", example="Escola Exemplo"),
     *                 @OA\Property(property="email", type="string", example="escola@example.com"),
     *                 @OA\Property(property="status", type="string", enum={"pending", "approved", "rejected"}, example="pending"),
     *                 @OA\Property(property="email_verified", type="boolean", example=true),
     *                 @OA\Property(property="is_active", type="boolean", example=true),
     *                 @OA\Property(property="rejection_reason", type="string", nullable=true, example=null),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-11-10T12:00:00Z"),
     *                 @OA\Property(property="approved_at", type="string", format="date-time", nullable=true, example=null)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Escola não encontrada",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Escola não encontrada")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erro ao conectar com o serviço de escolas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Erro ao conectar com o serviço de escolas")
     *         )
     *     )
     * )
     */
    public function show(string $id): JsonResponse
    {
        $result = $this->schoolApiService->getSchool($id);

        if ($result['status'] === 'error') {
            $statusCode = isset($result['message']) && str_contains($result['message'], 'não encontrada')
                ? Response::HTTP_NOT_FOUND
                : Response::HTTP_INTERNAL_SERVER_ERROR;
            return response()->json($result, $statusCode);
        }

        return response()->json($result);
    }

    /**
     * @OA\Post(
     *     path="/api/schools/{id}/approve",
     *     summary="Aprovar uma escola",
     *     description="Aprova uma escola, permitindo que ela acesse o sistema",
     *     operationId="approveSchool",
     *     tags={"Schools"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Escola aprovada com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Escola aprovada com sucesso"),
     *             @OA\Property(
     *                 property="school",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
     *                 @OA\Property(property="name", type="string", example="Escola Exemplo"),
     *                 @OA\Property(property="email", type="string", example="escola@example.com"),
     *                 @OA\Property(property="status", type="string", example="approved"),
     *                 @OA\Property(property="approved_at", type="string", format="date-time", example="2025-11-10T12:00:00Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Escola não encontrada",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Escola não encontrada")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erro ao conectar com o serviço de escolas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Erro ao conectar com o serviço de escolas")
     *         )
     *     )
     * )
     */
    public function approve(string $id): JsonResponse
    {
        $result = $this->schoolApiService->approveSchool($id);

        if ($result['status'] === 'error') {
            $statusCode = isset($result['message']) && str_contains($result['message'], 'não encontrada')
                ? Response::HTTP_NOT_FOUND
                : Response::HTTP_INTERNAL_SERVER_ERROR;
            return response()->json($result, $statusCode);
        }

        return response()->json($result);
    }

    /**
     * @OA\Post(
     *     path="/api/schools/{id}/reject",
     *     summary="Rejeitar uma escola",
     *     description="Rejeita uma escola, impedindo que ela acesse o sistema",
     *     operationId="rejectSchool",
     *     tags={"Schools"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="reason", type="string", example="Documentação incompleta")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Escola rejeitada com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Escola rejeitada com sucesso"),
     *             @OA\Property(
     *                 property="school",
     *                 type="object",
     *                 @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
     *                 @OA\Property(property="name", type="string", example="Escola Exemplo"),
     *                 @OA\Property(property="email", type="string", example="escola@example.com"),
     *                 @OA\Property(property="status", type="string", example="rejected"),
     *                 @OA\Property(property="rejection_reason", type="string", nullable=true, example="Documentação incompleta")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Escola não encontrada",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Escola não encontrada")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erro ao conectar com o serviço de escolas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Erro ao conectar com o serviço de escolas")
     *         )
     *     )
     * )
     */
    public function reject(Request $request, string $id): JsonResponse
    {
        $reason = $request->input('reason');
        $result = $this->schoolApiService->rejectSchool($id, $reason);

        if ($result['status'] === 'error') {
            $statusCode = isset($result['message']) && str_contains($result['message'], 'não encontrada')
                ? Response::HTTP_NOT_FOUND
                : Response::HTTP_INTERNAL_SERVER_ERROR;
            return response()->json($result, $statusCode);
        }

        return response()->json($result);
    }
}

