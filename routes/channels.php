<?php

use App\Broadcasting\AppChannel;
use App\Broadcasting\ContentRevisionChannel;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('apps.{app}', AppChannel::class);
Broadcast::channel('contentRevisions.{contentRevision}', ContentRevisionChannel::class);
