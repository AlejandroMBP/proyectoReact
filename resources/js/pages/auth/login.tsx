import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Iniciar sesión" description="Ingresa tu correo y contraseña para acceder">
            <Head title="Iniciar sesión" />
            <div className="flex items-center justify-center py-10">
                <div className="flex w-full max-w-5xl bg-white dark:bg-sidebar shadow-xl rounded-2xl overflow-hidden">
                    <div className="hidden lg:flex w-1/2">
                        <img
                            src="/images/almacenVentas.jpg"
                            alt="Almacenes fondo"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Sección del formulario: Ocupa toda la pantalla en móviles y la mitad en pantallas grandes */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
                        <form className="w-full max-w-sm flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                {/* Correo */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Contraseña */}
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Contraseña</Label>
                                        {canResetPassword && (
                                            <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                                ¿Has olvidado tu contraseña?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Contraseña"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Recordar sesión */}
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} tabIndex={3} />
                                    <Label htmlFor="remember">Recordarme</Label>
                                </div>

                                {/* Botón de enviar */}
                                <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Iniciar sesión
                                </Button>
                            </div>

                            {/* Registro */}
                            <div className="text-muted-foreground text-center text-sm">
                                ¿No tienes una cuenta?{' '}
                                <TextLink href={route('register')} tabIndex={5}>
                                    Registrarse
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>


    );
}
