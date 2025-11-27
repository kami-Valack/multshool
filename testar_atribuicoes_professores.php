<?php
/**
 * Script para Testar Atribuições de Professores a Turmas
 * 
 * Faz login com a conta de escola e testa as funcionalidades de atribuições
 * 
 * Uso: php testar_atribuicoes_professores.php
 */

// Configurações
$usersApiUrl = 'http://localhost:8000/api';
$schoolApiUrl = 'http://localhost:8003/api'; // ms-shocoll-api (mesma porta do criar_cursos_escola.php)

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

// Função para fazer requisições HTTP
function makeRequest($url, $method = 'GET', $data = null, $token = null) {
    $ch = curl_init();
    
    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
    ];
    
    if ($token) {
        $headers[] = "Authorization: Bearer {$token}";
    }
    
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    
    if ($data && in_array($method, ['POST', 'PUT', 'PATCH'])) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return ['error' => $error, 'http_code' => 0];
    }
    
    return [
        'data' => json_decode($response, true),
        'http_code' => $httpCode,
        'raw' => $response,
    ];
}

// ============================================
// 1. LOGIN
// ============================================
printStep("1️⃣", "Fazendo login...");

$loginResponse = makeRequest(
    "{$usersApiUrl}/auth/login",
    'POST',
    [
        'email' => $email,
        'password' => $password,
    ]
);

if ($loginResponse['http_code'] !== 200) {
    printError("Falha no login");
    if (isset($loginResponse['data']['message'])) {
        printError("Mensagem: " . $loginResponse['data']['message']);
    }
    printInfo("Resposta: " . $loginResponse['raw']);
    exit(1);
}

// A API pode retornar accessToken diretamente ou dentro de data
$accessToken = isset($loginResponse['data']['accessToken']) 
    ? $loginResponse['data']['accessToken'] 
    : (isset($loginResponse['data']['data']['accessToken']) ? $loginResponse['data']['data']['accessToken'] : null);

if (!$accessToken) {
    printError("Token de acesso não encontrado na resposta");
    printInfo("Resposta: " . $loginResponse['raw']);
    exit(1);
}
printSuccess("Login realizado com sucesso!");
printInfo("Token: " . substr($accessToken, 0, 50) . "...");

// ============================================
// 2. LISTAR PROFESSORES
// ============================================
printStep("2️⃣", "Listando professores...");

$teachersResponse = makeRequest(
    "{$schoolApiUrl}/teachers",
    'GET',
    null,
    $accessToken
);

if ($teachersResponse['http_code'] !== 200) {
    printError("Falha ao listar professores");
    printInfo("Resposta: " . $teachersResponse['raw']);
    exit(1);
}

$teachers = isset($teachersResponse['data']['teachers']) ? $teachersResponse['data']['teachers'] : (isset($teachersResponse['data']['data']) ? $teachersResponse['data']['data'] : []);
printSuccess("Encontrados " . count($teachers) . " professor(es)");

if (empty($teachers)) {
    printWarning("Nenhum professor encontrado. É necessário criar professores primeiro.");
    exit(0);
}

// Mostrar professores
foreach ($teachers as $teacher) {
    printInfo("  - {$teacher['name']} ({$teacher['email']}) - ID: {$teacher['id']}");
}

$firstTeacher = $teachers[0];
$teacherId = $firstTeacher['id'];
printInfo("Usando professor: {$firstTeacher['name']} (ID: {$teacherId})");

// ============================================
// 3. LISTAR CURSOS
// ============================================
printStep("3️⃣", "Listando cursos...");

$coursesResponse = makeRequest(
    "{$schoolApiUrl}/courses",
    'GET',
    null,
    $accessToken
);

if ($coursesResponse['http_code'] !== 200) {
    printError("Falha ao listar cursos");
    printInfo("Resposta: " . $coursesResponse['raw']);
    exit(1);
}

$courses = isset($coursesResponse['data']['courses']) ? $coursesResponse['data']['courses'] : (isset($coursesResponse['data']['data']) ? $coursesResponse['data']['data'] : []);
printSuccess("Encontrados " . count($courses) . " curso(s)");

if (empty($courses)) {
    printWarning("Nenhum curso encontrado. É necessário criar cursos primeiro.");
    exit(0);
}

// Mostrar cursos
foreach ($courses as $course) {
    printInfo("  - {$course['name']} - ID: {$course['id']}");
}

