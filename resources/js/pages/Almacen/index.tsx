import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";

export default function AlmacenIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: "Almacen", href: "/almacen" }]}>
            <Head title="Almacen" />
            <div className="flex flex-col gap-6 p-6">
                {/* Sección de Bienvenida */}
                <div className="p-6 bg-white dark:bg-sidebar rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Administración de Almacen</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Administra el almacen de la plataforma. Puedes agregar, editar y eliminar registros.
                    </p>
                </div>

                {/* Sección de Tabla con Botón */}
                <div className="p-6 bg-white dark:bg-sidebar rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Lista de almacen</h2>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
