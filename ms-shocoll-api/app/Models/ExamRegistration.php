<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ExamRegistration extends Model
{
    use HasFactory;

    const STATUS_REGISTERED = 'registered';
    const STATUS_COMPLETED = 'completed';
    const STATUS_PASSED = 'passed';
    const STATUS_FAILED = 'failed';

    protected $fillable = [
        'id',
        'admission_exam_id',
        'student_id',
        'student_email',
        'student_name',
        'status',
        'score',
        'notes',
        'completed_at',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'status' => self::STATUS_REGISTERED,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {
            if (empty($registration->id)) {
                $registration->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the admission exam that owns the registration.
     */
    public function admissionExam()
    {
        return $this->belongsTo(AdmissionExam::class);
    }

    /**
     * Mark as passed.
     */
    public function markAsPassed(?float $score = null): void
    {
        $this->status = self::STATUS_PASSED;
        if ($score !== null) {
            $this->score = $score;
        }
        $this->completed_at = now();
        $this->save();
    }

    /**
     * Mark as failed.
     */
    public function markAsFailed(?float $score = null): void
    {
        $this->status = self::STATUS_FAILED;
        if ($score !== null) {
            $this->score = $score;
        }
        $this->completed_at = now();
        $this->save();
    }
}

