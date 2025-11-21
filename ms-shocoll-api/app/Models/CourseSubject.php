<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CourseSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'course_id',
        'name',
        'description',
        'code',
        'semester',
        'trimester',
        'credits',
        'hours',
        'is_optional',
        'order',
    ];

    protected $casts = [
        'is_optional' => 'boolean',
        'semester' => 'integer',
        'trimester' => 'integer',
        'credits' => 'integer',
        'hours' => 'integer',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $attributes = [
        'is_optional' => false,
        'order' => 0,
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subject) {
            if (empty($subject->id)) {
                $subject->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the course that owns the subject.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}

