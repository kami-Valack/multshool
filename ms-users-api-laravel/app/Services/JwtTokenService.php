<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class JwtTokenService
{
    /**
     * Generate access token for user.
     */
    public function generateAccessToken(User $user): string
    {
        return JWTAuth::fromUser($user);
    }

    /**
     * Generate refresh token.
     */
    public function generateRefreshToken(): string
    {
        // Generate 32 bytes random token (64 hex characters) - fits in varchar(128)
        return bin2hex(random_bytes(32));
    }

    /**
     * Generate token pair (access + refresh).
     */
    public function generateTokenPair(User $user): array
    {
        $accessToken = $this->generateAccessToken($user);
        $refreshToken = $this->generateRefreshToken();

        $ttl = config('jwt.ttl', 15); // minutes
        $expiresIn = $ttl * 60; // seconds

        return [
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken,
            'expiresIn' => $expiresIn,
        ];
    }

    /**
     * Verify refresh token format.
     */
    public function verifyRefreshTokenFormat(string $token): bool
    {
        return strlen($token) === 64 && ctype_xdigit($token);
    }
}

