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

// Função para criar exame de admissão para um curso
function criarExameAdmissao($schoolApiUrl, $courseId, $courseName, $headers) {
    $examDate = date('Y-m-d\TH:i:s', strtotime('+30 days'));
    $registrationDeadline = date('Y-m-d\TH:i:s', strtotime('+25 days'));
    
    $examData = [
        'name' => "Exame de Admissão - {$courseName}",
        'description' => "Exame de admissão para o curso de {$courseName}",
        'status' => 'scheduled',
        'exam_date' => $examDate,
        'registration_deadline' => $registrationDeadline,
        'max_candidates' => 100,
        'exam_fee' => 5000.00,
        'instructions' => "Compareça no local indicado com 30 minutos de antecedência. Traga documento de identificação.",
        'is_active' => true,
    ];
    
    $response = makeRequest(
        "{$schoolApiUrl}/courses/{$courseId}/admission-exams",
        'POST',
        $examData,
        $headers
    );
    
    if ($response['code'] === 201 || $response['code'] === 200) {
        $exam = isset($response['data']['exam']) ? $response['data']['exam'] : $response['data'];
        $examId = isset($exam['id']) ? $exam['id'] : 'N/A';
        printSuccess("  ✓ Exame de admissão criado (ID: {$examId})");
        return $exam;
    } else {
        printError("  ✗ Erro ao criar exame de admissão");
        if (isset($response['data']['message'])) {
            printError("    Mensagem: " . $response['data']['message']);
        }
        return null;
    }
}

