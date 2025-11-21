<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateTeacher
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        try {
            // Verificar se o token está presente
            $token = $request->bearerToken();
            if (!$token) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token não fornecido. Use: Authorization: Bearer <token>',
                ], 401);
            }

            // Validar o token e obter o payload
            try {
                $payload = \PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth::setToken($token)->getPayload();
                $userId = $payload->get('sub');
            } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token expirado',
                ], 401);
            } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token inválido',
                ], 401);
            } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao processar token: ' . $e->getMessage(),
                ], 401);
            }

            // Buscar o usuário no banco pelo ID do token
            $user = \App\Models\User::find($userId);
            
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuário não encontrado no banco local',
                ], 401);
            }

            // Verificar se o usuário está ativo
            if (!$user->is_active) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Conta desativada',
                ], 403);
            }

            // Verificar se o usuário tem role teacher
            if ($user->role !== 'teacher') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Acesso negado. Apenas docentes podem acessar este serviço.',
                ], 403);
            }

            // Injetar o usuário na request
            $request->setUserResolver(function () use ($user) {
                return $user;
            });

            Auth::guard('api')->setUser($user);

            return $next($request);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de autenticação: ' . $e->getMessage(),
            ], 500);
        }
    }
}

