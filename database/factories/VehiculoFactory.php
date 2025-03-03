<?php

namespace Database\Factories;

use App\Models\Vehiculo;
use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehiculoFactory extends Factory
{
    protected $model = Vehiculo::class;

    public function definition()
    {
        $coches = [
            'Toyota' => [
                "Corolla",
                "Rav4",
                "Camry",
                "Prius",
            ],
            'Honda' => [
                "Civic",
                "Accord",
                "Odyssey",
                "Pilot",
            ],
            'Ford' => [
                "Fiesta",
                "Focus",
                "Mustang",
                "Explorer",
            ],
            'Chevrolet' => [
                "Corvette",
                "Camaro",
                "Malibu",
                "Trailblazer",
            ],
            'Volkswagen' => [
                "Golf",
                "Tiguan",
                "Polo",
                "Golf Plus",
            ],
            'BMW' => [
                "3 Series",
                "5 Series",
                "7 Series",
                "X5",
            ],
            'Mercedes' => [
                "C-Class",
                "E-Class",
                "G-Class",
                "S-Class",
            ],
            'Audi' => [
                "A4",
                "Q5",
                "Q7",
                "RS Q3",
            ]
        ];

        $marcas = array_keys($coches);

        $marca = $this->faker->randomElement($marcas);
        $modelo = $this->faker->randomElement($coches[$marca]);

        return [
            'marca' => $marca,
            'modelo' => $modelo,
            'color' => $this->faker->safeColorName(),
            'placa' => self::generate_plate(),
            'anio' => $this->faker->numberBetween(2000, 2024),
            'kilometraje' => $this->faker->numberBetween(0, 200000),
            'cliente_id' => Cliente::factory(),
        ];
    }

    private static function generate_plate(): string
    {
        $numeros = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

        $letrasPermitidas = "ABCDEFGHJKLMNPQRSTUVWXYZ";
        $random = rand(1, 100);
        if ($random <= 80) {
            $numLetras = 3;
        } elseif ($random <= 95) {
            $numLetras = 2;
        } else {
            $numLetras = 1;
        }
        $letras = '';
        for ($i = 0; $i < $numLetras; $i++) {
            $letras .= $letrasPermitidas[rand(0, strlen($letrasPermitidas) - 1)];
        }
        return "$numeros-$letras";
    }
}
