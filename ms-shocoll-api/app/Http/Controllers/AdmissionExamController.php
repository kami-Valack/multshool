<?php

namespace App\Http\Controllers;

use App\Models\AdmissionExam;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Admission Exams",
 *     description="Endpoints para gerenciamento de exames de admissão"
 * )
 */
class AdmissionExamController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses/{courseId}/admission-exams",
     *     summary="Listar exames de admissão de um curso",
     *     description="Retorna todos os exames de admissão de um curso específico",
     *     operationId="listAdmissionExams",
     *     tags={"Admission Exams"},
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
     *         description="Filtrar por status (scheduled, marked)",
     *         required=false,
     *         @OA\Schema(type="string", enum={"scheduled", "marked"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de exames de admissão"
     *     )
     * )
     */
    public function index(Request $request, string $courseId): JsonResponse
    {
        // Se não houver usuário autenticado (rota admin), buscar sem filtro de escola
        if (!$request->user()) {
            $course = Course::findOrFail($courseId);
        } else {
            $school = $request->user();
            $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        }
        
        $query = AdmissionExam::where('course_id', $course->id);
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }
        
        $exams = $query->withCount('registrations')->get();
        
        return response()->json([
            'status' => 'success',
            'exams' => $exams,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/courses/{courseId}/admission-exams",
     *     summary="Criar novo exame de admissão",
     *     description="Cria um novo exame de admissão para um curso",
     *     operationId="createAdmissionExam",
     *     tags={"Admission Exams"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "status"},
     *             @OA\Property(property="name", type="string", example="Exame de Admissão 2025"),
     *             @OA\Property(property="description", type="string", example="Exame para ingresso no curso"),
     *             @OA\Property(property="status", type="string", enum={"scheduled", "marked"}, example="scheduled"),
     *             @OA\Property(property="exam_date", type="string", format="date-time", example="2025-02-15T10:00:00Z"),
     *             @OA\Property(property="registration_deadline", type="string", format="date-time", example="2025-02-10T23:59:59Z"),
     *             @OA\Property(property="max_candidates", type="integer", example=100),
     *             @OA\Property(property="exam_fee", type="number", format="float", example=50.00),
     *             @OA\Property(property="instructions", type="string", example="Instruções para o exame"),
     *             @OA\Property(property="exam_link", type="string", format="url", example="https://docs.google.com/forms/d/...", description="Link do exame (Google Forms, etc.)"),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Exame criado com sucesso"
     *     )
     * )
     */
    public function store(Request $request, string $courseId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:scheduled,marked',
            'exam_date' => 'nullable|date',
            'registration_deadline' => 'nullable|date|before_or_equal:exam_date',
            'max_candidates' => 'nullable|integer|min:1',
            'exam_fee' => 'nullable|numeric|min:0',
            'instructions' => 'nullable|string',
            'exam_link' => 'nullable|url',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);

        $exam = AdmissionExam::create([
            'course_id' => $course->id,
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'exam_date' => $request->exam_date,
            'registration_deadline' => $request->registration_deadline,
            'max_candidates' => $request->max_candidates,
            'exam_fee' => $request->exam_fee,
            'instructions' => $request->instructions,
            'exam_link' => $request->exam_link,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Exame de admissão criado com sucesso',
            'exam' => $exam,
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/courses/{courseId}/admission-exams/{examId}",
     *     summary="Obter detalhes de um exame",
     *     description="Retorna os detalhes de um exame de admissão específico",
     *     operationId="getAdmissionExam",
     *     tags={"Admission Exams"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="examId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do exame"
     *     )
     * )
     */
    public function show(Request $request, string $courseId, string $examId): JsonResponse
    {
        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        
        $exam = AdmissionExam::where('course_id', $course->id)
            ->findOrFail($examId);

        return response()->json([
            'status' => 'success',
            'exam' => $exam,
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/courses/{courseId}/admission-exams/{examId}",
     *     summary="Atualizar exame de admissão",
     *     description="Atualiza um exame de admissão existente",
     *     operationId="updateAdmissionExam",
     *     tags={"Admission Exams"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="examId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="status", type="string", enum={"scheduled", "marked"}),
     *             @OA\Property(property="exam_date", type="string", format="date-time"),
     *             @OA\Property(property="registration_deadline", type="string", format="date-time")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exame atualizado com sucesso"
     *     )
     * )
     */
    public function update(Request $request, string $courseId, string $examId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:scheduled,marked',
            'exam_date' => 'nullable|date',
            'registration_deadline' => 'nullable|date|before_or_equal:exam_date',
            'max_candidates' => 'nullable|integer|min:1',
            'exam_fee' => 'nullable|numeric|min:0',
            'instructions' => 'nullable|string',
            'exam_link' => 'nullable|url',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        
        $exam = AdmissionExam::where('course_id', $course->id)
            ->findOrFail($examId);
        
        $exam->update($request->only([
            'name',
            'description',
            'status',
            'exam_date',
            'registration_deadline',
            'max_candidates',
            'exam_fee',
            'instructions',
            'exam_link',
            'is_active',
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'Exame de admissão atualizado com sucesso',
            'exam' => $exam,
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/courses/{courseId}/admission-exams/{examId}",
     *     summary="Deletar exame de admissão",
     *     description="Desativa um exame de admissão",
     *     operationId="deleteAdmissionExam",
     *     tags={"Admission Exams"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="examId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exame desativado com sucesso"
     *     )
     * )
     */
    public function destroy(Request $request, string $courseId, string $examId): JsonResponse
    {
        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        
        $exam = AdmissionExam::where('course_id', $course->id)
            ->findOrFail($examId);
        
        $exam->update(['is_active' => false]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Exame de admissão desativado com sucesso',
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/courses/{courseId}/admission-exams/{examId}/registrations",
     *     summary="Listar inscrições em um exame",
     *     description="Retorna todas as inscrições de um exame de admissão",
     *     operationId="listExamRegistrations",
     *     tags={"Admission Exams"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="examId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string", format="uuid")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filtrar por status",
     *         required=false,
     *         @OA\Schema(type="string", enum={"registered", "completed", "passed", "failed"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de inscrições"
     *     )
     * )
     */
    public function registrations(Request $request, string $courseId, string $examId): JsonResponse
    {
        $school = $request->user();
        
        $course = Course::where('school_id', $school->id)->findOrFail($courseId);
        
        $exam = AdmissionExam::where('course_id', $course->id)
            ->findOrFail($examId);
        
        $query = \App\Models\ExamRegistration::where('admission_exam_id', $exam->id);
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        $registrations = $query->orderBy('created_at', 'desc')->get();
        
        // Estatísticas
        $stats = [
            'total' => \App\Models\ExamRegistration::where('admission_exam_id', $exam->id)->count(),
            'registered' => \App\Models\ExamRegistration::where('admission_exam_id', $exam->id)->where('status', 'registered')->count(),
            'passed' => \App\Models\ExamRegistration::where('admission_exam_id', $exam->id)->where('status', 'passed')->count(),
            'failed' => \App\Models\ExamRegistration::where('admission_exam_id', $exam->id)->where('status', 'failed')->count(),
        ];
        
        return response()->json([
            'status' => 'success',
            'registrations' => $registrations,
            'statistics' => $stats,
        ]);
    }
}

