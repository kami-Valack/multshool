<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireCompleteProfile
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Usuário não autenticado',
            ], 401);
        }

        // Verificar se o perfil está completo
        if (!$user->hasCompleteProfile()) {
            $missingFields = $user->getMissingProfileFields();
            
            return response()->json([
                'status' => 'error',
                'message' => 'É obrigatório preencher todos os dados da instituição antes de realizar qualquer atividade.',
                'error_code' => 'INCOMPLETE_PROFILE',
                'missing_fields' => $missingFields,
                'profile_completion_url' => url('/api/profile/check-completion'),
            ], 403);
        }

        return $next($request);
    }
}

