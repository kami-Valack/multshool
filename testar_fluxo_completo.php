<?php
/**
 * Script de Teste Completo - Sistema Multishol
 * 
 * Testa todo o fluxo do sistema incluindo:
 * - Registro de usuários (estudante, escola, docente)
 * - Login e autenticação
 * - Criação de cursos (ensino médio e superior) com regras angolanas
 * - Matrículas
 * - Vínculo aluno-docente
 * - Acompanhamentos
 * 
 * Uso: php testar_fluxo_completo.php
 */

// Configurações
$usersApiUrl = 'http://localhost:8000';
$schoolApiUrl = 'http://localhost:8003';
$studentApiUrl = 'http://localhost:8001';

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
    curl_close($ch);
    
    return [
        'code' => $httpCode,
        'body' => $response,
        'data' => json_decode($response, true)
    ];
}

// Gerar emails únicos com timestamp
$timestamp = time();
$random = rand(1000, 9999);

echo "\n";
echo "═══════════════════════════════════════════════════════════════\n";
echo "🧪 TESTE COMPLETO DO SISTEMA MULTISHOL\n";
echo "═══════════════════════════════════════════════════════════════\n\n";

// ============================================
// 1. REGISTRO DE USUÁRIOS
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "1️⃣  REGISTRO DE USUÁRIOS\n";
echo str_repeat("═", 60) . "\n\n";

// 1.1. Registrar Estudante
printStep("1.1", "Registrando estudante...");
$studentData = [
    'name' => 'João Silva',
    'email' => "joao.silva.{$timestamp}.{$random}@teste.com",
    'password' => 'Senha123!'
];
$result = makeRequest("{$usersApiUrl}/api/auth/register", 'POST', $studentData);
if ($result['code'] === 201 || $result['code'] === 200) {
    $student = $result['data']['user'] ?? $result['data'];
    $studentId = $student['id'];
    printSuccess("Estudante registrado: {$student['email']} (ID: {$studentId})");
} else {
    printError("Erro ao registrar estudante: " . ($result['data']['message'] ?? $result['body']));
    exit(1);
}

// 1.2. Registrar Escola
printStep("1.2", "Registrando escola...");
$schoolData = [
    'name' => 'Instituto Superior de Tecnologia de Angola',
    'email' => "escola.teste.{$timestamp}.{$random}@ist.ao",
    'password' => 'Senha123!'
];
$result = makeRequest("{$usersApiUrl}/api/auth/register-school", 'POST', $schoolData);
if ($result['code'] === 201 || $result['code'] === 200) {
    $school = $result['data']['user'] ?? $result['data'];
    $schoolId = $school['id'];
    printSuccess("Escola registrada: {$school['email']} (ID: {$schoolId})");
    printWarning("Escola precisa ser aprovada por um administrador antes de usar o sistema");
} else {
    printError("Erro ao registrar escola: " . ($result['data']['message'] ?? $result['body']));
    exit(1);
}

// 1.3. Registrar Docente
printStep("1.3", "Registrando docente...");
$teacherData = [
    'name' => 'Professor Carlos Mendes',
    'email' => "prof.carlos.{$timestamp}.{$random}@teste.com",
    'password' => 'Senha123!'
];
$result = makeRequest("{$usersApiUrl}/api/auth/register-teacher", 'POST', $teacherData);
if ($result['code'] === 201 || $result['code'] === 200) {
    $teacher = $result['data']['user'] ?? $result['data'];
    $teacherId = $teacher['id'];
    printSuccess("Docente registrado: {$teacher['email']} (ID: {$teacherId})");
} else {
    printError("Erro ao registrar docente: " . ($result['data']['message'] ?? $result['body']));
    exit(1);
}

// ============================================
// 2. LOGIN
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "2️⃣  LOGIN E AUTENTICAÇÃO\n";
echo str_repeat("═", 60) . "\n\n";

