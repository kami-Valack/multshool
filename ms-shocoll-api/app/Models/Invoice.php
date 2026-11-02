<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invoice extends Model
{
    use HasFactory;

    const STATUS_PENDENTE = 'pendente';
    const STATUS_PAGO = 'pago';
    const STATUS_CANCELADO = 'cancelado';
    const STATUS_ATRASADO = 'atrasado';

    protected $fillable = [
        'id',
        'school_id',
        'number',
        'doc_type',
        'student_id',
        'student_name',
        'student_nif',
        'issue_date',
        'due_date',
        'items',
        'subtotal',
        'total',
        'status',
        'payment_method',
        'qr_data',
        'notes',
    ];

    protected $casts = [
        'items' => 'array',
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
        'issue_date' => 'date:Y-m-d',
        'due_date' => 'date:Y-m-d',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_PENDENTE,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function school()
    {
        return $this->belongsTo(User::class, 'school_id');
    }
}
