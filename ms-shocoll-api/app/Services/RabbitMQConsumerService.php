<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQConsumerService
{
    private ?AMQPStreamConnection $connection = null;
    private ?AMQPChannel $channel = null;
    private string $exchange;
    private string $queue;
    private string $routingKey;
    private bool $shouldStop = false;

    public function __construct()
    {
        $this->exchange = config('rabbitmq.user_events_exchange', 'user_events');
        $this->queue = config('rabbitmq.user_events_queue', 'ms-school-api.user.verified');
        $this->routingKey = config('rabbitmq.user_events_routing_key', 'user.verified');
    }

    /**
     * Ensure connection is established.
     */
    private function ensureConnection(): void
    {
        if ($this->connection === null || !$this->connection->isConnected()) {
            $host = config('rabbitmq.host', 'localhost');
            $port = config('rabbitmq.port', 5672);
            $user = config('rabbitmq.user', 'guest');
            $password = config('rabbitmq.password', 'guest');
            $vhost = config('rabbitmq.vhost', '/');

            Log::info("Tentando conectar ao RabbitMQ", [
                'host' => $host,
                'port' => $port,
                'user' => $user,
                'vhost' => $vhost,
            ]);

            try {
                $this->connection = new AMQPStreamConnection(
                    $host,
                    $port,
                    $user,
                    $password,
                    $vhost,
                    false, // insist
                    'AMQPLAIN', // login_method
                    null, // login_response
                    'en_US', // locale
                    30.0, // connection_timeout (30 segundos)
                    30.0, // read_write_timeout (30 segundos)
                    null, // context
                    false, // keepalive
                    60 // heartbeat (60 segundos)
                );
                $this->channel = $this->connection->channel();
                
                Log::info("Conexão RabbitMQ estabelecida com sucesso");
            } catch (\Exception $e) {
                Log::error("Erro ao conectar ao RabbitMQ", [
                    'error' => $e->getMessage(),
                    'host' => $host,
                    'port' => $port,
                ]);
                throw $e;
            }
        }
    }

    /**
     * Initialize exchange and queue.
     */
    private function initializeExchangeAndQueue(): void
    {
        // Declare exchange
        $this->channel->exchange_declare(
            $this->exchange,
            'direct',
            false,
            true,
            false
        );

        // Declare queue for user.verified
        $this->channel->queue_declare(
            $this->queue,
            false,
            true,
            false,
            false
        );

        // Bind queue to exchange for user.verified
        $this->channel->queue_bind(
            $this->queue,
            $this->exchange,
            $this->routingKey
        );

        // Declare and bind queue for school.create
        $schoolQueue = config('rabbitmq.school_events_queue', 'ms-school-api.school.create');
        $schoolRoutingKey = config('rabbitmq.school_events_routing_key', 'school.create');
        
        $this->channel->queue_declare(
            $schoolQueue,
            false,
            true,
            false,
            false
        );

        $this->channel->queue_bind(
            $schoolQueue,
            $this->exchange,
            $schoolRoutingKey
        );

        Log::info("Exchange '{$this->exchange}' e Queues inicializados", [
            'user_queue' => $this->queue,
            'user_routing_key' => $this->routingKey,
            'school_queue' => $schoolQueue,
            'school_routing_key' => $schoolRoutingKey,
        ]);
    }

    /**
     * Start consuming messages.
     */
    public function consume(callable $callback): void
    {
        try {
            $this->ensureConnection();
            $this->initializeExchangeAndQueue();

            Log::info("Iniciando consumo de eventos RabbitMQ", [
                'exchange' => $this->exchange,
                'queue' => $this->queue,
                'routing_key' => $this->routingKey,
            ]);

            // Set quality of service (prefetch count)
            $this->channel->basic_qos(null, 1, null);

            // Define callback for message processing
            $messageCallback = function (AMQPMessage $message) use ($callback) {
                try {
                    $body = json_decode($message->getBody(), true);
                    
                    Log::info("Evento recebido do RabbitMQ", [
                        'type' => $body['type'] ?? 'unknown',
                        'routing_key' => $message->getRoutingKey(),
                    ]);

                    // Process message
                    $result = $callback($body);

                    if ($result) {
                        // Acknowledge message
                        $message->ack();
                        Log::info("Evento processado com sucesso", [
                            'type' => $body['type'] ?? 'unknown',
                        ]);
                    } else {
                        // Reject and requeue
                        $message->nack(false, true);
                        Log::warning("Evento rejeitado e reenfileirado", [
                            'type' => $body['type'] ?? 'unknown',
                        ]);
                    }
                } catch (\Exception $e) {
                    Log::error('Erro ao processar evento RabbitMQ', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                    ]);
                    // Reject and requeue on error
                    $message->nack(false, true);
                }
            };

            // Start consuming from both queues
            $schoolQueue = config('rabbitmq.school_events_queue', 'ms-school-api.school.create');
            
            $this->channel->basic_consume(
                $this->queue,
                '',
                false,
                false,
                false,
                false,
                $messageCallback
            );
            
            $this->channel->basic_consume(
                $schoolQueue,
                '',
                false,
                false,
                false,
                false,
                $messageCallback
            );

            // Keep consuming until stopped
            while ($this->channel->is_consuming() && !$this->shouldStop) {
                try {
                    $this->channel->wait(null, false, 5); // 5 segundos de timeout
                } catch (\PhpAmqpLib\Exception\AMQPTimeoutException $e) {
                    // Timeout é normal, continuar consumindo
                    continue;
                } catch (\Exception $e) {
                    Log::error("Erro durante wait do channel", [
                        'error' => $e->getMessage(),
                    ]);
                    // Se a conexão foi perdida, tentar reconectar
                    if (!$this->connection->isConnected()) {
                        Log::info("Conexão perdida, tentando reconectar...");
                        $this->connection = null;
                        $this->channel = null;
                        $this->ensureConnection();
                        $this->initializeExchangeAndQueue();
                        // Recomeçar o consumo de ambas as queues
                        $this->channel->basic_qos(null, 1, null);
                        $schoolQueue = config('rabbitmq.school_events_queue', 'ms-school-api.school.create');
                        $this->channel->basic_consume(
                            $this->queue,
                            '',
                            false,
                            false,
                            false,
                            false,
                            $messageCallback
                        );
                        $this->channel->basic_consume(
                            $schoolQueue,
                            '',
                            false,
                            false,
                            false,
                            false,
                            $messageCallback
                        );
                    }
                }
            }

        } catch (\PhpAmqpLib\Exception\AMQPConnectionException $e) {
            Log::error('Erro de conexão RabbitMQ', [
                'error' => $e->getMessage(),
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
            ]);
            throw $e;
        } catch (\Exception $e) {
            Log::error('Erro ao consumir eventos RabbitMQ', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    /**
     * Stop consuming.
     */
    public function stop(): void
    {
        $this->shouldStop = true;
        Log::info("Parando consumo de eventos RabbitMQ");
    }

    /**
     * Close connection.
     */
    public function close(): void
    {
        if ($this->channel) {
            $this->channel->close();
        }
        if ($this->connection) {
            $this->connection->close();
        }
        Log::info("Conexão RabbitMQ fechada");
    }

    /**
     * Destructor to ensure connection is closed.
     */
    public function __destruct()
    {
        $this->close();
    }
}

