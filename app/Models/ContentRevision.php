<?php

namespace App\Models;

use App\Content\ContentGenerationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'status',
        'status_text',
        'content_md',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => ContentGenerationStatus::class,
    ];

    /**
     * The content.
     */
    public function content(): BelongsTo
    {
        return $this->belongsTo(Content::class);
    }

}
