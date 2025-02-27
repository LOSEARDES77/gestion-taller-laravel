<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehiculoController extends Controller
{
    public function index()
    {
        // For API requests, return JSON
        if (request()->expectsJson()) {
            return Vehiculo::with('cliente')->get();
        }
        
        // For web requests, return Inertia view
        return Inertia::render('Vehiculos/Index', [
            'vehiculos' => Vehiculo::with('cliente')->get(),
            'clientes' => Cliente::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'color' => 'required|string',
            'placa' => 'required|string|unique:vehiculos',
            'año' => 'required|integer',
            'kilometraje' => 'required|integer',
            'cliente_id' => 'required|exists:clientes,id'
        ]);

        $vehiculo = Vehiculo::create($request->all());
        
        if ($request->expectsJson()) {
            return $vehiculo;
        }

        return redirect()->back();
    }

    public function show(Vehiculo $vehiculo)
    {
        return $vehiculo->load('cliente');
    }

    public function update(Request $request, Vehiculo $vehiculo)
    {
        $request->validate([
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'color' => 'required|string',
            'placa' => 'required|string|unique:vehiculos,placa,' . $vehiculo->id,
            'año' => 'required|integer',
            'kilometraje' => 'required|integer',
            'cliente_id' => 'required|exists:clientes,id'
        ]);

        $vehiculo->update($request->all());
        
        if ($request->expectsJson()) {
            return $vehiculo;
        }

        return redirect()->back();
    }

    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->delete();
        
        if (request()->expectsJson()) {
            return response()->json(['message' => 'Vehículo eliminado correctamente']);
        }
        
        return redirect()->back();
    }
}
