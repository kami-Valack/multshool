<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Tentar autenticar usando o guard 'api' (JWT)
            $user = Auth::guard('api')->user();
            
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token não fornecido ou inválido',
                ], 401);
            }

            // Verificar se o usuário está ativo
            if (!$user->is_active) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Conta desativada',
                ], 403);
            }

            // Verificar se o usuário tem role student
            if ($user->role !== 'student') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Acesso negado. Apenas estudantes podem acessar este serviço.',
                ], 403);
            }

            return $next($request);
        } catch (TokenExpiredException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token expirado',
            ], 401);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token inválido',
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao processar token: ' . $e->getMessage(),
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro de autenticação: ' . $e->getMessage(),
            ], 500);
        }
    }
}
