<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class StudentFollowUp extends Model
{
    use HasFactory;

    const TYPE_ACADEMIC = 'academic';
    const TYPE_BEHAVIORAL = 'behavioral';
    const TYPE_ATTENDANCE = 'attendance';
    const TYPE_OTHER = 'other';

    const STATUS_POSITIVE = 'positive';
    const STATUS_NEUTRAL = 'neutral';
    const STATUS_CONCERN = 'concern';

    protected $fillable = [
        'id',
        'teacher_id',
        'student_id',
        'school_id',
        'course_id',
        'title',
        'description',
        'type',
        'status',
        'follow_up_date',
    ];

    protected $casts = [
        'follow_up_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'type' => self::TYPE_ACADEMIC,
        'status' => self::STATUS_NEUTRAL,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($followUp) {
            if (empty($followUp->id)) {
                $followUp->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the teacher.
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    /**
     * Get the student.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
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
}

