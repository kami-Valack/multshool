<?php

namespace App\Http\Controllers;

use App\Models\PaymentIntent;
use App\Models\PaymentReference;
use App\Services\FaciPayClient;
use App\Services\PaymentCompletionService;
use App\Services\SchoolExamClient;
use App\Services\StudentFeeClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentIntentController extends Controller
{
    public function __construct(
        private readonly StudentFeeClient $studentFeeClient,
        private readonly SchoolExamClient $schoolExamClient,
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
            'fee_id' => 'nullable|uuid|required_without:admission_exam_id',
            'admission_exam_id' => 'nullable|uuid|required_without:fee_id',
            'course_id' => 'nullable|uuid',
            'student_name' => 'nullable|string|max:255',
        ]);

        $student = $request->user();
        $token = $request->attributes->get('jwt_token');

        if (!empty($validated['admission_exam_id'])) {
            return $this->createExamFeeIntent($student, $validated, $request->input('student_name'));
        }

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
            ->where('payable_type', PaymentIntent::PAYABLE_FEE)
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
            'payable_type' => PaymentIntent::PAYABLE_FEE,
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

    private function createExamFeeIntent(object $student, array $validated, ?string $studentName = null): JsonResponse
    {
        $examResult = $this->schoolExamClient->getAdmissionExam($validated['admission_exam_id']);
        if (!$examResult['success']) {
            return response()->json([
                'status' => 'error',
                'message' => $examResult['error'] ?? 'Exame inválido',
            ], $examResult['status'] ?? 400);
        }

        $exam = $examResult['exam'];
        $amount = (float) ($exam['exam_fee'] ?? 0);
        if ($amount <= 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'Este exame não tem taxa de inscrição',
            ], 422);
        }

        if (empty($exam['is_active'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Exame indisponível',
            ], 400);
        }

        $existing = PaymentIntent::where('student_id', $student->id)
            ->where('payable_type', PaymentIntent::PAYABLE_EXAM_FEE)
            ->where('admission_exam_id', $validated['admission_exam_id'])
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

        $courseId = $validated['course_id'] ?? ($exam['course_id'] ?? null);
        $description = 'Taxa exame: '.($exam['name'] ?? 'Admissão');
        if (!empty($exam['course_name'])) {
            $description .= ' — '.$exam['course_name'];
        }

        $intent = PaymentIntent::create([
            'student_id' => $student->id,
            'payable_type' => PaymentIntent::PAYABLE_EXAM_FEE,
            'admission_exam_id' => $validated['admission_exam_id'],
            'course_id' => $courseId,
            'amount' => $amount,
            'description' => $description,
            'status' => PaymentIntent::STATUS_DRAFT,
            'currency' => 'AOA',
            'metadata' => [
                'exam' => $exam,
                'student_email' => $student->email ?? null,
                'student_name' => $studentName ?: ($student->email ?? 'Estudante'),
            ],
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

        $validated = $request->validate([
            'mobile_phone' => 'required|string|max:32',
            'recipient_name' => 'nullable|string|max:255',
        ]);

        $mobile = FaciPayClient::normalizeAngolaMobile($validated['mobile_phone']);
        if (!$mobile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Número inválido. Use 9 dígitos (ex.: 923456789) ou 244923456789.',
            ], 422);
        }

        $meta = $intent->metadata ?? [];
        $recipientName = $validated['recipient_name']
            ?? ($meta['student_name'] ?? 'Estudante');

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

        $chargeResult = null;
        $chargeWarning = null;
        $idFpReferencia = isset($data['idFpReferencia']) ? (int) $data['idFpReferencia'] : 0;

        if ($idFpReferencia > 0) {
            $chargeResult = $this->faciPayClient->sendCharge(
                $mobile,
                $recipientName,
                $idFpReferencia
            );
            if (!$chargeResult['success']) {
                $chargeWarning = $chargeResult['error'] ?? 'Não foi possível enviar a cobrança ao telemóvel.';
                Log::warning('FACIPAY sendCharge failed', [
                    'intent_id' => $intent->id,
                    'mobile' => $mobile,
                    'charge' => $chargeResult,
                ]);
            }
        }

        $reference = PaymentReference::create([
            'payment_intent_id' => $intent->id,
            'provider' => 'facipay',
            'id_fp_referencia' => $data['idFpReferencia'] ?? null,
            'nu_referencia' => $data['nuReferencia'] ?? null,
            'entidade' => $data['entidade'] ?? null,
            'vl_referencia' => $data['vlReferencia'] ?? $amount,
            'tp_fp_referencia' => $data['tpFpReferencia'] ?? 'PER',
            'raw_request' => [
                'dsReferencia' => $description,
                'vlReferencia' => $amount,
                'dsTelemovelDestinatario' => $mobile,
                'noDestinatario' => $recipientName,
            ],
            'raw_response' => [
                'reference' => $data,
                'charge' => $chargeResult['data'] ?? null,
            ],
            'issued_at' => now(),
        ]);

        $intent->update([
            'status' => PaymentIntent::STATUS_AWAITING_PAYMENT,
            'metadata' => array_merge($meta, [
                'charge_mobile' => $mobile,
                'charge_sent' => ($chargeResult['success'] ?? false),
            ]),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => ($chargeResult['success'] ?? false)
                ? 'Referência gerada e cobrança enviada para o telemóvel.'
                : 'Referência gerada. '.$chargeWarning,
            'charge_sent' => (bool) ($chargeResult['success'] ?? false),
            'charge_warning' => $chargeWarning,
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
            'payable_type' => $intent->payable_type ?? PaymentIntent::PAYABLE_FEE,
            'fee_id' => $intent->fee_id,
            'admission_exam_id' => $intent->admission_exam_id,
            'course_id' => $intent->course_id,
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
