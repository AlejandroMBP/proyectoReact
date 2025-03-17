import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Shield, LayoutGrid, Package, ShoppingCart, User, Box, Monitor, BatteryCharging, Package2, Phone, MapPin } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'usuarios',
        url: "/usuarios",
        icon: User,
    },
    {
        title: 'Roles y permisos',
        url: "/roles",
        icon: Shield,
    },
    {
        title: 'Almacen',
        url: "/almacen",
        icon: Package,
    },
    {
        title: 'ventas del dia',
        url: "/pedido",
        icon: ShoppingCart,
    },
    {
        title: 'prestamos',
        url: "#",
        icon: Box,
    },
];
const secondNavItems: NavItem[] = [
    {
        title: 'Pantallas',
        url: "/pantallas",
        icon: Monitor,
    },
    {
        title: 'Baterias',
        url: "#",
        icon: BatteryCharging,
    },
    {
        title: 'Otros',
        url: "",
        icon: Package2,
    },
]

const footerNavItems: NavItem[] = [
    {
        title: 'Contactos',
        url: '#',
        icon: Phone,
    },
    {
        title: 'Ubicacion',
        url: '#',
        icon: MapPin,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} titulo='Menu' />
                <hr className="my-2 border-t border-gray-300 dark:border-gray-700" />
                <NavMain items={secondNavItems} titulo='Tienda' />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
