<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UserReplicationService
{
    /**
     * Replicate user from event data.
     */
    public function replicateUser(array $eventData): bool
    {
        try {
            // Extract user data from event
            $userData = $eventData['data'] ?? [];
            
            // Only process if role is 'student'
            if (($userData['role'] ?? '') !== User::ROLE_STUDENT) {
                Log::info("Evento ignorado: usuário não é estudante", [
                    'user_id' => $userData['id'] ?? 'unknown',
                    'role' => $userData['role'] ?? 'unknown',
                ]);
                return true; // Not an error, just skip
            }

            $userId = $userData['id'] ?? null;
            if (!$userId) {
                Log::error("Evento inválido: ID do usuário não encontrado", [
                    'event' => $eventData,
                ]);
                return false;
            }

            // Check if user already exists
            $user = User::find($userId);

            if ($user) {
                // Update existing user
                $updateData = [
                    'name' => $userData['name'] ?? $user->name,
                    'email' => $userData['email'] ?? $user->email,
                    'role' => $userData['role'] ?? $user->role,
                    'email_verified' => $userData['emailVerified'] ?? $user->email_verified,
                    'is_active' => $userData['isActive'] ?? $user->is_active,
                    'email_verified_at' => isset($userData['emailVerified']) && $userData['emailVerified'] 
                        ? now() 
                        : $user->email_verified_at,
                ];
                
                // Update student_id if provided
                if (isset($userData['student_id'])) {
                    $updateData['student_id'] = $userData['student_id'];
                }
                
                $user->update($updateData);

                Log::info("Usuário atualizado via evento RabbitMQ", [
                    'user_id' => $userId,
                    'email' => $userData['email'] ?? 'unknown',
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'id' => $userId,
                    'student_id' => $userData['student_id'] ?? null,
                    'name' => $userData['name'] ?? 'Unknown',
                    'email' => $userData['email'] ?? '',
                    'role' => $userData['role'] ?? User::ROLE_STUDENT,
                    'email_verified' => $userData['emailVerified'] ?? false,
                    'is_active' => $userData['isActive'] ?? true,
                    'email_verified_at' => isset($userData['emailVerified']) && $userData['emailVerified'] 
                        ? now() 
                        : null,
                ]);

                Log::info("Usuário criado via evento RabbitMQ", [
                    'user_id' => $userId,
                    'email' => $userData['email'] ?? 'unknown',
                ]);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Erro ao replicar usuário', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'event_data' => $eventData,
            ]);
            return false;
        }
    }
}
