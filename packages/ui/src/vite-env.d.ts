/// <reference types="vite/client" />
import { RowData } from "@tanstack/vue-table";
import type { ITableCell, ITableHeader } from "@/types/components.ts";

declare module "@tanstack/vue-table" {
	interface ColumnMeta<TData extends RowData> {
		cellCls?: string | ((cell: ITableCell<TData>) => string);
		footerCls?: (header: ITableHeader<TData>) => string;
		columnWidth?: string;
		columnAlign?: "left" | "center" | "right";
		canClick?: boolean;
		onClickCell?: (cell: ITableCell<TData>) => void;
	}
}
