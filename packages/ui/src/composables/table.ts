import { h, isRef, ref, unref, type VNode, watch } from "vue";
import {
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useVueTable,
} from "@tanstack/vue-table";
import BaseButton from "@/components/BaseButton.vue";
import { IconDown, IconRight } from "@/components/Icons.ts";
import type {
	ITableAction,
	ITableCellContext,
	ITableColumn,
	IUseTableData,
	TTableExpandedState,
} from "@/types/components.ts";

export function useTableData<TData = unknown>({ data, columns, sortInitial, searchInitial = "", canExpand }: IUseTableData<TData>) {
	const sorting = ref(sortInitial);
	const search = ref(searchInitial);
	const expanded = ref<TTableExpandedState>({});
	const table = useVueTable({
		data,
		globalFilterFn: "includesString",
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getRowCanExpand: canExpand ?? (() => true),
		getSortedRowModel: getSortedRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		get columns() {
			return unref(columns);
		},
		state: {
			get globalFilter() {
				return search.value;
			},
			get sorting() {
				return sorting.value;
			},
			get expanded() {
				return expanded.value;
			},
		},
		onSortingChange(updater) {
			sorting.value = updater instanceof Function ? updater(sorting.value ?? []) : updater;
		},
		onGlobalFilterChange(updaterOrValue) {
			search.value = typeof updaterOrValue === "function" ? updaterOrValue(search.value) : updaterOrValue;
		},
		onExpandedChange(updaterOrValue) {
			expanded.value = typeof updaterOrValue === "function" ? updaterOrValue(expanded.value) : updaterOrValue;
		},
	});

	function getColumnSortIdentity(columnId: string) {
		let identity = 1;
		const $sorting = table.getState().sorting;
		if ($sorting) {
			identity = $sorting.find(({ id }) => id === columnId)?.desc ? 1 : -1;
		}
		return identity;
	}

	// Whenever the data changes, we have to make sure we reset the expanded state, as it could be invalid
	watch(isRef(data) ? data : () => data, () => table.resetExpanded());

	return {
		table,
		search,
		getColumnSortIdentity,
	};
}

export function useTableActions<T>(buttons: ITableAction<T>[]) {
	return {
		header: "Actions",
		meta: {
			columnWidth: "w-0",
			cellCls: "w-0",
		},
		cell(info: ITableCellContext<T>) {
			const children: VNode[] = [];
			for (const button of buttons) {
				const { canClick } = button;
				if (!canClick || canClick(info.row.original)) {
					children.push(h(BaseButton, {
						theme: "table",
						...button,
						onClick() {
							button.handler(info.row.original);
						},
					}));
				}
			}
			if (children.length) {
				return h("article", {
					class: "flex place-content-center",
				}, children);
			}
		},
	};
}

export function useExpandableRow<T>(): ITableColumn<T> {
	return {
		id: "expander",
		header: () => null,
		meta: {
			columnWidth: "w-0",
			cellCls: "w-12",
		},
		cell({ row }: ITableCellContext<T>) {
			if (row.getCanExpand()) {
				return h("article", {
					class: "flex place-content-center",
				}, [h(BaseButton, {
					icon: row.getIsExpanded() ? IconDown : IconRight,
					onClick: row.getToggleExpandedHandler(),
					theme: "table",
				})]);
			}
		},
	};
}
