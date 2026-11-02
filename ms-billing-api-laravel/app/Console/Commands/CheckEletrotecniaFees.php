<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CheckEletrotecniaFees extends Command
{
    protected $signature = 'fees:check-eletrotecnia';
    protected $description = 'Verifica quantos meses de propina existem para o curso de Eletrotecnia';

    public function handle()
    {
        $this->info('=== Verificando Propinas do Curso de Eletrotecnia ===');
        $this->newLine();
        
        // Buscar o curso de Eletrotecnia via API
        $schoolApiUrl = config('services.school_api.url', env('SCHOOL_API_URL', 'http://localhost:8003/api'));
        $apiSecret = config('services.school_api.secret', env('SCHOOL_API_SECRET', ''));
        
        if (empty($apiSecret)) {
            $this->error('API Secret não configurado!');
            return 1;
        }
        
        // Buscar todos os cursos
        $this->info('Buscando curso de Eletrotecnia...');
        $coursesResponse = Http::withHeaders([
            'X-API-Secret' => $apiSecret,
        ])->get($schoolApiUrl . '/admin/courses');
        
        if (!$coursesResponse->successful()) {
            $this->error('Erro ao buscar cursos: ' . $coursesResponse->status());
            return 1;
        }
        
        $coursesData = $coursesResponse->json();
        $courses = $coursesData['courses'] ?? $coursesData['data'] ?? [];
        
        $eletrotecniaCourse = null;
        foreach ($courses as $course) {
            $courseName = strtolower($course['name'] ?? '');
            if (strpos($courseName, 'electro') !== false || strpos($courseName, 'eletro') !== false) {
                $eletrotecniaCourse = $course;
                break;
            }
        }
        
        if (!$eletrotecniaCourse) {
            $this->warn('Curso de Eletrotecnia não encontrado via API.');
            $this->info('Verificando fees no banco de dados...');
            
            // Verificar fees que têm course_id
            $feesWithCourse = DB::table('fees')
                ->whereNotNull('course_id')
                ->get();
            
            $this->info('Total de fees com course_id: ' . $feesWithCourse->count());
            
            // Agrupar por course_id
            $feesByCourse = $feesWithCourse->groupBy('course_id');
            
            foreach ($feesByCourse as $courseId => $fees) {
                $months = $fees->map(function($fee) {
                    return \Carbon\Carbon::parse($fee->due_date)->format('Y-m');
                })->unique()->count();
                
                $this->info("Course ID: {$courseId}");
                $this->info("  Total fees: " . $fees->count());
                $this->info("  Total meses: {$months}");
            }
            
            return 0;
        }
        
        $courseId = $eletrotecniaCourse['id'];
        $courseName = $eletrotecniaCourse['name'] ?? 'N/A';
        $durationMonths = $eletrotecniaCourse['duration_months'] ?? 'N/A';
        $monthlyTuition = $eletrotecniaCourse['monthly_tuition'] ?? 'N/A';
        
        $this->info("Curso encontrado:");
        $this->info("  ID: {$courseId}");
        $this->info("  Nome: {$courseName}");
        $this->info("  Duração (meses): {$durationMonths}");
        $this->info("  Propina mensal: {$monthlyTuition}");
        $this->newLine();
        
        // Buscar fees deste curso
        $fees = DB::table('fees')
            ->where('course_id', $courseId)
            ->orderBy('due_date')
            ->get();
        
        $this->info("=== Fees no Banco de Dados ===");
        $this->info("Total de fees: " . $fees->count());
        
        if ($fees->count() > 0) {
            // Agrupar por mês/ano
            $months = [];
            foreach ($fees as $fee) {
                $date = \Carbon\Carbon::parse($fee->due_date);
                $monthKey = $date->format('Y-m');
                if (!isset($months[$monthKey])) {
                    $months[$monthKey] = [];
                }
                $months[$monthKey][] = $fee;
            }
            
            $this->newLine();
            $this->info("Total de meses únicos: " . count($months));
            $this->newLine();
            
            $this->info("Meses de propina:");
            ksort($months);
            foreach ($months as $month => $feesInMonth) {
                $this->info("  - {$month}: " . count($feesInMonth) . " propina(s)");
            }
            
            $this->newLine();
            $this->info("Primeiras 10 fees:");
            foreach ($fees->take(10) as $fee) {
                $this->info("  - Fee ID: {$fee->id}");
                $this->info("    Student: {$fee->student_id}");
                $this->info("    Amount: {$fee->amount}");
                $this->info("    Due Date: {$fee->due_date}");
                $this->info("    Status: {$fee->status}");
            }
        } else {
            $this->warn('Nenhuma fee encontrada para este curso!');
        }
        
        return 0;
    }
}

