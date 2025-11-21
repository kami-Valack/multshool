<?php
/**
 * Script para replicar manualmente um docente do ms-users-api-laravel para ms-shocoll-api
 * 
 * Uso: php replicar_docente_manual.php <email-do-docente>
 */

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\DB;

if ($argc < 2) {
    echo "❌ Uso: php replicar_docente_manual.php <email-do-docente>\n";
    exit(1);
}

$email = $argv[1];

echo "🔍 Buscando docente no ms-users-api-laravel...\n";

// Conectar ao banco do ms-users-api-laravel
$usersDb = DB::connection('mysql'); // Ajuste conforme sua configuração
// Ou use uma conexão específica se configurada

// Por enquanto, vamos buscar diretamente do banco local se o usuário já existe
// ou criar manualmente

echo "📝 Para replicar manualmente, execute no banco ms-shocoll-api:\n\n";

echo "1. Primeiro, obtenha os dados do docente no ms-users-api-laravel:\n";
echo "   SELECT id, name, email, role, email_verified, is_active FROM users WHERE email = '{$email}' AND role = 'teacher';\n\n";

echo "2. Depois, insira no banco ms-shocoll-api:\n";
echo "   INSERT INTO users (id, name, email, role, email_verified, is_active, created_at, updated_at)\n";
echo "   VALUES ('uuid-do-docente', 'Nome do Docente', '{$email}', 'teacher', true, true, NOW(), NOW());\n\n";

echo "💡 Ou use o consumer RabbitMQ:\n";
echo "   php artisan rabbitmq:consume-user-events\n";
echo "   (Certifique-se de que o docente foi verificado no ms-users-api-laravel)\n";

