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
        'language',
    ];

    /**
     * The app.
     */
    public function app(): BelongsTo
    {
        return $this->belongsTo(App::class);
    }

    /**
     * The contents.
     */
    public function contents(): HasMany
    {
        return $this->hasMany(Content::class, 'cluster_id');
    }

    /**
     * The recommendations.
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(ContentRecommendation::class, 'cluster_id');
    }

}
