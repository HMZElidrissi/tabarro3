<?php

namespace Database\Seeders;

use App\Models\BloodRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BloodRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BloodRequest::factory()
            ->count(10)
            ->create();
    }
}
