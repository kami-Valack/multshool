<?php

namespace App\Http\Controllers;

use App\Models\Fee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FeeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/fees",
     *     summary="Listar propinas do estudante autenticado",
     *     description="Retorna todas as propinas do estudante autenticado",
     *     operationId="getFees",
     *     tags={"Fees"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de propinas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="fees", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="string", format="uuid"),
     *                 @OA\Property(property="student_id", type="string", format="uuid"),
     *                 @OA\Property(property="enrollment_id", type="string", format="uuid", nullable=true),
     *                 @OA\Property(property="amount", type="number", format="float"),
     *                 @OA\Property(property="due_date", type="string", format="date"),
     *                 @OA\Property(property="status", type="string", enum={"pending", "paid", "overdue"}),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             ))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $student = $request->user();
            
            if (!$student) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não autenticado',
                ], 401);
            }

            Log::info('Buscando propinas do estudante', [
                'student_id' => $student->id,
                'student_email' => $student->email,
            ]);

            // Buscar todas as propinas do estudante
            $fees = Fee::where('student_id', $student->id)
                ->orderBy('due_date', 'desc')
                ->get();

            Log::info('Propinas encontradas', [
                'student_id' => $student->id,
                'count' => $fees->count(),
                'fees' => $fees->map(function($fee) {
                    return [
                        'id' => $fee->id,
                        'enrollment_id' => $fee->enrollment_id,
                        'amount' => $fee->amount,
                        'due_date' => $fee->due_date,
                        'status' => $fee->status,
                    ];
                })->toArray(),
            ]);
            
            // SEMPRE verificar e criar fees se necessário (não apenas quando vazio)
            // Isso garante que fees sejam criadas mesmo que não existam ainda
            Log::info('Verificando e criando fees automaticamente se necessário', [
                'student_id' => $student->id,
                'current_fees_count' => $fees->count(),
            ]);
            
            // Criar fees baseado nos cursos do estudante
            $this->createFeesForApprovedEnrollments($student->id);
            
            // Buscar fees novamente após criação
            $fees = Fee::where('student_id', $student->id)
                ->orderBy('due_date', 'desc')
                ->get();
            
            Log::info('Fees após tentativa de criação automática', [
                'student_id' => $student->id,
                'count' => $fees->count(),
            ]);
            
            // Se ainda não houver fees após tentativa de criação, logar para debug
            if ($fees->isEmpty()) {
                Log::warning('Nenhuma fee foi criada após tentativa automática', [
                    'student_id' => $student->id,
                    'message' => 'Verifique os logs anteriores para identificar o problema',
                ]);
            }

            // Atualizar status de propinas vencidas
            $now = now();
            foreach ($fees as $fee) {
                if ($fee->status === 'pending' && $fee->due_date < $now) {
                    $fee->status = 'overdue';
                    $fee->save();
                }
            }

            // Recarregar para ter os status atualizados
            $fees = Fee::where('student_id', $student->id)
                ->orderBy('due_date', 'desc')
                ->get();

            // Calcular total de meses de propina baseado na duração do curso
            // Agrupar fees por curso e buscar duração de cada curso
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));
            
            $feesByCourse = $fees->groupBy('course_id')->map(function($courseFees, $courseId) use ($schoolApiUrl, $apiSecret) {
                // Buscar informações do curso para obter duration_months
                $courseDuration = null;
                if ($courseId && !empty($apiSecret)) {
                    try {
                        $courseResponse = Http::withHeaders([
                            'X-API-Secret' => $apiSecret,
                        ])->get($schoolApiUrl . '/courses/' . $courseId);
                        
                        if ($courseResponse->successful()) {
                            $courseData = $courseResponse->json();
                            $course = $courseData['course'] ?? $courseData;
                            $courseDuration = $course['duration_months'] ?? null;
                        }
                    } catch (\Exception $e) {
                        // Ignorar erro
                    }
                }
                
                // Contar meses únicos das fees existentes
                $uniqueMonths = $courseFees->map(function($fee) {
                    $date = \Carbon\Carbon::parse($fee->due_date);
                    return $date->format('Y-m');
                })->unique()->count();
                
                return [
                    'course_id' => $courseId,
                    'total_months' => $courseDuration ?? $uniqueMonths, // Usar duration_months se disponível, senão contar meses únicos
                    'fees_count' => $courseFees->count(),
                    'course_duration_months' => $courseDuration,
                ];
            });
            
            // Calcular total geral de meses (soma da duração de todos os cursos)
            $totalMonths = $feesByCourse->sum('total_months');

            return response()->json([
                'status' => 'success',
                'fees' => $fees,
                'summary' => [
                    'total_fees' => $fees->count(),
                    'total_months' => $totalMonths, // Soma dos meses baseado na duração dos cursos
                    'by_course' => $feesByCourse->values(),
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao listar propinas', [
                'student_id' => $request->user()->id ?? 'N/A',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar propinas',
            ], 500);
        }
    }

    /**
     * Criar propinas em lote (usado pela API de escolas ao aprovar matrícula)
     */
    public function bulkCreate(Request $request, string $studentId): JsonResponse
    {
        try {
            Log::info('Recebendo requisição para criar propinas em lote', [
                'student_id' => $studentId,
                'fees_count' => count($request->fees ?? []),
            ]);

            $validator = Validator::make($request->all(), [
                'fees' => 'required|array|min:1',
                'fees.*.enrollment_id' => 'required|uuid',
                'fees.*.amount' => 'required|numeric|min:0',
                'fees.*.due_date' => 'required|date',
                'fees.*.status' => 'required|in:pending,paid,overdue',
                'fees.*.description' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                Log::warning('Erro de validação ao criar propinas', [
                    'student_id' => $studentId,
                    'errors' => $validator->errors(),
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro de validação',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $fees = [];
            foreach ($request->fees as $feeData) {
                try {
                    $fee = Fee::create([
                        'id' => (string) Str::uuid(),
                        'student_id' => $studentId,
                        'enrollment_id' => $feeData['enrollment_id'],
                        'amount' => $feeData['amount'],
                        'due_date' => $feeData['due_date'],
                        'status' => $feeData['status'] ?? 'pending',
                        'description' => $feeData['description'],
                    ]);
                    $fees[] = $fee;
                    Log::info('Propina criada', [
                        'fee_id' => $fee->id,
                        'student_id' => $studentId,
                        'enrollment_id' => $feeData['enrollment_id'],
                        'amount' => $feeData['amount'],
                    ]);
                } catch (\Exception $e) {
                    Log::error('Erro ao criar propina individual', [
                        'student_id' => $studentId,
                        'fee_data' => $feeData,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            Log::info('Propinas criadas com sucesso', [
                'student_id' => $studentId,
                'created_count' => count($fees),
                'requested_count' => count($request->fees),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => count($fees) . ' propina(s) criada(s) com sucesso',
                'fees' => $fees,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar propinas em lote', [
                'student_id' => $studentId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Erro interno do servidor ao criar propinas.',
            ], 500);
        }
    }

    /**
     * Listar propinas de um estudante (rota pública com API Secret)
     */
    public function getByStudentId(Request $request, string $studentId): JsonResponse
    {
        try {
            $query = Fee::where('student_id', $studentId);
            
            if ($request->has('enrollment_id')) {
                $query->where('enrollment_id', $request->enrollment_id);
            }

            $fees = $query->orderBy('due_date', 'asc')->get();

            return response()->json([
                'status' => 'success',
                'fees' => $fees,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao listar propinas do estudante', [
                'student_id' => $studentId,
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Erro interno do servidor ao listar propinas.',
            ], 500);
        }
    }

    /**
     * Criar fees automaticamente baseado nos cursos do estudante (não depende de aprovação)
     */
    private function createFeesForApprovedEnrollments(string $studentId): void
    {
        try {
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));
            
            if (empty($apiSecret)) {
                Log::warning('API Secret não configurado para buscar matrículas', [
                    'student_id' => $studentId,
                ]);
                return;
            }
            
            // Buscar TODAS as matrículas (não apenas aprovadas) para gerar fees baseado no curso
            $enrollmentsResponse = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($schoolApiUrl . '/student/enrollments', [
                'student_id' => $studentId,
                // Não filtrar por status - buscar todas as matrículas
            ]);
            
            if (!$enrollmentsResponse->successful()) {
                Log::warning('Erro ao buscar matrículas', [
                    'student_id' => $studentId,
                    'status' => $enrollmentsResponse->status(),
                    'response_body' => $enrollmentsResponse->body(),
                ]);
                return;
            }
            
            $enrollmentsData = $enrollmentsResponse->json();
            $enrollments = $enrollmentsData['enrollments'] ?? [];
            
            Log::info('Resposta da API de matrículas', [
                'student_id' => $studentId,
                'enrollments_count' => count($enrollments),
                'enrollments_data' => $enrollments,
            ]);
            
            if (empty($enrollments)) {
                Log::warning('Nenhuma matrícula encontrada para o estudante - não será possível criar fees', [
                    'student_id' => $studentId,
                    'api_url' => $schoolApiUrl . '/student/enrollments',
                    'api_secret_set' => !empty($apiSecret),
                ]);
                return;
            }
            
            Log::info('Matrículas encontradas para criar fees baseado no curso', [
                'student_id' => $studentId,
                'enrollments_count' => count($enrollments),
            ]);
            
            // Para cada matrícula, verificar se já tem fees para o curso e criar se necessário
            foreach ($enrollments as $enrollment) {
                $enrollmentId = $enrollment['id'] ?? null;
                $courseId = $enrollment['course_id'] ?? null;
                
                if (!$courseId) {
                    continue;
                }
                
                // Verificar se já existem fees para este curso
                // Se já existirem, pular (não criar duplicatas)
                $existingFees = Fee::where('student_id', $studentId)
                    ->where('course_id', $courseId)
                    ->count();
                
                if ($existingFees > 0) {
                    Log::info('Fees já existem para este curso - pulando criação', [
                        'student_id' => $studentId,
                        'course_id' => $courseId,
                        'existing_fees_count' => $existingFees,
                    ]);
                    continue;
                }
                
                Log::info('Nenhuma fee encontrada para este curso - criando fees', [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                    'enrollment_id' => $enrollmentId,
                ]);
                
                // Buscar informações do curso
                Log::info('Buscando informações do curso', [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                    'url' => $schoolApiUrl . '/courses/' . $courseId,
                ]);
                
                $courseResponse = Http::withHeaders([
                    'X-API-Secret' => $apiSecret,
                ])->get($schoolApiUrl . '/courses/' . $courseId);
                
                if (!$courseResponse->successful()) {
                    Log::warning('Erro ao buscar informações do curso', [
                        'student_id' => $studentId,
                        'enrollment_id' => $enrollmentId,
                        'course_id' => $courseId,
                        'status' => $courseResponse->status(),
                        'response_body' => $courseResponse->body(),
                    ]);
                    continue;
                }
                
                $courseData = $courseResponse->json();
                
                // A resposta pode vir em 'course' ou diretamente
                $course = $courseData['course'] ?? $courseData;
                
                // Também verificar em 'tuition_info' se disponível
                $tuitionInfo = $courseData['tuition_info'] ?? [];
                
                Log::info('Dados do curso recebidos', [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                    'course_data' => $course,
                    'tuition_info' => $tuitionInfo,
                ]);
                
                // Buscar duration_months e monthly_tuition de várias fontes possíveis
                $durationMonths = $course['duration_months'] ?? $tuitionInfo['duration_months'] ?? 0;
                $monthlyTuition = $course['monthly_tuition'] ?? $tuitionInfo['monthly_tuition'] ?? 0;
                
                Log::info('Informações do curso obtidas', [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                    'course_name' => $course['name'] ?? 'N/A',
                    'duration_months' => $durationMonths,
                    'monthly_tuition' => $monthlyTuition,
                ]);
                
                // Se não tiver duração configurada, usar duração padrão de 12 meses
                if ($durationMonths <= 0) {
                    $durationMonths = 12; // Duração padrão de 1 ano
                    Log::info('Curso sem duração configurada, usando duração padrão de 12 meses', [
                        'student_id' => $studentId,
                        'course_id' => $courseId,
                    ]);
                }
                
                // Se não tiver valor configurado, usar 0 (será exibido mas sem valor)
                if ($monthlyTuition <= 0) {
                    $monthlyTuition = 0;
                    Log::info('Curso sem valor de propina configurado, usando valor 0', [
                        'student_id' => $studentId,
                        'course_id' => $courseId,
                    ]);
                }
                
                // Criar fees para cada mês do curso (sempre criar, mesmo sem valor)
                $fees = [];
                $startDate = now();
                
                $monthNames = [
                    1 => 'Janeiro', 2 => 'Fevereiro', 3 => 'Março', 4 => 'Abril',
                    5 => 'Maio', 6 => 'Junho', 7 => 'Julho', 8 => 'Agosto',
                    9 => 'Setembro', 10 => 'Outubro', 11 => 'Novembro', 12 => 'Dezembro'
                ];
                
                Log::info('Iniciando criação de fees', [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                    'duration_months' => $durationMonths,
                    'monthly_tuition' => $monthlyTuition,
                ]);
                
                for ($month = 1; $month <= $durationMonths; $month++) {
                    $dueDate = $startDate->copy()->addMonths($month)->startOfMonth();
                    $monthNumber = (int) $dueDate->format('n');
                    $monthName = $monthNames[$monthNumber] ?? $dueDate->format('F');
                    $year = $dueDate->year;
                    
                    try {
                        $fee = Fee::create([
                            'id' => (string) Str::uuid(),
                            'student_id' => $studentId,
                            'enrollment_id' => $enrollmentId,
                            'course_id' => $courseId,
                            'amount' => $monthlyTuition, // Pode ser 0 se não configurado
                            'due_date' => $dueDate->format('Y-m-d'),
                            'status' => 'pending',
                            'description' => "Propina de {$monthName} de {$year} - " . ($course['name'] ?? 'Curso'),
                        ]);
                        
                        $fees[] = $fee;
                        
                        Log::info('Fee criada automaticamente', [
                            'fee_id' => $fee->id,
                            'student_id' => $studentId,
                            'enrollment_id' => $enrollmentId,
                            'course_id' => $courseId,
                            'amount' => $fee->amount,
                            'due_date' => $fee->due_date,
                            'month' => $month,
                            'total_months' => $durationMonths,
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Erro ao criar fee individual', [
                            'student_id' => $studentId,
                            'enrollment_id' => $enrollmentId,
                            'course_id' => $courseId,
                            'month' => $month,
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString(),
                        ]);
                    }
                }
                
                Log::info('Fees criadas automaticamente para curso', [
                    'student_id' => $studentId,
                    'course_id' => $courseId,
                    'enrollment_id' => $enrollmentId,
                    'fees_created' => count($fees),
                    'duration_months' => $durationMonths,
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Erro ao criar fees automaticamente baseado nos cursos', [
                'student_id' => $studentId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}

