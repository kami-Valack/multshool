<?php

/**
 * Script para obter o token de verificação de email de um usuário (estudante ou escola)
 * 
 * Uso: php obter_token_verificacao.php <email>
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Models\EmailVerificationToken;

if ($argc < 2) {
    echo "Uso: php obter_token_verificacao.php <email>\n";
    echo "Exemplo: php obter_token_verificacao.php usuario@example.com\n";
    exit(1);
}

$email = $argv[1];

// Buscar usuário
$user = User::where('email', $email)->first();

if (!$user) {
    echo "ERRO: Usuário não encontrado com email: {$email}\n";
    exit(1);
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

// Apenas retornar o token (para uso em scripts)
echo $token->token;

