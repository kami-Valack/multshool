<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    /**
     * Lista professores (filtrado por school_id se fornecido)
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::where('role', User::ROLE_TEACHER);
        
        // Filtrar por school_id se fornecido
        if ($request->has('school_id') && $request->school_id) {
            $query->where('school_id', $request->school_id);
        }
        
        $teachers = $query->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'status' => 'success',
            'teachers' => $teachers,
            'data' => $teachers, // Mantém compatibilidade
        ]);
    }

    /**
     * Obtém detalhes de um professor
     */
    public function show(string $id): JsonResponse
    {
        $teacher = User::where('id', $id)
            ->where('role', User::ROLE_TEACHER)
            ->first();
        
        if (!$teacher) {
            return response()->json([
                'status' => 'error',
                'message' => 'Professor não encontrado',
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'teacher' => $teacher,
            'data' => $teacher, // Mantém compatibilidade
        ]);
    }

    /**
     * Cria um novo professor
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'school_id' => 'required|string|uuid',
            'course_id' => 'nullable|string|uuid',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'contract_type' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'id_card' => 'nullable|string|max:50',
            'password' => 'nullable|string|min:8',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Gerar senha padrão se não fornecida
        $password = $request->password ?? 'Senha123!';
        
        $teacher = User::create([
            'name' => $request->name,
            'email' => strtolower(trim($request->email)),
            'password' => Hash::make($password),
            'phone' => $request->phone,
            'role' => User::ROLE_TEACHER,
            'school_id' => $request->school_id,
            'course_id' => $request->course_id,
            'department' => $request->department,
            'position' => $request->position,
            'contract_type' => $request->contract_type,
            'address' => $request->address,
            'id_card' => $request->id_card,
            'email_verified' => true, // Auto-verificar quando criado via admin
            'is_active' => true,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Professor criado com sucesso',
            'teacher' => $teacher,
            'data' => $teacher, // Mantém compatibilidade
        ], 201);
    }

    /**
     * Atualiza um professor
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $teacher = User::where('id', $id)
            ->where('role', User::ROLE_TEACHER)
            ->first();
        
        if (!$teacher) {
            return response()->json([
                'status' => 'error',
                'message' => 'Professor não encontrado',
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'course_id' => 'nullable|string|uuid',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'contract_type' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'id_card' => 'nullable|string|max:50',
            'status' => 'sometimes|in:active,inactive',
            'password' => 'nullable|string|min:8',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        $updateData = $request->only([
            'name', 
            'email', 
            'phone', 
            'course_id',
            'department',
            'position',
            'contract_type',
            'address',
            'id_card'
        ]);
        
        if ($request->has('status')) {
            $updateData['is_active'] = $request->status === 'active';
        }
        
        if ($request->has('password')) {
            $updateData['password'] = Hash::make($request->password);
        }
        
        $teacher->update($updateData);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Professor atualizado com sucesso',
            'teacher' => $teacher->fresh(),
            'data' => $teacher->fresh(), // Mantém compatibilidade
        ]);
    }

    /**
     * Remove um professor
     */
    public function destroy(string $id): JsonResponse
    {
        $teacher = User::where('id', $id)
            ->where('role', User::ROLE_TEACHER)
            ->first();
        
        if (!$teacher) {
            return response()->json([
                'status' => 'error',
                'message' => 'Professor não encontrado',
            ], 404);
        }
        
        $teacher->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Professor removido com sucesso',
        ]);
    }
}

