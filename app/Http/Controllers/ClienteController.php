<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
    {
        // Getting clients from the api route api.clientes.index
        return Inertia::render('Clientes/Index', [
            'clientes' => Cliente::with(['vehiculos'])->get()
        ]);
    }

    public function list()
    {
        return Cliente::with('vehiculos')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email|unique:clientes',
            'telefono' => 'required|string',
            'dni' => 'required|string|unique:clientes'
        ]);

        $cliente = Cliente::create($request->all());

        if ($request->expectsJson()) {
            return $cliente;
        }

        return redirect()->back();
    }

    public function show(Cliente $cliente)
    {
        return $cliente->load('vehiculos');
    }

    public function update(Request $request, Cliente $cliente)
    {
        $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email|unique:clientes,email,' . $cliente->id,
            'telefono' => 'required|string',
            'dni' => 'required|string|unique:clientes,dni,' . $cliente->id
        ]);

        $cliente->update($request->all());

        if ($request->expectsJson()) {
            return $cliente;
        }

        return redirect()->back();
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        if (request()->expectsJson()) {
            return response()->json(['message' => 'Cliente eliminado correctamente']);
        }

        return redirect()->back();
    }
}
