import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import RegistroProductoModal from "./RegistroProductoModal";
import { useState } from "react";
import Datatable from "@/components/datatable";
import { columns } from "./columns";
interface Proveedor {
    id: number;
    nombre: string;
}
interface TipoProducto {
    id: number;
    nombre: string;
    descripcion: string;
}
interface Producto {
    id: number;
    nombre: string;
    cantidad: number;
    calidad: string | null;
    id_tipo_producto: number;
    id_proveedor: number;
    fecha_compra: string;
    precio: string;
    marca: string | null;
    estado: "disponible" | "reservado" | "vendido";
}

interface AlmacenIndexProps {
    proveedores: Proveedor[];
    tipoProductos: TipoProducto[];
    productos: Producto[];
}
export type productos = {
    id: number;
    nombre: string;
    cantidad: number;
    calidad: string | null;
    id_tipo_producto: number;
    id_proveedor: number;
    fecha_compra: string;
    precio: string;
    marca: string | null;
    estado: "disponible" | "reservado" | "vendido";
}
export default function AlmacenIndex({ proveedores, tipoProductos, productos }: AlmacenIndexProps) {
    // Mapear productos con los nombres correspondientes de tipoProducto y proveedor
    const productosConNombres = productos.map((producto) => {
        // Obtener el nombre del tipo de producto
        const tipoProducto = tipoProductos.find(t => t.id === producto.id_tipo_producto)?.nombre || "Desconocido";
        // Obtener el nombre del proveedor
        const proveedor = proveedores.find(p => p.id === producto.id_proveedor)?.nombre || "Desconocido";

        return {
            ...producto,
            tipo_producto_nombre: tipoProducto,
            proveedor_nombre: proveedor
        };

    });
    console.log('arreglo completo:', productosConNombres);
    return (
        <AppLayout breadcrumbs={[{ title: "Almacen", href: "/almacen" }]}>
            <Head title="Almacen" />
            <div className="flex flex-col gap-6 p-6">
                <div className="p-6 bg-white dark:bg-sidebar rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Administración de Almacén</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Administra el almacén de la plataforma. Puedes agregar, editar y eliminar registros.
                    </p>
                </div>
                <RegistroProductoModal proveedores={proveedores} tipoProductos={tipoProductos} />

                <Datatable
                    data={productosConNombres}
                    columns={columns}
                    caption="Lista de productos"
                    globalFilterColumn={"nombre"}
                />
            </div>
        </AppLayout>
    );
}
