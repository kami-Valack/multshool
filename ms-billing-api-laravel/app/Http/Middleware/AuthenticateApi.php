<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Valida JWT partilhado com ms-users (claims role/sub) sem exigir réplica local de users.
 */
class AuthenticateApi
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token não fornecido. Use: Authorization: Bearer <token>',
            ], 401);
        }

        try {
            $payload = \PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth::setToken($token)->getPayload();
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json(['status' => 'error', 'message' => 'Token expirado'], 401);
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token inválido'], 401);
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['status' => 'error', 'message' => 'Erro ao processar token'], 401);
        }

        $role = $payload->get('role');
        if ($role !== 'student') {
            return response()->json([
                'status' => 'error',
                'message' => 'Acesso negado. Apenas estudantes podem aceder a pagamentos.',
            ], 403);
        }

        $student = (object) [
            'id' => $payload->get('sub'),
            'student_id' => $payload->get('student_id'),
            'email' => $payload->get('email'),
            'role' => $role,
        ];

        $request->attributes->set('jwt_token', $token);
        $request->setUserResolver(fn () => $student);

        return $next($request);
    }
}
