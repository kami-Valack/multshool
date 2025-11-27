<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Teacher Management",
 *     description="Endpoints para escolas gerenciarem seus professores"
 * )
 */
class TeacherManagementController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/teachers",
     *     summary="Listar professores da escola",
     *     description="Retorna todos os professores da escola autenticada",
     *     operationId="listSchoolTeachers",
     *     tags={"Teacher Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de professores"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $school = $request->user();
        
        try {
            // Buscar professores da escola através do ms-users-api
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            $response = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->get("{$usersApiUrl}/admin/teachers", [
                'school_id' => $school->id,
            ]);
            
            if ($response->successful()) {
                $data = $response->json();
                // A API retorna { status: 'success', teachers: [...], data: [...] }
                $teachers = $data['teachers'] ?? $data['data'] ?? [];
                return response()->json([
                    'status' => 'success',
                    'teachers' => $teachers,
                ]);
            }
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar professores',
            ], $response->status());
            
        } catch (\Exception $e) {
            Log::error('Erro ao listar professores', [
                'school_id' => $school->id,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao listar professores',
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/teachers/{teacherId}",
     *     summary="Obter detalhes de um professor",
     *     description="Retorna os detalhes de um professor da escola autenticada",
     *     operationId="getSchoolTeacher",
     *     tags={"Teacher Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="teacherId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do professor"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Professor não encontrado ou não pertence à escola"
     *     )
     * )
     */
    public function show(Request $request, string $teacherId): JsonResponse
    {
        $school = $request->user();
        
        try {
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            $response = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->get("{$usersApiUrl}/admin/teachers/{$teacherId}");
            
            if ($response->successful()) {
                $responseData = $response->json();
                $teacher = $responseData['data'] ?? $responseData['teacher'] ?? $responseData;
                
                // Verificar se o professor pertence à escola
                if (isset($teacher['school_id']) && $teacher['school_id'] !== $school->id) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Professor não pertence à sua escola',
                    ], 403);
                }
                
                return response()->json([
                    'status' => 'success',
                    'teacher' => $teacher,
                ]);
            }
            
            return response()->json([
                'status' => 'error',
                'message' => 'Professor não encontrado',
            ], 404);
            
        } catch (\Exception $e) {
            Log::error('Erro ao obter professor', [
                'school_id' => $school->id,
                'teacher_id' => $teacherId,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao obter professor',
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/teachers",
     *     summary="Criar novo professor",
     *     description="Cria um novo professor para a escola autenticada",
     *     operationId="createSchoolTeacher",
     *     tags={"Teacher Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Dr. João Silva"),
     *             @OA\Property(property="email", type="string", format="email", example="joao.silva@escola.ao"),
     *             @OA\Property(property="phone", type="string", example="+244 923 456 789")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Professor criado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'course_id' => 'nullable|string|uuid',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'contract_type' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'id_card' => 'nullable|string|max:50',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        try {
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            $response = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->post("{$usersApiUrl}/admin/teachers", [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'school_id' => $school->id,
                'course_id' => $request->course_id,
                'department' => $request->department,
                'position' => $request->position,
                'contract_type' => $request->contract_type,
                'address' => $request->address,
                'id_card' => $request->id_card,
                'role' => 'teacher',
            ]);
            
            if ($response->successful()) {
                $responseData = $response->json();
                $teacher = $responseData['data'] ?? $responseData['teacher'] ?? $responseData;
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Professor criado com sucesso',
                    'teacher' => $teacher,
                ], 201);
            }
            
            $errorData = $response->json();
            return response()->json([
                'status' => 'error',
                'message' => $errorData['message'] ?? 'Erro ao criar professor',
                'errors' => $errorData['errors'] ?? [],
            ], $response->status());
            
        } catch (\Exception $e) {
            Log::error('Erro ao criar professor', [
                'school_id' => $school->id,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao criar professor',
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/teachers/{teacherId}",
     *     summary="Atualizar professor",
     *     description="Atualiza um professor da escola autenticada",
     *     operationId="updateSchoolTeacher",
     *     tags={"Teacher Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="teacherId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Dr. João Silva"),
     *             @OA\Property(property="email", type="string", format="email", example="joao.silva@escola.ao"),
     *             @OA\Property(property="phone", type="string", example="+244 923 456 789"),
     *             @OA\Property(property="status", type="string", enum={"active", "inactive"}, example="active")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Professor atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Professor não pertence à escola"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Professor não encontrado"
     *     )
     * )
     */
    public function update(Request $request, string $teacherId): JsonResponse
    {
        $school = $request->user();
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'phone' => 'nullable|string|max:20',
            'status' => 'sometimes|in:active,inactive',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        try {
            // Primeiro verificar se o professor pertence à escola
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            $checkResponse = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->get("{$usersApiUrl}/admin/teachers/{$teacherId}");
            
            if (!$checkResponse->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não encontrado',
                ], 404);
            }
            
            $teacher = $checkResponse->json()['data'] ?? $checkResponse->json();
            
            // Verificar se o professor pertence à escola
            if (isset($teacher['school_id']) && $teacher['school_id'] !== $school->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não pertence à sua escola',
                ], 403);
            }
            
            // Atualizar o professor
            $response = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->put("{$usersApiUrl}/admin/teachers/{$teacherId}", $request->only([
                'name',
                'email',
                'phone',
                'course_id',
                'department',
                'position',
                'contract_type',
                'address',
                'id_card',
                'status',
            ]));
            
            if ($response->successful()) {
                $responseData = $response->json();
                $updatedTeacher = $responseData['data'] ?? $responseData['teacher'] ?? $responseData;
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Professor atualizado com sucesso',
                    'teacher' => $updatedTeacher,
                ]);
            }
            
            $errorData = $response->json();
            return response()->json([
                'status' => 'error',
                'message' => $errorData['message'] ?? 'Erro ao atualizar professor',
                'errors' => $errorData['errors'] ?? [],
            ], $response->status());
            
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar professor', [
                'school_id' => $school->id,
                'teacher_id' => $teacherId,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar professor',
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/teachers/{teacherId}",
     *     summary="Remover professor",
     *     description="Remove um professor da escola autenticada",
     *     operationId="deleteSchoolTeacher",
     *     tags={"Teacher Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="teacherId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Professor removido com sucesso"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Professor não pertence à escola"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Professor não encontrado"
     *     )
     * )
     */
    public function destroy(Request $request, string $teacherId): JsonResponse
    {
        $school = $request->user();
        
        try {
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            // Primeiro verificar se o professor pertence à escola
            $checkResponse = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->get("{$usersApiUrl}/admin/teachers/{$teacherId}");
            
            if (!$checkResponse->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não encontrado',
                ], 404);
            }
            
            $teacher = $checkResponse->json()['data'] ?? $checkResponse->json();
            
            // Verificar se o professor pertence à escola
            if (isset($teacher['school_id']) && $teacher['school_id'] !== $school->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não pertence à sua escola',
                ], 403);
            }
            
            // Remover o professor
            $response = Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->delete("{$usersApiUrl}/admin/teachers/{$teacherId}");
            
            if ($response->successful()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Professor removido com sucesso',
                ]);
            }
            
            $errorData = $response->json();
            return response()->json([
                'status' => 'error',
                'message' => $errorData['message'] ?? 'Erro ao remover professor',
            ], $response->status());
            
        } catch (\Exception $e) {
            Log::error('Erro ao remover professor', [
                'school_id' => $school->id,
                'teacher_id' => $teacherId,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao remover professor',
            ], 500);
        }
    }
}

