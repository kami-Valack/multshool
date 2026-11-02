<?php

namespace App\Http\Controllers;

use App\Models\FeeCharge;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FinanceReportController extends Controller
{
    /**
     * Resumo financeiro da escola.
     * Cobranças pendentes com data de vencimento passada contam como em atraso.
     */
    public function summary(Request $request): JsonResponse
    {
        $schoolId = $request->user()->id;
        $today = now()->toDateString();

        $charges = FeeCharge::where('school_id', $schoolId);
        if ($request->filled('from')) {
            $charges->whereDate('due_date', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $charges->whereDate('due_date', '<=', $request->to);
        }

        $paid = (clone $charges)->where('status', FeeCharge::STATUS_PAID);
        $overdue = (clone $charges)->where(function ($q) use ($today) {
            $q->where('status', FeeCharge::STATUS_OVERDUE)
                ->orWhere(function ($q2) use ($today) {
                    $q2->where('status', FeeCharge::STATUS_PENDING)->whereDate('due_date', '<', $today);
                });
        });
        $pending = (clone $charges)->where('status', FeeCharge::STATUS_PENDING)->whereDate('due_date', '>=', $today);
        $waived = (clone $charges)->where('status', FeeCharge::STATUS_WAIVED);

        $payments = Payment::where('school_id', $schoolId)->where('status', Payment::STATUS_PAID);
        if ($request->filled('from')) {
            $payments->whereDate('paid_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $payments->whereDate('paid_at', '<=', $request->to);
        }

        return response()->json([
            'status' => 'success',
            'summary' => [
                'totals' => [
                    'paid' => (float) $paid->sum('amount'),
                    'pending' => (float) $pending->sum('amount'),
                    'overdue' => (float) $overdue->sum('amount'),
                    'waived' => (float) $waived->sum('amount'),
                    'payments_received' => (float) (clone $payments)->sum('amount'),
                ],
                'counts' => [
                    'paid' => $paid->count(),
                    'pending' => $pending->count(),
                    'overdue' => $overdue->count(),
                    'waived' => $waived->count(),
                    'charges' => (clone $charges)->count(),
                    'payments' => (clone $payments)->count(),
                ],
                'currency' => 'AOA',
            ],
        ]);
    }
}
