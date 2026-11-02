<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    const ROLE_STUDENT = 'student';

    protected $fillable = [
        'id',
        'student_id',
        'name',
        'email',
        'role',
        'email_verified',
        'is_active',
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified' => 'boolean',
        'is_active' => 'boolean',
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
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
     * Grades relationship.
     */
    public function grades()
    {
        return $this->hasMany(Grade::class, 'student_id');
    }

    /**
     * Enrollments relationship.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    /**
     * Registrations relationship.
     */
    public function registrations()
    {
        return $this->hasMany(Registration::class, 'student_id');
    }

    /**
     * Fees relationship.
     */
    public function fees()
    {
        return $this->hasMany(Fee::class, 'student_id');
    }

    /**
     * Scholarships relationship.
     */
    public function scholarships()
    {
        return $this->hasMany(Scholarship::class, 'student_id');
    }

    /**
     * Documents relationship.
     */
    public function documents()
    {
        return $this->hasMany(Document::class, 'user_id');
    }

    /**
     * Check if user has all required documents.
     */
    public function hasAllRequiredDocuments(): bool
    {
        $requiredTypes = \App\Models\Document::getAllowedTypes();
        $userDocuments = $this->documents()->pluck('document_type')->toArray();
        
        foreach ($requiredTypes as $type) {
            if (!in_array($type, $userDocuments)) {
                return false;
            }
        }
        
        return true;
    }
}

