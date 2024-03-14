<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function testLogin()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'amine@amine.com',
            'password' => 'amine',
        ]);

        $response->assertStatus(200);
    }

    public function testRegister()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Hamza EL IDRISSI',
            'email' => 'hamza1@hamza.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
    }
}
