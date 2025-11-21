<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Comlaude\Amqp\Amqp;

class RabbitMQUserEventServiceV2
{
    private string $exchange;
    private string $routingKey = 'user.verified';

    public function __construct()
    {
        $this->exchange = config('rabbitmq.user_events_exchange', 'user_events');
    }

    /**
     * Emit user verified event using comlaude/laravel-amqp.
     */
    public function emitUserVerifiedEvent(User $user): void
    {
        try {
            $event = [
                'type' => 'user.verified',
                'userId' => $user->id,
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'emailVerified' => $user->email_verified,
                    'isActive' => $user->is_active,
                    'createdAt' => $user->created_at->toISOString(),
                    'updatedAt' => $user->updated_at->toISOString(),
                ],
                'metadata' => [
                    'timestamp' => now()->toISOString(),
                    'source' => 'ms-users-api',
                    'version' => '1.0.0',
                ],
            ];

            Amqp::publish($this->routingKey, json_encode($event), [
                'exchange' => $this->exchange,
            ]);

            Log::info("Evento de usuário verificado emitido: {$user->id} ({$user->email})");
        } catch (\Exception $e) {
            Log::error('Erro ao emitir evento de usuário verificado', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
            // Não lança erro para não quebrar o fluxo de verificação
        }
    }
}

