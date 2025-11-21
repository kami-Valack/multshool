<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeacherReplicationController extends Controller
{
    /**
     * Replicate teacher from ms-users-api-laravel
     * Protected by API Secret
     */
    public function replicate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|uuid',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'role' => 'required|in:teacher',
            'email_verified' => 'required|boolean',
            'is_active' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de validação',
                'errors' => $validator->errors(),
            ], 422);
        }

        $userId = $request->id;
        
        // Check if user already exists
        $user = User::find($userId);

        if ($user) {
            // Update existing user
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'email_verified' => $request->email_verified,
                'is_active' => $request->is_active,
                'email_verified_at' => $request->email_verified ? now() : null,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Docente atualizado com sucesso',
                'user' => $user,
            ]);
        } else {
            // Create new user
            $user = User::create([
                'id' => $userId,
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'email_verified' => $request->email_verified,
                'is_active' => $request->is_active,
                'status' => null, // Docentes não têm status
                'email_verified_at' => $request->email_verified ? now() : null,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Docente replicado com sucesso',
                'user' => $user,
            ], 201);
        }
    }
}

