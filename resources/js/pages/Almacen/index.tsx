import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import RegistroProductoModal from "./RegistroProductoModal";
import { useState } from "react";

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

export default function AlmacenIndex({ proveedores, tipoProductos, productos }: AlmacenIndexProps) {
    const [search, setSearch] = useState("");
    const [selectedEstado, setSelectedEstado] = useState<string | "todos">("todos");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filterProductos = () => {
        return productos.filter((producto) => {
            const matchesSearch =
                producto.nombre.toLowerCase().includes(search.toLowerCase()) ||
                proveedores.some((proveedor) => proveedor.id === producto.id_proveedor && proveedor.nombre.toLowerCase().includes(search.toLowerCase())) ||
                tipoProductos.some((tipo) => tipo.id === producto.id_tipo_producto && tipo.nombre.toLowerCase().includes(search.toLowerCase()));
            const matchesEstado = selectedEstado === "todos" || producto.estado === selectedEstado;
            return matchesSearch && matchesEstado;
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredProductos = filterProductos();
    const paginatedProductos = filteredProductos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

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
                <div className="flex justify-between items-center p-6 bg-white dark:bg-sidebar rounded-xl shadow-md">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Buscar producto, proveedor, tipo..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-4 py-2 border rounded-md"
                        />
                        <select
                            value={selectedEstado}
                            onChange={(e) => setSelectedEstado(e.target.value)}
                            className=" bg-sidebar px-4 py-2 border rounded-md"
                        >
                            <option value="todos">Todos los estados</option>
                            <option value="disponible">Disponible</option>
                            <option value="reservado">Reservado</option>
                            <option value="vendido">Vendido</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-sidebar rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Lista de Productos</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-200">
                                    {["ID", "Nombre", "Cantidad", "Calidad", "Fecha de Compra", "Precio", "Marca", "Estado", "Proveedor", "Tipo de Producto"].map((col) => (
                                        <th key={col} className="border px-4 py-2 text-center">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProductos.length > 0 ? (
                                    paginatedProductos.map((producto) => {
                                        // Buscar el tipo de producto
                                        const tipoProducto = tipoProductos.find(t => t.id === producto.id_tipo_producto);
                                        // Buscar el proveedor correspondiente
                                        const proveedor = proveedores.find(p => p.id === producto.id_proveedor);
                                        return (
                                            <tr key={producto.id} className="border even:bg-gray-50 dark:even:bg-gray-700">
                                                <td className="border px-4 py-2 text-center">{producto.id}</td>
                                                <td className="border px-4 py-2">{producto.nombre}</td>
                                                <td className="border px-4 py-2 text-center">{producto.cantidad}</td>
                                                <td className="border px-4 py-2">{producto.calidad || "N/A"}</td>
                                                <td className="border px-4 py-2 text-center">{producto.fecha_compra}</td>
                                                <td className="border px-4 py-2 text-center">${parseFloat(producto.precio).toFixed(2)}</td>
                                                <td className="border px-4 py-2">{producto.marca || "Sin marca"}</td>
                                                <td className="border px-4 py-2 text-center">{producto.estado}</td>
                                                <td className="border px-4 py-2">{proveedor ? proveedor.nombre : "Desconocido"}</td>
                                                <td className="border px-4 py-2">{tipoProducto ? tipoProducto.nombre : "Desconocido"}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={10} className="text-center p-4 text-gray-500">
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-gray-600 dark:text-gray-300">
                            <span>Pagina {currentPage} de {totalPages}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
