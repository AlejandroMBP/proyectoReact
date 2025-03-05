<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VentaController extends Controller
{
    public function index()
    {
        return Inertia::render('Ventas/index');
    }
}