// 2.1. Login Estudante
printStep("2.1", "Fazendo login como estudante...");
$loginData = ['email' => $studentData['email'], 'password' => $studentData['password']];
$result = makeRequest("{$usersApiUrl}/api/auth/login", 'POST', $loginData);
if ($result['code'] === 200) {
    $studentToken = $result['data']['accessToken'] ?? null;
    printSuccess("Login do estudante realizado com sucesso");
} else {
    printError("Erro no login do estudante: " . ($result['data']['message'] ?? $result['body']));
    exit(1);
}

// 2.2. Login Escola
printStep("2.2", "Fazendo login como escola...");
$loginData = ['email' => $schoolData['email'], 'password' => $schoolData['password']];
$result = makeRequest("{$usersApiUrl}/api/auth/login", 'POST', $loginData);
if ($result['code'] === 200) {
    $schoolToken = $result['data']['accessToken'] ?? null;
    printSuccess("Login da escola realizado com sucesso");
    printWarning("Escola precisa estar aprovada para acessar ms-shocoll-api");
} else {
    printError("Erro no login da escola: " . ($result['data']['message'] ?? $result['body']));
    exit(1);
}

// 2.3. Login Docente
printStep("2.3", "Fazendo login como docente...");
$loginData = ['email' => $teacherData['email'], 'password' => $teacherData['password']];
$result = makeRequest("{$usersApiUrl}/api/auth/login", 'POST', $loginData);
if ($result['code'] === 200) {
    $teacherToken = $result['data']['accessToken'] ?? null;
    printSuccess("Login do docente realizado com sucesso");
} else {
    printError("Erro no login do docente: " . ($result['data']['message'] ?? $result['body']));
    exit(1);
}

// ============================================
// 3. VERIFICAR PERFIL DA ESCOLA
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "3️⃣  PERFIL DA ESCOLA\n";
echo str_repeat("═", 60) . "\n\n";

printWarning("⏳ AGUARDANDO 2 MINUTOS PARA APROVAÇÃO DA ESCOLA...");
printInfo("Por favor, aprove a escola no sistema administrativo:");
printInfo("  Email: {$schoolData['email']}");
printInfo("  ID: {$schoolId}");
echo "\n";
printInfo("Você pode:");
printInfo("  1. Acessar o sistema administrativo e aprovar a escola");
printInfo("  2. Ou executar no banco:");
printInfo("     UPDATE users SET status = 'approved' WHERE email = '{$schoolData['email']}';");
echo "\n";

// Contagem regressiva de 2 minutos (120 segundos)
$delaySeconds = 120;
for ($i = $delaySeconds; $i > 0; $i--) {
    $minutes = floor($i / 60);
    $seconds = $i % 60;
    echo "\r" . $colors['yellow'] . "⏳ Aguardando: " . sprintf("%02d:%02d", $minutes, $seconds) . " restantes..." . $colors['reset'];
    sleep(1);
}
echo "\r" . str_repeat(" ", 50) . "\r"; // Limpar linha

printSuccess("Delay concluído! Continuando com a verificação...\n");

