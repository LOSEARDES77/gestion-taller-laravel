<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vehiculo extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'marca',
        'modelo',
        'color',
        'placa',
        'cliente_id',
        'anio',
        'kilometraje'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
