<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "=== Teste de Login do Sistema Admin ===\n\n";

// Verificar JWT_SECRET
$jwtSecret = config('jwt.secret');
echo "JWT_SECRET: " . ($jwtSecret ? "Configurado (" . strlen($jwtSecret) . " chars)" : "NAO CONFIGURADO") . "\n\n";

// Verificar admin
$admin = User::where('email', 'admin')->first();

if (!$admin) {
    echo "ERRO: Admin nao encontrado!\n";
    echo "Execute: php artisan db:seed --class=AdminSeeder\n";
    exit(1);
}

echo "Admin encontrado:\n";
echo "  ID: {$admin->id}\n";
echo "  Email: {$admin->email}\n";
echo "  Name: {$admin->name}\n";
echo "  Role: {$admin->role}\n";
echo "  Active: " . ($admin->is_active ? 'Sim' : 'Não') . "\n";
echo "  Password Hash: " . substr($admin->password, 0, 20) . "...\n\n";

// Testar senha
echo "Testando senha 'admin':\n";
$passwordMatch = Hash::check('admin', $admin->password);
echo "  Senha correta: " . ($passwordMatch ? "SIM" : "NAO") . "\n\n";

if (!$passwordMatch) {
    echo "ERRO: A senha nao confere!\n";
    echo "Atualizando senha...\n";
    $admin->password = Hash::make('admin');
    $admin->save();
    echo "Senha atualizada!\n\n";
}

// Testar geração de token
try {
    echo "Testando geracao de token JWT:\n";
    $token = \PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth::fromUser($admin);
    echo "  Token gerado: " . substr($token, 0, 50) . "...\n";
    echo "  Tamanho: " . strlen($token) . " caracteres\n";
    echo "  SUCESSO!\n\n";
} catch (\Exception $e) {
    echo "  ERRO: " . $e->getMessage() . "\n";
    echo "  Trace: " . $e->getTraceAsString() . "\n";
    exit(1);
}

echo "=== Tudo OK! Pode fazer login ===\n";
echo "Email: admin\n";
echo "Senha: admin\n";

