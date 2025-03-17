<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VentaController extends Controller
{
    public function index()
    {
        return Inertia::render('Pantallas/index');
    }
    public function VentaPantallas()
    {
        $productos = DB::table('productos as p')
            ->join('precios_productos as pp', 'p.id', '=', 'pp.id_producto')
            ->select(
                'p.id as producto_id',
                'p.nombre as producto_nombre',
                'p.cantidad',
                'pp.precio as precio_producto',
                'pp.fecha_inicio',
                'pp.fecha_fin'
            )
            ->where('p.estado', 'disponible')
            ->get();
        // Log::debug("consultasgl: ", $productos);

        return response()->json($productos);
    }
}
