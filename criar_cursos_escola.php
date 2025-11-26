<?php
/**
 * Script para Login de Escola e Criação de Cursos
 * 
 * Faz login com a conta de escola e cria cursos de exemplo
 * 
 * Uso: php criar_cursos_escola.php
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
echo "🏫 LOGIN DE ESCOLA E CRIAÇÃO DE CURSOS\n";
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
// 2. CRIAR CURSOS
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "2️⃣  CRIAR CURSOS\n";
echo str_repeat("═", 60) . "\n\n";

$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken
];

// Cursos de exemplo para ensino médio
$cursosEnsinoMedio = [
    [
        'name' => 'Informática',
        'description' => 'Curso técnico de informática com foco em programação e redes',
        'code' => 'INF-M1',
        'education_level' => 'medio',
        'class_level' => 10,
        'monthly_tuition' => 15000,
        'is_active' => true,
    ],
    [
        'name' => 'Electrotecnia',
        'description' => 'Curso técnico de electrotecnia e instalações elétricas',
        'code' => 'ELT-M1',
        'education_level' => 'medio',
        'class_level' => 10,
        'monthly_tuition' => 18000,
        'is_active' => true,
    ],
    [
        'name' => 'Mecânica',
        'description' => 'Curso técnico de mecânica automóvel e industrial',
        'code' => 'MEC-M1',
        'education_level' => 'medio',
        'class_level' => 11,
        'monthly_tuition' => 20000,
        'is_active' => true,
    ],
    [
        'name' => 'Construção Civil',
        'description' => 'Curso técnico de construção civil e obras',
        'code' => 'CC-M1',
        'education_level' => 'medio',
        'class_level' => 12,
        'monthly_tuition' => 17000,
        'is_active' => true,
    ],
];

// Cursos de exemplo para ensino superior
$cursosEnsinoSuperior = [
    [
        'name' => 'Engenharia Informática',
        'description' => 'Curso de licenciatura em Engenharia Informática',
        'code' => 'EINF-L1',
        'education_level' => 'superior',
        'year_level' => 1,
        'duration_months' => 48,
        'monthly_tuition' => 35000,
        'is_active' => true,
    ],
    [
        'name' => 'Gestão de Empresas',
        'description' => 'Curso de licenciatura em Gestão de Empresas',
        'code' => 'GE-L1',
        'education_level' => 'superior',
        'year_level' => 1,
        'duration_months' => 36,
        'monthly_tuition' => 30000,
        'is_active' => true,
    ],
];

$cursosCriados = [];
$cursosErro = [];

// Criar cursos de ensino médio
printStep("2.1", "Criando cursos de Ensino Médio...");
foreach ($cursosEnsinoMedio as $index => $curso) {
    $num = $index + 1;
    printInfo("Criando curso {$num}/" . count($cursosEnsinoMedio) . ": {$curso['name']}");
    
    $response = makeRequest(
        "{$schoolApiUrl}/courses",
        'POST',
        $curso,
        $headers
    );
    
    if ($response['code'] === 201 || $response['code'] === 200) {
        $courseData = $response['data'];
        if (isset($courseData['course'])) {
            $course = $courseData['course'];
            $courseName = isset($course['name']) ? $course['name'] : 'N/A';
            $courseId = isset($course['id']) ? $course['id'] : 'N/A';
            printSuccess("Curso criado: {$courseName} (ID: {$courseId})");
            if (isset($courseData['tuition_info'])) {
                $tuition = $courseData['tuition_info'];
                $monthly = isset($tuition['monthly_tuition']) ? $tuition['monthly_tuition'] : 0;
                $total = isset($tuition['total_tuition']) ? $tuition['total_tuition'] : 0;
                $duration = isset($tuition['duration_months']) ? $tuition['duration_months'] : 0;
                $formattedClass = isset($tuition['formatted_class']) ? $tuition['formatted_class'] : 'N/A';
                printInfo("  - Propina mensal: " . number_format($monthly, 2, ',', '.') . " kz");
                printInfo("  - Propina total: " . number_format($total, 2, ',', '.') . " kz");
                printInfo("  - Duração: {$duration} meses");
                printInfo("  - Classe: {$formattedClass}");
            }
            $cursosCriados[] = $course;
        } else {
            printSuccess("Curso criado: {$curso['name']}");
            $cursosCriados[] = $response['data'];
        }
    } else {
        printError("Erro ao criar curso: {$curso['name']}");
        printError("Código HTTP: " . $response['code']);
        if (isset($response['data']['message'])) {
            printError("Mensagem: " . $response['data']['message']);
        }
        if (isset($response['data']['errors'])) {
            foreach ($response['data']['errors'] as $field => $errors) {
                printError("  - {$field}: " . implode(', ', $errors));
            }
        }
        $cursosErro[] = ['curso' => $curso, 'erro' => $response];
    }
    echo "\n";
}

// Criar cursos de ensino superior
printStep("2.2", "Criando cursos de Ensino Superior...");
foreach ($cursosEnsinoSuperior as $index => $curso) {
    $num = $index + 1;
    printInfo("Criando curso {$num}/" . count($cursosEnsinoSuperior) . ": {$curso['name']}");
    
    $response = makeRequest(
        "{$schoolApiUrl}/courses",
        'POST',
        $curso,
        $headers
    );
    
    if ($response['code'] === 201 || $response['code'] === 200) {
        $courseData = $response['data'];
        if (isset($courseData['course'])) {
            $course = $courseData['course'];
            $courseName = isset($course['name']) ? $course['name'] : 'N/A';
            $courseId = isset($course['id']) ? $course['id'] : 'N/A';
            printSuccess("Curso criado: {$courseName} (ID: {$courseId})");
            if (isset($courseData['tuition_info'])) {
                $tuition = $courseData['tuition_info'];
                $monthly = isset($tuition['monthly_tuition']) ? $tuition['monthly_tuition'] : 0;
                $total = isset($tuition['total_tuition']) ? $tuition['total_tuition'] : 0;
                $duration = isset($tuition['duration_months']) ? $tuition['duration_months'] : 0;
                $formattedYear = isset($tuition['formatted_year']) ? $tuition['formatted_year'] : 'N/A';
                printInfo("  - Propina mensal: " . number_format($monthly, 2, ',', '.') . " kz");
                printInfo("  - Propina total: " . number_format($total, 2, ',', '.') . " kz");
                printInfo("  - Duração: {$duration} meses");
                printInfo("  - Ano: {$formattedYear}");
            }
            $cursosCriados[] = $course;
        } else {
            printSuccess("Curso criado: {$curso['name']}");
            $cursosCriados[] = $response['data'];
        }
    } else {
        printError("Erro ao criar curso: {$curso['name']}");
        printError("Código HTTP: " . $response['code']);
        if (isset($response['data']['message'])) {
            printError("Mensagem: " . $response['data']['message']);
        }
        if (isset($response['data']['errors'])) {
            foreach ($response['data']['errors'] as $field => $errors) {
                printError("  - {$field}: " . implode(', ', $errors));
            }
        }
        $cursosErro[] = ['curso' => $curso, 'erro' => $response];
    }
    echo "\n";
}

// ============================================
// 3. RESUMO
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "3️⃣  RESUMO\n";
echo str_repeat("═", 60) . "\n\n";

printSuccess("Cursos criados com sucesso: " . count($cursosCriados));
if (count($cursosErro) > 0) {
    printError("Cursos com erro: " . count($cursosErro));
}

if (count($cursosCriados) > 0) {
    echo "\n";
    printInfo("Lista de cursos criados:");
    foreach ($cursosCriados as $index => $curso) {
        $num = $index + 1;
        $nome = isset($curso['name']) ? $curso['name'] : 'N/A';
        $id = isset($curso['id']) ? $curso['id'] : 'N/A';
        $nivel = isset($curso['education_level']) ? $curso['education_level'] : 'N/A';
        echo "  {$num}. {$nome} (ID: {$id}) - {$nivel}\n";
    }
}

if (count($cursosErro) > 0) {
    echo "\n";
    printError("Cursos que falharam:");
    foreach ($cursosErro as $index => $item) {
        $num = $index + 1;
        $nome = $item['curso']['name'] ?? 'N/A';
        $codigo = $item['erro']['code'] ?? 'N/A';
        echo "  {$num}. {$nome} (HTTP {$codigo})\n";
    }
}

echo "\n";
echo "═══════════════════════════════════════════════════════════════\n";
echo "✨ PROCESSO CONCLUÍDO\n";
echo "═══════════════════════════════════════════════════════════════\n\n";

