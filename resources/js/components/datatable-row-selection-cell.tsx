import React from "react";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";

interface DatatableRowSelectionCellProps<TData> {
    row: Row<TData>;
}

export default function DatatableRowSelectionCell<TData>({
    row,
}: DatatableRowSelectionCellProps<TData>) {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    );
}
