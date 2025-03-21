import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from "lucide-react";

interface DatatableColumnHeaderProps<TData, TValue> extends HtmlHTMLAttributes<HTMLDivElement> {
    title: string,
    column: Column<TData, TValue>;
}
export default function DatatableColumnHeader<TData, TValue>({
    title,
    column,
    className,
}: DatatableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="-ml-3 h-8 data-[state=open]:gb-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />Ascendente
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />Descendente
                    </DropdownMenuItem>
                    {column.getIsSorted() && (
                        <DropdownMenuItem onClick={() => column.clearSorting()}>
                            <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" /> Restablecer
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Ocultar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
