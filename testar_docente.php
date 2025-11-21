<?php
/**
 * Script de teste rápido para funcionalidade de docente
 * 
 * Uso: php testar_docente.php
 */

$baseUrl = 'http://localhost:8003';
$usersApiUrl = 'http://localhost:8000';

echo "🧪 Testando Funcionalidade de Docente\n";
echo "=====================================\n\n";

// 1. Criar usuário docente (se necessário)
echo "1️⃣ Criando usuário docente...\n";
$registerData = [
    'name' => 'Professor Teste',
    'email' => 'professor.teste03@example.com',
    'password' => 'Senha123!'
];

$ch = curl_init($usersApiUrl . '/api/auth/register-teacher');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($registerData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 201 || $httpCode === 200) {
    echo "✅ Usuário docente criado\n\n";
} else {
    echo "⚠️ Usuário pode já existir ou erro: " . $response . "\n\n";
}

// 2. Fazer login
echo "2️⃣ Fazendo login como docente...\n";
$loginData = [
    'email' => 'professor.teste03@example.com',
    'password' => 'Senha123!'
];

$ch = curl_init($usersApiUrl . '/api/auth/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($loginData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo "❌ Erro no login: " . $response . "\n";
    exit(1);
}

$loginResult = json_decode($response, true);
$token = $loginResult['accessToken'] ?? null;

if (!$token) {
    echo "❌ Token não retornado: " . $response . "\n";
    exit(1);
}

echo "✅ Login realizado com sucesso\n";
echo "   Token: " . substr($token, 0, 50) . "...\n\n";

// 3. Verificar perfil do docente
echo "3️⃣ Verificando perfil do docente...\n";
$ch = curl_init($baseUrl . '/api/teacher/me');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $profile = json_decode($response, true);
    echo "✅ Perfil obtido com sucesso\n";
    echo "   Nome: " . ($profile['teacher']['name'] ?? 'N/A') . "\n";
    echo "   Email: " . ($profile['teacher']['email'] ?? 'N/A') . "\n";
    echo "   Alunos vinculados: " . ($profile['teacher']['students_count'] ?? 0) . "\n\n";
} else {
    echo "❌ Erro ao obter perfil: " . $response . "\n\n";
}

// 4. Listar alunos
echo "4️⃣ Listando alunos do docente...\n";
$ch = curl_init($baseUrl . '/api/teacher/students');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $token,
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $students = json_decode($response, true);
    $count = count($students['students'] ?? []);
    echo "✅ Lista de alunos obtida\n";
    echo "   Total de alunos: " . $count . "\n";
    if ($count > 0) {
        echo "   Primeiro aluno: " . ($students['students'][0]['name'] ?? 'N/A') . "\n";
    } else {
        echo "   ⚠️ Nenhum aluno vinculado ainda\n";
        echo "   💡 Para vincular um aluno, execute no banco:\n";
        echo "      INSERT INTO teacher_students (id, teacher_id, student_id, school_id, is_active, created_at, updated_at)\n";
        echo "      VALUES (gen_random_uuid(), 'uuid-do-docente', 'uuid-do-estudante', 'uuid-da-escola', true, NOW(), NOW());\n";
    }
    echo "\n";
} else {
    echo "❌ Erro ao listar alunos: " . $response . "\n\n";
}

echo "✅ Testes concluídos!\n";
echo "\n📝 Próximos passos:\n";
echo "   1. Vincular alunos ao docente na tabela teacher_students\n";
echo "   2. Testar visualização de notas\n";
echo "   3. Testar criação de acompanhamentos\n";

