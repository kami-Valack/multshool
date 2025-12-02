<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ScheduleController extends Controller
{
    /**
     * Lista os horários do estudante autenticado
     * Busca horários baseado nas matrículas aprovadas do estudante
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $student = $request->user();
            $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
            $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));
            $scheduleType = $request->input('type', 'class'); // 'class' ou 'exam'

            Log::info('Buscando horários para estudante', [
                'student_id' => $student->id,
                'schedule_type' => $scheduleType,
            ]);

            // Primeiro, buscar as matrículas aprovadas do estudante
            $enrollmentsResponse = Http::withHeaders([
                'X-API-Secret' => $apiSecret,
            ])->get($schoolApiUrl . '/student/enrollments', [
                'student_id' => $student->id,
                'status' => 'approved',
            ]);

            if (!$enrollmentsResponse->successful()) {
                Log::warning('Erro ao buscar matrículas do estudante', [
                    'student_id' => $student->id,
                    'status' => $enrollmentsResponse->status(),
                ]);
                return response()->json([
                    'status' => 'success',
                    'schedules' => [],
                ]);
            }

            $enrollmentsData = $enrollmentsResponse->json();
            $enrollments = $enrollmentsData['enrollments'] ?? [];

            if (empty($enrollments)) {
                return response()->json([
                    'status' => 'success',
                    'schedules' => [],
                ]);
            }

            // Extrair class_names, class_ids e course_ids das matrículas aprovadas
            $classNames = [];
            $classIds = [];
            $courseIds = [];
            
            Log::info('Processando matrículas para buscar horários', [
                'student_id' => $student->id,
                'enrollments_count' => count($enrollments),
                'enrollments_data' => $enrollments, // Log completo para debug
            ]);
            
            foreach ($enrollments as $enrollment) {
                // Prioridade 1: class_id (mais preciso)
                if (isset($enrollment['class_id']) && !empty($enrollment['class_id'])) {
                    $classIds[] = $enrollment['class_id'];
                    Log::info('Encontrado class_id na matrícula', [
                        'enrollment_id' => $enrollment['id'] ?? null,
                        'class_id' => $enrollment['class_id'],
                    ]);
                }
                
                // Prioridade 2: class_name do relacionamento
                if (isset($enrollment['class_name']) && !empty($enrollment['class_name'])) {
                    $classNames[] = trim($enrollment['class_name']);
                    Log::info('Encontrado class_name na matrícula (do relacionamento)', [
                        'enrollment_id' => $enrollment['id'] ?? null,
                        'class_name' => $enrollment['class_name'],
                    ]);
                }
                
                // Prioridade 3: class (campo direto do enrollment)
                if (isset($enrollment['class']) && !empty($enrollment['class'])) {
                    $className = trim($enrollment['class']);
                    if (!in_array($className, $classNames)) {
                        $classNames[] = $className;
                    }
                    Log::info('Encontrado class na matrícula (campo direto)', [
                        'enrollment_id' => $enrollment['id'] ?? null,
                        'class' => $enrollment['class'],
                    ]);
                }
                
                if (isset($enrollment['course_id']) && !empty($enrollment['course_id'])) {
                    $courseIds[] = $enrollment['course_id'];
                }
            }
            
            // Remover duplicatas
            $classNames = array_values(array_unique(array_filter($classNames)));
            $classIds = array_values(array_unique(array_filter($classIds)));
            $courseIds = array_values(array_unique(array_filter($courseIds)));

            Log::info('Filtros extraídos das matrículas', [
                'class_names' => $classNames,
                'class_ids' => $classIds,
                'course_ids' => $courseIds,
            ]);

            if (empty($classNames) && empty($classIds) && empty($courseIds)) {
                Log::warning('Nenhum filtro encontrado nas matrículas', [
                    'student_id' => $student->id,
                ]);
                return response()->json([
                    'status' => 'success',
                    'schedules' => [],
                ]);
            }

            // Buscar horários da escola usando API Secret
            $schedules = [];
            
            // Para exames, priorizar busca por course_id (exames podem não estar vinculados a turmas específicas)
            // Para aulas, priorizar busca por class_name/class_id
            if ($scheduleType === 'exam' && !empty($courseIds)) {
                // Buscar exames por course_id primeiro
                foreach ($courseIds as $courseId) {
                    try {
                        Log::info('Buscando exames por course_id (prioridade para exames)', [
                            'course_id' => $courseId,
                        ]);
                        
                        $response = Http::withHeaders([
                            'X-API-Secret' => $apiSecret,
                        ])->get($schoolApiUrl . '/student/schedules', [
                            'course_id' => $courseId,
                            'type' => $scheduleType,
                            'is_active' => true,
                        ]);

                        if ($response->successful()) {
                            $data = $response->json();
                            if (isset($data['schedules']) && is_array($data['schedules'])) {
                                Log::info('Exames encontrados por course_id', [
                                    'course_id' => $courseId,
                                    'count' => count($data['schedules']),
                                ]);
                                
                                foreach ($data['schedules'] as $schedule) {
                                    $exists = false;
                                    foreach ($schedules as $existing) {
                                        if (isset($existing['id']) && isset($schedule['id']) && $existing['id'] === $schedule['id']) {
                                            $exists = true;
                                            break;
                                        }
                                    }
                                    if (!$exists) {
                                        $schedules[] = $schedule;
                                    }
                                }
                            }
                        }
                    } catch (\Exception $e) {
                        Log::error('Erro ao buscar exames por course_id', [
                            'course_id' => $courseId,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }
            }
            
            // Buscar horários por class_name (nome da turma)
            foreach ($classNames as $className) {
                try {
                    Log::info('Buscando horários por class_name', [
                        'class_name' => $className,
                    ]);
                    
                    $response = Http::withHeaders([
                        'X-API-Secret' => $apiSecret,
                    ])->get($schoolApiUrl . '/student/schedules', [
                        'class_name' => $className,
                        'type' => $scheduleType, // 'class' ou 'exam'
                        'is_active' => true,
                    ]);

                    if ($response->successful()) {
                        $data = $response->json();
                        if (isset($data['schedules']) && is_array($data['schedules'])) {
                            Log::info('Horários encontrados por class_name', [
                                'class_name' => $className,
                                'count' => count($data['schedules']),
                            ]);
                            $schedules = array_merge($schedules, $data['schedules']);
                        } else {
                            Log::warning('Resposta sem schedules', [
                                'class_name' => $className,
                                'response' => $data ?? null,
                            ]);
                        }
                    } else {
                        Log::warning('Erro na resposta ao buscar horários por class_name', [
                            'class_name' => $className,
                            'status' => $response->status(),
                            'response' => $response->json(),
                        ]);
                    }
                } catch (\Exception $e) {
                    Log::error('Erro ao buscar horários por class_name', [
                        'class_name' => $className,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                    ]);
                }
            }
            
            // Buscar horários por class_id (se disponível)
            foreach ($classIds as $classId) {
                try {
                    Log::info('Buscando horários por class_id', [
                        'class_id' => $classId,
                    ]);
                    
                    $response = Http::withHeaders([
                        'X-API-Secret' => $apiSecret,
                    ])->get($schoolApiUrl . '/student/schedules', [
                        'class_id' => $classId,
                        'type' => $scheduleType,
                        'is_active' => true,
                    ]);

                    if ($response->successful()) {
                        $data = $response->json();
                        if (isset($data['schedules']) && is_array($data['schedules'])) {
                            Log::info('Horários encontrados por class_id', [
                                'class_id' => $classId,
                                'count' => count($data['schedules']),
                            ]);
                            $schedules = array_merge($schedules, $data['schedules']);
                        }
                    }
                } catch (\Exception $e) {
                    Log::error('Erro ao buscar horários por class_id', [
                        'class_id' => $classId,
                        'error' => $e->getMessage(),
                    ]);
                }
            }
            
            // Buscar horários por course_id (sempre buscar, não apenas como fallback)
            // Isso é importante para exames que podem não estar vinculados a uma turma específica
            if (!empty($courseIds)) {
                foreach ($courseIds as $courseId) {
                    try {
                        Log::info('Buscando horários por course_id', [
                            'course_id' => $courseId,
                            'type' => $scheduleType,
                            'current_count' => count($schedules),
                        ]);
                        
                        $response = Http::withHeaders([
                            'X-API-Secret' => $apiSecret,
                        ])->get($schoolApiUrl . '/student/schedules', [
                            'course_id' => $courseId,
                            'type' => $scheduleType,
                            'is_active' => true,
                        ]);

                        if ($response->successful()) {
                            $data = $response->json();
                            if (isset($data['schedules']) && is_array($data['schedules'])) {
                                Log::info('Horários encontrados por course_id', [
                                    'course_id' => $courseId,
                                    'count' => count($data['schedules']),
                                    'type' => $scheduleType,
                                ]);
                                
                                // Adicionar apenas se não estiver duplicado
                                foreach ($data['schedules'] as $schedule) {
                                    $exists = false;
                                    foreach ($schedules as $existing) {
                                        if (isset($existing['id']) && isset($schedule['id']) && $existing['id'] === $schedule['id']) {
                                            $exists = true;
                                            break;
                                        }
                                    }
                                    if (!$exists) {
                                        $schedules[] = $schedule;
                                    }
                                }
                            }
                        } else {
                            Log::warning('Erro na resposta ao buscar horários por course_id', [
                                'course_id' => $courseId,
                                'status' => $response->status(),
                                'response' => $response->json(),
                            ]);
                        }
                    } catch (\Exception $e) {
                        Log::error('Erro ao buscar horários por course_id', [
                            'course_id' => $courseId,
                            'error' => $e->getMessage(),
                        ]);
                    }
                }
            }

            // Remover duplicatas baseado no ID
            $uniqueSchedules = [];
            $seenIds = [];
            foreach ($schedules as $schedule) {
                $scheduleId = $schedule['id'] ?? null;
                if ($scheduleId && !in_array($scheduleId, $seenIds)) {
                    $seenIds[] = $scheduleId;
                    $uniqueSchedules[] = $schedule;
                }
            }

            // Ordenar por dia da semana e hora
            usort($uniqueSchedules, function ($a, $b) {
                $dayOrder = [
                    'monday' => 1,
                    'tuesday' => 2,
                    'wednesday' => 3,
                    'thursday' => 4,
                    'friday' => 5,
                    'saturday' => 6,
                    'sunday' => 7,
                ];
                
                $dayA = $dayOrder[$a['day_of_week'] ?? ''] ?? 99;
                $dayB = $dayOrder[$b['day_of_week'] ?? ''] ?? 99;
                
                if ($dayA !== $dayB) {
                    return $dayA <=> $dayB;
                }
                
                $timeA = $a['start_time'] ?? '00:00';
                $timeB = $b['start_time'] ?? '00:00';
                
                return strcmp($timeA, $timeB);
            });

            return response()->json([
                'status' => 'success',
                'schedules' => $uniqueSchedules,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar horários do estudante', [
                'student_id' => $request->user()->id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar horários',
            ], 500);
        }
    }
}

