<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('cantidad');
            $table->string('calidad', 50)->nullable();
            $table->foreignId('id_tipo_producto')->constrained('tipos_de_productos')->onDelete('cascade');
            $table->foreignId('id_proveedor')->constrained('proveedores')->onDelete('cascade');
            $table->date('fecha_compra');
            $table->decimal('precio', 10, 2);
            $table->string('marca', 100)->nullable();
            $table->enum('estado', ['disponible', 'reservado', 'vendido'])->default('disponible');
            $table->timestamps();
        });
        Schema::create('precios_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_producto')->constrained('productos')->onDelete('cascade');
            $table->decimal('precio', 10, 2)->unsigned();
            $table->date('fecha_inicio');
            $table->date('fecha_fin')->nullable();
            $table->timestamps();
        });
        Schema::create('carrito_compras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->constrained('users')->onDelete('cascade');
            $table->decimal('total', 10, 2)->default(0)->unsigned();
            $table->enum('estado', ['activo', 'confirmado', 'cancelado'])->default('activo');
            $table->timestamps();
        });
        Schema::create('detalle_carrito', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_carrito')->constrained('carrito_compras')->onDelete('cascade');
            $table->foreignId('id_producto')->constrained('productos')->onDelete('cascade');
            $table->integer('cantidad')->unsigned();
            $table->decimal('precio_venta', 10, 2)->unsigned();
            $table->timestamps();
        });

        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_usuario')->nullable()->constrained('users')->onDelete('set null');
            $table->decimal('total', 10, 2)->unsigned();
            $table->enum('tipo_venta', ['carrito', 'manual']);
            $table->enum('estado', ['pagado', 'cancelado'])->default('pagado');
            $table->timestamps();
        });

        Schema::create('detalle_ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_venta')->constrained('ventas')->onDelete('cascade');
            $table->foreignId('id_producto')->constrained('productos')->onDelete('cascade');
            $table->integer('cantidad')->unsigned();
            $table->decimal('precio_venta', 10, 2)->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_ventas');
        Schema::dropIfExists('ventas');
        Schema::dropIfExists('detalle_carrito');
        Schema::dropIfExists('carrito_compras');
        Schema::dropIfExists('precios_productos');
        Schema::dropIfExists('productos');
    }
};
