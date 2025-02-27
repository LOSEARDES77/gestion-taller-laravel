<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Vehiculo;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuario para pruebas
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'a@a.com',
            'password' => bcrypt('a'),
        ]);

        // Crear 100 clientes, cada uno con 1-3 vehículos
        Cliente::factory()
            ->count(100)
            ->create()
            ->each(function ($cliente) {
                $numVehicles = rand(1, 3);
                Vehiculo::factory()
                    ->count($numVehicles)
                    ->create(['cliente_id' => $cliente->id]);
            });
    }
}
