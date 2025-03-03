import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon, Monitor } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Selector de Tema  claro oscuro sistema*/}
            <div className="ml-auto flex items-center gap-2">
                <button
                    onClick={() => updateAppearance('light')}
                    className={`p-2 rounded-lg ${appearance === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                >
                    <Sun className="w-5 h-5" />
                </button>
                <button
                    onClick={() => updateAppearance('dark')}
                    className={`p-2 rounded-lg ${appearance === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                >
                    <Moon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => updateAppearance('system')}
                    className={`p-2 rounded-lg ${appearance === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                >
                    <Monitor className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
