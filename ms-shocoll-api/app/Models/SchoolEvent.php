<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SchoolEvent extends Model
{
    protected $fillable = [
        'id',
        'school_id',
        'title',
        'description',
        'location',
        'starts_at',
        'ends_at',
        'price',
        'is_published',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'price' => 'decimal:2',
        'is_published' => 'boolean',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (self $model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function registrations()
    {
        return $this->hasMany(SchoolEventRegistration::class, 'event_id');
    }

    public function school()
    {
        return $this->belongsTo(User::class, 'school_id');
    }
}
