<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Str;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    const ROLE_STUDENT = 'student';
    const ROLE_SCHOOL = 'school';
    const ROLE_TEACHER = 'teacher';

    protected $fillable = [
        'student_id',
        'name',
        'email',
        'password',
        'phone',
        'role',
        'school_id',
        'course_id',
        'department',
        'position',
        'contract_type',
        'address',
        'id_card',
        'email_verified',
        'is_active',
        'institution_type',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified' => 'boolean',
        'is_active' => 'boolean',
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'role' => self::ROLE_STUDENT,
        'email_verified' => false,
        'is_active' => true,
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            // Generate UUID if not provided
            if (empty($user->id)) {
                $user->id = (string) Str::uuid();
            }
            if (empty($user->role)) {
                $user->role = self::ROLE_STUDENT;
            }
            if (!isset($user->email_verified)) {
                $user->email_verified = false;
            }
            if (!isset($user->is_active)) {
                $user->is_active = true;
            }
            // Generate StudentID if not provided and role is student
            if (empty($user->student_id) && $user->role === self::ROLE_STUDENT) {
                $user->student_id = self::generateStudentId();
            }
        });
    }

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
        return [
            'email' => $this->email,
            'student_id' => $this->student_id,
            'role' => $this->role,
        ];
    }
    
    /**
     * Generate a unique Student ID.
     * Format: ST + year + 6 digits (e.g., ST2025000001)
     */
    public static function generateStudentId(): string
    {
        $year = date('Y');
        $prefix = "ST{$year}";
        
        // Get the last student ID for this year
        $lastStudent = self::where('student_id', 'like', "{$prefix}%")
            ->orderBy('student_id', 'desc')
            ->first();
        
        if ($lastStudent && $lastStudent->student_id) {
            // Extract the number part and increment
            $lastNumber = (int) substr($lastStudent->student_id, strlen($prefix));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }
        
        // Format with leading zeros (6 digits)
        $studentId = $prefix . str_pad($newNumber, 6, '0', STR_PAD_LEFT);
        
        // Ensure uniqueness (in case of race condition)
        while (self::where('student_id', $studentId)->exists()) {
            $newNumber++;
            $studentId = $prefix . str_pad($newNumber, 6, '0', STR_PAD_LEFT);
        }
        
        return $studentId;
    }

    /**
     * Verify the user's email.
     */
    public function verifyEmail(): void
    {
        $this->email_verified = true;
        $this->email_verified_at = now();
        $this->save();
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
     * Refresh tokens relationship.
     */
    public function refreshTokens()
    {
        return $this->hasMany(RefreshToken::class);
    }

    /**
     * Email verification tokens relationship.
     */
    public function emailVerificationTokens()
    {
        return $this->hasMany(EmailVerificationToken::class);
    }
}
