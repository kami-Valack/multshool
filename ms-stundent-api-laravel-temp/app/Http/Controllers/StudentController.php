<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    /**
     * Obtém dados de um estudante por ID (usado por outras APIs via API Secret)
     */
    public function getByStudentId(Request $request, string $studentId): JsonResponse
    {
        try {
            $student = User::where('id', $studentId)
                ->where('role', User::ROLE_STUDENT)
                ->first();

            if (!$student) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Estudante não encontrado',
                ], 404);
            }

            $hasAllDocuments = $student->hasAllRequiredDocuments();

            return response()->json([
                'status' => 'success',
                'user' => [
                    'id' => $student->id,
                    'student_id' => $student->student_id,
                    'email' => $student->email,
                    'name' => $student->name,
                    'role' => $student->role,
                    'email_verified' => $student->email_verified,
                    'is_active' => $student->is_active,
                    'has_all_documents' => $hasAllDocuments,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar estudante por ID', [
                'student_id' => $studentId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar estudante',
            ], 500);
        }
    }
}

