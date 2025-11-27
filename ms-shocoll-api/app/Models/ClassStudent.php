<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ClassStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'class_id',
        'enrollment_id',
        'student_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($classStudent) {
            if (empty($classStudent->id)) {
                $classStudent->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the class.
     */
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the enrollment.
     */
    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }
}
