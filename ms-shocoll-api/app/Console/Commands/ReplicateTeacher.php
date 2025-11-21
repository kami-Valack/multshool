<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ReplicateTeacher extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teacher:replicate {email : Email do docente}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Replica um docente do ms-users-api-laravel para ms-shocoll-api manualmente';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');
        
        $this->info("Buscando docente com email: {$email}");
        
        // Tentar buscar do banco do ms-users-api-laravel
        // Por enquanto, vamos pedir os dados manualmente
        $this->warn("Este comando requer acesso ao banco ms-users-api-laravel.");
        $this->info("Execute a seguinte query no banco ms-users-api-laravel:");
        $this->line("");
        $this->line("SELECT id, name, email, role, email_verified, is_active, created_at, updated_at");
        $this->line("FROM users");
        $this->line("WHERE email = '{$email}' AND role = 'teacher';");
        $this->line("");
        $this->info("Depois, insira os dados no banco ms-shocoll-api:");
        $this->line("");
        $this->line("INSERT INTO users (id, name, email, role, email_verified, is_active, created_at, updated_at)");
        $this->line("VALUES ('uuid', 'nome', '{$email}', 'teacher', true, true, NOW(), NOW());");
        $this->line("");
        
        // Verificar se já existe
        $existing = User::where('email', $email)->where('role', User::ROLE_TEACHER)->first();
        if ($existing) {
            $this->warn("⚠️  Docente já existe no banco local!");
            $this->info("ID: {$existing->id}");
            $this->info("Nome: {$existing->name}");
            return Command::SUCCESS;
        }
        
        $this->info("✅ Execute a query acima para replicar o docente.");
        
        return Command::SUCCESS;
    }
}

