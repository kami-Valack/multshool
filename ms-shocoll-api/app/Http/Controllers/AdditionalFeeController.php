<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\AdditionalFee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdditionalFeeController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'name' => "{$req}|string|max:255",
            'amount' => "{$req}|numeric|min:0",
            'currency' => 'sometimes|string|max:10',
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $fees = AdditionalFee::where('school_id', $request->user()->id)
            ->orderBy('name')
            ->get();

        return response()->json(['status' => 'success', 'additional_fees' => $fees]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $fee = AdditionalFee::where('school_id', $request->user()->id)->findOrFail($id);

        return response()->json(['status' => 'success', 'additional_fee' => $fee]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, $this->rules());

        $fee = AdditionalFee::create($data + ['school_id' => $request->user()->id]);

        $this->logActivity($request, 'additional_fee.created', 'additional_fee', $fee->id, ['name' => $fee->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Taxa adicional criada com sucesso',
            'additional_fee' => $fee->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $fee = AdditionalFee::where('school_id', $request->user()->id)->findOrFail($id);

        $fee->update($this->validated($request, $this->rules(true)));

        $this->logActivity($request, 'additional_fee.updated', 'additional_fee', $fee->id, ['name' => $fee->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Taxa adicional atualizada com sucesso',
            'additional_fee' => $fee->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $fee = AdditionalFee::where('school_id', $request->user()->id)->findOrFail($id);
        $fee->delete();

        $this->logActivity($request, 'additional_fee.deleted', 'additional_fee', $id, ['name' => $fee->name]);

        return response()->json([
            'status' => 'success',
            'message' => 'Taxa adicional removida com sucesso',
        ]);
    }
}
