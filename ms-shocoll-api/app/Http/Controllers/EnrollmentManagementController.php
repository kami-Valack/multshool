<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
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
        
        Log::info('Aprovando matrícula', [
            'enrollment_id' => $enrollmentId,
            'student_id' => $enrollment->student_id,
            'course_id' => $enrollment->course_id,
        ]);
        
        $enrollment->approve();
        
        Log::info('Matrícula aprovada, iniciando criação de propinas', [
            'enrollment_id' => $enrollment->id,
        ]);
        
        // Criar propinas automaticamente quando a matrícula é aprovada
        $this->createFeesForEnrollment($enrollment);
        
        Log::info('Processo de criação de propinas concluído', [
            'enrollment_id' => $enrollment->id,
        ]);
        
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
        
        // Criar propinas automaticamente quando a matrícula é aprovada
        $this->createFeesForEnrollment($enrollment);
        
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

    /**
     * Criar propinas automaticamente para uma matrícula aprovada
     */
    private function createFeesForEnrollment(Enrollment $enrollment): void
    {
        Log::info('createFeesForEnrollment chamado', [
            'enrollment_id' => $enrollment->id,
            'student_id' => $enrollment->student_id,
        ]);
        
        try {
            // Carregar o curso com os dados necessários
            $enrollment->load('course');
            $course = $enrollment->course;
            
            Log::info('Curso carregado', [
                'enrollment_id' => $enrollment->id,
                'course_id' => $course ? $course->id : 'null',
                'course_name' => $course ? $course->name : 'null',
            ]);
            
            if (!$course) {
                Log::warning('Curso não encontrado para criar propinas', [
                    'enrollment_id' => $enrollment->id,
                ]);
                return;
            }
            
            // Verificar se o curso tem duração e propina mensal
            $durationMonths = $course->duration_months ?? 0;
            $monthlyTuition = $course->monthly_tuition ?? 0;
            
            if ($durationMonths <= 0 || $monthlyTuition <= 0) {
                Log::warning('Curso sem duração ou propina mensal válida', [
                    'enrollment_id' => $enrollment->id,
                    'course_id' => $course->id,
                    'duration_months' => $durationMonths,
                    'monthly_tuition' => $monthlyTuition,
                ]);
                return;
            }
            
            // Verificar se já existem propinas para esta matrícula
            $studentApiUrl = config('services.student_api.url', env('STUDENT_API_URL', 'http://localhost:8001/api'));
            // O API Secret deve ser o mesmo que está configurado no ms-stundent-api-laravel-temp (.env: API_SECRET)
            // O middleware AuthenticateApiSecret espera o valor de API_SECRET
            $apiSecret = config('services.student_api.secret', env('STUDENT_API_SECRET', ''));
            
            if (empty($apiSecret)) {
                Log::error('API Secret não configurado! Verifique STUDENT_API_SECRET ou API_SECRET no .env', [
                    'enrollment_id' => $enrollment->id,
                ]);
                return;
            }
            
            Log::info('Configuração da API de estudantes', [
                'enrollment_id' => $enrollment->id,
                'student_api_url' => $studentApiUrl,
                'api_secret_set' => !empty($apiSecret),
                'api_secret_length' => strlen($apiSecret),
            ]);
            
            // Buscar propinas existentes
            $existingFeesResponse = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get("{$studentApiUrl}/student/{$enrollment->student_id}/fees", [
                'enrollment_id' => $enrollment->id,
            ]);
            
            if ($existingFeesResponse->successful()) {
                $existingFees = $existingFeesResponse->json('fees', []);
                if (count($existingFees) > 0) {
                    Log::info('Propinas já existem para esta matrícula', [
                        'enrollment_id' => $enrollment->id,
                        'existing_fees_count' => count($existingFees),
                    ]);
                    return;
                }
            } else {
                Log::warning('Erro ao verificar propinas existentes', [
                    'enrollment_id' => $enrollment->id,
                    'status' => $existingFeesResponse->status(),
                    'body' => $existingFeesResponse->body(),
                ]);
            }
            
            // Criar propinas para cada mês do curso
            $fees = [];
            $startDate = now(); // Data de início (data de aprovação)
            
            // Array de nomes de meses em português
            $monthNames = [
                1 => 'Janeiro', 2 => 'Fevereiro', 3 => 'Março', 4 => 'Abril',
                5 => 'Maio', 6 => 'Junho', 7 => 'Julho', 8 => 'Agosto',
                9 => 'Setembro', 10 => 'Outubro', 11 => 'Novembro', 12 => 'Dezembro'
            ];
            
            for ($month = 1; $month <= $durationMonths; $month++) {
                // Calcular data de vencimento (primeiro dia do mês seguinte)
                $dueDate = $startDate->copy()->addMonths($month)->startOfMonth();
                
                // Nome do mês em português
                $monthNumber = (int) $dueDate->format('n');
                $monthName = $monthNames[$monthNumber] ?? $dueDate->format('F');
                $year = $dueDate->year;
                
                $fees[] = [
                    'student_id' => $enrollment->student_id,
                    'enrollment_id' => $enrollment->id,
                    'amount' => $monthlyTuition,
                    'due_date' => $dueDate->format('Y-m-d'),
                    'status' => 'pending',
                    'description' => "Propina de {$monthName} de {$year} - {$course->name}",
                ];
            }
            
            // Log antes de criar propinas
            Log::info('Tentando criar propinas', [
                'enrollment_id' => $enrollment->id,
                'student_id' => $enrollment->student_id,
                'student_api_url' => $studentApiUrl,
                'fees_count' => count($fees),
                'duration_months' => $durationMonths,
                'monthly_tuition' => $monthlyTuition,
            ]);
            
            // Enviar propinas para a API de estudantes
            $createFeesResponse = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
                'Content-Type' => 'application/json',
            ])->post("{$studentApiUrl}/student/{$enrollment->student_id}/fees/bulk", [
                'fees' => $fees,
            ]);
            
            if ($createFeesResponse->successful()) {
                $responseData = $createFeesResponse->json();
                Log::info('Propinas criadas com sucesso', [
                    'enrollment_id' => $enrollment->id,
                    'fees_count' => count($fees),
                    'response' => $responseData,
                ]);
            } else {
                $errorBody = $createFeesResponse->body();
                $errorJson = json_decode($errorBody, true);
                Log::error('Erro ao criar propinas', [
                    'enrollment_id' => $enrollment->id,
                    'student_id' => $enrollment->student_id,
                    'status' => $createFeesResponse->status(),
                    'body' => $errorBody,
                    'error_message' => $errorJson['message'] ?? 'N/A',
                    'url' => "{$studentApiUrl}/student/{$enrollment->student_id}/fees/bulk",
                    'api_secret_set' => !empty($apiSecret),
                    'api_secret_preview' => !empty($apiSecret) ? substr($apiSecret, 0, 10) . '...' : 'vazio',
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Exceção ao criar propinas', [
                'enrollment_id' => $enrollment->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}

