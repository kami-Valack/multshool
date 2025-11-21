<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class AdmissionExam extends Model
{
    use HasFactory;

    const STATUS_SCHEDULED = 'scheduled';
    const STATUS_MARKED = 'marked';

    protected $fillable = [
        'id',
        'course_id',
        'name',
        'description',
        'status',
        'exam_date',
        'registration_deadline',
        'max_candidates',
        'exam_fee',
        'instructions',
        'exam_link',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'exam_date' => 'datetime',
        'registration_deadline' => 'datetime',
        'max_candidates' => 'integer',
        'exam_fee' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_SCHEDULED,
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

        static::creating(function ($exam) {
            if (empty($exam->id)) {
                $exam->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the course that owns the admission exam.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the exam registrations for this exam.
     */
    public function registrations()
    {
        return $this->hasMany(ExamRegistration::class);
    }

    /**
     * Check if exam is scheduled.
     */
    public function isScheduled(): bool
    {
        return $this->status === self::STATUS_SCHEDULED;
    }

    /**
     * Check if exam is marked.
     */
    public function isMarked(): bool
    {
        return $this->status === self::STATUS_MARKED;
    }
}


