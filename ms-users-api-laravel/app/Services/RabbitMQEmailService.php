<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQEmailService
{
    private ?AMQPStreamConnection $connection = null;
    private ?AMQPChannel $channel = null;
    private string $exchange;
    private string $queue;
    private bool $exchangeInitialized = false;

    public function __construct()
    {
        $this->exchange = config('rabbitmq.email_exchange', 'email_exchange');
        $this->queue = config('rabbitmq.email_queue', 'email_queue');
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
                ''
            );

            $this->exchangeInitialized = true;
        }
    }

    /**
     * Send email event to RabbitMQ.
     */
    public function sendEmailEvent(string $type, string $to, array $data, array $metadata = []): void
    {
        try {
            Log::info("Tentando enviar evento de email para RabbitMQ", [
                'type' => $type,
                'to' => $to,
                'exchange' => $this->exchange,
                'queue' => $this->queue,
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
            ]);

            $this->ensureConnection();
            Log::info("Conexão RabbitMQ estabelecida para email");
            
            $this->initializeExchangeAndQueue();
            Log::info("Exchange e Queue inicializados para email");

            $event = [
                'type' => $type,
                'to' => $to,
                'data' => $data,
                'metadata' => array_merge([
                    'timestamp' => now()->toIso8601String(),
                ], $metadata),
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
                ''
            );

            // Flush to ensure message is sent
            $this->channel->getConnection()->checkHeartBeat();

            Log::info("Evento de email enviado para RabbitMQ com sucesso", [
                'type' => $type,
                'to' => $to,
                'exchange' => $this->exchange,
            ]);
        } catch (\PhpAmqpLib\Exception\AMQPConnectionException $e) {
            Log::error('Erro de conexão RabbitMQ ao enviar email', [
                'type' => $type,
                'to' => $to,
                'error' => $e->getMessage(),
                'host' => config('rabbitmq.host'),
                'port' => config('rabbitmq.port'),
                'trace' => $e->getTraceAsString(),
            ]);
            // Não lança erro para não quebrar o fluxo
        } catch (\Exception $e) {
            Log::error('Erro ao enviar evento de email para RabbitMQ', [
                'type' => $type,
                'to' => $to,
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

