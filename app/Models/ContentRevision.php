<?php

namespace App\Models;

use App\Content\ContentGenerationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContentRevision extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'content_id',
        'parent_id',
        'status',
        'status_text',
        'content_md',
        'messages',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => ContentGenerationStatus::class,
        'messages' => 'array',
    ];

    /**
     * The parent revision (if any).
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(ContentRevision::class, 'parent_id');
    }

    /**
     * The content.
     */
    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class);
    }

    /**
     * The children.
     */
    public function children(): HasMany
    {
        return $this->hasMany(ContentRevision::class, 'parent_id');
    }

}
