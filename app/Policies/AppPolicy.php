<?php

namespace App\Policies;

use App\Models\App;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AppPolicy
{
    /**
     * Allow only the owner to access the app and its resources.
     */
    public function manage(User $user, App $app): Response
    {
        return (string) $user->getKey() === (string) $app->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
