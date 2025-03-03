<?php

use App\Http\Controllers\RolesPermisosController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/usuarios', [UserController::class, 'index'])->name('usuario.index');
    Route::post('/usuarios', [UserController::class, 'store'])->name('usuario.store');
    Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('usuarios.destroy');
    Route::put('/usuarios/{id}', [UserController::class, 'update']);

    Route::get('role', [RolesPermisosController::class, 'index'])->name('role.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
