<?php

require __DIR__ . '/ms-stundent-api-laravel-temp/vendor/autoload.php';

$app = require_once __DIR__ . '/ms-stundent-api-laravel-temp/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

try {
    echo "=== Verificando Propinas do Curso de Eletrotecnia ===\n\n";
    
    // Primeiro, buscar o curso de Eletrotecnia no ms-shocoll-api
    $schoolApiUrl = env('SCHOOL_API_URL', 'http://localhost:8003/api');
    $apiSecret = env('SCHOOL_API_SECRET', '');
    
    echo "Buscando curso de Eletrotecnia...\n";
    
    // Buscar todos os cursos e encontrar Eletrotecnia
    $coursesResponse = \Illuminate\Support\Facades\Http::withHeaders([
        'X-API-Secret' => $apiSecret,
    ])->get($schoolApiUrl . '/admin/courses');
    
    $courses = [];
    if ($coursesResponse->successful()) {
        $data = $coursesResponse->json();
        $courses = $data['courses'] ?? $data['data'] ?? [];
    }
    
    $eletrotecniaCourse = null;
    foreach ($courses as $course) {
        if (stripos($course['name'] ?? '', 'electro') !== false || 
            stripos($course['name'] ?? '', 'eletro') !== false) {
            $eletrotecniaCourse = $course;
            break;
        }
    }
    
    if (!$eletrotecniaCourse) {
        echo "Curso de Eletrotecnia não encontrado via API. Buscando diretamente no banco...\n";
        
        // Tentar buscar diretamente no banco do ms-shocoll-api
        $shocollDb = DB::connection('mysql'); // Assumindo que está no mesmo banco ou configurado
        
        // Mas vamos focar nas fees que já existem
    }
    
    echo "\n=== Verificando Fees no Banco de Dados ===\n\n";
    
    // Buscar todas as fees que têm course_id relacionado a Eletrotecnia
    // Primeiro, vamos ver todas as fees e seus course_ids
    $fees = DB::table('fees')
        ->select('fees.*')
        ->get();
    
    echo "Total de fees no banco: " . $fees->count() . "\n\n";
    
    if ($fees->count() > 0) {
        echo "Primeiras 10 fees:\n";
        foreach ($fees->take(10) as $fee) {
            echo "  - Fee ID: {$fee->id}\n";
            echo "    Student ID: {$fee->student_id}\n";
            echo "    Course ID: " . ($fee->course_id ?? 'NULL') . "\n";
            echo "    Amount: {$fee->amount}\n";
            echo "    Due Date: {$fee->due_date}\n";
            echo "    Status: {$fee->status}\n";
            echo "    Description: {$fee->description}\n";
            echo "\n";
        }
    }
    
    // Se temos course_id nas fees, buscar fees por course_id
    if ($eletrotecniaCourse) {
        $courseId = $eletrotecniaCourse['id'];
        echo "\n=== Fees do Curso de Eletrotecnia ===\n";
        echo "Course ID: {$courseId}\n";
        echo "Course Name: " . ($eletrotecniaCourse['name'] ?? 'N/A') . "\n";
        echo "Duration Months: " . ($eletrotecniaCourse['duration_months'] ?? 'N/A') . "\n";
        echo "Monthly Tuition: " . ($eletrotecniaCourse['monthly_tuition'] ?? 'N/A') . "\n\n";
        
        $eletrotecniaFees = DB::table('fees')
            ->where('course_id', $courseId)
            ->get();
        
        echo "Total de fees para este curso: " . $eletrotecniaFees->count() . "\n";
        
        if ($eletrotecniaFees->count() > 0) {
            // Agrupar por mês/ano
            $months = [];
            foreach ($eletrotecniaFees as $fee) {
                $date = \Carbon\Carbon::parse($fee->due_date);
                $monthKey = $date->format('Y-m');
                if (!isset($months[$monthKey])) {
                    $months[$monthKey] = [];
                }
                $months[$monthKey][] = $fee;
            }
            
            echo "Total de meses únicos: " . count($months) . "\n\n";
            
            echo "Meses de propina:\n";
            ksort($months);
            foreach ($months as $month => $feesInMonth) {
                echo "  - {$month}: " . count($feesInMonth) . " propina(s)\n";
            }
        }
    } else {
        // Buscar fees que têm course_id não nulo
        $feesWithCourse = DB::table('fees')
            ->whereNotNull('course_id')
            ->get();
        
        echo "\nFees com course_id: " . $feesWithCourse->count() . "\n";
        
        // Agrupar por course_id
        $feesByCourse = $feesWithCourse->groupBy('course_id');
        
        echo "\nFees agrupadas por curso:\n";
        foreach ($feesByCourse as $courseId => $courseFees) {
            $months = [];
            foreach ($courseFees as $fee) {
                $date = \Carbon\Carbon::parse($fee->due_date);
                $monthKey = $date->format('Y-m');
                if (!isset($months[$monthKey])) {
                    $months[$monthKey] = [];
                }
                $months[$monthKey][] = $fee;
            }
            
            echo "  - Course ID: {$courseId}\n";
            echo "    Total fees: " . $courseFees->count() . "\n";
            echo "    Total meses: " . count($months) . "\n";
        }
    }
    
} catch (\Exception $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

