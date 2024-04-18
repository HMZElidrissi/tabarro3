<?php

namespace Database\Factories;

use App\Models\Campaign;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(6, true),
            'description' => fake()->paragraph(2, true),
            'location' => fake()->city(),
            'start_time' => Carbon::create(2024, 4, 25, 0, 0, 0)->addDays($this->faker->numberBetween(1, 365)),
            'end_time' => Carbon::create(2024, 4, 26, 0, 0, 0)->addDays($this->faker->numberBetween(20, 30)),
            'organization_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
