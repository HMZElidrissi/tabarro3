<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campaign>
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
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'location' => fake()->city(),
            'start_time' => fake()->dateTime(),
            'end_time' => fake()->dateTime(),
            'organization_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
