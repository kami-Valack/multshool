<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiSecret
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiSecret = $request->header('X-API-Secret');
        $expectedSecret = env('API_SECRET', '');

        if (empty($expectedSecret)) {
            return response()->json([
                'status' => 'error',
                'message' => 'API Secret não configurado no servidor',
            ], 500);
        }

        if (empty($apiSecret) || $apiSecret !== $expectedSecret) {
            return response()->json([
                'status' => 'error',
                'message' => 'API Secret inválido ou ausente',
            ], 401);
        }

        return $next($request);
    }
}

