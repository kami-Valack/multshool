<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Generate purchase token from GPO.
     */
    public function generatePurchaseToken(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|uuid|exists:courses,id',
            'student_id' => 'required|uuid',
            'student_email' => 'required|email',
            'student_name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $course = Course::findOrFail($request->course_id);

            // Verificar se já existe pagamento pendente ou completo para este curso e estudante
            $existingPayment = Payment::where('course_id', $request->course_id)
                ->where('student_id', $request->student_id)
                ->whereIn('status', [Payment::STATUS_PENDING, Payment::STATUS_PROCESSING, Payment::STATUS_COMPLETED])
                ->first();

            if ($existingPayment) {
                if ($existingPayment->isCompleted()) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Já existe um pagamento completo para este curso',
                        'payment_id' => $existingPayment->id,
                    ], 409);
                }

                // Se existe pagamento pendente, retornar o token existente
                if ($existingPayment->gpo_purchase_token) {
                    return response()->json([
                        'status' => 'success',
                        'payment_id' => $existingPayment->id,
                        'purchase_token' => $existingPayment->gpo_purchase_token,
                        'iframe_url' => $this->buildIframeUrl($existingPayment->gpo_purchase_token),
                    ]);
                }
            }

            // Calcular o valor do pagamento (usar price do curso)
            $amount = $course->price ?? 0;

            if ($amount <= 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'O curso não possui um valor de pagamento configurado',
                ], 400);
            }

            // Gerar referência única
            $reference = Payment::generateReference();

            // Obter configurações do GPO
            $frameToken = config('services.gpo.frame_token');
            $callbackUrl = config('services.gpo.callback_url');
            $cssUrl = config('services.gpo.css_url');
            $gpoApiUrl = config('services.gpo.api_url');

            if (!$frameToken || !$callbackUrl) {
                Log::error('GPO configuration missing', [
                    'frame_token' => $frameToken ? 'set' : 'missing',
                    'callback_url' => $callbackUrl ? 'set' : 'missing',
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Configuração do gateway de pagamento não encontrada',
                ], 500);
            }

            // Criar registro de pagamento
            $payment = Payment::create([
                'course_id' => $request->course_id,
                'student_id' => $request->student_id,
                'student_email' => $request->student_email,
                'student_name' => $request->student_name,
                'reference' => $reference,
                'amount' => $amount,
                'status' => Payment::STATUS_PENDING,
            ]);

            // Preparar dados para o GPO
            $gpoPayload = [
                'reference' => $reference,
                'amount' => $amount,
                'token' => $frameToken,
                'callbackUrl' => $callbackUrl,
                'qrCode' => 'PAYMENT',
                'mobile' => 'PAYMENT',
                'card' => 'PAYMENT',
            ];

            // Adicionar CSS URL se configurado
            if ($cssUrl) {
                $gpoPayload['cssUrl'] = $cssUrl;
            }

            // Fazer requisição ao GPO
            $response = Http::timeout(30)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ])
                ->post($gpoApiUrl, $gpoPayload);

            if (!$response->successful()) {
                Log::error('GPO API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'payment_id' => $payment->id,
                ]);

                $payment->markAsFailed('Erro ao comunicar com o gateway de pagamento');

                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao gerar token de pagamento. Tente novamente.',
                ], 500);
            }

            $responseData = $response->json();

            if (!isset($responseData['id'])) {
                Log::error('GPO invalid response', [
                    'response' => $responseData,
                    'payment_id' => $payment->id,
                ]);

                $payment->markAsFailed('Resposta inválida do gateway de pagamento');

                return response()->json([
                    'status' => 'error',
                    'message' => 'Resposta inválida do gateway de pagamento',
                ], 500);
            }

            // Atualizar pagamento com o token de compra
            $payment->gpo_purchase_token = $responseData['id'];
            $payment->save();

            return response()->json([
                'status' => 'success',
                'payment_id' => $payment->id,
                'purchase_token' => $responseData['id'],
                'iframe_url' => $this->buildIframeUrl($responseData['id']),
                'time_to_live' => $responseData['timeToLive'] ?? null,
            ]);
        } catch (\Exception $e) {
            Log::error('Error generating purchase token', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao processar solicitação de pagamento',
            ], 500);
        }
    }

    /**
     * Callback endpoint for GPO notifications.
     */
    public function callback(Request $request): JsonResponse
    {
        Log::info('GPO callback received', [
            'data' => $request->all(),
        ]);

        try {
            // Validar dados do callback
            $validator = Validator::make($request->all(), [
                'reference' => 'required|string',
                'status' => 'required|string',
            ]);

            if ($validator->fails()) {
                Log::warning('GPO callback validation failed', [
                    'errors' => $validator->errors(),
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Dados inválidos',
                ], 422);
            }

            // Buscar pagamento pela referência
            $payment = Payment::where('reference', $request->reference)->first();

            if (!$payment) {
                Log::warning('Payment not found for GPO callback', [
                    'reference' => $request->reference,
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Pagamento não encontrado',
                ], 404);
            }

            // Atualizar status do pagamento baseado na resposta do GPO
            $gpoStatus = strtolower($request->status ?? '');
            $gpoResponse = $request->all();

            if (in_array($gpoStatus, ['completed', 'success', 'paid', 'approved'])) {
                $payment->markAsCompleted(
                    $request->transaction_id ?? $request->id ?? null,
                    $gpoResponse
                );

                Log::info('Payment marked as completed', [
                    'payment_id' => $payment->id,
                    'reference' => $payment->reference,
                ]);
            } elseif (in_array($gpoStatus, ['failed', 'error', 'rejected', 'cancelled'])) {
                $payment->markAsFailed(
                    $request->message ?? $request->error ?? 'Pagamento falhou',
                    $gpoResponse
                );

                Log::info('Payment marked as failed', [
                    'payment_id' => $payment->id,
                    'reference' => $payment->reference,
                ]);
            } else {
                // Status desconhecido, marcar como processando
                $payment->markAsProcessing();
                $payment->gpo_response = json_encode($gpoResponse);
                $payment->save();

                Log::info('Payment marked as processing', [
                    'payment_id' => $payment->id,
                    'reference' => $payment->reference,
                    'gpo_status' => $gpoStatus,
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Callback processado com sucesso',
            ]);
        } catch (\Exception $e) {
            Log::error('Error processing GPO callback', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao processar callback',
            ], 500);
        }
    }

    /**
     * Check payment status.
     */
    public function checkStatus(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'payment_id' => 'required|uuid|exists:payments,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $payment = Payment::with('course')->findOrFail($request->payment_id);

        return response()->json([
            'status' => 'success',
            'payment' => [
                'id' => $payment->id,
                'reference' => $payment->reference,
                'amount' => $payment->amount,
                'status' => $payment->status,
                'paid_at' => $payment->paid_at,
                'course' => [
                    'id' => $payment->course->id,
                    'name' => $payment->course->name,
                ],
            ],
        ]);
    }

    /**
     * Get payment by student and course.
     */
    public function getByStudentAndCourse(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|uuid',
            'course_id' => 'required|uuid|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $payment = Payment::where('student_id', $request->student_id)
            ->where('course_id', $request->course_id)
            ->where('status', Payment::STATUS_COMPLETED)
            ->with('course')
            ->first();

        if (!$payment) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pagamento não encontrado',
                'has_payment' => false,
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'has_payment' => true,
            'payment' => [
                'id' => $payment->id,
                'reference' => $payment->reference,
                'amount' => $payment->amount,
                'status' => $payment->status,
                'paid_at' => $payment->paid_at,
                'course' => [
                    'id' => $payment->course->id,
                    'name' => $payment->course->name,
                ],
            ],
        ]);
    }

    /**
     * Build iframe URL from purchase token.
     */
    private function buildIframeUrl(string $purchaseToken): string
    {
        $gpoFrameUrl = config('services.gpo.frame_url');
        return $gpoFrameUrl . '?token=' . $purchaseToken;
    }
}

