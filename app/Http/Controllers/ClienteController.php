<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Rules\ValidDni;
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
            'nombre' => 'required|string|min:3|max:255',
            'email' => 'required|email|unique:clientes',
            'telefono' => 'required|string|regex:/^[0-9]{9}$/',
            'dni' => ['required', 'string', 'unique:clientes', new ValidDni]
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
            'nombre' => 'required|string|min:3|max:255',
            'email' => 'required|email|unique:clientes,email,' . $cliente->id,
            'telefono' => 'required|string|regex:/^[0-9]{9}$/',
            'dni' => ['required', 'string', 'unique:clientes,dni,' . $cliente->id, new ValidDni]
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
