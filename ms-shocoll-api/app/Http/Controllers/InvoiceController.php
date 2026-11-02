<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\SchoolOpsHelpers;
use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    use SchoolOpsHelpers;

    private function rules(bool $partial = false): array
    {
        $req = $partial ? 'sometimes|required' : 'required';

        return [
            'number' => 'nullable|string|max:100',
            'doc_type' => "{$req}|in:fatura,recibo",
            'student_id' => 'nullable|uuid',
            'student_name' => "{$req}|string|max:255",
            'student_nif' => 'nullable|string|max:50',
            'issue_date' => "{$req}|date",
            'due_date' => 'nullable|date',
            'items' => "{$req}|array|min:1",
            'items.*.description' => 'required|string|max:255',
            'items.*.quantity' => 'nullable|numeric|min:0',
            'items.*.unit_price' => 'nullable|numeric|min:0',
            'subtotal' => 'nullable|numeric|min:0',
            'total' => 'nullable|numeric|min:0',
            'status' => 'sometimes|in:pendente,pago,cancelado,atrasado',
            'payment_method' => 'nullable|string|max:50',
            'qr_data' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Calcula subtotal/total a partir dos itens quando não enviados.
     */
    private function applyTotals(array $data): array
    {
        if (isset($data['items']) && !isset($data['subtotal'])) {
            $data['subtotal'] = collect($data['items'])->sum(
                fn ($item) => ($item['quantity'] ?? 1) * ($item['unit_price'] ?? 0)
            );
        }

        if (isset($data['subtotal']) && !isset($data['total'])) {
            $data['total'] = $data['subtotal'];
        }

        return $data;
    }

    private function nextNumber(string $schoolId, string $docType): string
    {
        $prefix = $docType === 'recibo' ? 'RC' : 'FT';
        $year = now()->format('Y');
        $seq = Invoice::where('school_id', $schoolId)->where('doc_type', $docType)->count() + 1;

        do {
            $number = sprintf('%s %s/%05d', $prefix, $year, $seq++);
        } while (Invoice::where('school_id', $schoolId)->where('number', $number)->exists());

        return $number;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Invoice::where('school_id', $request->user()->id);

        foreach (['status', 'doc_type', 'student_id'] as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->input($filter));
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                    ->orWhere('number', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'status' => 'success',
            'invoices' => $query->orderBy('issue_date', 'desc')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $invoice = Invoice::where('school_id', $request->user()->id)->findOrFail($id);

        return response()->json(['status' => 'success', 'invoice' => $invoice]);
    }

    public function store(Request $request): JsonResponse
    {
        $schoolId = $request->user()->id;
        $data = $this->applyTotals($this->validated($request, $this->rules()));

        if (empty($data['number'])) {
            $data['number'] = $this->nextNumber($schoolId, $data['doc_type']);
        }

        $invoice = Invoice::create($data + ['school_id' => $schoolId]);

        $this->logActivity($request, 'invoice.created', 'invoice', $invoice->id, [
            'number' => $invoice->number,
            'total' => $invoice->total,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Documento emitido com sucesso',
            'invoice' => $invoice->fresh(),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $invoice = Invoice::where('school_id', $request->user()->id)->findOrFail($id);

        $data = $this->validated($request, $this->rules(true));

        // Recalcula totais se os itens mudaram e os totais não foram enviados
        if (isset($data['items'])) {
            $data = $this->applyTotals($data);
        }

        $invoice->update($data);

        $this->logActivity($request, 'invoice.updated', 'invoice', $invoice->id, [
            'number' => $invoice->number,
            'status' => $invoice->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Documento atualizado com sucesso',
            'invoice' => $invoice->fresh(),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $invoice = Invoice::where('school_id', $request->user()->id)->findOrFail($id);
        $invoice->delete();

        $this->logActivity($request, 'invoice.deleted', 'invoice', $id, [
            'number' => $invoice->number,
            'total' => $invoice->total,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Documento removido com sucesso',
        ]);
    }
}
