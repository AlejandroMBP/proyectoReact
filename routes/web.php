<?php

use App\Http\Controllers\AlmacenController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\RolesPermisosController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VentaController;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;
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

    Route::get('/roles', [RolesPermisosController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RolesPermisosController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RolesPermisosController::class, 'update'])->name('roles.update');
    Route::delete('/roles/destroy/{role}', [RolesPermisosController::class, 'destroy'])->name('roles.destroy');

    Route::post('/roles/{role}/permissions', [RolesPermisosController::class, 'assignPermissions'])->name('roles.assignPermissions');

    Route::get('/almacen', [AlmacenController::class, 'index'])->name('almacen.index');
    Route::post('/almacen/proveedor', [AlmacenController::class, 'store'])->name('proveedor.store');
    Route::post('/almacen/producto', [AlmacenController::class, 'crearProducto'])->name('procto.store');
    Route::post('/almacen/producto/registrar', [AlmacenController::class, 'registrarProducto'])->name('almacen.crear');
    Route::post('/almacen/puesta-venta', [AlmacenController::class, 'ponerAlaVenta'])->name('almacen.venta');

    Route::get('/pedido', [PedidoController::class, 'index'])->name('pedido.index');

    Route::get('/pantallas', [VentaController::class, 'index'])->name('pantallas.index');

    Route::get('/productos', [VentaController::class, 'VentaPantallas'])->name('pantallas.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
