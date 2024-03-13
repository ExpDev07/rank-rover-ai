<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContentCluster extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'app_id',
    ];

    /**
     * The app.
     */
    public function app(): BelongsTo
    {
        return $this->belongsTo(App::class);
    }

    /**
     * The content.
     */
    public function content(): HasMany
    {
        return $this->hasMany(Content::class);
    }

    /**
     * The recommendations.
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(ContentRecommendation::class, 'cluster_id');
    }

}
