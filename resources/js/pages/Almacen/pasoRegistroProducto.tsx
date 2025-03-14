import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircleIcon } from "lucide-react";

interface PasoRegistroProductoProps {
    step: number;
    setStep: (step: number) => void;
    proveedores: { id: number; nombre: string }[];
    proveedor: string;
    setProveedor: (value: string) => void;
    isOtroProveedor: boolean;
    setIsOtroProveedor: (value: boolean) => void;
    nombreProveedor: string;
    setNombreProveedor: (value: string) => void;
    contacto: string;
    setContacto: (value: string) => void;
    telefono: string;
    setTelefono: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    direccion: string;
    setDireccion: (value: string) => void;
    handleSubmitProveedor: () => void;
    isLoading: boolean;
    errors: any;
}

export default function PasoRegistroProducto({
    step,
    setStep,
    proveedores,
    proveedor,
    setProveedor,
    isOtroProveedor,
    setIsOtroProveedor,
    nombreProveedor,
    setNombreProveedor,
    contacto,
    setContacto,
    telefono,
    setTelefono,
    email,
    setEmail,
    direccion,
    setDireccion,
    handleSubmitProveedor,
    isLoading,
    errors
}: PasoRegistroProductoProps) {
    // Validación de si todos los campos están completos
    const isFormValid = nombreProveedor && contacto && telefono && email && direccion;

    return (
        <div className="grid gap-4 py-4">
            <Label htmlFor="proveedor">Proveedores</Label>
            <Select
                value={proveedor}
                onValueChange={(value) => {
                    setProveedor(value);
                    setIsOtroProveedor(value === "otro");
                }}
            >
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
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                    </div>
                    <div className="col-span-1">
                        <Label>Contacto</Label>
                        <Input
                            placeholder="Contacto"
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                        />
                        {errors.contacto && <p className="text-red-500 text-sm mt-1">{errors.contacto}</p>}
                    </div>
                    <div className="col-span-1">
                        <Label>Teléfono</Label>
                        <Input
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                    </div>
                    <div className="col-span-1">
                        <Label>Email</Label>
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="col-span-1">
                        <Label>Dirección</Label>
                        <Input
                            placeholder="Dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                        {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
                    </div>
                    <div className="col-span-2">
                        <Button
                            onClick={handleSubmitProveedor}
                            disabled={isLoading || !isFormValid}
                            className="w-full"
                        >
                            {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Registrar Proveedor"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
