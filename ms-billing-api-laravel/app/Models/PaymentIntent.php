<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PaymentIntent extends Model
{
    public const STATUS_DRAFT = 'draft';
    public const STATUS_REFERENCE_ISSUED = 'reference_issued';
    public const STATUS_AWAITING_PAYMENT = 'awaiting_payment';
    public const STATUS_PAID = 'paid';
    public const STATUS_FAILED = 'failed';
    public const STATUS_EXPIRED = 'expired';

    protected $fillable = [
        'id',
        'student_id',
        'fee_id',
        'amount',
        'currency',
        'description',
        'status',
        'receipt_number',
        'paid_at',
        'metadata',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'metadata' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function references()
    {
        return $this->hasMany(PaymentReference::class, 'payment_intent_id');
    }

    public function latestReference()
    {
        return $this->hasOne(PaymentReference::class, 'payment_intent_id')->latestOfMany();
    }
}
