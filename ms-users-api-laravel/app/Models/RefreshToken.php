<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class RefreshToken extends Model
{
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
        'revoked',
        'device_info',
    ];

    protected $casts = [
        'user_id' => 'string', // UUID
        'expires_at' => 'datetime',
        'revoked' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Generate a new refresh token.
     */
    public static function generate(): string
    {
        return Str::random(64);
    }

    /**
     * Check if token is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Check if token is valid.
     */
    public function isValid(): bool
    {
        return !$this->revoked && !$this->isExpired();
    }

    /**
     * Revoke the token.
     */
    public function revoke(): void
    {
        $this->revoked = true;
        $this->save();
    }

    /**
     * User relationship.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

