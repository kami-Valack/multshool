<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Enrollment Management",
 *     description="Endpoints para escolas gerenciarem matrículas"
 * )
 */
class EnrollmentManagementController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses/{courseId}/enrollments",
     *     summary="Listar matrículas de um curso",
     *     description="Retorna todas as matrículas de um curso da escola autenticada",
     *     operationId="listCourseEnrollments",
     *     tags={"Enrollment Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filtrar por status",
     *         required=false,
     *         @OA\Schema(type="string", enum={"pending", "approved", "rejected"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de matrículas"
     *     )
     * )
     */
    public function index(Request $request, string $courseId): JsonResponse
    {
        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        
        $query = Enrollment::where('course_id', $course->id)
            ->with('admissionExam');
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        $enrollments = $query->orderBy('created_at', 'desc')->get();
        
        // Estatísticas
        $stats = [
            'total' => Enrollment::where('course_id', $course->id)->count(),
            'pending' => Enrollment::where('course_id', $course->id)->where('status', 'pending')->count(),
            'approved' => Enrollment::where('course_id', $course->id)->where('status', 'approved')->count(),
            'rejected' => Enrollment::where('course_id', $course->id)->where('status', 'rejected')->count(),
        ];
        
        return response()->json([
            'status' => 'success',
            'enrollments' => $enrollments,
            'statistics' => $stats,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/enrollments/{enrollmentId}/approve",
     *     summary="Aprovar matrícula",
     *     description="Aprova uma matrícula pendente",
     *     operationId="approveEnrollment",
     *     tags={"Enrollment Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="enrollmentId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Matrícula aprovada com sucesso"
     *     )
     * )
     */
    public function approve(Request $request, string $enrollmentId): JsonResponse
    {
        $school = $request->user();
        
        $enrollment = Enrollment::with('course')
            ->whereHas('course', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            })
            ->findOrFail($enrollmentId);
        
        if ($enrollment->isApproved()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Esta matrícula já está aprovada',
            ], 400);
        }
        
        $enrollment->approve();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Matrícula aprovada com sucesso',
            'enrollment' => $enrollment->load(['course', 'admissionExam']),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/enrollments/{enrollmentId}/reject",
     *     summary="Rejeitar matrícula",
     *     description="Rejeita uma matrícula pendente",
     *     operationId="rejectEnrollment",
     *     tags={"Enrollment Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="enrollmentId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="reason", type="string", example="Não atende aos requisitos")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Matrícula rejeitada com sucesso"
     *     )
     * )
     */
    public function reject(Request $request, string $enrollmentId): JsonResponse
    {
        $school = $request->user();
        
        $enrollment = Enrollment::with('course')
            ->whereHas('course', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            })
            ->findOrFail($enrollmentId);
        
        if ($enrollment->isRejected()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Esta matrícula já está rejeitada',
            ], 400);
        }
        
        $enrollment->reject($request->input('reason'));
        
        return response()->json([
            'status' => 'success',
            'message' => 'Matrícula rejeitada com sucesso',
            'enrollment' => $enrollment->load(['course', 'admissionExam']),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/exam-registrations/{registrationId}/approve",
     *     summary="Aprovar candidato que passou no exame",
     *     description="Marca um candidato como aprovado no exame e aprova automaticamente a matrícula",
     *     operationId="approveExamCandidate",
     *     tags={"Enrollment Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="registrationId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="score", type="number", format="float", example=85.5),
     *             @OA\Property(property="notes", type="string", example="Excelente desempenho")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Candidato aprovado com sucesso"
     *     )
     * )
     */
    public function approveExamCandidate(Request $request, string $registrationId): JsonResponse
    {
        $school = $request->user();
        
        $registration = \App\Models\ExamRegistration::with(['admissionExam.course'])
            ->whereHas('admissionExam.course', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            })
            ->findOrFail($registrationId);
        
        $validator = Validator::make($request->all(), [
            'score' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Marcar como aprovado no exame
        $registration->markAsPassed($request->input('score'));
        if ($request->has('notes')) {
            $registration->notes = $request->input('notes');
            $registration->save();
        }
        
        // Buscar ou criar matrícula e aprovar
        $enrollment = Enrollment::where('course_id', $registration->admissionExam->course_id)
            ->where('student_id', $registration->student_id)
            ->first();
        
        if ($enrollment) {
            $enrollment->exam_passed = true;
            $enrollment->admission_exam_id = $registration->admission_exam_id;
            $enrollment->approve();
        } else {
            // Criar matrícula automaticamente
            $enrollment = Enrollment::create([
                'course_id' => $registration->admissionExam->course_id,
                'student_id' => $registration->student_id,
                'student_email' => $registration->student_email,
                'student_name' => $registration->student_name,
                'admission_exam_id' => $registration->admission_exam_id,
                'exam_passed' => true,
                'status' => Enrollment::STATUS_APPROVED,
                'approved_at' => now(),
            ]);
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Candidato aprovado no exame e matrícula aprovada automaticamente',
            'registration' => $registration->load(['admissionExam.course']),
            'enrollment' => $enrollment->load(['course', 'admissionExam']),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/exam-registrations/{registrationId}/reject",
     *     summary="Rejeitar candidato que não passou no exame",
     *     description="Marca um candidato como reprovado no exame",
     *     operationId="rejectExamCandidate",
     *     tags={"Enrollment Management"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="registrationId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="score", type="number", format="float", example=45.0),
     *             @OA\Property(property="notes", type="string", example="Nota abaixo do mínimo")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Candidato reprovado"
     *     )
     * )
     */
    public function rejectExamCandidate(Request $request, string $registrationId): JsonResponse
    {
        $school = $request->user();
        
        $registration = \App\Models\ExamRegistration::with(['admissionExam.course'])
            ->whereHas('admissionExam.course', function ($query) use ($school) {
                $query->where('school_id', $school->id);
            })
            ->findOrFail($registrationId);
        
        $validator = Validator::make($request->all(), [
            'score' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        $registration->markAsFailed($request->input('score'));
        if ($request->has('notes')) {
            $registration->notes = $request->input('notes');
            $registration->save();
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Candidato reprovado no exame',
            'registration' => $registration->load(['admissionExam.course']),
        ]);
    }
}

