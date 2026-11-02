<?php

namespace App\Services;

use App\Models\PaymentIntent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentCompletionService
{
    public function __construct(
        private readonly StudentFeeClient $studentFeeClient,
        private readonly SchoolExamClient $schoolExamClient,
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
            $meta = $intent->metadata ?? [];

            if ($intent->payable_type === PaymentIntent::PAYABLE_EXAM_FEE) {
                $result = $this->schoolExamClient->confirmExamFeePayment(
                    $intent->student_id,
                    (string) ($meta['student_email'] ?? ''),
                    (string) ($meta['student_name'] ?? 'Estudante'),
                    (string) $intent->admission_exam_id,
                    $reference?->nu_referencia
                );
            } else {
                $result = $this->studentFeeClient->markFeePaid(
                    $intent->student_id,
                    (string) $intent->fee_id,
                    $reference?->nu_referencia,
                    $intent->id
                );
            }

            if (!$result['success']) {
                Log::error('Falha ao concluir pagamento', [
                    'intent_id' => $intent->id,
                    'payable_type' => $intent->payable_type,
                    'error' => $result['error'] ?? null,
                ]);
                throw new \RuntimeException($result['error'] ?? 'Erro ao sincronizar pagamento');
            }

            $intent->update([
                'status' => PaymentIntent::STATUS_PAID,
                'paid_at' => now(),
                'receipt_number' => $receipt,
                'metadata' => array_merge($meta, [
                    'faci_status' => $faciPayload,
                ]),
            ]);

            return $intent->fresh(['latestReference']);
        });
    }
}
