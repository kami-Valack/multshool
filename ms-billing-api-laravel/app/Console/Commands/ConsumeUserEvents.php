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
    protected $description = 'Consome eventos user.verified do RabbitMQ e replica usuários estudantes';

    /**
     * Execute the console command.
     */
    public function handle(RabbitMQConsumerService $consumer, UserReplicationService $replicationService): int
    {
        $this->info('Iniciando consumer de eventos RabbitMQ...');
        $this->info('Consumindo eventos user.verified do exchange: ' . config('rabbitmq.user_events_exchange'));
        $this->info('Queue: ' . config('rabbitmq.user_events_queue'));
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

                // Only process user.verified events
                if (($event['type'] ?? '') !== 'user.verified') {
                    $this->warn("Evento ignorado - tipo: " . ($event['type'] ?? 'unknown'));
                    return true; // Not an error, just skip
                }

                $userId = $event['data']['id'] ?? 'unknown';
                $userEmail = $event['data']['email'] ?? 'unknown';
                $userRole = $event['data']['role'] ?? 'unknown';

                $this->info("Processando evento user.verified...");
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
