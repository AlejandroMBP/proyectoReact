import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import Datatable from "@/components/datatable";
import { useEffect, useState } from "react";
import axios from "axios";
import { columns } from "./columns";
export interface Producto {
    id: number;
    nombre: string;
    cantidad: number;
    calidad?: string;
    fecha_compra: string;
    precio: number;
    marca?: string;
    estado: "disponible" | "reservado" | "vendido";
    proveedor: string;
}
export default function AlmacenIndex() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelTokenSource = axios.CancelToken.source();

        const fetchProductos = () => {
            axios.get<Producto[]>("/productos", { cancelToken: cancelTokenSource.token })
                .then(response => setProductos(response.data))
                .catch(error => {
                    if (!axios.isCancel(error)) {
                        console.error("Error al obtener productos:", error);
                    }
                });
            // console.log(productos);
        };

        fetchProductos();

        const interval = setInterval(fetchProductos, 5000); // Actualiza cada 5 segundos

        return () => {
            clearInterval(interval);
            cancelTokenSource.cancel("Componente desmontado, cancelando solicitud.");
        };
    }, []);

    return (
        <AppLayout breadcrumbs={[{ title: "Pantallas", href: "/pantallas" }]}>
            <Head title="Pantallas" />
            <div className="flex flex-col gap-6 p-6">
                <div className="p-6 bg-white dark:bg-sidebar rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Administración de pantallas</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Revisa las ventas de la plataforma. Puedes ver y descargar las ventas de hoy del mes y del año.
                    </p>
                </div>
                <Datatable
                    data={productos}
                    columns={columns}
                    caption="Lista de pantallas"
                    globalFilterColumn={"producto_nombre"} />
            </div>
        </AppLayout>
    )
}
