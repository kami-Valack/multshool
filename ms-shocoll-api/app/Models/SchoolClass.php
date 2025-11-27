<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SchoolClass extends Model
{
    use HasFactory;

    const STATUS_ACTIVE = 'active';
    const STATUS_COMPLETED = 'completed';

    protected $table = 'classes';

    protected $fillable = [
        'id',
        'school_id',
        'course_id',
        'name',
        'semester',
        'academic_year',
        'status',
        'max_students',
    ];

    protected $casts = [
        'semester' => 'integer',
        'max_students' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_ACTIVE,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($class) {
            if (empty($class->id)) {
                $class->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the school that owns the class.
     */
    public function school()
    {
        return $this->belongsTo(User::class, 'school_id');
    }

    /**
     * Get the course that owns the class.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the enrollments for this class.
     */
    public function enrollments()
    {
        return $this->hasMany(ClassStudent::class, 'class_id');
    }

    /**
     * Get the subjects for this class.
     */
    public function subjects()
    {
        return $this->belongsToMany(CourseSubject::class, 'class_subjects', 'class_id', 'subject_id')
            ->withPivot('id')
            ->withTimestamps();
    }

    /**
     * Get the teachers assigned to this class (via teacher_class_assignments where class name matches).
     * Note: This is a relationship based on the class name string, not a foreign key.
     */
    public function getTeachersAttribute()
    {
        return \App\Models\TeacherClassAssignment::where('class', $this->name)
            ->where('is_active', true)
            ->get();
    }

    /**
     * Check if class is active.
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    /**
     * Check if class is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Get the count of students in this class.
     */
    public function getStudentCountAttribute(): int
    {
        return $this->enrollments()->count();
    }

    /**
     * Check if class has reached max students limit.
     */
    public function hasReachedMaxStudents(): bool
    {
        if (!$this->max_students) {
            return false;
        }
        
        return $this->getStudentCountAttribute() >= $this->max_students;
    }
}
