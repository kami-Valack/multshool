<?php

// Script para verificar propinas do curso de Eletrotecnia
// Execute: php verificar_propinas_eletrotecnia.php

$host = 'localhost';
$dbname = 'multishol_student'; // Ajuste conforme seu banco
$username = 'root'; // Ajuste conforme seu usuário
$password = ''; // Ajuste conforme sua senha

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "=== Verificando Propinas do Curso de Eletrotecnia ===\n\n";
    
    // Primeiro, buscar o course_id do curso de Eletrotecnia no banco ms-shocoll-api
    // Vamos assumir que você tem acesso ao banco ou podemos buscar via API
    
    // Verificar fees que têm course_id
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM fees WHERE course_id IS NOT NULL");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Total de fees com course_id: " . $result['total'] . "\n\n";
    
    // Listar todos os course_ids únicos nas fees
    $stmt = $pdo->query("SELECT DISTINCT course_id, COUNT(*) as count FROM fees WHERE course_id IS NOT NULL GROUP BY course_id");
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Fees agrupadas por curso:\n";
    foreach ($courses as $course) {
        $courseId = $course['course_id'];
        $count = $course['count'];
        
        // Contar meses únicos para este curso
        $stmtMonths = $pdo->prepare("
            SELECT DISTINCT DATE_FORMAT(due_date, '%Y-%m') as month 
            FROM fees 
            WHERE course_id = ? 
            ORDER BY month
        ");
        $stmtMonths->execute([$courseId]);
        $months = $stmtMonths->fetchAll(PDO::FETCH_COLUMN);
        
        echo "  - Course ID: {$courseId}\n";
        echo "    Total de fees: {$count}\n";
        echo "    Total de meses: " . count($months) . "\n";
        echo "    Meses: " . implode(', ', $months) . "\n\n";
    }
    
    // Se você souber o course_id do curso de Eletrotecnia, pode buscar diretamente
    // Exemplo: $eletrotecniaCourseId = 'c021da95-46b4-4b90-866b-906fc8b710a1';
    
    // Buscar todas as fees para ver detalhes
    $stmt = $pdo->query("SELECT * FROM fees ORDER BY due_date LIMIT 20");
    $fees = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "\n=== Primeiras 20 Fees ===\n";
    foreach ($fees as $fee) {
        echo "Fee ID: {$fee['id']}\n";
        echo "  Student ID: {$fee['student_id']}\n";
        echo "  Course ID: " . ($fee['course_id'] ?? 'NULL') . "\n";
        echo "  Amount: {$fee['amount']}\n";
        echo "  Due Date: {$fee['due_date']}\n";
        echo "  Status: {$fee['status']}\n";
        echo "  Description: {$fee['description']}\n\n";
    }
    
} catch (PDOException $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
    echo "\nTente ajustar as credenciais do banco de dados no início do script.\n";
}