$firstCourse = $courses[0];
$courseId = $firstCourse['id'];
printInfo("Usando curso: {$firstCourse['name']} (ID: {$courseId})");

// ============================================
// 4. LISTAR DISCIPLINAS DO CURSO
// ============================================
printStep("4️⃣", "Listando disciplinas do curso...");

$subjectsResponse = makeRequest(
    "{$schoolApiUrl}/courses/{$courseId}/subjects",
    'GET',
    null,
    $accessToken
);

if ($subjectsResponse['http_code'] !== 200) {
    printError("Falha ao listar disciplinas");
    printInfo("Resposta: " . $subjectsResponse['raw']);
    exit(1);
}

$subjects = isset($subjectsResponse['data']['subjects']) ? $subjectsResponse['data']['subjects'] : (isset($subjectsResponse['data']['data']) ? $subjectsResponse['data']['data'] : []);
printSuccess("Encontradas " . count($subjects) . " disciplina(s)");

if (empty($subjects)) {
    printWarning("Nenhuma disciplina encontrada. É necessário criar disciplinas primeiro.");
    exit(0);
}

// Mostrar disciplinas
foreach ($subjects as $subject) {
    printInfo("  - {$subject['name']} - ID: {$subject['id']}");
}

$firstSubject = $subjects[0];
$subjectId = $firstSubject['id'];
printInfo("Usando disciplina: {$firstSubject['name']} (ID: {$subjectId})");

// ============================================
// 5. LISTAR ATRIBUIÇÕES EXISTENTES
// ============================================
printStep("5️⃣", "Listando atribuições existentes...");

$assignmentsResponse = makeRequest(
    "{$schoolApiUrl}/teacher-assignments",
    'GET',
    null,
    $accessToken
);

if ($assignmentsResponse['http_code'] !== 200) {
    printError("Falha ao listar atribuições");
    printInfo("Resposta: " . $assignmentsResponse['raw']);
} else {
    $assignments = isset($assignmentsResponse['data']['assignments']) ? $assignmentsResponse['data']['assignments'] : [];
    printSuccess("Encontradas " . count($assignments) . " atribuição(ões) existente(s)");
    
    foreach ($assignments as $assignment) {
        $teacherName = isset($assignment['teacher_name']) ? $assignment['teacher_name'] : 'N/A';
        $courseName = isset($assignment['course_name']) ? $assignment['course_name'] : 'N/A';
        $subjectName = isset($assignment['subject_name']) ? $assignment['subject_name'] : 'N/A';
        printInfo("  - {$teacherName} -> {$courseName} / {$subjectName} / {$assignment['class']} ({$assignment['workload_hours']}h)");
    }
}

// ============================================
// 6. CRIAR NOVA ATRIBUIÇÃO
// ============================================
printStep("6️⃣", "Criando nova atribuição...");

$newAssignment = [
    'teacher_id' => $teacherId,
    'course_id' => $courseId,
    'subject_id' => $subjectId,
    'class' => 'TEST-202',
    'workload_hours' => 4,
    'assignment_type' => 'principal',
];

$createResponse = makeRequest(
    "{$schoolApiUrl}/teacher-assignments",
    'POST',
    $newAssignment,
    $accessToken
);

