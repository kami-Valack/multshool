<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'student_id',
        'scholarship_type',
        'amount',
        'status',
        'application_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'application_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected $attributes = [
        'status' => self::STATUS_PENDING,
    ];

    /**
     * Student relationship.
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Check if scholarship is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if scholarship is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    /**
     * Check if scholarship is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }
}

