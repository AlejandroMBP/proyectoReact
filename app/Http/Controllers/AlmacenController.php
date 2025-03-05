<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AlmacenController extends Controller
{
    public function index()
    {
        return Inertia::render('Almacen/index');
    }
}
