<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class permisosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $adminRole = Role::firstOrCreate(['name' => 'administrador']);
        $userRole = Role::firstOrCreate(['name' => 'usuario']);

        $permissions = [
            'ver usuarios',
            'crear usuarios',
            'editar usuarios',
            'eliminar usuarios',
            'ver almacen',
            'crear almacen',
            'editar almacen',
            'eliminar almacen',
            'ver pedidos',
            'crear pedidos',
            'editar pedidos',
            'eliminar pedidos',
            'ver ventas',
            'crear ventas',
            'editar ventas',
            'eliminar ventas',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $adminRole->givePermissionTo(Permission::all());

        $userRole->givePermissionTo([
            'ver usuarios',
            'ver almacen',
            'ver pedidos',
            'ver ventas',
        ]);
    }
}
