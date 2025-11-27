<?php
/**
 * Script para Login de Escola e Aprovação de Matrículas
 * 
 * Faz login com a conta de escola e aprova todas as matrículas pendentes
 * 
 * Uso: php aprovar_matriculas.php
 */

// Configurações
$usersApiUrl = 'http://localhost:8000/api';
$schoolApiUrl = 'http://localhost:8003/api';

// Credenciais da escola
$email = 'escola.teste.1764170091.4183@ist.ao';
$password = 'Senha123!';

// Cores para output
$colors = [
    'reset' => "\033[0m",
    'green' => "\033[32m",
    'red' => "\033[31m",
    'yellow' => "\033[33m",
    'blue' => "\033[34m",
    'cyan' => "\033[36m",
];

function printStep($step, $message) {
    global $colors;
    echo $colors['cyan'] . "{$step} {$message}" . $colors['reset'] . "\n";
}

function printSuccess($message) {
    global $colors;
    echo $colors['green'] . "✅ {$message}" . $colors['reset'] . "\n";
}

function printError($message) {
    global $colors;
    echo $colors['red'] . "❌ {$message}" . $colors['reset'] . "\n";
}

function printWarning($message) {
    global $colors;
    echo $colors['yellow'] . "⚠️  {$message}" . $colors['reset'] . "\n";
}

function printInfo($message) {
    global $colors;
    echo $colors['blue'] . "ℹ️  {$message}" . $colors['reset'] . "\n";
}

function makeRequest($url, $method = 'GET', $data = null, $headers = []) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    if (!empty($headers)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    } else {
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return [
            'code' => 0,
            'body' => $error,
            'data' => null,
            'error' => $error
        ];
    }
    
    return [
        'code' => $httpCode,
        'body' => $response,
        'data' => json_decode($response, true)
    ];
}

echo "\n";
echo "═══════════════════════════════════════════════════════════════\n";
echo "🏫 LOGIN DE ESCOLA E APROVAÇÃO DE MATRÍCULAS\n";
echo "═══════════════════════════════════════════════════════════════\n\n";

// ============================================
// 1. LOGIN DA ESCOLA
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "1️⃣  LOGIN DA ESCOLA\n";
echo str_repeat("═", 60) . "\n\n";

printStep("1.1", "Fazendo login com: {$email}");

$loginData = [
    'email' => $email,
    'password' => $password
];

$loginResponse = makeRequest(
    "{$usersApiUrl}/auth/login",
    'POST',
    $loginData
);

if ($loginResponse['code'] !== 200) {
    printError("Erro ao fazer login");
    printError("Código HTTP: " . $loginResponse['code']);
    printError("Resposta: " . $loginResponse['body']);
    exit(1);
}

$loginResult = $loginResponse['data'];

if (!isset($loginResult['accessToken'])) {
    printError("Token de acesso não recebido");
    printError("Resposta: " . $loginResponse['body']);
    exit(1);
}

$accessToken = $loginResult['accessToken'];
$user = isset($loginResult['user']) ? $loginResult['user'] : null;

printSuccess("Login realizado com sucesso!");
printInfo("Token: " . substr($accessToken, 0, 20) . "...");
if ($user) {
    $userName = isset($user['name']) ? $user['name'] : 'N/A';
    $userEmail = isset($user['email']) ? $user['email'] : 'N/A';
    $userRole = isset($user['role']) ? $user['role'] : 'N/A';
    $userStatus = isset($user['status']) ? $user['status'] : 'N/A';
    printInfo("Usuário: {$userName} ({$userEmail})");
    printInfo("Role: {$userRole}");
    printInfo("Status: {$userStatus}");
}

// Verificar se a escola está aprovada
if (isset($user['status']) && $user['status'] !== 'approved') {
    printWarning("⚠️  ATENÇÃO: A escola não está aprovada (status: {$user['status']})");
    printWarning("Alguns endpoints podem não funcionar corretamente.");
}

// ============================================
// 2. LISTAR CURSOS E MATRÍCULAS
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "2️⃣  LISTAR CURSOS E MATRÍCULAS\n";
echo str_repeat("═", 60) . "\n\n";

$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken
];

// Buscar cursos da escola
printStep("2.1", "Buscando cursos da escola...");

$coursesResponse = makeRequest(
    "{$schoolApiUrl}/courses",
    'GET',
    null,
    $headers
);

if ($coursesResponse['code'] !== 200) {
    printError("Erro ao buscar cursos");
    printError("Código HTTP: " . $coursesResponse['code']);
    printError("Resposta: " . $coursesResponse['body']);
    exit(1);
}

$coursesData = $coursesResponse['data'];
$courses = isset($coursesData['courses']) ? $coursesData['courses'] : (isset($coursesData['data']) ? $coursesData['data'] : []);

if (empty($courses)) {
    printWarning("Nenhum curso encontrado para esta escola.");
    exit(0);
}

printSuccess("Cursos encontrados: " . count($courses));

// Listar todos os cursos
foreach ($courses as $index => $course) {
    $num = $index + 1;
    $courseName = isset($course['name']) ? $course['name'] : 'N/A';
    $courseId = isset($course['id']) ? $course['id'] : 'N/A';
    echo "  {$num}. {$courseName} (ID: {$courseId})\n";
}

