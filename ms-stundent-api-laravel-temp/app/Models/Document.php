<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Document extends Model
{
    const TYPE_BI = 'bi';
    const TYPE_FOTO_TIPO = 'foto_tipo';
    const TYPE_HABILITACAO_LITERARIA = 'habilitacao_literaria';

    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    protected $table = 'student_documents';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'document_type',
        'file_path',
        'file_name',
        'mime_type',
        'file_size',
        'status',
        'rejection_reason',
        'uploaded_at',
        'reviewed_at',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($document) {
            if (empty($document->id)) {
                $document->id = (string) Str::uuid();
            }
            if (empty($document->status)) {
                $document->status = self::STATUS_PENDING;
            }
            if (empty($document->uploaded_at)) {
                $document->uploaded_at = now();
            }
        });
    }

    /**
     * Get allowed document types.
     */
    public static function getAllowedTypes(): array
    {
        return [
            self::TYPE_BI,
            self::TYPE_FOTO_TIPO,
            self::TYPE_HABILITACAO_LITERARIA,
        ];
    }

    /**
     * Check if document type is valid.
     */
    public static function isValidType(string $type): bool
    {
        return in_array($type, self::getAllowedTypes());
    }

    /**
     * User relationship.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if document is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if document is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    /**
     * Check if document is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Approve document.
     */
    public function approve(): void
    {
        $this->status = self::STATUS_APPROVED;
        $this->reviewed_at = now();
        $this->rejection_reason = null;
        $this->save();
    }

    /**
     * Reject document.
     */
    public function reject(string $reason): void
    {
        $this->status = self::STATUS_REJECTED;
        $this->reviewed_at = now();
        $this->rejection_reason = $reason;
        $this->save();
    }

    /**
     * Get file URL.
     */
    public function getFileUrl(): string
    {
        return asset('storage/' . $this->file_path);
    }
}
