<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    const ROLE_SCHOOL = 'school';
    const ROLE_TEACHER = 'teacher';
    const ROLE_STUDENT = 'student';
    
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'id',
        'name',
        'email',
        'role',
        'email_verified',
        'is_active',
        'status',
        'rejection_reason',
        'approved_at',
        'institution_type',
        'acronym',
        'logo_path',
        'photos',
        'presentation_video_path',
        'description',
        'founded_year',
        'location_map_url',
        'total_students',
        'phone_number',
        'contact_emails',
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified' => 'boolean',
        'is_active' => 'boolean',
        'email_verified_at' => 'datetime',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'photos' => 'array',
        'contact_emails' => 'array',
        'founded_year' => 'integer',
        'total_students' => 'integer',
    ];
    
    protected $attributes = [
        // Status só é aplicado para escolas, docentes não têm status
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Check if user is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if email is verified.
     */
    public function isEmailVerified(): bool
    {
        return $this->email_verified;
    }
    
    /**
     * Check if school is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }
    
    /**
     * Check if school is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }
    
    /**
     * Check if school is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }
    
    /**
     * Approve school.
     */
    public function approve(): void
    {
        $this->status = self::STATUS_APPROVED;
        $this->approved_at = now();
        $this->rejection_reason = null;
        $this->save();
    }
    
    /**
     * Reject school.
     */
    public function reject(?string $reason = null): void
    {
        $this->status = self::STATUS_REJECTED;
        $this->rejection_reason = $reason;
        $this->approved_at = null;
        $this->save();
    }

    /**
     * Get the courses for the school.
     */
    public function courses()
    {
        return $this->hasMany(Course::class, 'school_id');
    }

    /**
     * Get active courses for the school.
     */
    public function activeCourses()
    {
        return $this->hasMany(Course::class, 'school_id')->where('is_active', true);
    }

    /**
     * Get students for the teacher.
     */
    public function teacherStudents()
    {
        return $this->hasMany(TeacherStudent::class, 'teacher_id');
    }

    /**
     * Get active students for the teacher.
     */
    public function activeTeacherStudents()
    {
        return $this->hasMany(TeacherStudent::class, 'teacher_id')->where('is_active', true);
    }

    /**
     * Get follow-ups created by the teacher.
     */
    public function followUps()
    {
        return $this->hasMany(StudentFollowUp::class, 'teacher_id');
    }

    /**
     * Check if school has all required profile data filled.
     */
    public function hasCompleteProfile(): bool
    {
        $requiredFields = [
            'name',
            'acronym',
            'logo_path',
            'photos',
            'presentation_video_path',
            'description',
            'founded_year',
            'location_map_url',
            'phone_number',
            'contact_emails',
        ];

        foreach ($requiredFields as $field) {
            $value = $this->$field;
            
            // Verificar se o campo está vazio ou null
            if ($value === null || $value === '') {
                return false;
            }
            
            // Para arrays (photos, contact_emails), verificar se não está vazio
            if (in_array($field, ['photos', 'contact_emails'])) {
                if (empty($value) || (is_array($value) && count($value) === 0)) {
                    return false;
                }
            }
            
            // Para photos, verificar se tem pelo menos 2 fotos
            if ($field === 'photos' && is_array($value) && count($value) < 2) {
                return false;
            }
            
            // Para contact_emails, verificar se tem pelo menos 1 email
            if ($field === 'contact_emails' && is_array($value) && count($value) < 1) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get missing required profile fields.
     */
    public function getMissingProfileFields(): array
    {
        $requiredFields = [
            'name' => 'Nome completo da Instituição',
            'acronym' => 'Acrónimo',
            'logo_path' => 'Logotipo',
            'photos' => '2 Fotografias da instituição',
            'presentation_video_path' => 'Vídeo de apresentação',
            'description' => 'Descrição',
            'founded_year' => 'Ano de fundação',
            'location_map_url' => 'Localização (link do Google Maps)',
            'phone_number' => 'Número de Telefone',
            'contact_emails' => 'E-mails de contato',
        ];

        $missing = [];

        foreach ($requiredFields as $field => $label) {
            $value = $this->$field;
            
            if ($value === null || $value === '') {
                $missing[] = $label;
                continue;
            }
            
            if (in_array($field, ['photos', 'contact_emails'])) {
                if (empty($value) || (is_array($value) && count($value) === 0)) {
                    $missing[] = $label;
                    continue;
                }
            }
            
            if ($field === 'photos' && is_array($value) && count($value) < 2) {
                $missing[] = $label . ' (necessário pelo menos 2 fotos)';
                continue;
            }
            
            if ($field === 'contact_emails' && is_array($value) && count($value) < 1) {
                $missing[] = $label . ' (necessário pelo menos 1 email)';
                continue;
            }
        }

        return $missing;
    }
}
