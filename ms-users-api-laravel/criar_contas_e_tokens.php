<?php

/**
 * Script para criar contas de estudante e escola e gerar tokens JWT
 * Usa as variáveis de ambiente do .env
 * 
 * Uso: php criar_contas_e_tokens.php
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

echo "============================================================\n";
echo "  Criador de Contas e Tokens JWT\n";
echo "============================================================\n\n";

$timestamp = date('YmdHis');

// Criar estudante
echo "1. Criando conta de ESTUDANTE...\n";
$estudanteEmail = "estudante.teste.{$timestamp}@example.com";
$estudanteName = "Estudante Teste {$timestamp}";
$estudantePassword = "senha123456";

$estudante = User::create([
    'name' => $estudanteName,
    'email' => $estudanteEmail,
    'password' => Hash::make($estudantePassword),
    'role' => User::ROLE_STUDENT,
    'email_verified' => true, // Já verificado para facilitar
    'is_active' => true,
]);

echo "   ✓ Estudante criado!\n";
echo "   ID: {$estudante->id}\n";
echo "   Student ID: {$estudante->student_id}\n";
echo "   Email: {$estudante->email}\n";
echo "   Senha: {$estudantePassword}\n";

// Gerar token JWT para estudante
try {
    $estudanteToken = JWTAuth::fromUser($estudante);
    echo "   Token JWT: {$estudanteToken}\n\n";
} catch (\Exception $e) {
    echo "   ERRO ao gerar token: {$e->getMessage()}\n\n";
    $estudanteToken = null;
}

// Criar escola
echo "2. Criando conta de ESCOLA...\n";
$escolaEmail = "escola.teste.{$timestamp}@example.com";
$escolaName = "Escola Teste {$timestamp}";
$escolaPassword = "senha123456";

$escola = User::create([
    'name' => $escolaName,
    'email' => $escolaEmail,
    'password' => Hash::make($escolaPassword),
    'role' => User::ROLE_SCHOOL,
    'email_verified' => true, // Já verificado para facilitar
    'is_active' => true,
]);

echo "   ✓ Escola criada!\n";
echo "   ID: {$escola->id}\n";
echo "   Email: {$escola->email}\n";
echo "   Senha: {$escolaPassword}\n";

// Gerar token JWT para escola
try {
    $escolaToken = JWTAuth::fromUser($escola);
    echo "   Token JWT: {$escolaToken}\n\n";
} catch (\Exception $e) {
    echo "   ERRO ao gerar token: {$e->getMessage()}\n\n";
    $escolaToken = null;
}

// Resumo
echo "============================================================\n";
echo "  RESUMO\n";
echo "============================================================\n\n";

echo "ESTUDANTE:\n";
echo "  Email: {$estudanteEmail}\n";
echo "  Senha: {$estudantePassword}\n";
echo "  Student ID: {$estudante->student_id}\n";
if ($estudanteToken) {
    echo "  Token JWT: {$estudanteToken}\n";
}
echo "\n";

echo "ESCOLA:\n";
echo "  Email: {$escolaEmail}\n";
echo "  Senha: {$escolaPassword}\n";
if ($escolaToken) {
    echo "  Token JWT: {$escolaToken}\n";
}
echo "\n";

// Salvar em arquivo JSON
$output = [
    'estudante' => [
        'id' => $estudante->id,
        'student_id' => $estudante->student_id,
        'email' => $estudanteEmail,
        'password' => $estudantePassword,
        'name' => $estudanteName,
        'role' => 'student',
        'token' => $estudanteToken,
    ],
    'escola' => [
        'id' => $escola->id,
        'email' => $escolaEmail,
        'password' => $escolaPassword,
        'name' => $escolaName,
        'role' => 'school',
        'token' => $escolaToken,
    ],
    'criado_em' => date('Y-m-d H:i:s'),
];

$jsonFile = __DIR__ . '/tokens_contas.json';
file_put_contents($jsonFile, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "============================================================\n";
echo "  Tokens salvos em: tokens_contas.json\n";
echo "============================================================\n\n";

echo "Para usar os tokens:\n";
echo "  curl -X GET http://localhost:8000/api/auth/me \\\n";
echo "    -H \"Authorization: Bearer {$estudanteToken}\"\n\n";

