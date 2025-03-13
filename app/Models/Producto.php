<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $fillable = [
        'nombre',
        'cantidad',
        'precio',
        'calidad',
        'fecha_compra',
        'marca',
        'id_proveedor',
        'id_tipo_producto'
    ];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'id_proveedor');
    }

    public function tipoProducto()
    {
        return $this->belongsTo(TipoProducto::class, 'id_tipo_producto', 'id');
    }
}
