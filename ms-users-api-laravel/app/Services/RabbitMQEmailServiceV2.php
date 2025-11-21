<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Comlaude\Amqp\Amqp;

class RabbitMQEmailServiceV2
{
    private string $exchange;

    public function __construct()
    {
        $this->exchange = config('rabbitmq.email_exchange', 'email_exchange');
    }

    /**
     * Send email event to RabbitMQ using comlaude/laravel-amqp.
     */
    public function sendEmailEvent(string $type, string $to, array $data, array $metadata = []): void
    {
        try {
            $event = [
                'type' => $type,
                'to' => $to,
                'data' => $data,
                'metadata' => array_merge([
                    'timestamp' => now()->toISOString(),
                ], $metadata),
            ];

            Amqp::publish($type, json_encode($event), [
                'exchange' => $this->exchange,
            ]);

            Log::info("Evento de email enviado para RabbitMQ", [
                'type' => $type,
                'to' => $to,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao enviar evento de email para RabbitMQ', [
                'type' => $type,
                'to' => $to,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }
}

