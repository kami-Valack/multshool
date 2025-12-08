<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_PROCESSING = 'processing';
    const STATUS_COMPLETED = 'completed';
    const STATUS_FAILED = 'failed';
    const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'id',
        'course_id',
        'student_id',
        'student_email',
        'student_name',
        'reference',
        'amount',
        'gpo_purchase_token',
        'status',
        'gpo_response',
        'gpo_transaction_id',
        'paid_at',
        'failure_reason',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_PENDING,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payment) {
            if (empty($payment->id)) {
                $payment->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the course that owns the payment.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Check if payment is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if payment is processing.
     */
    public function isProcessing(): bool
    {
        return $this->status === self::STATUS_PROCESSING;
    }

    /**
     * Check if payment is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Check if payment is failed.
     */
    public function isFailed(): bool
    {
        return $this->status === self::STATUS_FAILED;
    }

    /**
     * Check if payment is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    /**
     * Mark payment as completed.
     */
    public function markAsCompleted(?string $gpoTransactionId = null, ?array $gpoResponse = null): void
    {
        $this->status = self::STATUS_COMPLETED;
        $this->paid_at = now();
        
        if ($gpoTransactionId) {
            $this->gpo_transaction_id = $gpoTransactionId;
        }
        
        if ($gpoResponse) {
            $this->gpo_response = json_encode($gpoResponse);
        }
        
        $this->save();
    }

    /**
     * Mark payment as failed.
     */
    public function markAsFailed(?string $reason = null, ?array $gpoResponse = null): void
    {
        $this->status = self::STATUS_FAILED;
        $this->failure_reason = $reason;
        
        if ($gpoResponse) {
            $this->gpo_response = json_encode($gpoResponse);
        }
        
        $this->save();
    }

    /**
     * Mark payment as processing.
     */
    public function markAsProcessing(): void
    {
        $this->status = self::STATUS_PROCESSING;
        $this->save();
    }

    /**
     * Generate a unique reference for the payment.
     * Format: max 15 characters (letters and numbers)
     */
    public static function generateReference(): string
    {
        // Gera uma referência única: prefixo + timestamp + random
        // Exemplo: PAY2025012312345
        $prefix = 'PAY';
        $timestamp = now()->format('YmdHis');
        $random = Str::random(4);
        
        // Limita a 15 caracteres
        $reference = $prefix . substr($timestamp . $random, 0, 12);
        
        // Verifica se já existe, se sim, gera outra
        while (self::where('reference', $reference)->exists()) {
            $random = Str::random(4);
            $reference = $prefix . substr($timestamp . $random, 0, 12);
        }
        
        return $reference;
    }
}

