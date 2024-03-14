<?php

namespace App\Models;

use App\Content\ContentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Content extends Model
{
    use HasFactory;
    use HasSlug;

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'currentRevision',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'app_id',
        'cluster_id',
        'recommendation_id',
        'current_revision_id',
        'slug',
        'language',
        'title',
        'keywords',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'keywords' => 'array',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()->generateSlugsFrom('title')->saveSlugsTo('slug')->preventOverwrite();
    }

    /**
     * The app the content is for.
     */
    public function app(): BelongsTo
    {
        return $this->belongsTo(App::class);
    }

    /**
     * The cluster the content was created for.
     */
    public function cluster(): BelongsTo
    {
        return $this->belongsTo(ContentCluster::class, 'cluster_id');
    }

    /**
     * The recommendation the content was created from.
     */
    public function recommendation(): BelongsTo
    {
        return $this->belongsTo(ContentRecommendation::class, 'recommendation_id');
    }

    /**
     * The current revision.
     */
    public function currentRevision(): BelongsTo
    {
        return $this->belongsTo(ContentRevision::class, 'current_revision_id');
    }

    /**
     * The revisions.
     */
    public function revisions(): HasMany
    {
        return $this->hasMany(ContentRevision::class);
    }

}
