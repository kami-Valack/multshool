<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class StudentFeeClient
{
    /**
     * @return array{success: bool, fee?: array, error?: string, status?: int}
     */
    public function getFeeForStudent(string $bearerToken, string $feeId): array
    {
        $url = config('services.student_api.url')."/fees/{$feeId}";

        $response = Http::withToken($bearerToken)
            ->acceptJson()
            ->timeout(20)
            ->get($url);

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? 'Propina não encontrada',
                'status' => $response->status(),
            ];
        }

        $json = $response->json();
        $fee = $json['fee'] ?? $json['data']['fee'] ?? null;

        if (!$fee) {
            return ['success' => false, 'error' => 'Resposta inválida da student API', 'status' => 502];
        }

        return ['success' => true, 'fee' => $fee];
    }

    /**
     * @return array{success: bool, error?: string, status?: int}
     */
    public function markFeePaid(
        string $studentId,
        string $feeId,
        ?string $paymentReference = null,
        ?string $externalId = null
    ): array {
        $url = config('services.student_api.url')."/student/{$studentId}/fees/{$feeId}/mark-paid";
        $secret = config('services.student_api.secret');

        $response = Http::withHeaders(['X-API-Secret' => $secret])
            ->acceptJson()
            ->timeout(20)
            ->post($url, array_filter([
                'payment_reference' => $paymentReference,
                'external_id' => $externalId,
                'paid_at' => now()->toIso8601String(),
            ]));

        if (!$response->successful()) {
            return [
                'success' => false,
                'error' => $response->json('message') ?? $response->body(),
                'status' => $response->status(),
            ];
        }

        return ['success' => true];
    }
}
