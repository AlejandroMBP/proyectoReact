import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table";

export default function Datatable() {
    return (
        <table>
            <TableCaption>Tabla de almacen de productos</TableCaption>
            <TableHeader>
                <TableRow>
                    {/* "ID", "Nombre", "Cantidad", "Calidad", "Fecha de Compra", "Precio", "Marca", "Estado", "Proveedor", "Tipo de Producto" */}
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Calidad</TableHead>
                    <TableHead>Fecha de Compra</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Tipo de Producto</TableHead>
                </TableRow>
            </TableHeader>
        </table>
    );
}
