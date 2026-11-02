<?php

namespace App\Http\Controllers;

use App\Models\PaymentIntent;
use App\Models\PaymentReference;
use App\Services\FaciPayClient;
use App\Services\PaymentCompletionService;
use App\Services\StudentFeeClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentIntentController extends Controller
{
    public function __construct(
        private readonly StudentFeeClient $studentFeeClient,
        private readonly FaciPayClient $faciPayClient,
        private readonly PaymentCompletionService $completionService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $student = $request->user();
        $intents = PaymentIntent::with('latestReference')
            ->where('student_id', $student->id)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json([
            'status' => 'success',
            'payment_intents' => $intents->map(fn ($i) => $this->formatIntent($i)),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fee_id' => 'required|uuid',
        ]);

        $student = $request->user();
        $token = $request->attributes->get('jwt_token');

        $feeResult = $this->studentFeeClient->getFeeForStudent($token, $validated['fee_id']);
        if (!$feeResult['success']) {
            return response()->json([
                'status' => 'error',
                'message' => $feeResult['error'] ?? 'Propina inválida',
            ], $feeResult['status'] ?? 400);
        }

        $fee = $feeResult['fee'];
        if (($fee['status'] ?? '') === 'paid') {
            return response()->json([
                'status' => 'error',
                'message' => 'Esta propina já está paga',
            ], 409);
        }

        $existing = PaymentIntent::where('student_id', $student->id)
            ->where('fee_id', $validated['fee_id'])
            ->whereIn('status', [
                PaymentIntent::STATUS_DRAFT,
                PaymentIntent::STATUS_REFERENCE_ISSUED,
                PaymentIntent::STATUS_AWAITING_PAYMENT,
            ])
            ->first();

        if ($existing) {
            return response()->json([
                'status' => 'success',
                'payment_intent' => $this->formatIntent($existing->load('latestReference')),
            ]);
        }

        $intent = PaymentIntent::create([
            'student_id' => $student->id,
            'fee_id' => $validated['fee_id'],
            'amount' => $fee['amount'],
            'description' => $fee['description'] ?? 'Pagamento de propina',
            'status' => PaymentIntent::STATUS_DRAFT,
            'currency' => 'AOA',
            'metadata' => ['fee' => $fee],
        ]);

        return response()->json([
            'status' => 'success',
            'payment_intent' => $this->formatIntent($intent),
        ], 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $intent = $this->findStudentIntent($request, $id);

        return response()->json([
            'status' => 'success',
            'payment_intent' => $this->formatIntent($intent),
        ]);
    }

    public function issueReference(Request $request, string $id): JsonResponse
    {
        $intent = $this->findStudentIntent($request, $id);

        if ($intent->status === PaymentIntent::STATUS_PAID) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pagamento já concluído',
            ], 409);
        }

        $description = $intent->description ?? 'Pagamento de propina';
        $amount = (float) $intent->amount;

        $faci = $this->faciPayClient->createReference($description, $amount);
        if (!$faci['success']) {
            Log::warning('FACIPAY createReference failed', $faci);

            return response()->json([
                'status' => 'error',
                'message' => $faci['error'] ?? 'Não foi possível gerar referência',
                'faci' => $faci['data'] ?? null,
            ], $faci['status'] ?? 502);
        }

        $data = $faci['data'];

        $reference = PaymentReference::create([
            'payment_intent_id' => $intent->id,
            'provider' => 'facipay',
            'id_fp_referencia' => $data['idFpReferencia'] ?? null,
            'nu_referencia' => $data['nuReferencia'] ?? null,
            'entidade' => $data['entidade'] ?? null,
            'vl_referencia' => $data['vlReferencia'] ?? $amount,
            'tp_fp_referencia' => $data['tpFpReferencia'] ?? 'PER',
            'raw_request' => ['dsReferencia' => $description, 'vlReferencia' => $amount],
            'raw_response' => $data,
            'issued_at' => now(),
        ]);

        $intent->update([
            'status' => PaymentIntent::STATUS_AWAITING_PAYMENT,
        ]);

        return response()->json([
            'status' => 'success',
            'payment_intent' => $this->formatIntent($intent->fresh('latestReference')),
            'reference' => $this->formatReference($reference),
        ]);
    }

    public function status(Request $request, string $id): JsonResponse
    {
        $intent = $this->findStudentIntent($request, $id);
        $reference = $intent->latestReference;

        if (!$reference) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhuma referência gerada para este pagamento',
            ], 422);
        }

        if ($intent->status === PaymentIntent::STATUS_PAID) {
            return response()->json([
                'status' => 'success',
                'paid' => true,
                'payment_intent' => $this->formatIntent($intent),
            ]);
        }

        $faci = $this->faciPayClient->getReferenceStatus(
            $reference->nu_referencia,
            $reference->id_fp_referencia ? (int) $reference->id_fp_referencia : null
        );

        if (!$faci['success']) {
            return response()->json([
                'status' => 'error',
                'message' => $faci['error'] ?? 'Erro ao consultar estado',
            ], $faci['status'] ?? 502);
        }

        $paid = (bool) ($faci['paid'] ?? false);

        if ($paid) {
            try {
                $intent = $this->completionService->completeIfPaid($intent, true, $faci['data'] ?? null);
            } catch (\Throwable $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage(),
                ], 502);
            }
        }

        return response()->json([
            'status' => 'success',
            'paid' => $paid,
            'faci' => $faci['data'] ?? null,
            'payment_intent' => $this->formatIntent($intent->fresh('latestReference')),
        ]);
    }

    public function simulatePaid(Request $request, string $id): JsonResponse
    {
        if (!config('app.debug')) {
            return response()->json(['status' => 'error', 'message' => 'Não disponível'], 404);
        }

        $intent = $this->findStudentIntent($request, $id);
        $intent = $this->completionService->completeIfPaid($intent, true, ['mock' => true]);

        return response()->json([
            'status' => 'success',
            'payment_intent' => $this->formatIntent($intent),
        ]);
    }

    private function findStudentIntent(Request $request, string $id): PaymentIntent
    {
        return PaymentIntent::with('latestReference')
            ->where('student_id', $request->user()->id)
            ->findOrFail($id);
    }

    private function formatIntent(PaymentIntent $intent): array
    {
        $ref = $intent->relationLoaded('latestReference') ? $intent->latestReference : $intent->latestReference()->first();

        return [
            'id' => $intent->id,
            'student_id' => $intent->student_id,
            'fee_id' => $intent->fee_id,
            'amount' => (float) $intent->amount,
            'currency' => $intent->currency,
            'description' => $intent->description,
            'status' => $intent->status,
            'receipt_number' => $intent->receipt_number,
            'paid_at' => $intent->paid_at?->toIso8601String(),
            'reference' => $ref ? $this->formatReference($ref) : null,
            'created_at' => $intent->created_at?->toIso8601String(),
        ];
    }

    private function formatReference(PaymentReference $reference): array
    {
        return [
            'id' => $reference->id,
            'provider' => $reference->provider,
            'id_fp_referencia' => $reference->id_fp_referencia,
            'nu_referencia' => $reference->nu_referencia,
            'entidade' => $reference->entidade,
            'vl_referencia' => (float) $reference->vl_referencia,
            'tp_fp_referencia' => $reference->tp_fp_referencia,
            'issued_at' => $reference->issued_at?->toIso8601String(),
        ];
    }
}
