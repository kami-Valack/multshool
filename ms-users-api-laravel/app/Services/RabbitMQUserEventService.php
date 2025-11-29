<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQUserEventService
{
    private ?AMQPStreamConnection $connection = null;
    private ?AMQPChannel $channel = null;
    private string $exchange;
    private string $queue;
    private string $routingKey = 'user.verified';
    private bool $exchangeInitialized = false;
    private bool $queueInitialized = false;

    public function __construct()
    {
        $this->exchange = config('rabbitmq.user_events_exchange', 'user_events');
        $this->queue = config('rabbitmq.user_events_queue', 'user_replication_queue');
    }

    /**
     * Ensure connection is established.
     */
    private function ensureConnection(): void
    {
        if ($this->connection === null || !$this->connection->isConnected()) {
            $this->connection = new AMQPStreamConnection(
                config('rabbitmq.host', 'localhost'),
                config('rabbitmq.port', 5672),
                config('rabbitmq.user', 'guest'),
                config('rabbitmq.password', 'guest'),
                config('rabbitmq.vhost', '/')
            );
            $this->channel = $this->connection->channel();
        }
    }

    /**
     * Initialize exchange and queue.
     */
    private function initializeExchangeAndQueue(): void
    {
        if (!$this->exchangeInitialized) {
            // Enable publisher confirms
            $this->channel->confirm_select();
            
            $this->channel->exchange_declare(
                $this->exchange,
                'direct',
                false,
                true,
                false
            );
            $this->exchangeInitialized = true;
            Log::info("Exchange '{$this->exchange}' criada/verificada");
        }

        if (!$this->queueInitialized) {
            $this->channel->queue_declare(
                $this->queue,
                false,
                true,
                false,
                false
            );

            $this->channel->queue_bind(
                $this->queue,
                $this->exchange,
                $this->routingKey
            );

            $this->queueInitialized = true;
            Log::info("Fila '{$this->queue}' criada e vinculada ao exchange '{$this->exchange}' (routing key: '{$this->routingKey}')");
        }
    }

    /**
     * Emit user verified event.
     */
    public function emitUserVerifiedEvent(User $user): void
    {
        try {
            Log::info("Tentando emitir evento de usuário verificado", [
                'user_id' => $user->id,
                'exchange' => $this->exchange,
                'queue' => $this->queue,
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
            ]);

            $this->ensureConnection();
            Log::info("Conexão RabbitMQ estabelecida");
            
            $this->initializeExchangeAndQueue();
            Log::info("Exchange e Queue inicializados");

            $event = [
                'type' => 'user.verified',
                'userId' => $user->id,
                'data' => [
                    'id' => $user->id,
                    'student_id' => $user->student_id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'emailVerified' => $user->email_verified,
                    'isActive' => $user->is_active,
                    'createdAt' => $user->created_at->toIso8601String(),
                    'updatedAt' => $user->updated_at->toIso8601String(),
                ],
                'metadata' => [
                    'timestamp' => now()->toIso8601String(),
                    'source' => 'ms-users-api',
                    'version' => '1.0.0',
                ],
            ];

            $message = new AMQPMessage(
                json_encode($event),
                [
                    'content_type' => 'application/json',
                    'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT,
                ]
            );

            $this->channel->basic_publish(
                $message,
                $this->exchange,
                $this->routingKey
            );

            // Flush to ensure message is sent
            $this->channel->getConnection()->checkHeartBeat();

            Log::info("Evento de usuário verificado emitido com sucesso", [
                'user_id' => $user->id,
                'email' => $user->email,
                'exchange' => $this->exchange,
                'routing_key' => $this->routingKey,
            ]);
        } catch (\PhpAmqpLib\Exception\AMQPConnectionException $e) {
            Log::error('Erro de conexão RabbitMQ ao emitir evento', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
                'trace' => $e->getTraceAsString(),
            ]);
            // Não lança erro para não quebrar o fluxo de verificação
        } catch (\Exception $e) {
            Log::error('Erro ao emitir evento de usuário verificado', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            // Não lança erro para não quebrar o fluxo de verificação
        }
    }

    /**
     * Emit school created event.
     */
    public function emitSchoolCreatedEvent(User $user): void
    {
        try {
            Log::info("Tentando emitir evento de escola criada", [
                'user_id' => $user->id,
                'exchange' => $this->exchange,
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
            ]);

            $this->ensureConnection();
            Log::info("Conexão RabbitMQ estabelecida para evento school.create");
            
            // Initialize exchange (queue will be created by consumer)
            if (!$this->exchangeInitialized) {
                $this->channel->confirm_select();
                $this->channel->exchange_declare(
                    $this->exchange,
                    'direct',
                    false,
                    true,
                    false
                );
                $this->exchangeInitialized = true;
                Log::info("Exchange '{$this->exchange}' criada/verificada");
            }

            $event = [
                'type' => 'school.create',
                'userId' => $user->id,
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'institution_type' => $user->institution_type, // 'medio' ou 'superior'
                    'emailVerified' => $user->email_verified,
                    'isActive' => $user->is_active,
                    'createdAt' => $user->created_at->toIso8601String(),
                    'updatedAt' => $user->updated_at->toIso8601String(),
                ],
                'metadata' => [
                    'timestamp' => now()->toIso8601String(),
                    'source' => 'ms-users-api',
                    'version' => '1.0.0',
                ],
            ];

            $message = new AMQPMessage(
                json_encode($event),
                [
                    'content_type' => 'application/json',
                    'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT,
                ]
            );

            // Publish with routing key 'school.create'
            $this->channel->basic_publish(
                $message,
                $this->exchange,
                'school.create'
            );

            // Flush to ensure message is sent
            $this->channel->getConnection()->checkHeartBeat();

            Log::info("Evento de escola criada emitido com sucesso", [
                'user_id' => $user->id,
                'email' => $user->email,
                'exchange' => $this->exchange,
                'routing_key' => 'school.create',
            ]);
        } catch (\PhpAmqpLib\Exception\AMQPConnectionException $e) {
            Log::error('Erro de conexão RabbitMQ ao emitir evento school.create', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
                'trace' => $e->getTraceAsString(),
            ]);
            // Não lança erro para não quebrar o fluxo
        } catch (\Exception $e) {
            Log::error('Erro ao emitir evento de escola criada', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            // Não lança erro para não quebrar o fluxo
        }
    }

    /**
     * Close connection.
     */
    public function close(): void
    {
        // Não fechar conexão imediatamente - deixar para o garbage collector
        // ou fechar manualmente quando necessário
    }

    /**
     * Destructor to ensure connection is closed.
     */
    public function __destruct()
    {
        // Não fechar no destructor para evitar fechar antes da mensagem ser enviada
    }
}

