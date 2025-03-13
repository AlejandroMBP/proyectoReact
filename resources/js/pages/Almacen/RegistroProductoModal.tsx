import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTrigger,
} from "@/components/ui/stepper";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import axios from "axios";

interface Proveedor {
    id: number;
    nombre: string;
}

interface TipoProducto {
    id: number;
    nombre: string;
}

interface RegistroProductoModalProps {
    proveedores: Proveedor[];
    tipoProductos: TipoProducto[];
}

export default function RegistroProductoModal({ proveedores, tipoProductos }: RegistroProductoModalProps) {
    const [step, setStep] = useState(1);
    const [proveedor, setProveedor] = useState("");
    const [tipoProducto, setTipoProducto] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOtroProveedor, setIsOtroProveedor] = useState(false);
    const [isOtroTipo, setIsOtroTipo] = useState(false);
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [contacto, setContacto] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [nuevoTipo, setNuevoTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nombreProducto, setNombreProducto] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [calidad, setCalidad] = useState("");
    const [marca, setMarca] = useState("");
    const [fechaCompra, setFechaCompra] = useState("");
    const [errors, setErrors] = useState<any>({});

    const steps = ["Seleccionar Proveedor", "Seleccionar Tipo de Producto", "Registrar Producto"];

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
                setProveedor(response.data.id.toString());
                setNombreProveedor(response.data.nombre);
                nextStep();
            }
        } catch (error: any) {
            setErrors(error.response?.data?.errors || {});
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleFinalizar = async () => {
        if (cantidad <= 0 || precio <= 0) {
            setErrors({ cantidad: "Debe ser mayor a 0", precio: "Debe ser mayor a 0" });
            return;
        }
        setIsLoading(true);
        setErrors({});
        try {
            const response = await axios.post("/almacen/producto/registrar", {
                proveedor: Number(proveedor),
                tipoProducto: Number(tipoProducto),
                nombre: nombreProducto,
                cantidad,
                precio,
                calidad,
                marca,
                fechaCompra: new Date().toISOString().split("T")[0],
            });

            if (response.status === 200) {
                resetForm();
            }
        } catch (error: any) {
            setErrors(error.response?.data?.errors || {});
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => step < steps.length && setStep(step + 1);
    const prevStep = () => step > 1 && setStep(step - 1);
    const resetForm = () => {
        setStep(1);
        setProveedor("");
        setTipoProducto("");
        setNombreProveedor("");
        setContacto("");
        setTelefono("");
        setEmail("");
        setDireccion("");
        setNombreProducto("");
        setCantidad(0);
        setPrecio(0);
        setCalidad("");
        setMarca("");
        setFechaCompra("");
    };

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                resetForm();
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Registrar Producto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-full">
                <DialogHeader>
                    <DialogTitle>Registro de productos</DialogTitle>
                    <DialogDescription>
                        <Stepper value={step}>
                            {steps.map((label, index) => (
                                <StepperItem key={index} step={index + 1} className="not-last:flex-1">
                                    <StepperTrigger>
                                        <StepperIndicator asChild>{index + 1}</StepperIndicator>
                                    </StepperTrigger>
                                    {index < steps.length - 1 && <StepperSeparator />}
                                </StepperItem>
                            ))}
                        </Stepper>
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="proveedor">Proveedores</Label>
                        <Select onValueChange={(value) => {
                            setProveedor(value);
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
                )}

                {step === 2 && (
                    <div className="grid gap-4 py-4">
                        <Label>Tipo de Producto</Label>
                        <Select onValueChange={(value) => {
                            setTipoProducto(value);
                            setIsOtroTipo(value === "otro");
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {tipoProductos.map((prov) => (
                                    <SelectItem key={prov.id} value={prov.id.toString()}>
                                        {prov.nombre}
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
                )}

                {step === 3 && (
                    <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
                        {/* Mostrar el nombre del proveedor */}
                        {isOtroProveedor ? (
                            <div>
                                <Label>Proveedor Nuevo</Label>
                                <Input
                                    value={nombreProveedor || "Proveedor no seleccionado"}
                                    readOnly
                                />
                            </div>

                        ) : (
                            <div>
                                <Label>Proveedor Seleccionado</Label>
                                <Input
                                    value={proveedores.find((p) => p.id.toString() === proveedor)?.nombre || "Proveedor no seleccionado"}
                                    readOnly
                                />
                            </div>
                        )}

                        {isOtroTipo ? (
                            <div>
                                <Label>Nuevo Tipo de Producto</Label>
                                <Input
                                    value={nuevoTipo || "Tipo no seleccionado"}
                                    readOnly
                                />
                            </div>
                        ) : (
                            <div>
                                <Label>Tipo de Producto Seleccionado</Label>
                                <Input
                                    value={tipoProductos.find((t) => t.id.toString() === tipoProducto)?.nombre || "Tipo no seleccionado"}
                                    readOnly
                                />
                            </div>

                        )}
                        <div>
                            <Label>Registrar Producto</Label>
                            <Input
                                placeholder="Nombre del producto"
                                value={nombreProducto}
                                onChange={(e) => setNombreProducto(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Cantidad total</Label>
                            <Input
                                placeholder="Cantidad"
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label>Precio total de compra</Label>
                            <Input
                                placeholder="Precio"
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label>Calidad</Label>
                            <Input
                                placeholder="Calidad"
                                value={calidad}
                                onChange={(e) => setCalidad(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Marca</Label>
                            <Input
                                placeholder="Marca"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Fecha de compra</Label>
                            <Input
                                placeholder="Fecha de compra"
                                type="date"
                                value={new Date().toISOString().split("T")[0]} // Formatear la fecha a YYYY-MM-DD
                                onChange={(e) => setFechaCompra(e.target.value)} // Para actualizar el estado si es necesario
                            />
                        </div>
                        <Button onClick={handleFinalizar} disabled={isLoading || !nombreProducto || !cantidad || !precio}>
                            {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Finalizar"}
                        </Button>
                    </div>
                )}


                <DialogFooter>
                    {step > 1 && <Button onClick={prevStep} variant="outline">Atrás</Button>}
                    <Button onClick={nextStep} disabled={step >= steps.length}>
                        {step < steps.length ? "Siguiente" : null}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
