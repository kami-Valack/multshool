<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EnrollmentController extends Controller
{
    /**
     * List enrollments for a student.
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|uuid',
            'status' => 'nullable|in:pending,approved,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $query = Enrollment::where('student_id', $request->student_id)
            ->with(['course', 'admissionExam']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $enrollments = $query->orderBy('created_at', 'desc')->get();
        
        // Adicionar class_id e class_name das turmas relacionadas
        $enrollments = $enrollments->map(function ($enrollment) {
            // Buscar class_students relacionado para obter class_id
            $classStudent = \App\Models\ClassStudent::where('enrollment_id', $enrollment->id)
                ->with('class')
                ->first();
            
            $enrollmentData = $enrollment->toArray();
            
            if ($classStudent && $classStudent->class) {
                $enrollmentData['class_id'] = $classStudent->class_id;
                $enrollmentData['class_name'] = $classStudent->class->name;
                // Garantir que o campo 'class' está preenchido
                if (empty($enrollmentData['class'])) {
                    $enrollmentData['class'] = $classStudent->class->name;
                }
            }
            
            return $enrollmentData;
        });

        return response()->json([
            'status' => 'success',
            'enrollments' => $enrollments,
        ]);
    }

    /**
     * Create enrollment for a student.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|uuid',
            'student_email' => 'required|email',
            'student_name' => 'required|string',
            'course_id' => 'required|uuid|exists:courses,id',
            'admission_exam_id' => 'nullable|uuid|exists:admission_exams,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $course = Course::findOrFail($request->course_id);

        // Verificar se já existe matrícula
        $existing = Enrollment::where('course_id', $request->course_id)
            ->where('student_id', $request->student_id)
            ->first();

        if ($existing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Você já está matriculado neste curso',
            ], 409);
        }

        // Verificar se o curso está ativo
        if (!$course->is_active) {
            return response()->json([
                'status' => 'error',
                'message' => 'Este curso não está disponível para matrícula',
            ], 400);
        }

        $enrollment = Enrollment::create([
            'course_id' => $request->course_id,
            'student_id' => $request->student_id,
            'student_email' => $request->student_email,
            'student_name' => $request->student_name,
            'admission_exam_id' => $request->admission_exam_id,
            'status' => Enrollment::STATUS_PENDING,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Matrícula criada com sucesso. Aguarde aprovação da escola.',
            'enrollment' => $enrollment->load(['course', 'admissionExam']),
        ], 201);
    }
}

