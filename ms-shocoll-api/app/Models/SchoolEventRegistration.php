<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SchoolEventRegistration extends Model
{
    public const STATUS_REGISTERED = 'registered';
    public const STATUS_PAID = 'paid';

    protected $fillable = [
        'id',
        'event_id',
        'student_id',
        'student_name',
        'student_email',
        'status',
        'paid_at',
        'payment_reference',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
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

    public function event()
    {
        return $this->belongsTo(SchoolEvent::class, 'event_id');
    }
}
