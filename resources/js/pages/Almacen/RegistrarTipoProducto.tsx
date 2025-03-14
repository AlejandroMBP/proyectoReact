import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import axios from "axios";

interface TipoProducto {
    id: number;
    nombre: string;
}

interface PasoTipoProductoProps {
    tipoProductos: TipoProducto[];
    tipoProducto: string;
    setTipoProducto: (value: string) => void;
    nextStep: () => void;
}

export default function PasoTipoProducto({ tipoProductos, tipoProducto, setTipoProducto, nextStep }: PasoTipoProductoProps) {
    const [isOtroTipo, setIsOtroTipo] = useState(false);
    const [nuevoTipo, setNuevoTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleRegistrarTipoProducto = async () => {
        setIsLoading(true);
        setErrors({});
        try {
            const response = await axios.post("/almacen/producto", {
                nombre: nuevoTipo,
                descripcion,
            });

            if (response.status === 200) {
                setTipoProducto(response.data.id.toString());
                setNuevoTipo(response.data.nombre);
                nextStep();
            }
        } catch (error: any) {
            setErrors(error.response?.data?.errors || {});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-4 py-4">
            <Label>Tipo de Producto</Label>
            <Select onValueChange={(value) => {
                setTipoProducto(value);
                setIsOtroTipo(value === "otro");
            }} value={tipoProducto}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                    {tipoProductos.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                            {tipo.nombre}
                        </SelectItem>
                    ))}
                    <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
            </Select>

            {isOtroTipo && (
                <>
                    <Label>Nuevo Tipo</Label>
                    <Input
                        placeholder="Ingrese el nuevo tipo de producto"
                        value={nuevoTipo}
                        onChange={(e) => setNuevoTipo(e.target.value)}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

                    <Label>Descripción</Label>
                    <Input
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}

                    <Button onClick={handleRegistrarTipoProducto} disabled={isLoading}>
                        {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Registrar Tipo"}
                    </Button>
                </>
            )}
        </div>
    );
}
