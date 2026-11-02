<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class FeeCharge extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_PAID = 'paid';
    const STATUS_OVERDUE = 'overdue';
    const STATUS_WAIVED = 'waived';

    const KIND_TUITION = 'tuition';
    const KIND_FINE = 'fine';
    const KIND_FEE = 'fee';
    const KIND_OTHER = 'other';

    protected $fillable = [
        'id',
        'school_id',
        'student_id',
        'student_name',
        'student_number',
        'course_name',
        'class_name',
        'tuition_plan_id',
        'description',
        'amount',
        'due_date',
        'status',
        'kind',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date:Y-m-d',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_PENDING,
        'kind' => self::KIND_TUITION,
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

    public function tuitionPlan()
    {
        return $this->belongsTo(TuitionPlan::class, 'tuition_plan_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'fee_charge_id');
    }
}
