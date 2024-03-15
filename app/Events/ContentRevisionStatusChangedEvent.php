<?php

namespace App\Events;

use App\Broadcasting\ContentRevisionChannel;
use App\Models\ContentRevision;
use Illuminate\Broadcasting\InteractsWithBroadcasting;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContentRevisionStatusChangedEvent implements ShouldBroadcast
{
    use Dispatchable;
    use InteractsWithSockets;
    use InteractsWithBroadcasting;
    use SerializesModels;

    /**
     * The content revision that changed status.
     */
    public ContentRevision $revision;

    /**
     * Create a new event instance.
     */
    public function __construct(ContentRevision $revision)
    {
        $this->revision = $revision;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [new PrivateChannel("contentRevisions.{$this->revision->id}")];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->revision->id,
            'status' => $this->revision->status,
        ];
    }

}
