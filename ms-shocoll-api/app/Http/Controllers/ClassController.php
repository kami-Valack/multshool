<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Models\ClassStudent;
use App\Models\ClassSubject;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\CourseSubject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ClassController extends Controller
{
    /**
     * Lista todas as turmas da escola
     * Filtra automaticamente por school_id do usuário autenticado
     */
    public function index(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $query = SchoolClass::where('school_id', $school->id)
            ->with(['course', 'subjects', 'enrollments.enrollment']);
        
        // Filtros opcionais
        if ($request->has('course_id') && $request->course_id) {
            $query->where('course_id', $request->course_id);
        }
        
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('academic_year') && $request->academic_year) {
            $query->where('academic_year', $request->academic_year);
        }
        
        $classes = $query->orderBy('created_at', 'desc')->get();
        
        // Formatar resposta com contagens e dados relacionados
        $formattedClasses = $classes->map(function ($class) {
            $enrollments = $class->enrollments()->with('enrollment')->get();
            $students = $enrollments->map(function ($cs) {
                return $cs->enrollment;
            })->filter();
            
            // Buscar professores atribuídos a esta turma (via teacher_class_assignments)
            $teachers = \App\Models\TeacherClassAssignment::where('class', $class->name)
                ->where('is_active', true)
                ->with('subject')
                ->get()
                ->unique('teacher_id');
            
            return [
                'id' => $class->id,
                'name' => $class->name,
                'course_id' => $class->course_id,
                'course_name' => $class->course->name ?? null,
                'semester' => $class->semester,
                'academic_year' => $class->academic_year,
                'status' => $class->status,
                'max_students' => $class->max_students,
                'student_count' => $students->count(),
                'students' => $students->map(function ($enrollment) {
                    return [
                        'id' => $enrollment->student_id ?? null,
                        'enrollment_id' => $enrollment->id,
                        'name' => $enrollment->student_name ?? null,
                        'email' => $enrollment->student_email ?? null,
                        'number' => $enrollment->student_id ?? null,
                    ];
                })->values(),
                'subjects' => $class->subjects->map(function ($subject) {
                    return [
                        'id' => $subject->id,
                        'name' => $subject->name,
                        'code' => $subject->code ?? null,
                    ];
                }),
                'teachers' => $teachers->map(function ($assignment) {
                    return [
                        'teacher_id' => $assignment->teacher_id,
                        'subject_id' => $assignment->subject_id,
                        'subject_name' => $assignment->subject->name ?? null,
                    ];
                })->values(),
                'created_at' => $class->created_at,
                'updated_at' => $class->updated_at,
            ];
        });
        
        return response()->json([
            'status' => 'success',
            'classes' => $formattedClasses,
        ]);
    }

    /**
     * Obtém uma turma específica
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $class = SchoolClass::where('school_id', $school->id)
            ->with(['course', 'subjects', 'enrollments.enrollment'])
            ->findOrFail($id);
        
        $enrollments = $class->enrollments()->with('enrollment')->get();
        $students = $enrollments->map(function ($cs) {
            return $cs->enrollment;
        })->filter();
        
        // Buscar professores atribuídos
        $teachers = \App\Models\TeacherClassAssignment::where('class', $class->name)
            ->where('is_active', true)
            ->with('subject')
            ->get()
            ->unique('teacher_id');
        
        return response()->json([
            'status' => 'success',
            'class' => [
                'id' => $class->id,
                'name' => $class->name,
                'course_id' => $class->course_id,
                'course_name' => $class->course->name ?? null,
                'semester' => $class->semester,
                'academic_year' => $class->academic_year,
                'status' => $class->status,
                'max_students' => $class->max_students,
                'student_count' => $students->count(),
                'students' => $students->map(function ($enrollment) {
                    return [
                        'id' => $enrollment->student_id ?? null,
                        'enrollment_id' => $enrollment->id,
                        'name' => $enrollment->student_name ?? null,
                        'email' => $enrollment->student_email ?? null,
                        'number' => $enrollment->student_id ?? null,
                    ];
                })->values(),
                'subjects' => $class->subjects->map(function ($subject) {
                    return [
                        'id' => $subject->id,
                        'name' => $subject->name,
                        'code' => $subject->code ?? null,
                    ];
                }),
                'teachers' => $teachers->map(function ($assignment) {
                    return [
                        'teacher_id' => $assignment->teacher_id,
                        'subject_id' => $assignment->subject_id,
                        'subject_name' => $assignment->subject->name ?? null,
                    ];
                })->values(),
            ],
        ]);
    }

    /**
     * Cria uma nova turma
     * Regras de negócio:
     * - Verifica se o curso pertence à escola
     * - Verifica se os estudantes estão matriculados no curso
     * - Verifica se as disciplinas pertencem ao curso
     * - Respeita o limite de estudantes
     */
    public function store(Request $request): JsonResponse
    {
        $school = $request->user();
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'course_id' => 'required|string|uuid|exists:courses,id',
            'semester' => 'required|integer|min:1|max:8',
            'academic_year' => 'required|string|max:20',
            'status' => 'sometimes|in:active,completed',
            'max_students' => 'nullable|integer|min:1',
            'student_ids' => 'nullable|array',
            'student_ids.*' => 'string|uuid|exists:enrollments,id',
            'subject_ids' => 'nullable|array',
            'subject_ids.*' => 'string|uuid|exists:course_subjects,id',
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
        
        // Verificar se já existe turma com mesmo nome no mesmo curso e ano letivo
        $existing = SchoolClass::where('course_id', $request->course_id)
            ->where('name', $request->name)
            ->where('academic_year', $request->academic_year)
            ->first();
        
        if ($existing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Já existe uma turma com este nome no mesmo curso e ano letivo',
            ], 409);
        }
        
        // Criar a turma
        $class = SchoolClass::create([
            'school_id' => $school->id,
            'course_id' => $request->course_id,
            'name' => $request->name,
            'semester' => $request->semester,
            'academic_year' => $request->academic_year,
            'status' => $request->status ?? SchoolClass::STATUS_ACTIVE,
            'max_students' => $request->max_students,
        ]);
        
        // Adicionar estudantes (verificando se estão matriculados no curso)
        if ($request->has('student_ids') && is_array($request->student_ids)) {
            $enrollments = Enrollment::where('course_id', $request->course_id)
                ->where('status', Enrollment::STATUS_APPROVED)
                ->whereIn('id', $request->student_ids)
                ->get();
            
            $addedCount = 0;
            foreach ($enrollments as $enrollment) {
                // Verificar limite
                if ($class->max_students && $addedCount >= $class->max_students) {
                    break;
                }
                
                // Verificar se já não está na turma
                $exists = ClassStudent::where('class_id', $class->id)
                    ->where('enrollment_id', $enrollment->id)
                    ->exists();
                
                if (!$exists) {
                    ClassStudent::create([
                        'class_id' => $class->id,
                        'enrollment_id' => $enrollment->id,
                        'student_id' => $enrollment->student_id,
                    ]);
                    $addedCount++;
                }
            }
        }
        
        // Adicionar disciplinas (verificando se pertencem ao curso)
        if ($request->has('subject_ids') && is_array($request->subject_ids)) {
            $subjects = CourseSubject::where('course_id', $request->course_id)
                ->whereIn('id', $request->subject_ids)
                ->get();
            
            foreach ($subjects as $subject) {
                // Verificar se já não está na turma
                $exists = ClassSubject::where('class_id', $class->id)
                    ->where('subject_id', $subject->id)
                    ->exists();
                
                if (!$exists) {
                    ClassSubject::create([
                        'class_id' => $class->id,
                        'subject_id' => $subject->id,
                    ]);
                }
            }
        }
        
        $class->load(['course', 'subjects', 'enrollments.enrollment']);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Turma criada com sucesso',
            'class' => $this->formatClass($class),
        ], 201);
    }

    /**
     * Atualiza uma turma existente
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $class = SchoolClass::where('school_id', $school->id)
            ->findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:100',
            'course_id' => 'sometimes|required|string|uuid|exists:courses,id',
            'semester' => 'sometimes|required|integer|min:1|max:8',
            'academic_year' => 'sometimes|required|string|max:20',
            'status' => 'sometimes|in:active,completed',
            'max_students' => 'nullable|integer|min:1',
            'student_ids' => 'sometimes|array',
            'student_ids.*' => 'string|uuid|exists:enrollments,id',
            'subject_ids' => 'sometimes|array',
            'subject_ids.*' => 'string|uuid|exists:course_subjects,id',
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
        
        // Verificar duplicatas se nome ou ano letivo mudaram
        if ($request->has('name') || $request->has('academic_year')) {
            $courseId = $request->course_id ?? $class->course_id;
            $name = $request->name ?? $class->name;
            $academicYear = $request->academic_year ?? $class->academic_year;
            
            $existing = SchoolClass::where('course_id', $courseId)
                ->where('name', $name)
                ->where('academic_year', $academicYear)
                ->where('id', '!=', $id)
                ->first();
            
            if ($existing) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Já existe uma turma com este nome no mesmo curso e ano letivo',
                ], 409);
            }
        }
        
        // Atualizar campos básicos
        $class->update($request->only([
            'name',
            'course_id',
            'semester',
            'academic_year',
            'status',
            'max_students',
        ]));
        
        // Atualizar estudantes se fornecido
        if ($request->has('student_ids')) {
            $courseId = $request->course_id ?? $class->course_id;
            
            // Remover estudantes que não estão na lista
            $currentEnrollmentIds = ClassStudent::where('class_id', $class->id)
                ->pluck('enrollment_id')
                ->toArray();
            
            $toRemove = array_diff($currentEnrollmentIds, $request->student_ids);
            ClassStudent::where('class_id', $class->id)
                ->whereIn('enrollment_id', $toRemove)
                ->delete();
            
            // Adicionar novos estudantes
            $enrollments = Enrollment::where('course_id', $courseId)
                ->where('status', Enrollment::STATUS_APPROVED)
                ->whereIn('id', $request->student_ids)
                ->get();
            
            $currentCount = ClassStudent::where('class_id', $class->id)->count();
            $maxStudents = $class->max_students;
            
            foreach ($enrollments as $enrollment) {
                // Verificar limite
                if ($maxStudents && $currentCount >= $maxStudents) {
                    break;
                }
                
                // Verificar se já não está na turma
                $exists = ClassStudent::where('class_id', $class->id)
                    ->where('enrollment_id', $enrollment->id)
                    ->exists();
                
                if (!$exists) {
                    ClassStudent::create([
                        'class_id' => $class->id,
                        'enrollment_id' => $enrollment->id,
                        'student_id' => $enrollment->student_id,
                    ]);
                    $currentCount++;
                }
            }
        }
        
        // Atualizar disciplinas se fornecido
        if ($request->has('subject_ids')) {
            $courseId = $request->course_id ?? $class->course_id;
            
            // Remover disciplinas que não estão na lista
            $currentSubjectIds = ClassSubject::where('class_id', $class->id)
                ->pluck('subject_id')
                ->toArray();
            
            $toRemove = array_diff($currentSubjectIds, $request->subject_ids);
            ClassSubject::where('class_id', $class->id)
                ->whereIn('subject_id', $toRemove)
                ->delete();
            
            // Adicionar novas disciplinas
            $subjects = CourseSubject::where('course_id', $courseId)
                ->whereIn('id', $request->subject_ids)
                ->get();
            
            foreach ($subjects as $subject) {
                // Verificar se já não está na turma
                $exists = ClassSubject::where('class_id', $class->id)
                    ->where('subject_id', $subject->id)
                    ->exists();
                
                if (!$exists) {
                    ClassSubject::create([
                        'class_id' => $class->id,
                        'subject_id' => $subject->id,
                    ]);
                }
            }
        }
        
        $class->load(['course', 'subjects', 'enrollments.enrollment']);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Turma atualizada com sucesso',
            'class' => $this->formatClass($class),
        ]);
    }

    /**
     * Remove uma turma
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $school = $request->user();
        
        $class = SchoolClass::where('school_id', $school->id)
            ->findOrFail($id);
        
        // Remover relacionamentos
        ClassStudent::where('class_id', $class->id)->delete();
        ClassSubject::where('class_id', $class->id)->delete();
        
        // Remover a turma
        $class->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Turma removida com sucesso',
        ]);
    }

    /**
     * Formata uma turma para resposta
     */
    private function formatClass(SchoolClass $class): array
    {
        $enrollments = $class->enrollments()->with('enrollment')->get();
        $students = $enrollments->map(function ($cs) {
            return $cs->enrollment;
        })->filter();
        
        // Buscar professores atribuídos
        $teachers = \App\Models\TeacherClassAssignment::where('class', $class->name)
            ->where('is_active', true)
            ->with('subject')
            ->get()
            ->unique('teacher_id');
        
        return [
            'id' => $class->id,
            'name' => $class->name,
            'course_id' => $class->course_id,
            'course_name' => $class->course->name ?? null,
            'semester' => $class->semester,
            'academic_year' => $class->academic_year,
            'status' => $class->status,
            'max_students' => $class->max_students,
            'student_count' => $students->count(),
            'students' => $students->map(function ($enrollment) {
                return [
                    'id' => $enrollment->student_id ?? null,
                    'enrollment_id' => $enrollment->id,
                    'name' => $enrollment->student_name ?? null,
                    'email' => $enrollment->student_email ?? null,
                    'number' => $enrollment->student_id ?? null,
                ];
            })->values(),
            'subjects' => $class->subjects->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'code' => $subject->code ?? null,
                ];
            }),
            'teachers' => $teachers->map(function ($assignment) {
                return [
                    'teacher_id' => $assignment->teacher_id,
                    'subject_id' => $assignment->subject_id,
                    'subject_name' => $assignment->subject->name ?? null,
                ];
            })->values(),
        ];
    }
}
