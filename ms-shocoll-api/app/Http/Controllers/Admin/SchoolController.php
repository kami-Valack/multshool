<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(
 *     name="Admin Schools",
 *     description="Endpoints administrativos para gerenciamento de escolas (requer API Secret)"
 * )
 */
class SchoolController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/admin/schools",
     *     summary="Listar todas as escolas",
     *     description="Retorna lista de todas as escolas com seus status",
     *     operationId="listSchools",
     *     tags={"Admin Schools"},
     *     security={{"apiSecret":{}}},
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
     *                     @OA\Property(property="id", type="string", example="uuid"),
     *                     @OA\Property(property="name", type="string", example="Escola Exemplo"),
     *                     @OA\Property(property="email", type="string", example="escola@example.com"),
     *                     @OA\Property(property="status", type="string", example="pending"),
     *                     @OA\Property(property="email_verified", type="boolean", example=true),
     *                     @OA\Property(property="created_at", type="string", format="date-time"),
     *                     @OA\Property(property="approved_at", type="string", format="date-time", nullable=true)
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::where('role', User::ROLE_SCHOOL);
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('institution_type')) {
            $query->where('institution_type', $request->institution_type);
        }
        
        $schools = $query->orderBy('created_at', 'desc')->get()->map(function ($school) {
            return [
                'id' => $school->id,
                'name' => $school->name,
                'email' => $school->email,
                'status' => $school->status,
                'email_verified' => $school->email_verified,
                'is_active' => $school->is_active,
                'rejection_reason' => $school->rejection_reason,
                'institution_type' => $school->institution_type,
                'created_at' => $school->created_at->toIso8601String(),
                'approved_at' => $school->approved_at?->toIso8601String(),
            ];
        });
        
        return response()->json([
            'status' => 'success',
            'schools' => $schools,
            'total' => $schools->count(),
        ]);
    }
    
    /**
     * @OA\Get(
     *     path="/api/admin/schools/{id}",
     *     summary="Obter detalhes de uma escola",
     *     description="Retorna os detalhes completos de uma escola",
     *     operationId="getSchool",
     *     tags={"Admin Schools"},
     *     security={{"apiSecret":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes da escola"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Escola não encontrada"
     *     )
     * )
     */
    public function show(string $id): JsonResponse
    {
        $school = User::where('id', $id)
            ->where('role', User::ROLE_SCHOOL)
            ->first();
        
        if (!$school) {
            return response()->json([
                'status' => 'error',
                'message' => 'Escola não encontrada',
            ], Response::HTTP_NOT_FOUND);
        }
        
        return response()->json([
            'status' => 'success',
            'school' => [
                'id' => $school->id,
                'name' => $school->name,
                'email' => $school->email,
                'status' => $school->status,
                'email_verified' => $school->email_verified,
                'is_active' => $school->is_active,
                'rejection_reason' => $school->rejection_reason,
                'institution_type' => $school->institution_type,
                'created_at' => $school->created_at->toIso8601String(),
                'approved_at' => $school->approved_at?->toIso8601String(),
            ],
        ]);
    }
    
    /**
     * @OA\Get(
     *     path="/api/admin/schools/{id}/courses",
     *     summary="Listar cursos de uma escola",
     *     description="Retorna todos os cursos de uma escola específica",
     *     operationId="getSchoolCourses",
     *     tags={"Admin Schools"},
     *     security={{"apiSecret":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de cursos"
     *     )
     * )
     */
    public function courses(string $id): JsonResponse
    {
        $school = User::where('id', $id)
            ->where('role', User::ROLE_SCHOOL)
            ->first();
        
        if (!$school) {
            return response()->json([
                'status' => 'error',
                'message' => 'Escola não encontrada',
            ], Response::HTTP_NOT_FOUND);
        }
        
        $courses = Course::where('school_id', $school->id)
            ->with('admissionExams')
            ->get();
        
        return response()->json([
            'status' => 'success',
            'courses' => $courses,
        ]);
    }
    
    /**
     * @OA\Post(
     *     path="/api/admin/schools/{id}/approve",
     *     summary="Aprovar uma escola",
     *     description="Aprova uma escola, permitindo que ela acesse o sistema",
     *     operationId="approveSchool",
     *     tags={"Admin Schools"},
     *     security={{"apiSecret":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Escola aprovada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Escola não encontrada"
     *     )
     * )
     */
    public function approve(string $id): JsonResponse
    {
        $school = User::where('id', $id)
            ->where('role', User::ROLE_SCHOOL)
            ->first();
        
        if (!$school) {
            return response()->json([
                'status' => 'error',
                'message' => 'Escola não encontrada',
            ], Response::HTTP_NOT_FOUND);
        }
        
        $school->approve();
        
        Log::info('Escola aprovada via API Admin', [
            'school_id' => $school->id,
            'email' => $school->email,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Escola aprovada com sucesso',
            'school' => [
                'id' => $school->id,
                'name' => $school->name,
                'email' => $school->email,
                'status' => $school->status,
                'approved_at' => $school->approved_at->toIso8601String(),
            ],
        ]);
    }
    
    /**
     * @OA\Post(
     *     path="/api/admin/schools/{id}/reject",
     *     summary="Rejeitar uma escola",
     *     description="Rejeita uma escola, impedindo que ela acesse o sistema",
     *     operationId="rejectSchool",
     *     tags={"Admin Schools"},
     *     security={{"apiSecret":{}}},
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
     *         description="Escola rejeitada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Escola não encontrada"
     *     )
     * )
     */
    public function reject(Request $request, string $id): JsonResponse
    {
        $school = User::where('id', $id)
            ->where('role', User::ROLE_SCHOOL)
            ->first();
        
        if (!$school) {
            return response()->json([
                'status' => 'error',
                'message' => 'Escola não encontrada',
            ], Response::HTTP_NOT_FOUND);
        }
        
        $reason = $request->input('reason');
        $school->reject($reason);
        
        Log::info('Escola rejeitada via API Admin', [
            'school_id' => $school->id,
            'email' => $school->email,
            'reason' => $reason,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Escola rejeitada com sucesso',
            'school' => [
                'id' => $school->id,
                'name' => $school->name,
                'email' => $school->email,
                'status' => $school->status,
                'rejection_reason' => $school->rejection_reason,
            ],
        ]);
    }
}

