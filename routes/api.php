<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\TranslationController;
use App\Http\Controllers\VehiculoController;
use Illuminate\Support\Facades\Route;

// API routes with 'api' prefix and web middleware for CSRF protection
Route::middleware('web')->group(function () {
    // Cliente API routes
    Route::get('/clientes', [ClienteController::class, 'index'])->name('api.clientes.index');
    Route::post('/clientes', [ClienteController::class, 'store'])->name('api.clientes.store');
    Route::get('/clientes/{cliente}', [ClienteController::class, 'show'])->name('api.clientes.show');
    Route::put('/clientes/{cliente}', [ClienteController::class, 'update'])->name('api.clientes.update');
    Route::delete('/clientes/{cliente}', [ClienteController::class, 'destroy'])->name('api.clientes.destroy');

    // Vehiculo API routes
    Route::get('/vehiculos', [VehiculoController::class, 'index'])->name('api.vehiculos.index');
    Route::post('/vehiculos', [VehiculoController::class, 'store'])->name('api.vehiculos.store');
    Route::get('/vehiculos/{vehiculo}', [VehiculoController::class, 'show'])->name('api.vehiculos.show');
    Route::put('/vehiculos/{vehiculo}', [VehiculoController::class, 'update'])->name('api.vehiculos.update');
    Route::delete('/vehiculos/{vehiculo}', [VehiculoController::class, 'destroy'])->name('api.vehiculos.destroy');

    // Translation API routes
    Route::get('/translations', [TranslationController::class, 'index'])->name('api.translations.index');
    Route::get('/translations/{lang}', [TranslationController::class, 'getLanguage'])->name('api.translations.language');
});
