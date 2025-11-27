<?php

namespace App\Http\Controllers;

use App\Models\Fee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FeeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/fees",
     *     summary="Listar propinas do estudante autenticado",
     *     description="Retorna todas as propinas do estudante autenticado",
     *     operationId="getFees",
     *     tags={"Fees"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de propinas",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="fees", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="string", format="uuid"),
     *                 @OA\Property(property="student_id", type="string", format="uuid"),
     *                 @OA\Property(property="enrollment_id", type="string", format="uuid", nullable=true),
     *                 @OA\Property(property="amount", type="number", format="float"),
     *                 @OA\Property(property="due_date", type="string", format="date"),
     *                 @OA\Property(property="status", type="string", enum={"pending", "paid", "overdue"}),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="created_at", type="string", format="date-time"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time")
     *             ))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $student = $request->user();
            
            if (!$student) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não autenticado',
                ], 401);
            }

            Log::info('Buscando propinas do estudante', [
                'student_id' => $student->id,
            ]);

            // Buscar todas as propinas do estudante
            $fees = Fee::where('student_id', $student->id)
                ->orderBy('due_date', 'desc')
                ->get();

            Log::info('Propinas encontradas', [
                'student_id' => $student->id,
                'count' => $fees->count(),
            ]);

            // Atualizar status de propinas vencidas
            $now = now();
            foreach ($fees as $fee) {
                if ($fee->status === 'pending' && $fee->due_date < $now) {
                    $fee->status = 'overdue';
                    $fee->save();
                }
            }

            // Recarregar para ter os status atualizados
            $fees = Fee::where('student_id', $student->id)
                ->orderBy('due_date', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'fees' => $fees,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao listar propinas', [
                'student_id' => $request->user()->id ?? 'N/A',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar propinas',
            ], 500);
        }
    }

    /**
     * Criar propinas em lote (usado pela API de escolas ao aprovar matrícula)
     */
    public function bulkCreate(Request $request, string $studentId): JsonResponse
    {
        try {
            Log::info('Recebendo requisição para criar propinas em lote', [
                'student_id' => $studentId,
                'fees_count' => count($request->fees ?? []),
            ]);

            $validator = Validator::make($request->all(), [
                'fees' => 'required|array|min:1',
                'fees.*.enrollment_id' => 'required|uuid',
                'fees.*.amount' => 'required|numeric|min:0',
                'fees.*.due_date' => 'required|date',
                'fees.*.status' => 'required|in:pending,paid,overdue',
                'fees.*.description' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                Log::warning('Erro de validação ao criar propinas', [
                    'student_id' => $studentId,
                    'errors' => $validator->errors(),
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro de validação',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $fees = [];
            foreach ($request->fees as $feeData) {
                try {
                    $fee = Fee::create([
                        'id' => (string) Str::uuid(),
                        'student_id' => $studentId,
                        'enrollment_id' => $feeData['enrollment_id'],
                        'amount' => $feeData['amount'],
                        'due_date' => $feeData['due_date'],
                        'status' => $feeData['status'] ?? 'pending',
                        'description' => $feeData['description'],
                    ]);
                    $fees[] = $fee;
                    Log::info('Propina criada', [
                        'fee_id' => $fee->id,
                        'student_id' => $studentId,
                        'enrollment_id' => $feeData['enrollment_id'],
                        'amount' => $feeData['amount'],
                    ]);
                } catch (\Exception $e) {
                    Log::error('Erro ao criar propina individual', [
                        'student_id' => $studentId,
                        'fee_data' => $feeData,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            Log::info('Propinas criadas com sucesso', [
                'student_id' => $studentId,
                'created_count' => count($fees),
                'requested_count' => count($request->fees),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => count($fees) . ' propina(s) criada(s) com sucesso',
                'fees' => $fees,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar propinas em lote', [
                'student_id' => $studentId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Erro interno do servidor ao criar propinas.',
            ], 500);
        }
    }

    /**
     * Listar propinas de um estudante (rota pública com API Secret)
     */
    public function getByStudentId(Request $request, string $studentId): JsonResponse
    {
        try {
            $query = Fee::where('student_id', $studentId);
            
            if ($request->has('enrollment_id')) {
                $query->where('enrollment_id', $request->enrollment_id);
            }

            $fees = $query->orderBy('due_date', 'asc')->get();

            return response()->json([
                'status' => 'success',
                'fees' => $fees,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao listar propinas do estudante', [
                'student_id' => $studentId,
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Erro interno do servidor ao listar propinas.',
            ], 500);
        }
    }
}

