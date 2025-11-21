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
        $expectedSecret = config('app.api_secret');
        
        if (!$apiSecret || $apiSecret !== $expectedSecret) {
            return response()->json([
                'status' => 'error',
                'message' => 'API Secret inválido ou não fornecido',
            ], 401);
        }
        
        return $next($request);
    }
}