// Função para criar disciplinas para um curso
function criarDisciplinas($schoolApiUrl, $courseId, $courseName, $educationLevel, $classLevel, $headers) {
    $subjects = [];
    
    if ($educationLevel === 'medio') {
        // Disciplinas para ensino médio (organizadas por trimestre)
        $subjects = [
            // 1º Trimestre
            ['name' => 'Matemática', 'code' => 'MAT-1', 'description' => 'Fundamentos de matemática', 'trimester' => 1, 'hours' => 120, 'credits' => 4, 'order' => 1],
            ['name' => 'Português', 'code' => 'POR-1', 'description' => 'Língua portuguesa e literatura', 'trimester' => 1, 'hours' => 100, 'credits' => 3, 'order' => 2],
            ['name' => 'Física', 'code' => 'FIS-1', 'description' => 'Fundamentos de física', 'trimester' => 1, 'hours' => 80, 'credits' => 3, 'order' => 3],
            ['name' => 'Química', 'code' => 'QUI-1', 'description' => 'Fundamentos de química', 'trimester' => 1, 'hours' => 80, 'credits' => 3, 'order' => 4],
            ['name' => 'História', 'code' => 'HIS-1', 'description' => 'História de Angola e do mundo', 'trimester' => 1, 'hours' => 60, 'credits' => 2, 'order' => 5],
            ['name' => 'Geografia', 'code' => 'GEO-1', 'description' => 'Geografia física e humana', 'trimester' => 1, 'hours' => 60, 'credits' => 2, 'order' => 6],
            
            // 2º Trimestre
            ['name' => 'Matemática', 'code' => 'MAT-2', 'description' => 'Álgebra e geometria', 'trimester' => 2, 'hours' => 120, 'credits' => 4, 'order' => 7],
            ['name' => 'Português', 'code' => 'POR-2', 'description' => 'Gramática e redação', 'trimester' => 2, 'hours' => 100, 'credits' => 3, 'order' => 8],
            ['name' => 'Física', 'code' => 'FIS-2', 'description' => 'Mecânica e termodinâmica', 'trimester' => 2, 'hours' => 80, 'credits' => 3, 'order' => 9],
            ['name' => 'Química', 'code' => 'QUI-2', 'description' => 'Química orgânica e inorgânica', 'trimester' => 2, 'hours' => 80, 'credits' => 3, 'order' => 10],
            ['name' => 'Biologia', 'code' => 'BIO-2', 'description' => 'Fundamentos de biologia', 'trimester' => 2, 'hours' => 60, 'credits' => 2, 'order' => 11],
            ['name' => 'Educação Física', 'code' => 'EDF-2', 'description' => 'Atividades físicas e desportivas', 'trimester' => 2, 'hours' => 40, 'credits' => 1, 'order' => 12],
            
            // 3º Trimestre
            ['name' => 'Matemática', 'code' => 'MAT-3', 'description' => 'Cálculo e estatística', 'trimester' => 3, 'hours' => 120, 'credits' => 4, 'order' => 13],
            ['name' => 'Português', 'code' => 'POR-3', 'description' => 'Literatura e análise textual', 'trimester' => 3, 'hours' => 100, 'credits' => 3, 'order' => 14],
            ['name' => 'Física', 'code' => 'FIS-3', 'description' => 'Eletricidade e magnetismo', 'trimester' => 3, 'hours' => 80, 'credits' => 3, 'order' => 15],
            ['name' => 'Química', 'code' => 'QUI-3', 'description' => 'Química analítica', 'trimester' => 3, 'hours' => 80, 'credits' => 3, 'order' => 16],
            ['name' => 'Inglês', 'code' => 'ING-3', 'description' => 'Língua inglesa', 'trimester' => 3, 'hours' => 60, 'credits' => 2, 'order' => 17],
            ['name' => 'Educação Moral e Cívica', 'code' => 'EMC-3', 'description' => 'Valores cívicos e morais', 'trimester' => 3, 'hours' => 40, 'credits' => 1, 'order' => 18],
        ];
        
        // Adicionar disciplinas específicas do curso
        if (stripos($courseName, 'Informática') !== false) {
            $subjects[] = ['name' => 'Programação', 'code' => 'PROG-1', 'description' => 'Introdução à programação', 'trimester' => 1, 'hours' => 100, 'credits' => 4, 'order' => 19];
            $subjects[] = ['name' => 'Redes de Computadores', 'code' => 'RED-2', 'description' => 'Fundamentos de redes', 'trimester' => 2, 'hours' => 80, 'credits' => 3, 'order' => 20];
            $subjects[] = ['name' => 'Sistemas Operativos', 'code' => 'SO-3', 'description' => 'Windows e Linux', 'trimester' => 3, 'hours' => 80, 'credits' => 3, 'order' => 21];
        } elseif (stripos($courseName, 'Electrotecnia') !== false) {
            $subjects[] = ['name' => 'Instalações Elétricas', 'code' => 'IEL-1', 'description' => 'Instalações residenciais e industriais', 'trimester' => 1, 'hours' => 100, 'credits' => 4, 'order' => 19];
            $subjects[] = ['name' => 'Eletrónica', 'code' => 'ELE-2', 'description' => 'Componentes e circuitos eletrónicos', 'trimester' => 2, 'hours' => 80, 'credits' => 3, 'order' => 20];
            $subjects[] = ['name' => 'Automação', 'code' => 'AUT-3', 'description' => 'Sistemas automatizados', 'trimester' => 3, 'hours' => 80, 'credits' => 3, 'order' => 21];
        } elseif (stripos($courseName, 'Mecânica') !== false) {
            $subjects[] = ['name' => 'Mecânica Automóvel', 'code' => 'MEC-A-1', 'description' => 'Motores e sistemas automóveis', 'trimester' => 1, 'hours' => 100, 'credits' => 4, 'order' => 19];
            $subjects[] = ['name' => 'Desenho Técnico', 'code' => 'DT-2', 'description' => 'Desenho técnico mecânico', 'trimester' => 2, 'hours' => 80, 'credits' => 3, 'order' => 20];
            $subjects[] = ['name' => 'Soldadura', 'code' => 'SOLD-3', 'description' => 'Técnicas de soldadura', 'trimester' => 3, 'hours' => 80, 'credits' => 3, 'order' => 21];
        } elseif (stripos($courseName, 'Construção') !== false) {
            $subjects[] = ['name' => 'Desenho de Obras', 'code' => 'DO-1', 'description' => 'Projetos de construção', 'trimester' => 1, 'hours' => 100, 'credits' => 4, 'order' => 19];
            $subjects[] = ['name' => 'Materiais de Construção', 'code' => 'MC-2', 'description' => 'Materiais e técnicas', 'trimester' => 2, 'hours' => 80, 'credits' => 3, 'order' => 20];
            $subjects[] = ['name' => 'Topografia', 'code' => 'TOP-3', 'description' => 'Levantamento topográfico', 'trimester' => 3, 'hours' => 80, 'credits' => 3, 'order' => 21];
        }
    } else {
        // Disciplinas para ensino superior (organizadas por semestre)
        $subjects = [
            // 1º Semestre - 1º Ano
            ['name' => 'Matemática I', 'code' => 'MAT101', 'description' => 'Cálculo diferencial e integral', 'semester' => 1, 'hours' => 90, 'credits' => 6, 'order' => 1],
            ['name' => 'Álgebra Linear', 'code' => 'ALG101', 'description' => 'Vetores, matrizes e sistemas lineares', 'semester' => 1, 'hours' => 60, 'credits' => 4, 'order' => 2],
            ['name' => 'Programação I', 'code' => 'PROG101', 'description' => 'Fundamentos de programação', 'semester' => 1, 'hours' => 90, 'credits' => 6, 'order' => 3],
            ['name' => 'Arquitetura de Computadores', 'code' => 'ARQ101', 'description' => 'Hardware e organização de computadores', 'semester' => 1, 'hours' => 60, 'credits' => 4, 'order' => 4],
            ['name' => 'Inglês Técnico', 'code' => 'ING101', 'description' => 'Inglês para tecnologia', 'semester' => 1, 'hours' => 45, 'credits' => 3, 'order' => 5],
            ['name' => 'Metodologia de Investigação', 'code' => 'MET101', 'description' => 'Métodos científicos', 'semester' => 1, 'hours' => 30, 'credits' => 2, 'order' => 6],
            
            // 2º Semestre - 1º Ano
            ['name' => 'Matemática II', 'code' => 'MAT102', 'description' => 'Cálculo multivariável', 'semester' => 2, 'hours' => 90, 'credits' => 6, 'order' => 7],
            ['name' => 'Programação II', 'code' => 'PROG102', 'description' => 'Programação orientada a objetos', 'semester' => 2, 'hours' => 90, 'credits' => 6, 'order' => 8],
            ['name' => 'Estruturas de Dados', 'code' => 'ED102', 'description' => 'Algoritmos e estruturas', 'semester' => 2, 'hours' => 75, 'credits' => 5, 'order' => 9],
            ['name' => 'Bases de Dados', 'code' => 'BD102', 'description' => 'Modelação e SQL', 'semester' => 2, 'hours' => 75, 'credits' => 5, 'order' => 10],
            ['name' => 'Sistemas Operativos', 'code' => 'SO102', 'description' => 'Linux e Windows Server', 'semester' => 2, 'hours' => 60, 'credits' => 4, 'order' => 11],
            ['name' => 'Comunicação e Expressão', 'code' => 'COM102', 'description' => 'Português técnico', 'semester' => 2, 'hours' => 30, 'credits' => 2, 'order' => 12],
        ];
        
        // Adicionar disciplinas específicas do curso
        if (stripos($courseName, 'Informática') !== false) {
            $subjects[] = ['name' => 'Redes de Computadores I', 'code' => 'RED201', 'description' => 'Fundamentos de redes', 'semester' => 1, 'hours' => 60, 'credits' => 4, 'order' => 13];
            $subjects[] = ['name' => 'Engenharia de Software', 'code' => 'ES202', 'description' => 'Metodologias de desenvolvimento', 'semester' => 2, 'hours' => 75, 'credits' => 5, 'order' => 14];
        } elseif (stripos($courseName, 'Gestão') !== false) {
            $subjects[] = ['name' => 'Introdução à Gestão', 'code' => 'GEST101', 'description' => 'Fundamentos de gestão', 'semester' => 1, 'hours' => 60, 'credits' => 4, 'order' => 13];
            $subjects[] = ['name' => 'Contabilidade Geral', 'code' => 'CONT102', 'description' => 'Princípios contabilísticos', 'semester' => 2, 'hours' => 75, 'credits' => 5, 'order' => 14];
            $subjects[] = ['name' => 'Economia', 'code' => 'ECO102', 'description' => 'Micro e macroeconomia', 'semester' => 2, 'hours' => 60, 'credits' => 4, 'order' => 15];
        }
    }
    
    $subjectsCreated = 0;
    $subjectsError = 0;
    
    foreach ($subjects as $subject) {
        $response = makeRequest(
            "{$schoolApiUrl}/courses/{$courseId}/subjects",
            'POST',
            $subject,
            $headers
        );
        
        if ($response['code'] === 201 || $response['code'] === 200) {
            $subjectsCreated++;
        } else {
            $subjectsError++;
            printError("    ✗ Erro ao criar disciplina: {$subject['name']}");
        }
    }
    
    printSuccess("  ✓ Disciplinas criadas: {$subjectsCreated}/" . count($subjects));
    if ($subjectsError > 0) {
        printWarning("  ⚠ Disciplinas com erro: {$subjectsError}");
    }
    
    return ['created' => $subjectsCreated, 'errors' => $subjectsError, 'total' => count($subjects)];
}

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
            
            // Criar exame de admissão
            criarExameAdmissao($schoolApiUrl, $courseId, $courseName, $headers);
            
            // Criar disciplinas
            criarDisciplinas($schoolApiUrl, $courseId, $courseName, 'medio', $curso['class_level'], $headers);
            
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
            
            // Criar exame de admissão
            criarExameAdmissao($schoolApiUrl, $courseId, $courseName, $headers);
            
            // Criar disciplinas
            criarDisciplinas($schoolApiUrl, $courseId, $courseName, 'superior', $curso['year_level'], $headers);
            
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

