<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class PasswordResetToken extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'email';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'email',
        'token',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
    
    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (!$model->created_at) {
                $model->created_at = now();
            }
        });
        
        static::updating(function ($model) {
            // Se está atualizando e não tem created_at, definir agora
            if (!$model->created_at) {
                $model->created_at = now();
            }
        });
    }

    /**
     * Check if token is expired (60 minutes).
     */
    public function isExpired(): bool
    {
        if (!$this->created_at || !($this->created_at instanceof \Illuminate\Support\Carbon)) {
            return true;
        }
        return $this->created_at->diffInMinutes(now()) > 60;
    }

    /**
     * Check if token is valid.
     */
    public function isValid(): bool
    {
        return !$this->isExpired();
    }

    /**
     * Verify token.
     */
    public function verifyToken(string $token): bool
    {
        return Hash::check($token, $this->token);
    }

    /**
     * Mark as used (delete).
     */
    public function markAsUsed(): void
    {
        $this->delete();
    }
}

