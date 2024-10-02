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
            'name' => 'Hamza El Idrissi',
            'email' => 'hamza.ezzharelidrissi1@gmail.com',
            'password' => bcrypt('password'),
            'city' => 'Casablanca',
            'phone' => '0612378678',
            'blood_group' => 'AB+',
            'role' => 1,
        ]);
        User::create([
            'name' => 'Rotaract Les Mérinides',
            'email' => 'rotaractlesmerinides@gmail.com',
            'password' => bcrypt('password'),
            'city' => 'Fes',
            'phone' => '0670345678',
            'blood_group' => 'O+',
            'role' => 2,
        ]);
        User::create([
            'name' => 'Amine Ismaili',
            'email' => 'amine@amine.com',
            'password' => bcrypt('password'),
            'city' => 'Casablanca',
            'phone' => '0612345678',
            'blood_group' => 'A+',
            'role' => 3,
        ]);
        User::factory()
            ->count(7)
            ->create();
    }
}