printStep("3.1", "Verificando perfil da escola...");
$result = makeRequest(
    "{$schoolApiUrl}/api/profile/check-completion",
    'GET',
    null,
    ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
);
if ($result['code'] === 200) {
    $profile = $result['data'];
    if ($profile['is_complete']) {
        printSuccess("Perfil completo!");
    } else {
        printWarning("Perfil incompleto ({$profile['completion_percentage']}%)");
        printInfo("Campos faltantes: " . implode(', ', $profile['missing_fields']));
        printStep("3.2", "Preenchendo perfil da escola automaticamente...");
        
        // Preencher dados textuais do perfil
        $profileData = [
            'acronym' => 'ISTA',
            'description' => 'Instituto Superior de Tecnologia de Angola - Instituição de ensino superior e médio dedicada à formação de profissionais qualificados.',
            'founded_year' => 2010,
            'location_map_url' => 'https://www.google.com/maps/place/Luanda,+Angola',
            'phone_number' => '+244 923 456 789',
            'contact_emails' => [$schoolData['email'], 'contato@ist.ao'],
            'total_students' => 1500
        ];
        
        $result = makeRequest(
            "{$schoolApiUrl}/api/profile",
            'PUT',
            $profileData,
            ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
        );
        
        if ($result['code'] === 200) {
            printSuccess("Dados textuais do perfil preenchidos!");
        } else {
            printError("Erro ao preencher dados: " . ($result['data']['message'] ?? $result['body']));
        }
        
        // Criar arquivos temporários para uploads
        printStep("3.3", "Criando arquivos temporários para uploads...");
        
        // Criar logo temporário (PNG válido 1x1 pixel - dados binários)
        $logoPath = sys_get_temp_dir() . '/logo_' . uniqid() . '.png';
        // PNG válido 1x1 pixel branco (89 50 4E 47 0D 0A 1A 0A ...)
        $pngData = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        file_put_contents($logoPath, $pngData);
        
        // Criar fotos temporárias (PNG válido 1x1 pixel)
        $photo1Path = sys_get_temp_dir() . '/photo1_' . uniqid() . '.png';
        file_put_contents($photo1Path, $pngData);
        
        $photo2Path = sys_get_temp_dir() . '/photo2_' . uniqid() . '.png';
        file_put_contents($photo2Path, $pngData);
        
        // Usar vídeo da raiz do projeto
        $videoPath = __DIR__ . '/video.mp4';
        if (!file_exists($videoPath)) {
            printError("Arquivo video.mp4 não encontrado na raiz do projeto!");
            printInfo("Criando arquivo MP4 mínimo válido como fallback...");
            $videoPath = sys_get_temp_dir() . '/video_' . uniqid() . '.mp4';
            // Criar um arquivo MP4 mínimo válido (apenas header básico)
            $mp4Header = hex2bin('00000020667479704D534E5600000000014D534E566D70343200000000');
            file_put_contents($videoPath, $mp4Header);
        } else {
            printInfo("Usando video.mp4 da raiz do projeto");
        }
        
        // Função para fazer upload de arquivo
        function uploadFile($url, $filePath, $fieldName, $token) {
            $ch = curl_init($url);
            $cfile = new CURLFile($filePath, mime_content_type($filePath) ?: 'image/png', basename($filePath));
            $data = [$fieldName => $cfile];
            
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$token}"]);
            
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            return [
                'code' => $httpCode,
                'body' => $response,
                'data' => json_decode($response, true)
            ];
        }
        
        // Upload do logo
        printStep("3.4", "Fazendo upload do logo...");
        $result = uploadFile(
            "{$schoolApiUrl}/api/profile/upload-logo",
            $logoPath,
            'logo',
            $schoolToken
        );
        if ($result['code'] === 200) {
            printSuccess("Logo enviado com sucesso!");
            unlink($logoPath);
        } else {
            printWarning("Erro ao enviar logo: " . ($result['data']['message'] ?? $result['body']));
        }
        
        // Upload das fotos
        printStep("3.5", "Fazendo upload das fotos...");
        $ch = curl_init("{$schoolApiUrl}/api/profile/upload-photos");
        $photo1File = new CURLFile($photo1Path, 'image/png', 'photo1.png');
        $photo2File = new CURLFile($photo2Path, 'image/png', 'photo2.png');
        $data = [
            'photos[0]' => $photo1File,
            'photos[1]' => $photo2File
        ];
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$schoolToken}"]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            printSuccess("Fotos enviadas com sucesso!");
            unlink($photo1Path);
            unlink($photo2Path);
        } else {
            printWarning("Erro ao enviar fotos: " . $response);
        }
        
        // Upload do vídeo
        printStep("3.6", "Fazendo upload do vídeo...");
        if (!file_exists($videoPath)) {
            printError("Arquivo video.mp4 não encontrado em: {$videoPath}");
            printInfo("Por favor, coloque um arquivo video.mp4 na raiz do projeto");
        } else {
            $fileSize = filesize($videoPath);
            printInfo("Tamanho do arquivo: " . round($fileSize / 1024, 2) . " KB");
            
            $result = uploadFile(
                "{$schoolApiUrl}/api/profile/upload-video",
                $videoPath,
                'video',
                $schoolToken
            );
            if ($result['code'] === 200) {
                printSuccess("Vídeo enviado com sucesso!");
                // Só deletar se for arquivo temporário
                if (strpos($videoPath, sys_get_temp_dir()) !== false) {
                    unlink($videoPath);
                }
            } else {
                printWarning("Erro ao enviar vídeo: " . ($result['data']['message'] ?? $result['body']));
                if (isset($result['data']['errors'])) {
                    foreach ($result['data']['errors'] as $field => $errors) {
                        printError("  - {$field}: " . implode(', ', $errors));
                    }
                }
            }
        }
        
        // Verificar novamente o perfil
        printStep("3.7", "Verificando perfil novamente...");
        $result = makeRequest(
            "{$schoolApiUrl}/api/profile/check-completion",
            'GET',
            null,
            ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
        );
        if ($result['code'] === 200) {
            $profile = $result['data'];
            if ($profile['is_complete']) {
                printSuccess("Perfil completo! ({$profile['completion_percentage']}%)");
            } else {
                printWarning("Perfil ainda incompleto ({$profile['completion_percentage']}%)");
                printInfo("Campos ainda faltantes: " . implode(', ', $profile['missing_fields']));
            }
        }
    }
} else {
    printError("Erro ao verificar perfil: " . ($result['data']['message'] ?? $result['body']));
}

