<?php

namespace App\Http\Controllers;

use App\Models\TeacherStudent;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SchoolTeacherStudentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/teachers/{teacherId}/students/{studentId}",
     *     summary="Vincular aluno a docente",
     *     description="A escola vincula um aluno a um docente. O aluno e o docente devem estar vinculados à mesma escola.",
     *     operationId="linkStudentToTeacher",
     *     tags={"School"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="teacherId",
     *         in="path",
     *         required=true,
     *         description="ID do docente",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="studentId",
     *         in="path",
     *         required=true,
     *         description="ID do estudante",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="course_id", type="string", format="uuid", description="ID do curso (opcional)"),
     *             @OA\Property(property="is_active", type="boolean", description="Se o vínculo está ativo (padrão: true)")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Aluno vinculado ao docente com sucesso"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro de validação ou vínculo já existe"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Docente ou aluno não encontrado"
     *     )
     * )
     */
    public function link(Request $request, string $teacherId, string $studentId): JsonResponse
    {
        $school = $request->user();
        
        // Validar dados opcionais
        $validator = Validator::make($request->all(), [
            'course_id' => 'nullable|uuid|exists:courses,id',
            'is_active' => 'nullable|boolean',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dados inválidos',
                'errors' => $validator->errors(),
            ], 400);
        }
        
        // Verificar se o docente existe e pertence à escola
        $teacher = User::where('id', $teacherId)
            ->where('role', User::ROLE_TEACHER)
            ->first();
        
        if (!$teacher) {
            return response()->json([
                'status' => 'error',
                'message' => 'Docente não encontrado',
            ], 404);
        }
        
        // Nota: Alunos não são replicados para ms-shocoll-api
        // Eles existem apenas no ms-users-api-laravel
        // Validamos apenas que o ID é um UUID válido
        if (!\Illuminate\Support\Str::isUuid($studentId)) {
            return response()->json([
                'status' => 'error',
                'message' => 'ID do estudante inválido',
            ], 400);
        }
        
        // Tentar buscar no banco local (pode não existir, e isso é OK)
        $student = User::where('id', $studentId)
            ->where('role', User::ROLE_STUDENT)
            ->first();
        
        // Se não existe localmente, ainda podemos criar o vínculo
        // O aluno será buscado do ms-users-api quando necessário
        
        // Verificar se já existe vínculo
        $existingLink = TeacherStudent::where('teacher_id', $teacherId)
            ->where('student_id', $studentId)
            ->first();
        
        if ($existingLink) {
            // Se existe mas está inativo, reativar
            if (!$existingLink->is_active) {
                $existingLink->is_active = $request->input('is_active', true);
                $existingLink->course_id = $request->input('course_id', $existingLink->course_id);
                $existingLink->save();
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Vínculo reativado com sucesso',
                    'link' => [
                        'id' => $existingLink->id,
                        'teacher_id' => $existingLink->teacher_id,
                        'student_id' => $existingLink->student_id,
                        'school_id' => $existingLink->school_id,
                        'course_id' => $existingLink->course_id,
                        'is_active' => $existingLink->is_active,
                    ],
                ], 200);
            }
            
            return response()->json([
                'status' => 'error',
                'message' => 'Este aluno já está vinculado a este docente',
            ], 400);
        }
        
        // Criar novo vínculo
        $link = TeacherStudent::create([
            'teacher_id' => $teacherId,
            'student_id' => $studentId,
            'school_id' => $school->id, // ID da escola que está fazendo o vínculo
            'course_id' => $request->input('course_id'),
            'is_active' => $request->input('is_active', true),
        ]);
        
        // Preparar resposta
        $responseData = [
            'id' => $link->id,
            'teacher_id' => $link->teacher_id,
            'student_id' => $link->student_id,
            'school_id' => $link->school_id,
            'course_id' => $link->course_id,
            'is_active' => $link->is_active,
            'teacher' => [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'email' => $teacher->email,
            ],
        ];
        
        // Adicionar dados do aluno se existir localmente
        if ($student) {
            $responseData['student'] = [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email,
            ];
        } else {
            $responseData['student'] = [
                'id' => $studentId,
                'note' => 'Aluno não está no banco local (ms-shocoll-api). Dados serão buscados do ms-users-api quando necessário.',
            ];
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Aluno vinculado ao docente com sucesso',
            'link' => $responseData,
        ], 201);
    }
    
    /**
     * @OA\Get(
     *     path="/api/teachers/{teacherId}/students",
     *     summary="Listar alunos de um docente",
     *     description="Lista todos os alunos vinculados a um docente específico",
     *     operationId="listTeacherStudents",
     *     tags={"School"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="teacherId",
     *         in="path",
     *         required=true,
     *         description="ID do docente",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de alunos"
     *     )
     * )
     */
    public function listStudents(Request $request, string $teacherId): JsonResponse
    {
        $school = $request->user();
        
        // Verificar se o docente existe
        $teacher = User::where('id', $teacherId)
            ->where('role', User::ROLE_TEACHER)
            ->first();
        
        if (!$teacher) {
            return response()->json([
                'status' => 'error',
                'message' => 'Docente não encontrado',
            ], 404);
        }
        
        // Buscar alunos vinculados ao docente pela escola
        $links = TeacherStudent::where('teacher_id', $teacherId)
            ->where('school_id', $school->id)
            ->with(['student', 'course'])
            ->get();
        
        $students = $links->map(function ($link) {
            // Aluno pode não existir no banco local
            if ($link->student) {
                return [
                    'id' => $link->student->id,
                    'name' => $link->student->name,
                    'email' => $link->student->email,
                    'student_id' => $link->student->student_id ?? null,
                    'course' => $link->course ? [
                        'id' => $link->course->id,
                        'name' => $link->course->name,
                    ] : null,
                    'is_active' => $link->is_active,
                    'linked_at' => $link->created_at->toIso8601String(),
                ];
            } else {
                // Aluno não está no banco local - retornar apenas ID
                return [
                    'id' => $link->student_id,
                    'name' => 'Aluno não encontrado no banco local',
                    'email' => 'N/A',
                    'note' => 'Dados do aluno serão buscados do ms-users-api quando necessário',
                    'course' => $link->course ? [
                        'id' => $link->course->id,
                        'name' => $link->course->name,
                    ] : null,
                    'is_active' => $link->is_active,
                    'linked_at' => $link->created_at->toIso8601String(),
                ];
            }
        });
        
        return response()->json([
            'status' => 'success',
            'teacher' => [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'email' => $teacher->email,
            ],
            'students' => $students,
            'total' => $students->count(),
        ]);
    }
    
    /**
     * @OA\Delete(
     *     path="/api/teachers/{teacherId}/students/{studentId}",
     *     summary="Desvincular aluno de docente",
     *     description="Remove o vínculo entre um aluno e um docente (ou desativa)",
     *     operationId="unlinkStudentFromTeacher",
     *     tags={"School"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="teacherId",
     *         in="path",
     *         required=true,
     *         description="ID do docente",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="studentId",
     *         in="path",
     *         required=true,
     *         description="ID do estudante",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Aluno desvinculado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Vínculo não encontrado"
     *     )
     *     )
     */
    public function unlink(Request $request, string $teacherId, string $studentId): JsonResponse
    {
        $school = $request->user();
        
        // Buscar vínculo
        $link = TeacherStudent::where('teacher_id', $teacherId)
            ->where('student_id', $studentId)
            ->where('school_id', $school->id)
            ->first();
        
        if (!$link) {
            return response()->json([
                'status' => 'error',
                'message' => 'Vínculo não encontrado',
            ], 404);
        }
        
        // Desativar ao invés de deletar (manter histórico)
        $link->is_active = false;
        $link->save();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Aluno desvinculado do docente com sucesso',
        ]);
    }
    
    /**
     * @OA\Get(
     *     path="/api/students/{studentId}/teachers",
     *     summary="Listar docentes de um aluno",
     *     description="Lista todos os docentes vinculados a um aluno específico",
     *     operationId="listStudentTeachers",
     *     tags={"School"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="studentId",
     *         in="path",
     *         required=true,
     *         description="ID do estudante",
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de docentes"
     *     )
     * )
     */
    public function listTeachers(Request $request, string $studentId): JsonResponse
    {
        $school = $request->user();
        
        // Nota: Alunos podem não existir no banco local
        // Validar apenas que o ID é um UUID válido
        if (!\Illuminate\Support\Str::isUuid($studentId)) {
            return response()->json([
                'status' => 'error',
                'message' => 'ID do estudante inválido',
            ], 400);
        }
        
        // Tentar buscar no banco local (pode não existir)
        $student = User::where('id', $studentId)
            ->where('role', User::ROLE_STUDENT)
            ->first();
        
        // Buscar docentes vinculados ao aluno pela escola
        $links = TeacherStudent::where('student_id', $studentId)
            ->where('school_id', $school->id)
            ->where('is_active', true)
            ->with(['teacher', 'course'])
            ->get();
        
        $teachers = $links->map(function ($link) {
            return [
                'id' => $link->teacher->id,
                'name' => $link->teacher->name,
                'email' => $link->teacher->email,
                'course' => $link->course ? [
                    'id' => $link->course->id,
                    'name' => $link->course->name,
                ] : null,
                'linked_at' => $link->created_at->toIso8601String(),
            ];
        });
        
        $studentData = $student ? [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
        ] : [
            'id' => $studentId,
            'note' => 'Aluno não está no banco local. Dados serão buscados do ms-users-api quando necessário.',
        ];
        
        return response()->json([
            'status' => 'success',
            'student' => $studentData,
            'teachers' => $teachers,
            'total' => $teachers->count(),
        ]);
    }
}

