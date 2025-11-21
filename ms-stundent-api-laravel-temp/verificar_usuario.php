<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

echo "=== Verificando Usuários no Banco ===\n\n";

$users = User::all();
echo "Total de usuários: " . $users->count() . "\n\n";

foreach ($users as $user) {
    echo "ID: {$user->id}\n";
    echo "Email: {$user->email}\n";
    echo "Student ID: {$user->student_id}\n";
    echo "Role: {$user->role}\n";
    echo "Active: " . ($user->is_active ? 'Sim' : 'Não') . "\n";
    echo "---\n";
}

// Verificar se o usuário do token existe
$tokenUserId = '9bee4691-b54e-4bcb-8ff7-c01c443ce046';
$user = User::find($tokenUserId);

if ($user) {
    echo "\n✓ Usuário do token encontrado no banco!\n";
    echo "Email: {$user->email}\n";
} else {
    echo "\n✗ Usuário do token NÃO encontrado no banco!\n";
    echo "ID esperado: {$tokenUserId}\n";
    echo "\nPara criar o usuário manualmente, execute:\n";
    echo "php artisan tinker\n";
    echo ">>> \\App\\Models\\User::create([\n";
    echo "    'id' => '{$tokenUserId}',\n";
    echo "    'student_id' => 'ST2025000001',\n";
    echo "    'name' => 'Teste',\n";
    echo "    'email' => 'teste1111@example.com',\n";
    echo "    'role' => 'student',\n";
    echo "    'email_verified' => true,\n";
    echo "    'is_active' => true,\n";
    echo "]);\n";
}

