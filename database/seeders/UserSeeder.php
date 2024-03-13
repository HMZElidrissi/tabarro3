<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(10)
            ->create();
        User::create([
            'name' => 'Amine Ismaili',
            'email' => 'amine@amine.com',
            'password' => bcrypt('amine'),
            'role' => 1,
        ]);
    }
}
