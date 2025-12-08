<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * List all completed payments.
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'nullable|in:pending,processing,completed,failed,cancelled',
            'course_id' => 'nullable|uuid|exists:courses,id',
            'student_id' => 'nullable|uuid',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $query = Payment::with(['course']);

        // Filtrar por status (padrão: apenas completos)
        $status = $request->input('status', 'completed');
        $query->where('status', $status);

        // Filtrar por curso
        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        // Filtrar por estudante
        if ($request->has('student_id')) {
            $query->where('student_id', $request->student_id);
        }

        // Paginação
        $perPage = $request->input('per_page', 15);
        $payments = $query->orderBy('paid_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'payments' => $payments->items(),
            'pagination' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(),
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
            ],
        ]);
    }

    /**
     * Show a specific payment.
     */
    public function show(string $id): JsonResponse
    {
        $payment = Payment::with(['course'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'payment' => [
                'id' => $payment->id,
                'reference' => $payment->reference,
                'amount' => $payment->amount,
                'status' => $payment->status,
                'student_id' => $payment->student_id,
                'student_name' => $payment->student_name,
                'student_email' => $payment->student_email,
                'gpo_transaction_id' => $payment->gpo_transaction_id,
                'gpo_response' => $payment->gpo_response ? json_decode($payment->gpo_response, true) : null,
                'paid_at' => $payment->paid_at,
                'failure_reason' => $payment->failure_reason,
                'created_at' => $payment->created_at,
                'updated_at' => $payment->updated_at,
                'course' => [
                    'id' => $payment->course->id,
                    'name' => $payment->course->name,
                    'code' => $payment->course->code,
                ],
            ],
        ]);
    }
}

