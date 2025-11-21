<?php

namespace App\Jobs;

use App\Models\EmailLog;
use App\Services\EmailType;
use App\Services\EmailTemplateService;
use App\Services\PostmarkEmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessEmailEventJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 120;
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $emailType,
        public string $to,
        public array $data,
        public array $metadata = []
    ) {}

    /**
     * Execute the job.
     */
    public function handle(
        EmailTemplateService $templateService,
        PostmarkEmailService $emailService
    ): void {
        try {
            // Validate email type
            if (!EmailType::isValid($this->emailType)) {
                throw new \InvalidArgumentException("Tipo de email inválido: {$this->emailType}");
            }

            // Create email log
            $emailLog = EmailLog::create([
                'id' => \Illuminate\Support\Str::uuid(),
                'email_type' => $this->emailType,
                'to' => $this->to,
                'subject' => $templateService->getSubject($this->emailType, $this->data),
                'status' => EmailLog::STATUS_PENDING,
                'metadata' => $this->metadata,
            ]);

            // Render email template
            $htmlBody = $templateService->render($this->emailType, $this->data);

            // Send email
            $emailService->send(
                $this->to,
                $emailLog->subject,
                $htmlBody,
                $this->data
            );

            // Mark as sent
            $emailLog->markAsSent();

            Log::info('Email sent successfully', [
                'email_type' => $this->emailType,
                'to' => $this->to,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send email', [
                'email_type' => $this->emailType,
                'to' => $this->to,
                'error' => $e->getMessage(),
            ]);

            if (isset($emailLog)) {
                $emailLog->markAsFailed($e->getMessage());
            }

            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Email job failed', [
            'email_type' => $this->emailType,
            'to' => $this->to,
            'error' => $exception->getMessage(),
        ]);
    }
}

