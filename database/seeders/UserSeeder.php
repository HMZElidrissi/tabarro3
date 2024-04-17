<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Meryem El Herrachy',
            'email' => 'hamza.ezzharelidrissi1@gmail.com',
            'password' => bcrypt('password'),
            'city' => 'Casablanca',
            'phone' => '0612378678',
            'blood_group' => 'AB+',
            'role' => 2,
        ]);
        User::create([
            'name' => 'Khalil Hamdoune',
            'email' => 'khalil@khalil.com',
            'password' => bcrypt('password'),
            'city' => 'Fes',
            'phone' => '0670345678',
            'blood_group' => 'O+',
            'role' => 3,
        ]);
        User::create([
            'name' => 'Amine Ismaili',
            'email' => 'amine@amine.com',
            'password' => bcrypt('password'),
            'city' => 'Casablanca',
            'phone' => '0612345678',
            'blood_group' => 'A+',
            'role' => 1,
        ]);
        User::factory()
            ->count(7)
            ->create();
    }
}