// ============================================
// 4. CRIAR CURSOS (ENSINO ANGOLANO)
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "4️⃣  CRIAÇÃO DE CURSOS (ENSINO ANGOLANO)\n";
echo str_repeat("═", 60) . "\n\n";

// 4.1. Criar Curso de Ensino Médio (10ª Classe)
printStep("4.1", "Criando curso de Ensino Médio - 10ª Classe...");
$medioCourse = [
    'name' => '10ª Classe - Ciências Físico-Químicas',
    'description' => 'Curso do ensino médio angolano - 10ª classe',
    'code' => 'MED10-FQ',
    'education_level' => 'medio',
    'class_level' => 10,
    'monthly_tuition' => 5000.00, // 5000 Kz por mês
    'faculty' => 'Ciências Exatas'
];
$result = makeRequest(
    "{$schoolApiUrl}/api/courses",
    'POST',
    $medioCourse,
    ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
);
if ($result['code'] === 201) {
    $medioCourseData = $result['data']['course'];
    $medioCourseId = $medioCourseData['id'];
    $tuitionInfo = $result['data']['tuition_info'];
    printSuccess("Curso de ensino médio criado!");
    printInfo("ID: {$medioCourseId}");
    printInfo("Duração: {$tuitionInfo['duration_months']} meses (fixo para ensino médio)");
    printInfo("Classe: {$tuitionInfo['formatted_class']}");
    printInfo("Propina mensal: {$tuitionInfo['monthly_tuition']} Kz");
    printInfo("Propina total (9 meses): {$tuitionInfo['total_tuition']} Kz");
} else {
    printError("Erro ao criar curso: " . ($result['data']['message'] ?? $result['body']));
    if (isset($result['data']['errors'])) {
        foreach ($result['data']['errors'] as $field => $errors) {
            printError("  - {$field}: " . implode(', ', $errors));
        }
    }
}

// 4.2. Criar Curso de Ensino Superior (1º Ano)
printStep("4.2", "Criando curso de Ensino Superior - 1º Ano...");
$superiorCourse = [
    'name' => 'Engenharia Informática - 1º Ano',
    'description' => 'Primeiro ano do curso de Engenharia Informática',
    'code' => 'EI-1',
    'education_level' => 'superior',
    'year_level' => 1,
    'duration_months' => 10, // 10 meses por ano
    'monthly_tuition' => 15000.00, // 15000 Kz por mês
    'faculty' => 'Engenharia'
];
$result = makeRequest(
    "{$schoolApiUrl}/api/courses",
    'POST',
    $superiorCourse,
    ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
);
if ($result['code'] === 201) {
    $superiorCourseData = $result['data']['course'];
    $superiorCourseId = $superiorCourseData['id'];
    $tuitionInfo = $result['data']['tuition_info'];
    printSuccess("Curso de ensino superior criado!");
    printInfo("ID: {$superiorCourseId}");
    printInfo("Duração: {$tuitionInfo['duration_months']} meses");
    printInfo("Ano: {$tuitionInfo['formatted_year']}");
    printInfo("Propina mensal: {$tuitionInfo['monthly_tuition']} Kz");
} else {
    printError("Erro ao criar curso: " . ($result['data']['message'] ?? $result['body']));
    if (isset($result['data']['errors'])) {
        foreach ($result['data']['errors'] as $field => $errors) {
            printError("  - {$field}: " . implode(', ', $errors));
        }
    }
}

