<?php

namespace Tests\Feature\Organization;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    public function testIndex()
    {
        $response = $this->actingAsOrganization()->getJson('/api/organization/campaigns');
        $response->assertStatus(200);
    }
}
