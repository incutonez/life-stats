import type { InputHTMLAttributes, MaybeRef, VNode } from "vue";
import type {
	Cell as ITanStackCell,
	CellContext as ITanStackCellContext,
	ColumnDef as ITanStackColumn, ExpandedState,
	Header as ITanStackHeader,
	Row as ITanStackRow,
	SortingState as ITanStackSort,
	Table as ITanStackTable,
} from "@tanstack/vue-table";
import type { AcceptableValue } from "reka-ui";
import type { IBaseButtonProps } from "@/components/BaseButton.vue";

export type ITable<TData = unknown> = ITanStackTable<TData>;

export type ITableRow<TData = unknown> = ITanStackRow<TData>;

export type ITableCell<TData = unknown, TValue = unknown> = ITanStackCell<TData, TValue>;

export type ITableCellContext<TData = unknown, TValue = unknown> = ITanStackCellContext<TData, TValue>;

export type ITableHeader<TData = unknown, TValue = unknown> = ITanStackHeader<TData, TValue>;

export type ITableColumn<TData = unknown> = ITanStackColumn<TData>;

export type ITableSort = ITanStackSort;

export type TLabelAlign = "left" | "top";

export type TTableExpandedState = ExpandedState;

export type TComboBoxValue = AcceptableValue;

export type TInputValue = string | number | null | undefined;

export interface IChangeEvent<T extends HTMLElement> extends Event {
	target: T;
}

export interface IUseTableData<TData = unknown> {
	data: MaybeRef<TData[] | undefined>;
	columns: MaybeRef<ITableColumn<TData>[]>;
	sortInitial?: ITableSort;
	searchInitial?: string;
	paginated?: boolean;
	canExpand?: (row: ITableRow<TData>) => boolean;
}

export interface ISubRowRenderer<TData = unknown> {
	row: ITableRow<TData>;
}

export interface ITableData<TData = unknown> {
	table: ITable<TData>;
	tableLayout?: "table-auto" | "table-fixed";
	tableClasses?: string;
	rowCls?: string | ((row: ITableRow<TData>) => string);
	hideHeaders?: boolean;
	showSummary?: boolean;
	isSubRow?: boolean;
	renderSubRows?: (props: ISubRowRenderer<TData>) => VNode;
}

export interface IFieldLabelProps {
	text?: string;
	separator?: string;
}

export interface ITableAction<T> extends IBaseButtonProps {
	handler: (record: T) => void;
	canClick?: (record: T) => boolean;
}

export interface IFieldTextProps extends /* @vue-ignore */ InputHTMLAttributes {
	label?: string;
	labelAlign?: TLabelAlign;
	labelProps?: IFieldLabelProps;
	wrapperCls?: string;
	delay?: number;
	// Because of the @vue-ignore above, we don't actually inherit type in our props, so we are forced to redefine it
	type?: InputHTMLAttributes["type"];
	selectOnFocus?: boolean;
}

export interface IFieldTextEmit {
	(event: "inputEnd", value?: TInputValue): void;
}

export interface IDialogEntityImportEmit {
	(event: "changedFiles", files?: FileList): void;
	(event: "clickTemplate"): void;
}

export interface IPluginPaste {
	company: string;
	positionTitle: string;
	dateApplied: number;
	url: string;
	compensation?: string;
}

export interface IFieldComboBoxProps<TData extends object> {
	valueField: string;
	displayField: string;
	/**
	 * true: v-model will be the value associated with the selection's valueField property
	 * false (default): v-model will be the object associated with the selection
	 */
	valueOnly?: boolean;
	/**
	 * true: Adds the ability to enter free-form text instead of enforcing selection
	 */
	customValue?: boolean;
	required?: boolean;
	options: TData[];
	label?: string;
	labelAlign?: TLabelAlign;
	comboWidth?: string;
	virtualScroll?: boolean;
}

export type IExtendedComboBox<T extends object> = Partial<IFieldComboBoxProps<T>>;

export interface IOption {
	id: number | string;
	display: string;
}
