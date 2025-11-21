<?php

namespace App\Console\Commands;

use App\Services\RabbitMQConsumerService;
use App\Services\UserReplicationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ConsumeUserEvents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:consume-user-events';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Consome eventos user.verified e school.create do RabbitMQ e replica usuários escolas e docentes';

    /**
     * Execute the console command.
     */
    public function handle(RabbitMQConsumerService $consumer, UserReplicationService $replicationService): int
    {
        $this->info('Iniciando consumer de eventos RabbitMQ...');
        $this->info('Consumindo eventos do exchange: ' . config('rabbitmq.user_events_exchange'));
        $this->info('Queues:');
        $this->line('  - ' . config('rabbitmq.user_events_queue') . ' (user.verified)');
        $this->line('  - ' . config('rabbitmq.school_events_queue') . ' (school.create)');
        $this->info('Pressione Ctrl+C para parar');

        // Verificar se RabbitMQ está acessível antes de começar
        $this->info('Verificando conexão com RabbitMQ...');
        $host = config('rabbitmq.host', 'localhost');
        $port = config('rabbitmq.port', 5672);
        
        $this->line("Host: {$host}");
        $this->line("Port: {$port}");
        
        // Tentar fazer uma conexão de teste
        try {
            $testConnection = @fsockopen($host, $port, $errno, $errstr, 2);
            if (!$testConnection) {
                $this->error("Não foi possível conectar ao RabbitMQ em {$host}:{$port}");
                $this->error("Erro: {$errstr} ({$errno})");
                $this->warn("Verifique se o RabbitMQ está rodando e se as credenciais estão corretas no .env");
                return Command::FAILURE;
            }
            fclose($testConnection);
            $this->info("✓ Conexão com RabbitMQ verificada");
        } catch (\Exception $e) {
            $this->error("Erro ao verificar conexão: " . $e->getMessage());
            return Command::FAILURE;
        }

        try {
            $consumer->consume(function (array $event) use ($replicationService) {
                $eventType = $event['type'] ?? 'unknown';

                // Process user.verified or school.create events
                if ($eventType === 'user.verified' || $eventType === 'school.create') {
                    $userId = $event['data']['id'] ?? 'unknown';
                    $userEmail = $event['data']['email'] ?? 'unknown';
                    $userRole = $event['data']['role'] ?? 'unknown';

                    $this->info("Processando evento {$eventType}...");
                    $this->line("  User ID: {$userId}");
                    $this->line("  Email: {$userEmail}");
                    $this->line("  Role: {$userRole}");
                    
                    // Replicate user
                    $success = $replicationService->replicateUser($event);
                    
                    if ($success) {
                        $this->info("✓ Usuário replicado com sucesso");
                    } else {
                        $this->error("✗ Erro ao replicar usuário");
                    }

                    return $success;
                } else {
                    $this->warn("Evento ignorado - tipo: {$eventType}");
                    return true; // Not an error, just skip
                }
            });
        } catch (\Exception $e) {
            $this->error("Erro ao consumir eventos: " . $e->getMessage());
            Log::error("Erro fatal no consumer", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return Command::FAILURE;
        } finally {
            $consumer->close();
        }

        return Command::SUCCESS;
    }
}

