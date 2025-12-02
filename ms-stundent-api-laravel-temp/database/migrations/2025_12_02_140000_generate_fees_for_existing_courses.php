<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Fee;
use App\Models\User;
use Illuminate\Support\Str;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Esta migration gera fees para todos os estudantes que têm matrículas em cursos existentes
     */
    public function up(): void
    {
        try {
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));
            
            if (empty($apiSecret)) {
                Log::warning('API Secret não configurado. Migration de fees não será executada.');
                return;
            }
            
            Log::info('Iniciando geração de fees para cursos existentes');
            
            // Buscar todos os estudantes
            $students = User::where('role', User::ROLE_STUDENT)->get();
            
            Log::info('Estudantes encontrados', ['count' => $students->count()]);
            
            $monthNames = [
                1 => 'Janeiro', 2 => 'Fevereiro', 3 => 'Março', 4 => 'Abril',
                5 => 'Maio', 6 => 'Junho', 7 => 'Julho', 8 => 'Agosto',
                9 => 'Setembro', 10 => 'Outubro', 11 => 'Novembro', 12 => 'Dezembro'
            ];
            
            $totalFeesCreated = 0;
            
            foreach ($students as $student) {
                try {
                    // Buscar todas as matrículas do estudante
                    $enrollmentsResponse = Http::withHeaders([
                        'X-API-Secret' => $apiSecret,
                    ])->get($schoolApiUrl . '/student/enrollments', [
                        'student_id' => $student->id,
                    ]);
                    
                    if (!$enrollmentsResponse->successful()) {
                        continue;
                    }
                    
                    $enrollmentsData = $enrollmentsResponse->json();
                    $enrollments = $enrollmentsData['enrollments'] ?? [];
                    
                    foreach ($enrollments as $enrollment) {
                        $courseId = $enrollment['course_id'] ?? null;
                        $enrollmentId = $enrollment['id'] ?? null;
                        
                        if (!$courseId) {
                            continue;
                        }
                        
                        // Verificar se já existem fees para este curso
                        $existingFees = Fee::where('student_id', $student->id)
                            ->where('course_id', $courseId)
                            ->count();
                        
                        if ($existingFees > 0) {
                            continue;
                        }
                        
                        // Buscar informações do curso
                        $courseResponse = Http::withHeaders([
                            'X-API-Secret' => $apiSecret,
                        ])->get($schoolApiUrl . '/courses/' . $courseId);
                        
                        if (!$courseResponse->successful()) {
                            continue;
                        }
                        
                        $courseData = $courseResponse->json();
                        $course = $courseData['course'] ?? $courseData;
                        
                        $durationMonths = $course['duration_months'] ?? 0;
                        $monthlyTuition = $course['monthly_tuition'] ?? 0;
                        
                        if ($durationMonths <= 0 || $monthlyTuition <= 0) {
                            continue;
                        }
                        
                        // Criar fees para cada mês do curso
                        $startDate = Carbon::now();
                        
                        for ($month = 1; $month <= $durationMonths; $month++) {
                            $dueDate = $startDate->copy()->addMonths($month)->startOfMonth();
                            $monthNumber = (int) $dueDate->format('n');
                            $monthName = $monthNames[$monthNumber] ?? $dueDate->format('F');
                            $year = $dueDate->year;
                            
                            try {
                                Fee::create([
                                    'id' => (string) Str::uuid(),
                                    'student_id' => $student->id,
                                    'enrollment_id' => $enrollmentId,
                                    'course_id' => $courseId,
                                    'amount' => $monthlyTuition,
                                    'due_date' => $dueDate->format('Y-m-d'),
                                    'status' => 'pending',
                                    'description' => "Propina de {$monthName} de {$year} - " . ($course['name'] ?? 'Curso'),
                                ]);
                                
                                $totalFeesCreated++;
                            } catch (\Exception $e) {
                                Log::error('Erro ao criar fee na migration', [
                                    'student_id' => $student->id,
                                    'course_id' => $courseId,
                                    'error' => $e->getMessage(),
                                ]);
                            }
                        }
                    }
                } catch (\Exception $e) {
                    Log::error('Erro ao processar estudante na migration', [
                        'student_id' => $student->id,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
            
            Log::info('Migration de fees concluída', [
                'total_fees_created' => $totalFeesCreated,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro na migration de fees', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Não fazer nada - manter as fees criadas
        // Se necessário, pode-se deletar fees criadas por esta migration
        // mas isso não é recomendado pois pode afetar dados importantes
    }
};

