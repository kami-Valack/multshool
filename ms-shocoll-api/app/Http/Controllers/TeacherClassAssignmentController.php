<?php

namespace App\Http\Controllers;

use App\Models\TeacherClassAssignment;
use App\Models\Course;
use App\Models\CourseSubject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class TeacherClassAssignmentController extends Controller
{
    /**
     * Lista todas as atribuições de professores a turmas
     * Filtra automaticamente por school_id do usuário autenticado
     */
    public function index(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $query = TeacherClassAssignment::where('school_id', $school->id)
            ->where('is_active', true)
            ->with(['course', 'subject']);
        
        // Filtros opcionais
        if ($request->has('teacher_id') && $request->teacher_id) {
            $query->where('teacher_id', $request->teacher_id);
        }
        
        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
        }
        
        if ($request->has('subject_id') && $request->subject_id) {
            $query->where('subject_id', $request->subject_id);
        }
        
        $assignments = $query->orderBy('created_at', 'desc')->get();
        
        // Formatar resposta com dados do professor (precisa buscar do ms-users-api)
        $formattedAssignments = $assignments->map(function ($assignment) {
            return [
                'id' => $assignment->id,
                'teacher_id' => $assignment->teacher_id,
                'teacher_name' => null, // Será preenchido pelo frontend ou via eager loading
                'course_id' => $assignment->course_id,
                'course_name' => $assignment->course->name ?? null,
                'subject_id' => $assignment->subject_id,
                'subject_name' => $assignment->subject->name ?? null,
                'class' => $assignment->class,
                'workload_hours' => $assignment->workload_hours,
                'assignment_type' => $assignment->assignment_type,
                'is_active' => $assignment->is_active,
                'created_at' => $assignment->created_at,
                'updated_at' => $assignment->updated_at,
            ];
        });
        
        return response()->json([
            'status' => 'success',
            'assignments' => $formattedAssignments,
        ]);
    }

    /**
     * Obtém uma atribuição específica
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $assignment = TeacherClassAssignment::where('school_id', $school->id)
            ->with(['course', 'subject'])
            ->findOrFail($id);
        
        return response()->json([
            'status' => 'success',
            'assignment' => [
                'id' => $assignment->id,
                'teacher_id' => $assignment->teacher_id,
                'course_id' => $assignment->course_id,
                'course_name' => $assignment->course->name ?? null,
                'subject_id' => $assignment->subject_id,
                'subject_name' => $assignment->subject->name ?? null,
                'class' => $assignment->class,
                'workload_hours' => $assignment->workload_hours,
                'assignment_type' => $assignment->assignment_type,
                'is_active' => $assignment->is_active,
                'created_at' => $assignment->created_at,
                'updated_at' => $assignment->updated_at,
            ],
        ]);
    }

    /**
     * Cria uma nova atribuição
     * Regra de negócio: Verifica se o professor pertence à escola
     */
    public function store(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $validator = Validator::make($request->all(), [
            'teacher_id' => 'required|string|uuid',
            'course_id' => 'required|string|uuid|exists:courses,id',
            'subject_id' => 'required|string|uuid|exists:course_subjects,id',
            'class' => 'required|string|max:50',
            'workload_hours' => 'required|integer|min:1|max:40',
            'assignment_type' => 'required|in:principal,substituto',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Verificar se o curso pertence à escola
        $course = Course::where('school_id', $school->id)
            ->findOrFail($request->course_id);
        
        // Verificar se a disciplina pertence ao curso
        $subject = CourseSubject::where('course_id', $request->course_id)
            ->findOrFail($request->subject_id);
        
        // Verificar se o professor pertence à escola (via ms-users-api)
        try {
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            $response = \Illuminate\Support\Facades\Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->get("{$usersApiUrl}/admin/teachers/{$request->teacher_id}");
            
            if (!$response->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não encontrado',
                ], 404);
            }
            
            $teacher = $response->json()['teacher'] ?? $response->json();
            
            if (isset($teacher['school_id']) && $teacher['school_id'] !== $school->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não pertence à sua escola',
                ], 403);
            }
        } catch (\Exception $e) {
            Log::error('Erro ao verificar professor', [
                'school_id' => $school->id,
                'teacher_id' => $request->teacher_id,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao verificar dados do professor',
            ], 500);
        }
        
        // Verificar se já existe atribuição duplicada
        $existing = TeacherClassAssignment::where('teacher_id', $request->teacher_id)
            ->where('course_id', $request->course_id)
            ->where('subject_id', $request->subject_id)
            ->where('class', $request->class)
            ->where('is_active', true)
            ->first();
        
        if ($existing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Já existe uma atribuição ativa para este professor, curso, disciplina e turma',
            ], 409);
        }
        
        $assignment = TeacherClassAssignment::create([
            'teacher_id' => $request->teacher_id,
            'school_id' => $school->id,
            'course_id' => $request->course_id,
            'subject_id' => $request->subject_id,
            'class' => $request->class,
            'workload_hours' => $request->workload_hours,
            'assignment_type' => $request->assignment_type,
            'is_active' => true,
        ]);
        
        $assignment->load(['course', 'subject']);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Atribuição criada com sucesso',
            'assignment' => [
                'id' => $assignment->id,
                'teacher_id' => $assignment->teacher_id,
                'course_id' => $assignment->course_id,
                'course_name' => $assignment->course->name ?? null,
                'subject_id' => $assignment->subject_id,
                'subject_name' => $assignment->subject->name ?? null,
                'class' => $assignment->class,
                'workload_hours' => $assignment->workload_hours,
                'assignment_type' => $assignment->assignment_type,
                'is_active' => $assignment->is_active,
            ],
        ], 201);
    }

    /**
     * Atualiza uma atribuição existente
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $assignment = TeacherClassAssignment::where('school_id', $school->id)
            ->findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'course_id' => 'sometimes|required|string|uuid|exists:courses,id',
            'subject_id' => 'sometimes|required|string|uuid|exists:course_subjects,id',
            'class' => 'sometimes|required|string|max:50',
            'workload_hours' => 'sometimes|required|integer|min:1|max:40',
            'assignment_type' => 'sometimes|required|in:principal,substituto',
            'is_active' => 'sometimes|boolean',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Verificar curso se fornecido
        if ($request->has('course_id')) {
            $course = Course::where('school_id', $school->id)
                ->findOrFail($request->course_id);
        }
        
        // Verificar disciplina se fornecida
        if ($request->has('subject_id')) {
            $courseId = $request->course_id ?? $assignment->course_id;
            $subject = CourseSubject::where('course_id', $courseId)
                ->findOrFail($request->subject_id);
        }
        
        // Verificar duplicatas se campos relevantes mudaram
        if ($request->has('course_id') || $request->has('subject_id') || $request->has('class')) {
            $teacherId = $assignment->teacher_id;
            $courseId = $request->course_id ?? $assignment->course_id;
            $subjectId = $request->subject_id ?? $assignment->subject_id;
            $class = $request->class ?? $assignment->class;
            
            $existing = TeacherClassAssignment::where('teacher_id', $teacherId)
                ->where('course_id', $courseId)
                ->where('subject_id', $subjectId)
                ->where('class', $class)
                ->where('id', '!=', $id)
                ->where('is_active', true)
                ->first();
            
            if ($existing) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Já existe uma atribuição ativa para esta combinação',
                ], 409);
            }
        }
        
        $assignment->update($request->only([
            'course_id',
            'subject_id',
            'class',
            'workload_hours',
            'assignment_type',
            'is_active',
        ]));
        
        $assignment->load(['course', 'subject']);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Atribuição atualizada com sucesso',
            'assignment' => [
                'id' => $assignment->id,
                'teacher_id' => $assignment->teacher_id,
                'course_id' => $assignment->course_id,
                'course_name' => $assignment->course->name ?? null,
                'subject_id' => $assignment->subject_id,
                'subject_name' => $assignment->subject->name ?? null,
                'class' => $assignment->class,
                'workload_hours' => $assignment->workload_hours,
                'assignment_type' => $assignment->assignment_type,
                'is_active' => $assignment->is_active,
            ],
        ]);
    }

    /**
     * Remove uma atribuição (soft delete)
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $assignment = TeacherClassAssignment::where('school_id', $school->id)
            ->findOrFail($id);
        
        $assignment->update(['is_active' => false]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Atribuição removida com sucesso',
        ]);
    }

    /**
     * Cria múltiplas atribuições de uma vez
     * Útil para o formulário que permite adicionar várias atribuições
     */
    public function bulkStore(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $validator = Validator::make($request->all(), [
            'teacher_id' => 'required|string|uuid',
            'assignments' => 'required|array|min:1',
            'assignments.*.course_id' => 'required|string|uuid|exists:courses,id',
            'assignments.*.subject_id' => 'required|string|uuid|exists:course_subjects,id',
            'assignments.*.class' => 'required|string|max:50',
            'assignments.*.workload_hours' => 'required|integer|min:1|max:40',
            'assignments.*.assignment_type' => 'required|in:principal,substituto',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Verificar se o professor pertence à escola
        try {
            $usersApiUrl = config('services.users_api.url');
            $usersApiSecret = config('services.users_api.secret');
            
            $response = \Illuminate\Support\Facades\Http::withHeaders([
                'X-API-Secret' => $usersApiSecret,
            ])->get("{$usersApiUrl}/admin/teachers/{$request->teacher_id}");
            
            if (!$response->successful()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não encontrado',
                ], 404);
            }
            
            $teacher = $response->json()['teacher'] ?? $response->json();
            
            if (isset($teacher['school_id']) && $teacher['school_id'] !== $school->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Professor não pertence à sua escola',
                ], 403);
            }
        } catch (\Exception $e) {
            Log::error('Erro ao verificar professor', [
                'school_id' => $school->id,
                'teacher_id' => $request->teacher_id,
                'error' => $e->getMessage(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao verificar dados do professor',
            ], 500);
        }
        
        $created = [];
        $errors = [];
        
        foreach ($request->assignments as $index => $assignmentData) {
            // Verificar se o curso pertence à escola
            $course = Course::where('school_id', $school->id)
                ->find($assignmentData['course_id']);
            
            if (!$course) {
                $errors[] = [
                    'index' => $index,
                    'message' => 'Curso não encontrado ou não pertence à sua escola',
                ];
                continue;
            }
            
            // Verificar se a disciplina pertence ao curso
            $subject = CourseSubject::where('course_id', $assignmentData['course_id'])
                ->find($assignmentData['subject_id']);
            
            if (!$subject) {
                $errors[] = [
                    'index' => $index,
                    'message' => 'Disciplina não encontrada ou não pertence ao curso',
                ];
                continue;
            }
            
            // Verificar duplicatas
            $existing = TeacherClassAssignment::where('teacher_id', $request->teacher_id)
                ->where('course_id', $assignmentData['course_id'])
                ->where('subject_id', $assignmentData['subject_id'])
                ->where('class', $assignmentData['class'])
                ->where('is_active', true)
                ->first();
            
            if ($existing) {
                $errors[] = [
                    'index' => $index,
                    'message' => 'Já existe uma atribuição ativa para esta combinação',
                ];
                continue;
            }
            
            try {
                $assignment = TeacherClassAssignment::create([
                    'teacher_id' => $request->teacher_id,
                    'school_id' => $school->id,
                    'course_id' => $assignmentData['course_id'],
                    'subject_id' => $assignmentData['subject_id'],
                    'class' => $assignmentData['class'],
                    'workload_hours' => $assignmentData['workload_hours'],
                    'assignment_type' => $assignmentData['assignment_type'],
                    'is_active' => true,
                ]);
                
                $assignment->load(['course', 'subject']);
                
                $created[] = [
                    'id' => $assignment->id,
                    'teacher_id' => $assignment->teacher_id,
                    'course_id' => $assignment->course_id,
                    'course_name' => $assignment->course->name ?? null,
                    'subject_id' => $assignment->subject_id,
                    'subject_name' => $assignment->subject->name ?? null,
                    'class' => $assignment->class,
                    'workload_hours' => $assignment->workload_hours,
                    'assignment_type' => $assignment->assignment_type,
                ];
            } catch (\Exception $e) {
                $errors[] = [
                    'index' => $index,
                    'message' => 'Erro ao criar atribuição: ' . $e->getMessage(),
                ];
            }
        }
        
        return response()->json([
            'status' => count($errors) > 0 ? 'partial' : 'success',
            'message' => count($created) . ' atribuição(ões) criada(s) com sucesso',
            'created' => $created,
            'errors' => $errors,
        ], count($created) > 0 ? 201 : 422);
    }
}
