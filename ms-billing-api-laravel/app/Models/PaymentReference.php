<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PaymentReference extends Model
{
    protected $fillable = [
        'id',
        'payment_intent_id',
        'provider',
        'id_fp_referencia',
        'nu_referencia',
        'entidade',
        'vl_referencia',
        'tp_fp_referencia',
        'raw_request',
        'raw_response',
        'issued_at',
    ];

    protected $casts = [
        'vl_referencia' => 'decimal:2',
        'raw_request' => 'array',
        'raw_response' => 'array',
        'issued_at' => 'datetime',
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

    public function paymentIntent()
    {
        return $this->belongsTo(PaymentIntent::class, 'payment_intent_id');
    }
}
