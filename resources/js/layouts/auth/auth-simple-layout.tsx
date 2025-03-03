import AppLogoIcon from '@/components/app-logo-icon';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <BackgroundBeamsWithCollision>
            <div className="flex flex-col">
                <div className="text-center">
                    <Link href={route('home')} className="flex flex-col items-center gap-1 font-medium">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md">
                            <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>

                    <div className="space-y-1">
                        <h1 className="text-xl font-medium">{title}</h1>
                    </div>
                </div>
                {children}
            </div>
        </BackgroundBeamsWithCollision>

    );
}
