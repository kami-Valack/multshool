<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class EmailVerificationToken extends Model
{
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
        'used',
    ];

    protected $casts = [
        'user_id' => 'string', // UUID
        'expires_at' => 'datetime',
        'used' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Generate a new verification token.
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
        return !$this->used && !$this->isExpired();
    }

    /**
     * Mark token as used.
     */
    public function markAsUsed(): void
    {
        $this->used = true;
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

