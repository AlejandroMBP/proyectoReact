// RegistrarProveedor.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

interface RegistrarProveedorProps {
    proveedores: { id: number; nombre: string }[];
    onProveedorSeleccionado: (id: string, nombre: string) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    errors: any;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
}

export default function RegistrarProveedor({
    proveedores,
    onProveedorSeleccionado,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
}: RegistrarProveedorProps) {
    const [isOtroProveedor, setIsOtroProveedor] = useState(false);
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [contacto, setContacto] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");

    const handleSubmitProveedor = async () => {
        setIsLoading(true);
        setErrors({});
        try {
            const response = await axios.post("/almacen/proveedor", {
                nombre: nombreProveedor,
                contacto,
                telefono,
                email,
                direccion,
            });

            if (response.status === 200) {
                onProveedorSeleccionado(response.data.id.toString(), response.data.nombre);
            }
        } catch (error: any) {
            setErrors(error.response?.data?.errors || {});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-4 py-4">
            <Label htmlFor="proveedor">Proveedores</Label>
            <Select onValueChange={(value) => {
                onProveedorSeleccionado(value, value === "otro" ? "Otro" : "");
                setIsOtroProveedor(value === "otro");
            }}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione un proveedor" />
                </SelectTrigger>
                <SelectContent>
                    {proveedores.map((prov) => (
                        <SelectItem key={prov.id} value={prov.id.toString()}>
                            {prov.nombre}
                        </SelectItem>
                    ))}
                    <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
            </Select>

            {isOtroProveedor && (
                <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
                    <div className="col-span-1">
                        <Label>Nombre del Proveedor</Label>
                        <Input
                            placeholder="Nombre del proveedor"
                            value={nombreProveedor}
                            onChange={(e) => setNombreProveedor(e.target.value)}
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <Label>Contacto</Label>
                        <Input
                            placeholder="Contacto"
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                        />
                        {errors.contacto && (
                            <p className="text-red-500 text-sm mt-1">{errors.contacto}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <Label>Teléfono</Label>
                        <Input
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        {errors.telefono && (
                            <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <Label>Email</Label>
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <Label>Dirección</Label>
                        <Input
                            placeholder="Dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                        {errors.direccion && (
                            <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <Button onClick={handleSubmitProveedor} disabled={isLoading} className="w-full">
                            {isLoading ? <LoaderCircleIcon /> : "Registrar Proveedor"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
