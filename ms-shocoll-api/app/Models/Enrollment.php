<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Enrollment extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'id',
        'course_id',
        'student_id',
        'student_email',
        'student_name',
        'class',
        'student_phone',
        'status',
        'admission_exam_id',
        'exam_passed',
        'rejection_reason',
        'approved_at',
        'rejected_at',
    ];

    protected $casts = [
        'exam_passed' => 'boolean',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_PENDING,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($enrollment) {
            if (empty($enrollment->id)) {
                $enrollment->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the course that owns the enrollment.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the admission exam related to this enrollment.
     */
    public function admissionExam()
    {
        return $this->belongsTo(AdmissionExam::class);
    }

    /**
     * Check if enrollment is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if enrollment is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    /**
     * Check if enrollment is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Approve enrollment.
     */
    public function approve(): void
    {
        $this->status = self::STATUS_APPROVED;
        $this->approved_at = now();
        $this->rejection_reason = null;
        $this->save();
    }

    /**
     * Reject enrollment.
     */
    public function reject(?string $reason = null): void
    {
        $this->status = self::STATUS_REJECTED;
        $this->rejection_reason = $reason;
        $this->rejected_at = now();
        $this->approved_at = null;
        $this->save();
    }
}

