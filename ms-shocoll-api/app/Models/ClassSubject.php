<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ClassSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'class_id',
        'subject_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($classSubject) {
            if (empty($classSubject->id)) {
                $classSubject->id = (string) Str::uuid();
            }
        });
    }

    /**
     * Get the class.
     */
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the subject.
     */
    public function subject()
    {
        return $this->belongsTo(CourseSubject::class, 'subject_id');
    }
}
