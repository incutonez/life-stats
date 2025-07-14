/// <reference types="vite/client" />
import { RowData } from "@tanstack/vue-table";
import type { ITableCell, ITableHeader } from "@/types/components.ts";

declare module "@tanstack/vue-table" {
	interface ColumnMeta<TData extends RowData> {
		cellCls?: string | ((cell: ITableCell<TData>) => string);
		footerCls?: (header: ITableHeader<TData>) => string;
		/**
		 * If we want to let the column match its longest text, it's best to use the ColumnFitWidth var in constants.ts, and
		 * then set the table-layout to auto
		 * Source: https://stackoverflow.com/a/11267268/1253609
		 */
		columnWidth?: string;
		columnAlign?: "left" | "center" | "right";
		canClick?: boolean;
		onClickCell?: (cell: ITableCell<TData>) => void;
	}
}
