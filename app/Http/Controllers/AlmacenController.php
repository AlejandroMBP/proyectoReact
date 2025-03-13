<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\TipoProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class AlmacenController extends Controller
{
    public function index()
    {
        $proveedores = Proveedor::all();

        $tipoProductos = TipoProducto::all();

        $productos = Producto::with(['tipoProducto', 'proveedor'])->get();
        return Inertia::render('Almacen/index', [
            'proveedores' => $proveedores,
            'tipoProductos' => $tipoProductos,
            'productos' => $productos
        ]);
    }
    public function store(Request $request)
    {
        // Validar los datos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'contacto' => 'required|string|max:255',
            'telefono' => 'required|numeric',
            'email' => 'required|email|max:255',
            'direccion' => 'required|string|max:255',
        ], [
            'nombre.required' => 'El nombre del proveedor es obligatorio.',
            'nombre.max' => 'El nombre del proveedor no debe exceder los 255 caracteres.',

            'contacto.required' => 'El contacto es obligatorio.',
            'contacto.strings' => 'El contacto debe ser una cadena de texto.',
            'contacto.max' => 'El contacto no debe exceder los 255 caracteres.',

            'telefono.required' => 'El teléfono es obligatorio.',
            'telefono.numeric' => 'inserte un numero de contato valido.',

            'email.required' => 'El email es obligatorio.',
            'email.email' => 'El email debe ser válido.',
            'email.max' => 'El email no debe exceder los 255 caracteres.',

            'direccion.required' => 'La dirección es obligatoria.',
            'direccion.max' => 'La dirección no debe exceder los 255 caracteres.',
        ]);

        // Crear el proveedor
        $proveedor = Proveedor::create($validated);

        // Retornar el proveedor creado como respuesta
        return response()->json($proveedor, 200);
    }

    public function crearProducto(Request $request)
    {

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/u'],
            'descripcion' => 'required|string|max:500',
        ], [
            'nombre.required' => 'El nombre del producto es obligatorio.',
            'nombre.string' => 'El nombre del tipo de producto debe ser una cadena de texto.',
            'nombre.max' => 'El nombre no debe exceder los 255 caracteres.',
            'nombre.regex' => 'El nombre del tipo de producto solo puede contener letras y espacios.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'descripcion.max' => 'La descripción no debe exceder los 500 caracteres.',
        ]);


        $tipoProducto = TipoProducto::create($validated);

        return response()->json($tipoProducto, 200);
    }
    public function registrarProducto(Request $request)
    {
        Log::debug('Datos recibidos en registrarProducto: ', $request->all());
        // {"proveedor":7,
        //     "tipoProducto":4,
        //     "nombre":"tryet",
        //     "cantidad":6573,
        //     "precio":76959,
        //     "calidad":"fdgfd",
        //     "marca":"dghdfgh",
        //     "fechaCompra":"2025-03-09",
        //     "estado":"disponible"
        // }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'cantidad' => 'required|integer|min:1',
            'precio' => 'required|numeric|min:0',
            'calidad' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'tipoProducto' => 'required|exists:tipos_de_productos,id',
            'proveedor' => 'required|exists:proveedores,id',
        ]);

        try {
            $producto = DB::table('productos')->insert([
                'nombre' => $validated['nombre'],
                'cantidad' => $validated['cantidad'],
                'calidad' => $validated['calidad'],
                'id_tipo_producto' => $validated['tipoProducto'],
                'id_proveedor' => $validated['proveedor'],
                'fecha_compra' => now(),
                'precio' => $validated['precio'],
                'marca' => $validated['marca'],
            ]);

            // Retornar el producto creado
            return Inertia::render('Almacen/index');
        } catch (\Exception $e) {
            Log::error('Error al registrar producto: ', ['error' => $e->getMessage()]);
            // Si ocurre un error, devolver con mensaje de error
            return Inertia::render('Almacen/index', [
                'message' => 'Ocurrió un error al registrar el producto.'
            ]);
        }
    }
}
