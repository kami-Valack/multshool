<?php

/**
 * Script para obter o token de verificação de email de uma escola
 * 
 * Uso: php obter_token_verificacao_escola.php <email>
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\EmailVerificationToken;

if ($argc < 2) {
    echo "Uso: php obter_token_verificacao_escola.php <email>\n";
    echo "Exemplo: php obter_token_verificacao_escola.php escola@example.com\n";
    exit(1);
}

$email = $argv[1];

echo "=== Obtendo Token de Verificação para Escola ===\n\n";

// Buscar usuário
$user = User::where('email', $email)->first();

if (!$user) {
    echo "ERRO: Usuário não encontrado com email: {$email}\n";
    exit(1);
}

echo "Usuário encontrado:\n";
echo "  ID: {$user->id}\n";
echo "  Nome: {$user->name}\n";
echo "  Email: {$user->email}\n";
echo "  Role: {$user->role}\n";
echo "  Email Verificado: " . ($user->email_verified ? "Sim" : "Não") . "\n\n";

if ($user->role !== 'school') {
    echo "AVISO: Este usuário não é uma escola (role: {$user->role})\n\n";
}

// Buscar token de verificação
$token = EmailVerificationToken::where('user_id', $user->id)
    ->where('used', false)
    ->orderBy('created_at', 'desc')
    ->first();

if (!$token) {
    echo "ERRO: Nenhum token de verificação encontrado para este usuário.\n";
    echo "O token pode ter sido usado ou expirado.\n";
    exit(1);
}

echo "Token de Verificação:\n";
echo "  Token: {$token->token}\n";
echo "  Criado em: {$token->created_at}\n";
echo "  Expira em: {$token->expires_at}\n";
echo "  Usado: " . ($token->used ? "Sim" : "Não") . "\n\n";

if ($token->isExpired()) {
    echo "AVISO: Este token está expirado!\n\n";
}

echo "=== URL de Verificação ===\n";
$frontendUrl = config('app.frontend_url', 'http://localhost:3001');
$verificationUrl = "{$frontendUrl}/verify-email?token={$token->token}";
echo "URL: {$verificationUrl}\n\n";

echo "=== Para testar via API ===\n";
echo "curl -X POST http://localhost:8000/api/auth/verify-email \\\n";
echo "  -H \"Content-Type: application/json\" \\\n";
echo "  -d '{\"token\": \"{$token->token}\"}'\n\n";

echo "=== Para usar no script Python ===\n";
echo "python test_school_api.py {$token->token}\n\n";

