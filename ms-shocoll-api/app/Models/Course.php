<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;

    // Níveis de ensino
    const EDUCATION_LEVEL_MEDIO = 'medio';
    const EDUCATION_LEVEL_SUPERIOR = 'superior';

    // Classes do ensino médio angolano
    const CLASS_LEVEL_10 = 10;
    const CLASS_LEVEL_11 = 11;
    const CLASS_LEVEL_12 = 12;
    const CLASS_LEVEL_13 = 13;

    protected $fillable = [
        'id',
        'school_id',
        'name',
        'description',
        'code',
        'education_level',
        'class_level',
        'year_level',
        'duration_months',
        'price',
        'monthly_tuition',
        'is_active',
        'faculty',
        'image_path',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'monthly_tuition' => 'decimal:2',
        'duration_months' => 'integer',
        'class_level' => 'integer',
        'year_level' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
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

        static::creating(function ($course) {
            if (empty($course->id)) {
                $course->id = (string) Str::uuid();
            }
            
            // Regras do ensino angolano
            if ($course->education_level === self::EDUCATION_LEVEL_MEDIO) {
                // Ensino médio: sempre 9 meses
                $course->duration_months = 9;
                
                // Validar class_level
                if (!in_array($course->class_level, [10, 11, 12, 13])) {
                    throw new \InvalidArgumentException('Classe do ensino médio deve ser 10, 11, 12 ou 13');
                }
            } elseif ($course->education_level === self::EDUCATION_LEVEL_SUPERIOR) {
                // Ensino superior: year_level é obrigatório
                if (empty($course->year_level) || $course->year_level < 1) {
                    throw new \InvalidArgumentException('Ano do ensino superior deve ser pelo menos 1');
                }
            }
        });
        
        static::updating(function ($course) {
            // Regras do ensino angolano na atualização
            if ($course->education_level === self::EDUCATION_LEVEL_MEDIO) {
                // Ensino médio: sempre 9 meses
                $course->duration_months = 9;
                
                // Validar class_level
                if (!in_array($course->class_level, [10, 11, 12, 13])) {
                    throw new \InvalidArgumentException('Classe do ensino médio deve ser 10, 11, 12 ou 13');
                }
            } elseif ($course->education_level === self::EDUCATION_LEVEL_SUPERIOR) {
                // Ensino superior: year_level é obrigatório
                if (empty($course->year_level) || $course->year_level < 1) {
                    throw new \InvalidArgumentException('Ano do ensino superior deve ser pelo menos 1');
                }
            }
        });
    }
    
    /**
     * Check if course is ensino médio.
     */
    public function isMedio(): bool
    {
        return $this->education_level === self::EDUCATION_LEVEL_MEDIO;
    }
    
    /**
     * Check if course is ensino superior.
     */
    public function isSuperior(): bool
    {
        return $this->education_level === self::EDUCATION_LEVEL_SUPERIOR;
    }
    
    /**
     * Get total tuition for ensino médio (9 months).
     */
    public function getTotalTuition(): ?float
    {
        if (!$this->monthly_tuition) {
            return null;
        }
        
        if ($this->isMedio()) {
            // Ensino médio: 9 meses de propina
            return $this->monthly_tuition * 9;
        }
        
        // Ensino superior: mensalidade por ano
        return $this->monthly_tuition;
    }
    
    /**
     * Get formatted class level (e.g., "10ª Classe").
     */
    public function getFormattedClassLevel(): ?string
    {
        if (!$this->class_level) {
            return null;
        }
        
        return $this->class_level . 'ª Classe';
    }
    
    /**
     * Get formatted year level (e.g., "1º Ano").
     */
    public function getFormattedYearLevel(): ?string
    {
        if (!$this->year_level) {
            return null;
        }
        
        return $this->year_level . 'º Ano';
    }

    /**
     * Get the school that owns the course.
     */
    public function school()
    {
        return $this->belongsTo(User::class, 'school_id');
    }

    /**
     * Get the admission exams for the course.
     */
    public function admissionExams()
    {
        return $this->hasMany(AdmissionExam::class);
    }

    /**
     * Get active admission exams for the course.
     */
    public function activeAdmissionExams()
    {
        return $this->hasMany(AdmissionExam::class)->where('is_active', true);
    }

    /**
     * Get the enrollments for the course.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Get approved enrollments for the course.
     */
    public function approvedEnrollments()
    {
        return $this->hasMany(Enrollment::class)->where('status', 'approved');
    }

    /**
     * Get the subjects for the course.
     */
    public function subjects()
    {
        return $this->hasMany(CourseSubject::class);
    }

    /**
     * Get subjects by semester.
     */
    public function subjectsBySemester($semester)
    {
        return $this->hasMany(CourseSubject::class)->where('semester', $semester);
    }

    /**
     * Get subjects by trimester.
     */
    public function subjectsByTrimester($trimester)
    {
        return $this->hasMany(CourseSubject::class)->where('trimester', $trimester);
    }
}


