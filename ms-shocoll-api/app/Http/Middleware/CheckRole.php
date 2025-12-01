<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     * 
     * Verifica se o usuário autenticado tem uma das roles permitidas.
     * 
     * Uso: Route::middleware(['auth:api', 'role:school,admin'])->group(...)
     * 
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles  Roles permitidas (separadas por vírgula)
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Usuário não autenticado',
            ], 401);
        }

        // Se nenhuma role foi especificada, permitir acesso (comportamento padrão)
        if (empty($roles)) {
            return $next($request);
        }

        // Verificar se o usuário tem uma das roles permitidas
        $userRole = $user->role;
        $allowedRoles = is_array($roles) ? $roles : [$roles];
        
        if (!in_array($userRole, $allowedRoles)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Acesso negado. Role requerida: ' . implode(' ou ', $allowedRoles) . '. Role atual: ' . $userRole,
                'required_roles' => $allowedRoles,
                'user_role' => $userRole,
            ], 403);
        }

        return $next($request);
    }
}

