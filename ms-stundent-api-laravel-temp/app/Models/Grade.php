<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $fillable = [
        'student_id',
        'course_id',
        'course_name',
        'grade',
        'semester',
        'year',
    ];

    protected $casts = [
        'grade' => 'decimal:2',
        'year' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Student relationship.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}

