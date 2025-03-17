
import React from "react";
import { Table } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { Value } from "@radix-ui/react-select";

interface DatatableRowSelectionHeaderProps<TData> {
    table: Table<TData>;
}
export default function DatatableRowSelectionHeader<TData>({
    table,
}: DatatableRowSelectionHeaderProps<TData>) {
    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Select all"
        />
    );
}