if ($createResponse['http_code'] !== 201) {
    printError("Falha ao criar atribuição");
    if (isset($createResponse['data']['message'])) {
        printError("Mensagem: " . $createResponse['data']['message']);
    }
    if (isset($createResponse['data']['errors'])) {
        printError("Erros: " . json_encode($createResponse['data']['errors'], JSON_PRETTY_PRINT));
    }
    printInfo("Resposta: " . $createResponse['raw']);
} else {
    $createdAssignment = isset($createResponse['data']['assignment']) ? $createResponse['data']['assignment'] : (isset($createResponse['data']['data']) ? $createResponse['data']['data'] : []);
    printSuccess("Atribuição criada com sucesso!");
    printInfo("  ID: {$createdAssignment['id']}");
    printInfo("  Professor: {$firstTeacher['name']}");
    printInfo("  Curso: {$firstCourse['name']}");
    printInfo("  Disciplina: {$firstSubject['name']}");
    printInfo("  Turma: {$createdAssignment['class']}");
    printInfo("  Carga: {$createdAssignment['workload_hours']}h");
    printInfo("  Tipo: {$createdAssignment['assignment_type']}");
    
    $assignmentId = $createdAssignment['id'];
    
    // ============================================
    // 7. CRIAR MÚLTIPLAS ATRIBUIÇÕES (BULK)
    // ============================================
    if (count($subjects) > 1) {
        printStep("7️⃣", "Criando múltiplas atribuições (bulk)...");
        
        $secondSubject = $subjects[1];
        $bulkAssignments = [
            'teacher_id' => $teacherId,
            'assignments' => [
                [
                    'course_id' => $courseId,
                    'subject_id' => $secondSubject['id'],
                    'class' => 'TEST-301',
                    'workload_hours' => 3,
                    'assignment_type' => 'substituto',
                ],
            ],
        ];
        
        $bulkResponse = makeRequest(
            "{$schoolApiUrl}/teacher-assignments/bulk",
            'POST',
            $bulkAssignments,
            $accessToken
        );
        
        if ($bulkResponse['http_code'] !== 201 && $bulkResponse['http_code'] !== 200) {
            printError("Falha ao criar atribuições em bulk");
            printInfo("Resposta: " . $bulkResponse['raw']);
        } else {
            $bulkData = $bulkResponse['data'];
            $created = isset($bulkData['created']) ? $bulkData['created'] : [];
            $errors = isset($bulkData['errors']) ? $bulkData['errors'] : [];
            
            printSuccess("Criadas " . count($created) . " atribuição(ões) em bulk");
            if (count($errors) > 0) {
                printWarning("Erros: " . count($errors));
                foreach ($errors as $error) {
                    printError("  Índice {$error['index']}: {$error['message']}");
                }
            }
        }
    }
    
    // ============================================
    // 8. LISTAR ATRIBUIÇÕES APÓS CRIAÇÃO
    // ============================================
    printStep("8️⃣", "Listando atribuições após criação...");
    
    $assignmentsAfterResponse = makeRequest(
        "{$schoolApiUrl}/teacher-assignments?teacher_id={$teacherId}",
        'GET',
        null,
        $accessToken
    );
    
    if ($assignmentsAfterResponse['http_code'] === 200) {
        $assignmentsAfter = isset($assignmentsAfterResponse['data']['assignments']) ? $assignmentsAfterResponse['data']['assignments'] : [];
        printSuccess("Total de atribuições do professor: " . count($assignmentsAfter));
        
        foreach ($assignmentsAfter as $assignment) {
            $courseName = isset($assignment['course_name']) ? $assignment['course_name'] : 'N/A';
            $subjectName = isset($assignment['subject_name']) ? $assignment['subject_name'] : 'N/A';
            printInfo("  - {$courseName} / {$subjectName} / {$assignment['class']} ({$assignment['workload_hours']}h) - {$assignment['assignment_type']}");
        }
    }
    
    // ============================================
    // 9. ATUALIZAR ATRIBUIÇÃO
    // ============================================
    printStep("9️⃣", "Atualizando atribuição...");
    
    $updateData = [
        'workload_hours' => 5,
        'assignment_type' => 'substituto',
    ];
    
    $updateResponse = makeRequest(
        "{$schoolApiUrl}/teacher-assignments/{$assignmentId}",
        'PUT',
        $updateData,
        $accessToken
    );
    
    if ($updateResponse['http_code'] !== 200) {
        printError("Falha ao atualizar atribuição");
        printInfo("Resposta: " . $updateResponse['raw']);
    } else {
        $updatedAssignment = isset($updateResponse['data']['assignment']) ? $updateResponse['data']['assignment'] : [];
        printSuccess("Atribuição atualizada com sucesso!");
        printInfo("  Nova carga: {$updatedAssignment['workload_hours']}h");
        printInfo("  Novo tipo: {$updatedAssignment['assignment_type']}");
    }
    
    // ============================================
    // 10. REMOVER ATRIBUIÇÃO
    // ============================================
    printStep("🔟", "Removendo atribuição...");
    
    $deleteResponse = makeRequest(
        "{$schoolApiUrl}/teacher-assignments/{$assignmentId}",
        'DELETE',
        null,
        $accessToken
    );
    
    if ($deleteResponse['http_code'] !== 200) {
        printError("Falha ao remover atribuição");
        printInfo("Resposta: " . $deleteResponse['raw']);
    } else {
        printSuccess("Atribuição removida com sucesso!");
    }
}

// ============================================
// RESUMO FINAL
// ============================================
echo "\n";
printStep("📊", "RESUMO DOS TESTES");
printSuccess("Testes concluídos!");
printInfo("Verifique os resultados acima para confirmar que todas as operações funcionaram corretamente.");

