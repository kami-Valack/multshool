<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SchoolEventClient
{
    /**
     * @return array{success: bool, event?: array, error?: string, status?: int}
     */
    public function getEvent(string $eventId): array
    {
        $url = config('services.school_api.url')."/student/events/{$eventId}";
        $secret = config('services.school_api.secret');

        $response = Http::withHeaders(['X-API-Secret' => $secret])
            ->acceptJson()
            ->timeout(20)
            ->get($url);

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? 'Evento não encontrado',
                'status' => $response->status(),
            ];
        }

        $event = $response->json('event');
        if (!$event) {
            return ['success' => false, 'error' => 'Resposta inválida da school API', 'status' => 502];
        }

        return ['success' => true, 'event' => $event];
    }

    /**
     * @return array{success: bool, error?: string, status?: int}
     */
    public function confirmPayment(
        string $eventId,
        string $studentId,
        string $studentEmail,
        string $studentName,
        ?string $paymentReference = null
    ): array {
        $url = config('services.school_api.url')."/student/events/{$eventId}/confirm-payment";
        $secret = config('services.school_api.secret');

        $response = Http::withHeaders(['X-API-Secret' => $secret])
            ->acceptJson()
            ->timeout(20)
            ->post($url, [
                'student_id' => $studentId,
                'student_email' => $studentEmail,
                'student_name' => $studentName,
                'payment_reference' => $paymentReference,
            ]);

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? 'Erro ao confirmar inscrição no evento',
                'status' => $response->status(),
            ];
        }

        return ['success' => true];
    }
}
