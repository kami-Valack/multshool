<?php

namespace App\Services;

use App\Models\PaymentIntent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentCompletionService
{
    public function __construct(
        private readonly StudentFeeClient $studentFeeClient,
        private readonly FaciPayClient $faciPayClient,
    ) {
    }

    public function completeIfPaid(PaymentIntent $intent, bool $paid, ?array $faciPayload = null): PaymentIntent
    {
        if (!$paid || $intent->status === PaymentIntent::STATUS_PAID) {
            return $intent->fresh(['latestReference']);
        }

        return DB::transaction(function () use ($intent, $faciPayload) {
            $intent = PaymentIntent::lockForUpdate()->findOrFail($intent->id);

            if ($intent->status === PaymentIntent::STATUS_PAID) {
                return $intent->load('latestReference');
            }

            $reference = $intent->latestReference;
            $receipt = $intent->receipt_number ?? $this->faciPayClient->generateReceiptNumber();

            $result = $this->studentFeeClient->markFeePaid(
                $intent->student_id,
                $intent->fee_id,
                $reference?->nu_referencia,
                $intent->id
            );

            if (!$result['success']) {
                Log::error('Falha ao marcar propina paga na student API', [
                    'intent_id' => $intent->id,
                    'error' => $result['error'] ?? null,
                ]);
                throw new \RuntimeException($result['error'] ?? 'Erro ao sincronizar propina');
            }

            $intent->update([
                'status' => PaymentIntent::STATUS_PAID,
                'paid_at' => now(),
                'receipt_number' => $receipt,
                'metadata' => array_merge($intent->metadata ?? [], [
                    'faci_status' => $faciPayload,
                ]),
            ]);

            return $intent->fresh(['latestReference']);
        });
    }
}