// ============================================
// 5. MATRÍCULAS
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "5️⃣  MATRÍCULAS\n";
echo str_repeat("═", 60) . "\n\n";

// 5.1. Estudante se matricula no curso de ensino médio
if (isset($medioCourseId)) {
    printStep("5.1", "Estudante se matricula no curso de ensino médio...");
    $enrollmentData = [
        'course_id' => $medioCourseId,
        'student_id' => $studentId,
        'student_email' => $studentData['email'],
        'student_name' => $studentData['name']
    ];
    // A rota de matrícula requer autenticação JWT do estudante
    // Primeiro, precisamos fazer login do estudante
    printInfo("Fazendo login do estudante para criar matrícula...");
    $loginData = [
        'email' => $studentData['email'],
        'password' => $studentData['password']
    ];
    $loginResult = makeRequest(
        "{$usersApiUrl}/api/auth/login",
        'POST',
        $loginData
    );
    
    $studentToken = null;
    if ($loginResult['code'] === 200) {
        $studentToken = $loginResult['data']['token'] ?? $loginResult['data']['access_token'] ?? null;
        printSuccess("Login do estudante realizado com sucesso!");
    } else {
        printError("Erro ao fazer login do estudante: " . ($loginResult['data']['message'] ?? $loginResult['body']));
    }
    
    if ($studentToken) {
        $result = makeRequest(
            "{$studentApiUrl}/api/enrollments",
            'POST',
            $enrollmentData,
            ["Authorization: Bearer {$studentToken}", "Content-Type: application/json"]
        );
    } else {
        $result = ['code' => 401, 'body' => 'Token não disponível', 'data' => ['message' => 'Token não disponível']];
    }
    if ($result['code'] === 201) {
        $enrollment = $result['data']['enrollment'];
        $enrollmentId = $enrollment['id'];
        printSuccess("Matrícula criada com sucesso!");
        printInfo("ID: {$enrollmentId}");
        printInfo("Status: {$enrollment['status']} (aguardando aprovação da escola)");
    } else {
        printError("Erro ao criar matrícula: " . ($result['data']['message'] ?? $result['body']));
    }
}

// 6.2. Escola aprova matrícula
if (isset($enrollmentId) && isset($schoolToken)) {
    printStep("6.2", "Escola aprova matrícula do estudante...");
    $result = makeRequest(
        "{$schoolApiUrl}/api/enrollments/{$enrollmentId}/approve",
        'POST',
        null,
        ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
    );
    if ($result['code'] === 200) {
        $enrollment = $result['data']['enrollment'];
        printSuccess("Matrícula aprovada com sucesso!");
        printInfo("Status: {$enrollment['status']}");
        printInfo("Aprovada em: " . ($enrollment['approved_at'] ?? 'N/A'));
    } else {
        printError("Erro ao aprovar matrícula: " . ($result['data']['message'] ?? $result['body']));
    }
}

// ============================================
// 7. VÍNCULO ALUNO-DOCENTE
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "7️⃣  VÍNCULO ALUNO-DOCENTE\n";
echo str_repeat("═", 60) . "\n\n";

