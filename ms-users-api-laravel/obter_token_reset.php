<?php
/**
 * Script temporário para obter o token de reset ORIGINAL dos logs
 * 
 * Execute: php obter_token_reset.php teste222@example.com
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$email = $argv[1] ?? null;

if (!$email) {
    echo "Uso: php obter_token_reset.php <email>\n";
    echo "Exemplo: php obter_token_reset.php teste222@example.com\n";
    exit(1);
}

// Ler o arquivo de log
$logFile = storage_path('logs/laravel.log');

if (!file_exists($logFile)) {
    echo "Arquivo de log não encontrado: $logFile\n";
    exit(1);
}

// Ler as últimas linhas do log
$lines = file($logFile);
$lines = array_slice($lines, -500); // Últimas 500 linhas

$found = false;
foreach (array_reverse($lines) as $line) {
    if (strpos($line, 'Token de reset de senha gerado') !== false && strpos($line, $email) !== false) {
        // Extrair o token do JSON
        if (preg_match('/"token":"([^"]+)"/', $line, $matches)) {
            echo "\n========================================\n";
            echo "Token de Reset de Senha ORIGINAL\n";
            echo "========================================\n";
            echo "Email: $email\n";
            echo "Token: {$matches[1]}\n";
            echo "========================================\n\n";
            $found = true;
            break;
        }
    }
}

if (!$found) {
    echo "Token não encontrado nos logs para o email: $email\n";
    echo "Tente solicitar um novo reset de senha primeiro.\n";
    exit(1);
}

