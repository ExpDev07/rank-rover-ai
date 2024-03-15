<?php

namespace App\Broadcasting;

use App\Models\ContentRevision;
use App\Models\User;

class ContentRevisionChannel
{

    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, ContentRevision $contentRevision): array|bool
    {
        return $user->apps()->whereHas('contents.revisions', fn ($r) => $r->where('id', $contentRevision->id))->exists();
    }

}
