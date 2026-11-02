<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TuitionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'school_id',
        'name',
        'period',
        'total_amount',
        'installments',
        'currency',
        'discount_percent',
        'late_fee_percent',
        'late_fee_fixed',
        'start_date',
        'end_date',
        'course_ids',
        'class_ids',
        'academic_years',
        'student_types',
        'is_active',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'installments' => 'integer',
        'discount_percent' => 'decimal:2',
        'late_fee_percent' => 'decimal:2',
        'late_fee_fixed' => 'decimal:2',
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
        'course_ids' => 'array',
        'class_ids' => 'array',
        'academic_years' => 'array',
        'student_types' => 'array',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'currency' => 'AOA',
        'is_active' => true,
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
