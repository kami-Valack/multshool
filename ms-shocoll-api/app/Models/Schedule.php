<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'school_id',
        'class_id',
        'course_id',
        'subject_id',
        'teacher_id',
        'class_name',
        'day_of_week',
        'start_time',
        'end_time',
        'room',
        'type',
        'exam_type',
        'exam_date',
        'academic_year',
        'semester',
        'is_active',
    ];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'exam_date' => 'date',
        'semester' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'type' => 'class',
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

        static::creating(function ($schedule) {
            if (empty($schedule->id)) {
                $schedule->id = (string) Str::uuid();
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
     * Get the class (turma).
     */
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
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

    /**
     * Get day of week in Portuguese.
     */
    public function getDayOfWeekPortugueseAttribute(): ?string
    {
        if (!$this->day_of_week) {
            return null;
        }

        $days = [
            'monday' => 'Segunda',
            'tuesday' => 'Terça',
            'wednesday' => 'Quarta',
            'thursday' => 'Quinta',
            'friday' => 'Sexta',
            'saturday' => 'Sábado',
            'sunday' => 'Domingo',
        ];

        return $days[$this->day_of_week] ?? $this->day_of_week;
    }

    /**
     * Get exam type in Portuguese.
     */
    public function getExamTypePortugueseAttribute(): ?string
    {
        if (!$this->exam_type) {
            return null;
        }

        $types = [
            'test' => 'Teste',
            'final_exam' => 'Exame Final',
            'recovery_exam' => 'Exame Recorrência',
            'practical_exam' => 'Prova Prática',
            'oral_exam' => 'Prova Oral',
        ];

        return $types[$this->exam_type] ?? $this->exam_type;
    }
}
