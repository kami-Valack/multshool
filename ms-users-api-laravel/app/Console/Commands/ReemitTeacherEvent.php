<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\RabbitMQUserEventService;
use Illuminate\Console\Command;

class ReemitTeacherEvent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teacher:reemit-event {email : Email do docente}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reemite o evento user.verified para um docente (útil quando criado antes das atualizações)';

    /**
     * Execute the console command.
     */
    public function handle(RabbitMQUserEventService $eventService): int
    {
        $email = $this->argument('email');
        
        $this->info("Buscando docente: {$email}");
        
        $user = User::where('email', $email)
            ->where('role', User::ROLE_TEACHER)
            ->first();
        
        if (!$user) {
            $this->error("❌ Docente não encontrado!");
            return Command::FAILURE;
        }
        
        $this->info("✅ Docente encontrado:");
        $this->line("   ID: {$user->id}");
        $this->line("   Nome: {$user->name}");
        $this->line("   Email: {$user->email}");
        $this->line("   Email Verificado: " . ($user->email_verified ? 'Sim' : 'Não'));
        
        if (!$user->email_verified) {
            $this->warn("⚠️  Docente não está verificado. Verificando agora...");
            $user->verifyEmail();
            $this->info("✅ Email verificado!");
        }
        
        $this->info("📤 Emitindo evento user.verified...");
        
        try {
            $eventService->emitUserVerifiedEvent($user);
            $this->info("✅ Evento emitido com sucesso!");
            $this->line("");
            $this->info("📝 Próximos passos:");
            $this->line("   1. Certifique-se de que o consumer está rodando no ms-shocoll-api:");
            $this->line("      cd ms-shocoll-api");
            $this->line("      php artisan rabbitmq:consume-user-events");
            $this->line("");
            $this->line("   2. O docente deve ser replicado automaticamente.");
            $this->line("   3. Verifique os logs em ms-shocoll-api/storage/logs/laravel.log");
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error("❌ Erro ao emitir evento: " . $e->getMessage());
            return Command::FAILURE;
        }
    }
}