// ============================================
// 3. BUSCAR E APROVAR MATRÍCULAS PENDENTES
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "3️⃣  BUSCAR E APROVAR MATRÍCULAS PENDENTES\n";
echo str_repeat("═", 60) . "\n\n";

$allEnrollments = [];
$pendingEnrollments = [];

// Buscar matrículas de cada curso
foreach ($courses as $course) {
    $courseId = $course['id'];
    $courseName = $course['name'];
    
    printStep("3.1", "Buscando matrículas do curso: {$courseName}");
    
    $enrollmentsResponse = makeRequest(
        "{$schoolApiUrl}/courses/{$courseId}/enrollments?status=pending",
        'GET',
        null,
        $headers
    );
    
    if ($enrollmentsResponse['code'] === 200) {
        $enrollmentsData = $enrollmentsResponse['data'];
        $enrollments = isset($enrollmentsData['enrollments']) ? $enrollmentsData['enrollments'] : [];
        
        if (!empty($enrollments)) {
            printInfo("  Encontradas " . count($enrollments) . " matrícula(s) pendente(s)");
            foreach ($enrollments as $enrollment) {
                $enrollment['course_name'] = $courseName;
                $enrollment['course_id'] = $courseId;
                $allEnrollments[] = $enrollment;
                if (isset($enrollment['status']) && $enrollment['status'] === 'pending') {
                    $pendingEnrollments[] = $enrollment;
                }
            }
        } else {
            printInfo("  Nenhuma matrícula pendente encontrada");
        }
    } else {
        printWarning("  Erro ao buscar matrículas (HTTP {$enrollmentsResponse['code']})");
    }
}

if (empty($pendingEnrollments)) {
    printWarning("Nenhuma matrícula pendente encontrada para aprovar.");
    exit(0);
}

printSuccess("Total de matrículas pendentes encontradas: " . count($pendingEnrollments));

// Listar matrículas pendentes
echo "\n";
printInfo("Matrículas pendentes:");
foreach ($pendingEnrollments as $index => $enrollment) {
    $num = $index + 1;
    $studentName = isset($enrollment['student_name']) ? $enrollment['student_name'] : 'N/A';
    $studentEmail = isset($enrollment['student_email']) ? $enrollment['student_email'] : 'N/A';
    $courseName = isset($enrollment['course_name']) ? $enrollment['course_name'] : 'N/A';
    $enrollmentId = isset($enrollment['id']) ? $enrollment['id'] : 'N/A';
    echo "  {$num}. {$studentName} ({$studentEmail}) - {$courseName} (ID: {$enrollmentId})\n";
}

// ============================================
// 4. APROVAR MATRÍCULAS
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "4️⃣  APROVAR MATRÍCULAS\n";
echo str_repeat("═", 60) . "\n\n";

$approvedCount = 0;
$errorCount = 0;
$errors = [];

foreach ($pendingEnrollments as $index => $enrollment) {
    $num = $index + 1;
    $enrollmentId = $enrollment['id'];
    $studentName = isset($enrollment['student_name']) ? $enrollment['student_name'] : 'N/A';
    $courseName = isset($enrollment['course_name']) ? $enrollment['course_name'] : 'N/A';
    
    printInfo("Aprovando matrícula {$num}/" . count($pendingEnrollments) . ": {$studentName} - {$courseName}");
    
    $approveResponse = makeRequest(
        "{$schoolApiUrl}/enrollments/{$enrollmentId}/approve",
        'POST',
        null,
        $headers
    );
    
    if ($approveResponse['code'] === 200) {
        printSuccess("  ✓ Matrícula aprovada com sucesso");
        $approvedCount++;
        
        // Verificar se a resposta contém informações sobre propinas criadas
        $responseData = $approveResponse['data'];
        if (isset($responseData['message'])) {
            printInfo("  " . $responseData['message']);
        }
    } else {
        printError("  ✗ Erro ao aprovar matrícula");
        printError("    Código HTTP: " . $approveResponse['code']);
        if (isset($approveResponse['data']['message'])) {
            printError("    Mensagem: " . $approveResponse['data']['message']);
        }
        $errorCount++;
        $errors[] = [
            'enrollment_id' => $enrollmentId,
            'student_name' => $studentName,
            'course_name' => $courseName,
            'error' => $approveResponse['data']['message'] ?? 'Erro desconhecido',
        ];
    }
    echo "\n";
}

// ============================================
// 5. RESUMO
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "5️⃣  RESUMO\n";
echo str_repeat("═", 60) . "\n\n";

printSuccess("Matrículas aprovadas: {$approvedCount}");
if ($errorCount > 0) {
    printError("Matrículas com erro: {$errorCount}");
}

if ($approvedCount > 0) {
    echo "\n";
    printInfo("✅ As propinas foram criadas automaticamente para cada matrícula aprovada!");
    printInfo("   Cada matrícula aprovada gerou propinas mensais baseadas na duração do curso.");
}

if (count($errors) > 0) {
    echo "\n";
    printError("Erros encontrados:");
    foreach ($errors as $error) {
        echo "  - {$error['student_name']} ({$error['course_name']}): {$error['error']}\n";
    }
}

echo "\n";
echo "═══════════════════════════════════════════════════════════════\n";
echo "✨ PROCESSO CONCLUÍDO\n";
echo "═══════════════════════════════════════════════════════════════\n\n";

