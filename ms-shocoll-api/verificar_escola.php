<?php

/**
 * Script para verificar se uma escola foi replicada no banco
 * 
 * Uso: php verificar_escola.php <email>
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

if ($argc < 2) {
    echo "Uso: php verificar_escola.php <email>\n";
    echo "Exemplo: php verificar_escola.php escola@example.com\n";
    exit(1);
}

$email = $argv[1];

echo "=== Verificando Escola no Banco Local ===\n\n";

// Buscar usuário
$user = User::where('email', $email)->first();

if (!$user) {
    echo "ERRO: Escola não encontrada no banco local!\n";
    echo "Email: {$email}\n\n";
    echo "Possíveis causas:\n";
    echo "1. O consumer RabbitMQ não está rodando\n";
    echo "2. O evento school.create não foi recebido\n";
    echo "3. O email não foi verificado no ms-users-api\n";
    echo "4. O evento ainda não foi processado\n\n";
    echo "Verifique:\n";
    echo "- Se o consumer está rodando: php artisan rabbitmq:consume-user-events\n";
    echo "- Se o evento foi emitido: verifique os logs do ms-users-api\n";
    exit(1);
}

echo "✓ Escola encontrada no banco local!\n\n";
echo "Dados da Escola:\n";
echo "  ID: {$user->id}\n";
echo "  Nome: {$user->name}\n";
echo "  Email: {$user->email}\n";
echo "  Role: {$user->role}\n";
echo "  Email Verificado: " . ($user->email_verified ? "Sim" : "Não") . "\n";
echo "  Ativo: " . ($user->is_active ? "Sim" : "Não") . "\n";
echo "  Criado em: {$user->created_at}\n";
echo "  Atualizado em: {$user->updated_at}\n\n";

if ($user->role !== 'school') {
    echo "AVISO: Este usuário não é uma escola (role: {$user->role})\n\n";
}

echo "=== Status: OK ===\n";
echo "A escola foi replicada com sucesso via RabbitMQ!\n";

