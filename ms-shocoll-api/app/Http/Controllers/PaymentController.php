<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\Enrollment;
use App\Models\ExamRegistration;
use App\Models\FeeCharge;
use App\Models\Payment;
use App\Models\SchoolEventRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
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

    /**
     * Propinas geradas na matrícula e pagas (ou ainda em dívida) no portal do aluno.
     */
    private function onlineTuitionRows(string $schoolId, ?string $search, ?string $statusFilter)
    {
        $enrollments = Enrollment::query()
            ->whereHas('course', fn ($q) => $q->where('school_id', $schoolId))
            ->with('course:id,name')
            ->get();

        $byStudent = [];
        foreach ($enrollments as $enrollment) {
            $candidate = [
                'name' => $enrollment->student_name ?: 'Estudante',
                'course' => $enrollment->course?->name,
                'approved' => $enrollment->status === Enrollment::STATUS_APPROVED,
            ];
            $current = $byStudent[$enrollment->student_id] ?? null;
            if (!$current || ($candidate['approved'] && empty($current['approved']))) {
                $byStudent[$enrollment->student_id] = $candidate;
            }
        }

        if ($byStudent === []) {
            return collect();
        }

        $baseUrl = rtrim((string) config('services.student_api.url', env('STUDENT_API_URL', 'http://localhost:8001/api')), '/');
        $secret = (string) config('services.student_api.secret', env('STUDENT_API_SECRET', ''));
        if ($secret === '') {
            return collect();
        }

        $rows = collect();
        foreach (array_chunk(array_keys($byStudent), 500) as $ids) {
            try {
                $response = Http::withHeaders(['X-API-Secret' => $secret])
                    ->acceptJson()
                    ->timeout(20)
                    ->post($baseUrl.'/student/fees/by-students', ['student_ids' => $ids]);
            } catch (\Throwable $e) {
                Log::warning('Não foi possível ler propinas dos alunos', ['error' => $e->getMessage()]);
                continue;
            }

            if (!$response->successful()) {
                Log::warning('Student API recusou a lista de propinas', ['status' => $response->status()]);
                continue;
            }

            foreach ($response->json('fees', []) as $fee) {
                $feeStatus = (string) ($fee['status'] ?? 'pending');
                if ($statusFilter === 'paid' && $feeStatus !== 'paid') {
                    continue;
                }
                if ($statusFilter === 'pending' && $feeStatus === 'paid') {
                    continue;
                }

                $student = $byStudent[$fee['student_id']] ?? ['name' => 'Estudante', 'course' => null];
                $name = mb_strtolower($student['name']);
                $ref = mb_strtolower((string) ($fee['external_payment_ref'] ?? ''));
                $description = (string) ($fee['description'] ?? 'Propina');
                if ($search && !str_contains($name, $search) && !str_contains($ref, $search) && !str_contains(mb_strtolower($description), $search)) {
                    continue;
                }

                $notes = $description;
                if ($feeStatus === 'overdue') {
                    $notes = 'Em atraso — '.$description;
                }

                $rows->push([
                    'id' => $fee['id'],
                    'receipt_number' => $fee['external_payment_ref'] ?: ($feeStatus === 'paid' ? 'PROPINA' : '—'),
                    'student_id' => $fee['student_id'],
                    'student_name' => $student['name'],
                    'course_name' => $student['course'],
                    'class_name' => null,
                    'type' => 'propina',
                    'amount' => (float) ($fee['amount'] ?? 0),
                    'method' => 'online',
                    'status' => $feeStatus === 'paid' ? 'paid' : 'pending',
                    'paid_at' => $feeStatus === 'paid' ? ($fee['updated_at'] ?? null) : ($fee['due_date'] ?? null),
                    'notes' => $notes,
                    'origin' => 'propina',
                ]);
            }
        }

        return $rows;
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

        if ((!$request->filled('type') || $request->type === 'propina')
            && (!$request->filled('method') || $request->method === 'online')
            && (!$request->filled('status') || in_array($request->status, ['paid', 'pending'], true))
        ) {
            $extra = $extra->concat($this->onlineTuitionRows(
                $schoolId,
                $search,
                $request->filled('status') ? (string) $request->status : null
            ));
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
