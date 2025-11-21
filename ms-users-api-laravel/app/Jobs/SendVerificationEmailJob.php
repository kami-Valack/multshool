<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\RabbitMQEmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendVerificationEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 120;
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public User $user,
        public string $token,
        public string $verificationUrl
    ) {}

    /**
     * Execute the job.
     */
    public function handle(RabbitMQEmailService $emailService): void
    {
        try {
            if (!$this->user || !$this->user->email) {
                Log::warning('User email not found for verification email', [
                    'user_id' => $this->user?->id
                ]);
                return;
            }

            $emailService->sendEmailEvent(
                'verificacao de conta',
                $this->user->email,
                [
                    'nome' => $this->user->name,
                    'linkVerificacao' => $this->verificationUrl,
                    'token' => $this->token,
                    'tempoExpiracao' => '24 horas',
                ],
                [
                    'userId' => $this->user->id,
                ]
            );

            Log::info('Verification email event sent successfully', [
                'user_id' => $this->user->id,
                'email' => $this->user->email
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send verification email event', [
                'user_id' => $this->user->id,
                'email' => $this->user->email,
                'error' => $e->getMessage()
            ]);
            
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Verification email job failed', [
            'user_id' => $this->user->id,
            'email' => $this->user->email,
            'error' => $exception->getMessage()
        ]);
    }
}

