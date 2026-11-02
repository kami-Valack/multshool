<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\TuitionPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TuitionPlanController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'name' => "{$req}|string|max:255",
            'period' => "{$req}|in:mensal,trimestral,semestral,anual",
            'total_amount' => "{$req}|numeric|min:0",
            'installments' => "{$req}|integer|min:1",
            'currency' => 'sometimes|string|max:10',
            'discount_percent' => 'nullable|numeric|min:0|max:100',
            'late_fee_percent' => 'nullable|numeric|min:0|max:100',
            'late_fee_fixed' => 'nullable|numeric|min:0',
            'start_date' => "{$req}|date",
            'end_date' => "{$req}|date|after_or_equal:start_date",
            'course_ids' => 'nullable|array',
            'class_ids' => 'nullable|array',
            'academic_years' => 'nullable|array',
            'student_types' => 'nullable|array',
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $query = TuitionPlan::where('school_id', $request->user()->id);

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        return response()->json([
            'status' => 'success',
            'tuition_plans' => $query->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $plan = TuitionPlan::where('school_id', $request->user()->id)->findOrFail($id);

        return response()->json(['status' => 'success', 'tuition_plan' => $plan]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, $this->rules());

        $plan = TuitionPlan::create($data + ['school_id' => $request->user()->id]);

        $this->logActivity($request, 'tuition_plan.created', 'tuition_plan', $plan->id, ['name' => $plan->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Plano de propinas criado com sucesso',
            'tuition_plan' => $plan->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $plan = TuitionPlan::where('school_id', $request->user()->id)->findOrFail($id);

        $plan->update($this->validated($request, $this->rules(true)));

        $this->logActivity($request, 'tuition_plan.updated', 'tuition_plan', $plan->id, ['name' => $plan->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Plano de propinas atualizado com sucesso',
            'tuition_plan' => $plan->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $plan = TuitionPlan::where('school_id', $request->user()->id)->findOrFail($id);
        $plan->delete();

        $this->logActivity($request, 'tuition_plan.deleted', 'tuition_plan', $id, ['name' => $plan->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Plano de propinas removido com sucesso',
        ]);
    }
}
