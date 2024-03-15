<?php

namespace App\Broadcasting;

use App\Models\App;
use App\Models\User;

class AppChannel
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
    public function join(User $user, App $app): array|bool
    {
        return $app->user()->is($user);
    }

}