// 7.1. Verificar se docente e aluno existem no ms-shocoll-api
printStep("7.1", "Verificando se docente e aluno existem no ms-shocoll-api...");
printInfo("Docente ID: " . (isset($teacherId) ? $teacherId : 'NÃO DEFINIDO'));
printInfo("Aluno ID: " . (isset($studentId) ? $studentId : 'NÃO DEFINIDO'));
printInfo("Escola ID: " . (isset($schoolId) ? $schoolId : 'NÃO DEFINIDO'));
printInfo("School Token: " . (isset($schoolToken) ? 'DEFINIDO' : 'NÃO DEFINIDO'));
printInfo("");
printWarning("⚠️  IMPORTANTE: Alunos (students) NÃO são replicados automaticamente para ms-shocoll-api!");
printInfo("O vínculo pode ser criado mesmo sem o aluno estar no banco local.");
printInfo("O sistema busca o aluno pelo ID do ms-users-api-laravel.");

// 7.2. Escola vincula aluno ao docente
if (isset($teacherId) && isset($studentId) && isset($schoolToken)) {
    printInfo("✅ Todos os IDs necessários estão disponíveis. Criando vínculo...");
    printStep("7.2", "Escola vincula aluno ao docente...");
    printInfo("URL: {$schoolApiUrl}/api/teachers/{$teacherId}/students/{$studentId}");
    printInfo("Teacher ID: {$teacherId}");
    printInfo("Student ID: {$studentId}");
    $linkData = [
        'course_id' => $medioCourseId ?? null,
        'is_active' => true
    ];
    printInfo("Dados do vínculo: " . json_encode($linkData));
    $result = makeRequest(
        "{$schoolApiUrl}/api/teachers/{$teacherId}/students/{$studentId}",
        'POST',
        $linkData,
        ["Authorization: Bearer {$schoolToken}", "Content-Type: application/json"]
    );
    printInfo("Resposta recebida - Status: {$result['code']}");
    if ($result['code'] === 201 || $result['code'] === 200) {
        $link = $result['data']['link'];
        printSuccess("Aluno vinculado ao docente com sucesso!");
        printInfo("Vínculo ID: {$link['id']}");
        printInfo("Docente: {$link['teacher']['name']} ({$link['teacher']['email']})");
        if (isset($link['student']['name'])) {
            printInfo("Aluno: {$link['student']['name']} ({$link['student']['email']})");
        } else {
            printInfo("Aluno ID: {$link['student_id']} (dados serão buscados do ms-users-api)");
        }
    } else {
        printError("Erro ao vincular: " . ($result['data']['message'] ?? $result['body']));
        if (isset($result['data']['errors'])) {
            foreach ($result['data']['errors'] as $field => $errors) {
                printError("  - {$field}: " . implode(', ', $errors));
            }
        }
        printInfo("Possíveis causas:");
        printInfo("  1. Docente não foi replicado para ms-shocoll-api");
        printInfo("  2. Aluno não foi replicado para ms-shocoll-api");
        printInfo("  3. Perfil da escola incompleto");
        printInfo("  4. Escola não está aprovada");
        printInfo("");
        printInfo("📋 Detalhes da resposta HTTP:");
        printInfo("   Status Code: " . $result['code']);
        printInfo("   Response Body: " . substr($result['body'], 0, 500));
    }
} else {
    printError("❌ IDs necessários não estão disponíveis para criar vínculo");
    printInfo("Teacher ID: " . (isset($teacherId) ? $teacherId : 'NÃO DEFINIDO'));
    printInfo("Student ID: " . (isset($studentId) ? $studentId : 'NÃO DEFINIDO'));
    printInfo("School Token: " . (isset($schoolToken) ? 'DEFINIDO' : 'NÃO DEFINIDO'));
    printWarning("⚠️  O vínculo não será criado. Verifique se todas as etapas anteriores foram concluídas com sucesso.");
}

// ============================================
// 8. ACESSO DO DOCENTE
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "8️⃣  ACESSO DO DOCENTE\n";
echo str_repeat("═", 60) . "\n\n";

