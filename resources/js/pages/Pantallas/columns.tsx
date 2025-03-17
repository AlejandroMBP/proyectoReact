import { ColumnDef } from "@tanstack/react-table";
// import type { productos } from "@/pages/Pantallas";
import type { Producto } from ".";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DatatableColumnHeader from "@/components/datatable-column-header";
export const columns: ColumnDef<Producto>[] = [
    {
        accessorKey: 'producto_id',
        header: 'ID',
        enableHiding: false,
    },
    {
        accessorKey: 'producto_nombre',
        header: ({ column }) => (
            <DatatableColumnHeader title="Nombre de producto" column={column} />
        ),
    },
    {
        accessorKey: 'cantidad',
        header: 'Cantidad disponible',
    },


    {
        accessorKey: 'fecha_inicio',
        header: 'Fecha de compra',
    },
    {
        accessorKey: 'precio_producto',
        header: 'Precio',
    },

    {
        accessorKey: 'estado',
        header: 'Estado',
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" h-8 w-8 p-0">
                        <span className="sr-only">Abrir Opciones</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-sidebar">
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                        Editar Proveedor
                    </DropdownMenuItem>
                    <DropdownMenuSeparator>
                        <DropdownMenuItem>Editar tipo de producto</DropdownMenuItem>
                        <DropdownMenuItem>Editar producto</DropdownMenuItem>
                    </DropdownMenuSeparator>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

];
