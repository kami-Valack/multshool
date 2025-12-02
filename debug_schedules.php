<?php
/**
 * Script de debug para verificar a estrutura de dados e relacionamentos
 * Execute: php debug_schedules.php
 */

require __DIR__ . '/ms-shocoll-api/vendor/autoload.php';

$app = require_once __DIR__ . '/ms-shocoll-api/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Enrollment;
use App\Models\ClassStudent;
use App\Models\SchoolClass;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;

echo "=== DEBUG: Estrutura de Dados para Horários ===\n\n";

// 1. Verificar matrículas aprovadas
echo "1. MATRÍCULAS APROVADAS:\n";
echo str_repeat("-", 80) . "\n";
$enrollments = Enrollment::where('status', 'approved')
    ->with('course')
    ->get();

foreach ($enrollments as $enrollment) {
    echo "Enrollment ID: {$enrollment->id}\n";
    echo "  - Student ID: {$enrollment->student_id}\n";
    echo "  - Course ID: {$enrollment->course_id}\n";
    echo "  - Course Name: " . ($enrollment->course->name ?? 'N/A') . "\n";
    echo "  - Class (turma): " . ($enrollment->class ?? 'NULL') . "\n";
    echo "  - Status: {$enrollment->status}\n";
    echo "\n";
}

// 2. Verificar class_students (relacionamento aluno-turma)
echo "\n2. RELACIONAMENTOS ALUNO-TURMA (class_students):\n";
echo str_repeat("-", 80) . "\n";
$classStudents = ClassStudent::with(['enrollment', 'class'])
    ->get();

foreach ($classStudents as $cs) {
    echo "ClassStudent ID: {$cs->id}\n";
    echo "  - Class ID: {$cs->class_id}\n";
    echo "  - Class Name: " . ($cs->class->name ?? 'N/A') . "\n";
    echo "  - Enrollment ID: {$cs->enrollment_id}\n";
    echo "  - Student ID: {$cs->student_id}\n";
    echo "  - Enrollment Class: " . ($cs->enrollment->class ?? 'NULL') . "\n";
    echo "\n";
}

// 3. Verificar turmas (classes)
echo "\n3. TURMAS (classes):\n";
echo str_repeat("-", 80) . "\n";
$classes = SchoolClass::with(['course', 'enrollments'])
    ->get();

foreach ($classes as $class) {
    echo "Class ID: {$class->id}\n";
    echo "  - Name: {$class->name}\n";
    echo "  - Course ID: {$class->course_id}\n";
    echo "  - Course Name: " . ($class->course->name ?? 'N/A') . "\n";
    echo "  - Academic Year: {$class->academic_year}\n";
    echo "  - Students Count: " . $class->enrollments()->count() . "\n";
    echo "\n";
}

// 4. Verificar horários (schedules)
echo "\n4. HORÁRIOS (schedules):\n";
echo str_repeat("-", 80) . "\n";
$schedules = Schedule::with(['course', 'subject', 'class'])
    ->where('is_active', true)
    ->where('type', 'class')
    ->get();

foreach ($schedules as $schedule) {
    echo "Schedule ID: {$schedule->id}\n";
    echo "  - Class ID: " . ($schedule->class_id ?? 'NULL') . "\n";
    echo "  - Class Name: {$schedule->class_name}\n";
    echo "  - Course ID: {$schedule->course_id}\n";
    echo "  - Course Name: " . ($schedule->course->name ?? 'N/A') . "\n";
    echo "  - Subject: " . ($schedule->subject->name ?? 'N/A') . "\n";
    echo "  - Day: {$schedule->day_of_week}\n";
    echo "  - Time: {$schedule->start_time->format('H:i')} - {$schedule->end_time->format('H:i')}\n";
    echo "  - Is Active: " . ($schedule->is_active ? 'Yes' : 'No') . "\n";
    echo "\n";
}

// 5. Verificar correspondência entre Enrollment.class e Schedule.class_name
echo "\n5. VERIFICAÇÃO DE CORRESPONDÊNCIA:\n";
echo str_repeat("-", 80) . "\n";

$enrollmentsWithClass = Enrollment::where('status', 'approved')
    ->whereNotNull('class')
    ->get();

$schedulesByClassName = Schedule::where('is_active', true)
    ->where('type', 'class')
    ->get()
    ->groupBy('class_name');

echo "Matrículas com class preenchido:\n";
foreach ($enrollmentsWithClass as $enrollment) {
    $className = $enrollment->class;
    $matchingSchedules = $schedulesByClassName->get($className, collect());
    
    echo "  Enrollment ID: {$enrollment->id}\n";
    echo "    - Class: {$className}\n";
    echo "    - Horários encontrados: " . $matchingSchedules->count() . "\n";
    
    if ($matchingSchedules->isEmpty()) {
        echo "    - ⚠️ PROBLEMA: Nenhum horário encontrado para esta turma!\n";
        echo "    - Verificando variações...\n";
        
        // Verificar se há horários com nome similar (case-insensitive)
        $similarSchedules = Schedule::where('is_active', true)
            ->where('type', 'class')
            ->whereRaw('LOWER(TRIM(class_name)) = ?', [strtolower(trim($className))])
            ->get();
        
        if ($similarSchedules->isNotEmpty()) {
            echo "    - ✓ Encontrados " . $similarSchedules->count() . " horários com nome similar (case-insensitive)\n";
            foreach ($similarSchedules as $s) {
                echo "      - Schedule ID: {$s->id}, Class Name: {$s->class_name}\n";
            }
        } else {
            echo "    - ✗ Nenhum horário encontrado mesmo com busca case-insensitive\n";
        }
    }
    echo "\n";
}

// 6. Verificar via SQL direto
echo "\n6. VERIFICAÇÃO SQL DIRETA:\n";
echo str_repeat("-", 80) . "\n";

$sql = "
SELECT 
    e.id as enrollment_id,
    e.student_id,
    e.class as enrollment_class,
    cs.class_id,
    c.name as class_name,
    COUNT(s.id) as schedules_count
FROM enrollments e
LEFT JOIN class_students cs ON cs.enrollment_id = e.id
LEFT JOIN classes c ON c.id = cs.class_id
LEFT JOIN schedules s ON (s.class_id = c.id OR s.class_name = e.class) AND s.is_active = 1 AND s.type = 'class'
WHERE e.status = 'approved'
GROUP BY e.id, e.student_id, e.class, cs.class_id, c.name
";

$results = DB::select($sql);

foreach ($results as $result) {
    echo "Enrollment: {$result->enrollment_id}\n";
    echo "  - Student ID: {$result->student_id}\n";
    echo "  - Enrollment.class: " . ($result->enrollment_class ?? 'NULL') . "\n";
    echo "  - Class ID: " . ($result->class_id ?? 'NULL') . "\n";
    echo "  - Class Name: " . ($result->class_name ?? 'NULL') . "\n";
    echo "  - Schedules Count: {$result->schedules_count}\n";
    if ($result->schedules_count == 0) {
        echo "  - ⚠️ PROBLEMA: Nenhum horário encontrado!\n";
    }
    echo "\n";
}

echo "\n=== FIM DO DEBUG ===\n";

