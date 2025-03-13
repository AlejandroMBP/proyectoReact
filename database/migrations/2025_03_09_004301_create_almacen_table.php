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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
