<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;

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
            $eventType = $eventData['type'] ?? 'unknown';
            
            // Process school.create events or user.verified events with school/teacher role
            if ($eventType === 'school.create') {
                // school.create events are always for schools
            } elseif ($eventType === 'user.verified') {
                // Only process user.verified if role is 'school' or 'teacher'
                $userRole = $userData['role'] ?? '';
                if ($userRole !== User::ROLE_SCHOOL && $userRole !== User::ROLE_TEACHER) {
                    Log::info("Evento ignorado: usuário não é escola nem docente", [
                        'user_id' => $userData['id'] ?? 'unknown',
                        'role' => $userRole,
                    ]);
                    return true; // Not an error, just skip
                }
            } else {
                Log::info("Evento ignorado: tipo não suportado", [
                    'event_type' => $eventType,
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
                
                $user->update($updateData);

                Log::info("Usuário atualizado via evento RabbitMQ", [
                    'user_id' => $userId,
                    'email' => $userData['email'] ?? 'unknown',
                ]);
            } else {
                // Create new user
                $userRole = $userData['role'] ?? User::ROLE_SCHOOL;
                $user = User::create([
                    'id' => $userId,
                    'name' => $userData['name'] ?? 'Unknown',
                    'email' => $userData['email'] ?? '',
                    'role' => $userRole,
                    'email_verified' => $userData['emailVerified'] ?? false,
                    'is_active' => $userData['isActive'] ?? true,
                    'status' => $userRole === User::ROLE_SCHOOL ? User::STATUS_PENDING : null, // Apenas escolas começam como pending
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

