<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TeacherClassAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'teacher_id',
        'school_id',
        'course_id',
        'subject_id',
        'class',
        'workload_hours',
        'assignment_type',
        'is_active',
    ];

    protected $casts = [
        'workload_hours' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'assignment_type' => 'principal',
        'is_active' => true,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($assignment) {
            if (empty($assignment->id)) {
                $assignment->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the school.
     */
    public function school()
    {
        return $this->belongsTo(User::class, 'school_id');
    }

    /**
     * Get the course.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the subject (disciplina).
     */
    public function subject()
    {
        return $this->belongsTo(CourseSubject::class, 'subject_id');
    }
}
