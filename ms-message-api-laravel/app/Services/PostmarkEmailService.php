<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Postmark\PostmarkClient;

class PostmarkEmailService
{
    private ?PostmarkClient $client = null;
    private string $fromEmail;
    private string $fromName;

    public function __construct()
    {
        $apiToken = config('services.postmark.api_token');
        $this->fromEmail = config('services.postmark.from_email', config('mail.from.address'));
        $this->fromName = config('services.postmark.from_name', config('mail.from.name'));

        if ($apiToken) {
            $this->client = new PostmarkClient($apiToken);
        }
    }

    /**
     * Send email using Postmark or fallback to Laravel Mail.
     */
    public function send(string $to, string $subject, string $htmlBody, array $data = []): void
    {
        if ($this->client) {
            $this->sendViaPostmark($to, $subject, $htmlBody);
        } else {
            $this->sendViaLaravelMail($to, $subject, $htmlBody);
        }
    }

    /**
     * Send email via Postmark API.
     */
    private function sendViaPostmark(string $to, string $subject, string $htmlBody): void
    {
        try {
            $this->client->sendEmail(
                $this->fromEmail,
                $to,
                $subject,
                $htmlBody,
                null,
                null,
                true,
                null,
                null,
                null,
                null,
                $this->fromName
            );

            Log::info('Email sent via Postmark', ['to' => $to]);
        } catch (\Exception $e) {
            Log::error('Failed to send email via Postmark', [
                'to' => $to,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Send email via Laravel Mail (fallback).
     */
    private function sendViaLaravelMail(string $to, string $subject, string $htmlBody): void
    {
        try {
            Mail::html($htmlBody, function ($message) use ($to, $subject) {
                $message->to($to)
                    ->subject($subject)
                    ->from($this->fromEmail, $this->fromName);
            });

            Log::info('Email sent via Laravel Mail', ['to' => $to]);
        } catch (\Exception $e) {
            Log::error('Failed to send email via Laravel Mail', [
                'to' => $to,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }
}

