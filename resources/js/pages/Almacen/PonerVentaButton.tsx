import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Producto {
    id: number;
    nombre: string;
    marca: string;
    precioCompra: number;
    precioVenta: string;
    fechaInicio: string;
}

interface PonerVentaButtonProps {
    selectedRows: any[];
}

export default function PonerVentaButton({ selectedRows }: PonerVentaButtonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [errores, setErrores] = useState<Record<number, { precioVenta?: string }>>({});

    useEffect(() => {
        if (selectedRows.length > 0) {
            const productosConPrecioCalculado = selectedRows
                .filter((row) => row.estado === "pendiente")
                .map((row) => {
                    const precioCompraCalculado = parseFloat((row.precio / row.cantidad).toFixed(2));
                    return {
                        id: row.id,
                        nombre: row.nombre,
                        marca: row.marca,
                        precioCompra: precioCompraCalculado,
                        precioVenta: "",
                        fechaInicio: new Date().toISOString().split("T")[0],
                        estado: row.estado,
                    };
                });

            setProductos(productosConPrecioCalculado);
            setErrores({}); // Reiniciar errores al actualizar los productos
        }
    }, [selectedRows]);

    const handlePonerVenta = async () => {
        const erroresTemp: Record<number, { precioVenta?: string }> = {};

        productos.forEach((producto, index) => {
            if (!producto.precioVenta || parseFloat(producto.precioVenta) <= 0) {
                erroresTemp[index] = { precioVenta: "El precio de venta es obligatorio y debe ser mayor a 0." };
            }
        });

        if (Object.keys(erroresTemp).length > 0) {
            setErrores(erroresTemp);
            return;
        }

        if (productos.length === 0) {
            alert("No hay productos en estado 'pendiente' para poner en venta.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(route("almacen.venta"), { productos });
            alert("Productos puestos a la venta con éxito.");
            setOpen(false);
        } catch (error) {
            console.error("Error al poner en venta:", error);
            alert("Error al realizar la acción.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        setProductos(prevProductos => {
            const updatedProductos = [...prevProductos];
            updatedProductos[index].precioVenta = value;
            return updatedProductos;
        });

        setErrores(prevErrores => {
            const updatedErrores = { ...prevErrores };
            if (updatedErrores[index]) {
                delete updatedErrores[index].precioVenta;
                if (Object.keys(updatedErrores[index]).length === 0) {
                    delete updatedErrores[index];
                }
            }
            return updatedErrores;
        });
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="outline">
                Poner a la venta
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar acción</DialogTitle>
                        <p>¿Estás seguro de que deseas poner estos productos a la venta?</p>
                    </DialogHeader>

                    <Accordion type="multiple">
                        {productos.map((producto, index) => (
                            <AccordionItem key={producto.id} value={`producto-${producto.id}`}>
                                <AccordionTrigger>{producto.nombre}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Nombre del producto</Label>
                                            <Input value={producto.nombre} disabled />
                                        </div>
                                        <div>
                                            <Label>Marca</Label>
                                            <Input value={producto.marca} disabled />
                                        </div>
                                        <div>
                                            <Label>Precio unitario de compra</Label>
                                            <Input type="number" value={producto.precioCompra} disabled />
                                        </div>
                                        <div>
                                            <Label>Fecha de inicio</Label>
                                            <Input type="date" value={producto.fechaInicio} disabled />
                                        </div>
                                        <div>
                                            <Label>Precio unitario de venta</Label>
                                            <Input
                                                type="number"
                                                value={producto.precioVenta}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                            />
                                            {errores[index]?.precioVenta && (
                                                <p className="text-red-500 text-sm">{errores[index].precioVenta}</p>
                                            )}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handlePonerVenta} disabled={loading}>
                            {loading ? "Procesando..." : "Confirmar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
