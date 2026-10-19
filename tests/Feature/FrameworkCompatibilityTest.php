<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;
use JsonException;
use Tests\TestCase;

class FrameworkCompatibilityTest extends TestCase
{
    /**
     * @throws JsonException
     */
    public function test_existing_routes_are_registered(): void
    {
        $this->assertSame(0, Artisan::call('route:list', ['--json' => true]));

        $routes = json_decode(Artisan::output(), true, 512, JSON_THROW_ON_ERROR);
        $uris = array_column($routes, 'uri');

        $this->assertContains('/', $uris);
        $this->assertContains('login', $uris);
        $this->assertContains('apps', $uris);
        $this->assertContains('api/user', $uris);
    }

    public function test_framework_configuration_commands_succeed(): void
    {
        $this->assertSame(0, Artisan::call('config:cache'));
        $this->assertSame(0, Artisan::call('optimize:clear'));
    }
}