// 8.1. Docente visualiza seus alunos
if (isset($teacherToken)) {
    printStep("8.1", "Docente visualiza seus alunos...");
    $result = makeRequest(
        "{$schoolApiUrl}/api/teacher/students",
        'GET',
        null,
        ["Authorization: Bearer {$teacherToken}", "Content-Type: application/json"]
    );
    if ($result['code'] === 200) {
        $students = $result['data']['students'] ?? [];
        printSuccess("Alunos encontrados: " . count($students));
        if (count($students) === 0) {
            printWarning("Nenhum aluno vinculado ainda!");
            printInfo("Certifique-se de que o vínculo foi criado na etapa 6.2");
        } else {
            foreach ($students as $student) {
                printInfo("  - {$student['name']} ({$student['email']})");
                if (isset($student['course'])) {
                    printInfo("    Curso: {$student['course']['name']}");
                }
            }
        }
    } else {
        printError("Erro ao listar alunos: " . ($result['data']['message'] ?? $result['body']));
    }
}

// 8.2. Docente cria acompanhamento
if (isset($teacherToken) && isset($studentId)) {
    printStep("8.2", "Docente cria acompanhamento do aluno...");
    $followUpData = [
        'title' => 'Acompanhamento Inicial',
        'description' => 'Primeiro acompanhamento do aluno no curso. Aluno demonstrou interesse e participação ativa nas aulas.',
        'type' => 'academic',
        'status' => 'positive',
        'follow_up_date' => date('Y-m-d'),
        'course_id' => $medioCourseId ?? null
    ];
    $result = makeRequest(
        "{$schoolApiUrl}/api/teacher/students/{$studentId}/follow-ups",
        'POST',
        $followUpData,
        ["Authorization: Bearer {$teacherToken}", "Content-Type: application/json"]
    );
    if ($result['code'] === 201) {
        $followUp = $result['data']['follow_up'];
        printSuccess("Acompanhamento criado com sucesso!");
        printInfo("ID: {$followUp['id']}");
        printInfo("Título: {$followUp['title']}");
        printInfo("Tipo: {$followUp['type']}");
        printInfo("Status: {$followUp['status']}");
        printInfo("Data: {$followUp['follow_up_date']}");
    } else {
        printError("Erro ao criar acompanhamento: " . ($result['data']['message'] ?? $result['body']));
        printInfo("Certifique-se de que o aluno está vinculado ao docente");
    }
    
    // 8.3. Listar acompanhamentos
    printStep("8.3", "Listando acompanhamentos do aluno...");
    $result = makeRequest(
        "{$schoolApiUrl}/api/teacher/students/{$studentId}/follow-ups",
        'GET',
        null,
        ["Authorization: Bearer {$teacherToken}", "Content-Type: application/json"]
    );
    if ($result['code'] === 200) {
        $followUps = $result['data']['follow_ups'] ?? [];
        printSuccess("Acompanhamentos encontrados: " . count($followUps));
        foreach ($followUps as $index => $fu) {
            printInfo("  " . ($index + 1) . ". {$fu['title']} ({$fu['type']}) - {$fu['status']}");
        }
    } else {
        printError("Erro ao listar acompanhamentos: " . ($result['data']['message'] ?? $result['body']));
    }
}

// ============================================
// RESUMO FINAL
// ============================================
echo "\n" . str_repeat("═", 60) . "\n";
echo "📊 RESUMO DO TESTE\n";
echo str_repeat("═", 60) . "\n\n";

printInfo("Usuários criados:");
printInfo("  - Estudante: {$studentData['email']} (ID: {$studentId})");
printInfo("  - Escola: {$schoolData['email']} (ID: {$schoolId})");
printInfo("  - Docente: {$teacherData['email']} (ID: {$teacherId})");

if (isset($medioCourseId)) {
    printInfo("\nCursos criados:");
    printInfo("  - Ensino Médio: {$medioCourse['name']} (ID: {$medioCourseId})");
}
if (isset($superiorCourseId)) {
    printInfo("  - Ensino Superior: {$superiorCourse['name']} (ID: {$superiorCourseId})");
}

echo "\n";
printSuccess("✅ Teste completo finalizado!");
echo "\n";
printInfo("Próximos passos:");
printInfo("  1. Aprovar a escola no sistema administrativo");
printInfo("  2. Completar o perfil da escola");
printInfo("  3. Aprovar matrículas pendentes");
printInfo("  4. Testar visualização de notas (requer integração com ms-stundent-api)");
echo "\n";

