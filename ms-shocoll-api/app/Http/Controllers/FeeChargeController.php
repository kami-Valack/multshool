<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\FeeCharge;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FeeChargeController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(Request $request, bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'student_id' => 'nullable|uuid',
            'student_name' => "{$req}|string|max:255",
            'student_number' => 'nullable|string|max:100',
            'course_name' => 'nullable|string|max:255',
            'class_name' => 'nullable|string|max:255',
            'tuition_plan_id' => [
                'nullable',
                'uuid',
                Rule::exists('tuition_plans', 'id')->where('school_id', $request->user()->id),
            ],
            'description' => "{$req}|string|max:255",
            'amount' => "{$req}|numeric|min:0",
            'due_date' => "{$req}|date",
            'status' => 'sometimes|in:pending,paid,overdue,waived',
            'kind' => 'sometimes|in:tuition,fine,fee,other',
            'paid_at' => 'nullable|date',
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $query = FeeCharge::where('school_id', $request->user()->id);

        foreach (['status', 'kind', 'student_id', 'tuition_plan_id'] as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                    ->orWhere('student_number', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('from')) {
            $query->whereDate('due_date', '>=', $request->from);
        }
        if ($request->filled('to')) {
            $query->whereDate('due_date', '<=', $request->to);
        }

        return response()->json([
            'status' => 'success',
            'fee_charges' => $query->orderBy('due_date', 'desc')->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, $this->rules($request));

        if (($data['status'] ?? null) === FeeCharge::STATUS_PAID && empty($data['paid_at'])) {
            $data['paid_at'] = now();
        }

        $charge = FeeCharge::create($data + ['school_id' => $request->user()->id]);

        $this->logActivity($request, 'fee_charge.created', 'fee_charge', $charge->id, [
            'student_name' => $charge->student_name,
            'amount' => $charge->amount,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cobrança criada com sucesso',
            'fee_charge' => $charge->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $charge = FeeCharge::where('school_id', $request->user()->id)->findOrFail($id);

        $data = $this->validated($request, $this->rules($request, true));

        if (($data['status'] ?? null) === FeeCharge::STATUS_PAID && !$charge->paid_at && empty($data['paid_at'])) {
            $data['paid_at'] = now();
        }

        $charge->update($data);

        $this->logActivity($request, 'fee_charge.updated', 'fee_charge', $charge->id, [
            'student_name' => $charge->student_name,
            'status' => $charge->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cobrança atualizada com sucesso',
            'fee_charge' => $charge->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $charge = FeeCharge::where('school_id', $request->user()->id)->findOrFail($id);
        $charge->delete();

        $this->logActivity($request, 'fee_charge.deleted', 'fee_charge', $id, [
            'student_name' => $charge->student_name,
            'amount' => $charge->amount,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cobrança removida com sucesso',
        ]);
    }

    /**
     * Marca uma cobrança como paga
     */
    public function markPaid(Request $request, string $id): JsonResponse
    {
        $charge = FeeCharge::where('school_id', $request->user()->id)->findOrFail($id);

        if ($charge->status === FeeCharge::STATUS_PAID) {
            return response()->json([
                'status' => 'error',
                'message' => 'Esta cobrança já está paga',
            ], 409);
        }

        $data = $this->validated($request, ['paid_at' => 'nullable|date']);

        $charge->update([
            'status' => FeeCharge::STATUS_PAID,
            'paid_at' => $data['paid_at'] ?? now(),
        ]);

        $this->logActivity($request, 'fee_charge.paid', 'fee_charge', $charge->id, [
            'student_name' => $charge->student_name,
            'amount' => $charge->amount,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cobrança marcada como paga',
            'fee_charge' => $charge->fresh(),
        ]);
    }
}
