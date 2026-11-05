<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\ExamRegistration;
use App\Models\FeeCharge;
use App\Models\Payment;
use App\Models\SchoolEventRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(Request $request, bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'receipt_number' => 'nullable|string|max:100',
            'student_id' => 'nullable|uuid',
            'student_name' => "{$req}|string|max:255",
            'course_name' => 'nullable|string|max:255',
            'class_name' => 'nullable|string|max:255',
            'fee_charge_id' => [
                'nullable',
                'uuid',
                Rule::exists('fee_charges', 'id')->where('school_id', $request->user()->id),
            ],
            'type' => "{$req}|string|in:propina,exame,declaracao,outro",
            'amount' => "{$req}|numeric|min:0",
            'method' => "{$req}|string|in:cash,transferencia,multicaixa,online,outro",
            'status' => 'sometimes|in:paid,pending,failed,refunded',
            'paid_at' => "{$req}|date",
            'notes' => 'nullable|string',
            'proof_path' => 'nullable|string|max:500',
        ];
    }

    private function nextReceiptNumber(string $schoolId): string
    {
        $year = now()->format('Y');
        $seq = Payment::where('school_id', $schoolId)->count() + 1;

        do {
            $number = sprintf('REC-%s-%05d', $year, $seq++);
        } while (Payment::where('school_id', $schoolId)->where('receipt_number', $number)->exists());

        return $number;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Payment::where('school_id', $request->user()->id);

        foreach (['status', 'type', 'method', 'student_id', 'fee_charge_id'] as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                    ->orWhere('receipt_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('from')) {
            $query->whereDate('paid_at', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('paid_at', '<=', $request->to);
        }

        $manual = $query->orderBy('paid_at', 'desc')->orderBy('created_at', 'desc')->get()
            ->map(function (Payment $payment) {
                $row = $payment->toArray();
                $row['origin'] = 'manual';

                return $row;
            });

        $schoolId = $request->user()->id;
        $extra = collect();
        $includeOnline = !$request->filled('status') || $request->status === 'paid';
        $search = $request->filled('search') ? mb_strtolower((string) $request->search) : null;

        if ($includeOnline && (!$request->filled('type') || $request->type === 'exame')) {
            $exams = ExamRegistration::where('fee_paid', true)
                ->whereHas('admissionExam.course', fn ($q) => $q->where('school_id', $schoolId))
                ->with('admissionExam.course')
                ->get();

            foreach ($exams as $registration) {
                $name = mb_strtolower($registration->student_name ?: '');
                $ref = mb_strtolower($registration->payment_reference ?: '');
                if ($search && !str_contains($name, $search) && !str_contains($ref, $search)) {
                    continue;
                }
                $extra->push([
                    'id' => $registration->id,
                    'receipt_number' => $registration->payment_reference ?: 'EXAME',
                    'student_id' => $registration->student_id,
                    'student_name' => $registration->student_name ?: 'Estudante',
                    'course_name' => $registration->admissionExam?->course?->name,
                    'class_name' => null,
                    'type' => 'exame',
                    'amount' => (float) ($registration->admissionExam?->exam_fee ?? 0),
                    'method' => 'online',
                    'status' => 'paid',
                    'paid_at' => $registration->fee_paid_at,
                    'notes' => $registration->admissionExam?->name,
                    'origin' => 'exame',
                ]);
            }
        }

        if ($includeOnline && (!$request->filled('type') || $request->type === 'evento')) {
            $eventPayments = SchoolEventRegistration::where('status', SchoolEventRegistration::STATUS_PAID)
                ->whereHas('event', fn ($q) => $q->where('school_id', $schoolId))
                ->with('event')
                ->get();

            foreach ($eventPayments as $registration) {
                $name = mb_strtolower($registration->student_name ?: '');
                $ref = mb_strtolower($registration->payment_reference ?: '');
                if ($search && !str_contains($name, $search) && !str_contains($ref, $search)) {
                    continue;
                }
                $extra->push([
                    'id' => $registration->id,
                    'receipt_number' => $registration->payment_reference ?: 'EVENTO',
                    'student_id' => $registration->student_id,
                    'student_name' => $registration->student_name ?: 'Estudante',
                    'course_name' => null,
                    'class_name' => null,
                    'type' => 'evento',
                    'amount' => (float) ($registration->event?->price ?? 0),
                    'method' => 'online',
                    'status' => 'paid',
                    'paid_at' => $registration->paid_at,
                    'notes' => $registration->event?->title,
                    'origin' => 'evento',
                ]);
            }
        }

        $payments = $manual->concat($extra)->sortByDesc(function ($row) {
            return $row['paid_at'] ?? $row['created_at'] ?? null;
        })->values();

        return response()->json([
            'status' => 'success',
            'payments' => $payments,
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $payment = Payment::where('school_id', $request->user()->id)->findOrFail($id);

        return response()->json(['status' => 'success', 'payment' => $payment]);
    }

    public function store(Request $request): JsonResponse
    {
        $schoolId = $request->user()->id;
        $data = $this->validated($request, $this->rules($request));

        if (empty($data['receipt_number'])) {
            $data['receipt_number'] = $this->nextReceiptNumber($schoolId);
        }

        $payment = Payment::create($data + ['school_id' => $schoolId]);

        // Liquida a cobrança associada quando o pagamento está concluído
        if ($payment->fee_charge_id && $payment->status === Payment::STATUS_PAID) {
            FeeCharge::where('school_id', $schoolId)
                ->where('id', $payment->fee_charge_id)
                ->where('status', '!=', FeeCharge::STATUS_PAID)
                ->update(['status' => FeeCharge::STATUS_PAID, 'paid_at' => now()]);
        }

        $this->logActivity($request, 'payment.created', 'payment', $payment->id, [
            'receipt_number' => $payment->receipt_number,
            'student_name' => $payment->student_name,
            'amount' => $payment->amount,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pagamento registado com sucesso',
            'payment' => $payment->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $payment = Payment::where('school_id', $request->user()->id)->findOrFail($id);

        $payment->update($this->validated($request, $this->rules($request, true)));

        $this->logActivity($request, 'payment.updated', 'payment', $payment->id, [
            'receipt_number' => $payment->receipt_number,
            'status' => $payment->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pagamento atualizado com sucesso',
            'payment' => $payment->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $payment = Payment::where('school_id', $request->user()->id)->findOrFail($id);
        $payment->delete();

        $this->logActivity($request, 'payment.deleted', 'payment', $id, [
            'receipt_number' => $payment->receipt_number,
            'amount' => $payment->amount,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pagamento removido com sucesso',
        ]);
    }
}
