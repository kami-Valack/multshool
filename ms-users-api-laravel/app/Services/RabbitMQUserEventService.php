<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQUserEventService
{
    private const ROUTING_USER_VERIFIED = 'user.verified';
    private const ROUTING_SCHOOL_CREATE = 'school.create';

    private ?AMQPStreamConnection $connection = null;
    private ?AMQPChannel $channel = null;
    private string $exchange;
    private bool $topologyInitialized = false;

    public function __construct()
    {
        $this->exchange = config('rabbitmq.user_events_exchange', 'user_events');
    }

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
     * Declara exchange direct + filas dos consumers com routing keys exactas.
     * (Exchange direct NÃO trata "#" como wildcard.)
     */
    private function initializeTopology(): void
    {
        if ($this->topologyInitialized) {
            return;
        }

        $this->channel->confirm_select();

        $this->channel->exchange_declare(
            $this->exchange,
            'direct',
            false,
            true,
            false
        );

        // Filas conhecidas dos consumers — garante binding mesmo se o consumer ainda não subiu
        $bindings = [
            // legacy / publisher mirror
            [config('rabbitmq.user_events_queue', 'user_replication_queue'), self::ROUTING_USER_VERIFIED],
            // ms-student consumer
            ['ms-student-api.user.verified', self::ROUTING_USER_VERIFIED],
            // ms-school consumers
            ['ms-school-api.user.verified', self::ROUTING_USER_VERIFIED],
            ['ms-school-api.school.create', self::ROUTING_SCHOOL_CREATE],
        ];

        foreach ($bindings as [$queue, $routingKey]) {
            if ($routingKey === '#' || $routingKey === '') {
                Log::warning('Routing key inválida para exchange direct — ignorada', [
                    'queue' => $queue,
                    'routing_key' => $routingKey,
                ]);
                continue;
            }

            $this->channel->queue_declare($queue, false, true, false, false);
            $this->channel->queue_bind($queue, $this->exchange, $routingKey);
        }

        $this->topologyInitialized = true;

        Log::info("RabbitMQ topology pronta", [
            'exchange' => $this->exchange,
            'type' => 'direct',
            'bindings' => $bindings,
        ]);
    }

    public function emitUserVerifiedEvent(User $user): void
    {
        try {
            $this->ensureConnection();
            $this->initializeTopology();

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
                self::ROUTING_USER_VERIFIED
            );

            $this->channel->getConnection()->checkHeartBeat();

            Log::info('Evento user.verified emitido', [
                'user_id' => $user->id,
                'role' => $user->role,
                'routing_key' => self::ROUTING_USER_VERIFIED,
            ]);
        } catch (\Throwable $e) {
            Log::error('Erro ao emitir user.verified', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function emitSchoolCreatedEvent(User $user): void
    {
        try {
            $this->ensureConnection();
            $this->initializeTopology();

            $event = [
                'type' => 'school.create',
                'userId' => $user->id,
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'role' => $user->role,
                    'institution_type' => $user->institution_type,
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
                self::ROUTING_SCHOOL_CREATE
            );

            $this->channel->getConnection()->checkHeartBeat();

            Log::info('Evento school.create emitido', [
                'user_id' => $user->id,
                'routing_key' => self::ROUTING_SCHOOL_CREATE,
            ]);
        } catch (\Throwable $e) {
            Log::error('Erro ao emitir school.create', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function close(): void
    {
        // no-op — conexão reutilizada
    }

    public function __destruct()
    {
        // no-op
    }
}
