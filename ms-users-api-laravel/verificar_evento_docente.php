<?php
/**
 * Script para verificar se o evento de docente está sendo emitido corretamente
 * 
 * Uso: php verificar_evento_docente.php <email-do-docente>
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use App\Services\RabbitMQUserEventService;

if ($argc < 2) {
    echo "❌ Uso: php verificar_evento_docente.php <email-do-docente>\n";
    exit(1);
}

$email = $argv[1];

echo "🔍 Verificando docente: {$email}\n\n";

$user = User::where('email', $email)->where('role', 'teacher')->first();

if (!$user) {
    echo "❌ Docente não encontrado!\n";
    exit(1);
}

echo "✅ Docente encontrado:\n";
echo "   ID: {$user->id}\n";
echo "   Nome: {$user->name}\n";
echo "   Email: {$user->email}\n";
echo "   Role: {$user->role}\n";
echo "   Email Verificado: " . ($user->email_verified ? 'Sim' : 'Não') . "\n\n";

if (!$user->email_verified) {
    echo "⚠️  Docente não está verificado. Verificando agora...\n";
    $user->verifyEmail();
    echo "✅ Email verificado!\n\n";
}

echo "📤 Emitindo evento user.verified...\n";

try {
    $eventService = app(RabbitMQUserEventService::class);
    $eventService->emitUserVerifiedEvent($user);
    echo "✅ Evento emitido com sucesso!\n\n";
    
    echo "📝 Próximos passos:\n";
    echo "   1. Certifique-se de que o consumer está rodando no ms-shocoll-api:\n";
    echo "      cd ms-shocoll-api\n";
    echo "      php artisan rabbitmq:consume-user-events\n\n";
    echo "   2. O docente deve ser replicado automaticamente.\n";
    echo "   3. Verifique os logs em ms-shocoll-api/storage/logs/laravel.log\n";
    
} catch (\Exception $e) {
    echo "❌ Erro ao emitir evento: " . $e->getMessage() . "\n";
    exit(1);
}

