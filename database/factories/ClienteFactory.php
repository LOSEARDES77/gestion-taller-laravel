<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'telefono' => $this->faker->phoneNumber(),
            'dni' => $this->gen_dni($this->faker->unique()->numberBetween(0, 99999999)),
        ];
    }

    private function gen_dni(int $num): string
    {
        $dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
        $dni = $num . substr($dni_letters, $num % 23, 1);
        return $dni;
    }
}
