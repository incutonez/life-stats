<script setup lang="ts" generic="TData">
import { computed } from "vue";
import { FlexRender } from "@tanstack/vue-table";
import { IconSort } from "@/components/Icons.ts";
import type { ITableCell, ITableData, ITableHeader, ITableRow } from "@/types/components.ts";

const { table, hideHeaders, rowCls, tableClasses = "" } = defineProps<ITableData<TData>>();
const DefaultCellCls = "table-data-cell border-r border-b last:border-r-0 px-2 py-1";
const tableCls = computed(() => {
	return {
		[tableClasses]: true,
		"border-t": hideHeaders,
	};
});

function getHeaderClass(header: ITableHeader<TData>) {
	const cls = ["z-1 p-2 border-r last:border-r-0 border-b border-y sticky top-0", header.column.columnDef.meta?.columnWidth ?? "min-w-64"];
	if (header.column.getCanSort()) {
		cls.push("cursor-pointer select-none hover:bg-blue-300");
	}
	if (header.column.getIsSorted()) {
		cls.push("bg-blue-400");
	}
	else {
		cls.push("bg-gray-300");
	}
	return cls.join(" ");
}

function getCellClass(cell: ITableCell<TData>) {
	const cls = [DefaultCellCls];
	const { column } = cell;
	const { meta } = column.columnDef;
	if (meta) {
		const { cellCls } = meta;
		if (cellCls) {
			if (typeof cellCls === "function") {
				cls.push(cellCls(cell));
			}
			else {
				cls.push(cellCls);
			}
		}
		if (meta.onClickCell) {
			cls.push("cursor-pointer hover:bg-blue-200");
		}
	}
	return cls.join(" ");
}

function getRowClass(row: ITableRow<TData>) {
	if (typeof rowCls === "function") {
		return rowCls(row);
	}
	return rowCls;
}

function getFooterClass(header: ITableHeader<TData>) {
	const meta = header.column.columnDef.meta;
	const cls = ["table-data-footer-cell z-1 p-2 border-r last:border-r-0 border-b border-t sticky bottom-0", meta?.columnWidth ?? "min-w-64"];
	if (meta?.footerCls) {
		cls.push(meta.footerCls(header));
	}
	return cls.join(" ");
}

function getHeaderTitle({ column }: ITableHeader<TData>) {
	let title;
	switch (column.getNextSortingOrder()) {
		case "asc":
			title = "Sort Ascending";
			break;
		case "desc":
			title = "Sort Descending";
			break;
		default:
			title = "Clear Sort";
	}
	return title;
}

function getHeaderTextCls(header: ITableHeader<TData>) {
	return header.column.getCanSort() ? "px-6" : "";
}

function getSortIconCls({ column }: ITableHeader<TData>) {
	let cls = "";
	const sortDir = column.getIsSorted();
	if (sortDir === "asc") {
		cls = "rotate-180 -scale-x-90";
	}
	return cls;
}

function onClickCell(cell: ITableCell<TData>) {
	const onClickCellFn = cell.column.columnDef.meta?.onClickCell;
	if (onClickCellFn) {
		onClickCellFn(cell);
	}
}
</script>

<template>
	<article class="overflow-auto size-full">
		<table
			class="border-spacing-0 border-separate w-full border-x"
			:class="tableCls"
		>
			<thead v-if="!hideHeaders">
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
				>
					<th
						v-for="header in headerGroup.headers"
						:key="header.id"
						:class="getHeaderClass(header)"
						:title="getHeaderTitle(header)"
						@click="header.column.getToggleSortingHandler()?.($event)"
					>
						<span :class="getHeaderTextCls(header)">
							<FlexRender
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</span>
						<span
							v-if="header.column.getCanSort()"
							v-show="header.column.getIsSorted()"
							class="absolute right-2"
							:class="getSortIconCls(header)"
						>
							<IconSort class="size-6" />
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				<template
					v-for="row in table.getRowModel().rows"
					:key="row.id"
				>
					<tr :class="getRowClass(row)">
						<td
							v-for="cell in row.getVisibleCells()"
							:key="cell.id"
							:class="getCellClass(cell)"
							@click="() => onClickCell(cell)"
						>
							<FlexRender
								:render="cell.column.columnDef.cell"
								:props="cell.getContext()"
							/>
						</td>
					</tr>
					<tr v-if="row.getIsExpanded() && renderSubRows">
						<td
							:colspan="row.getAllCells().length"
							class="border-b-2 border-t"
						>
							<Component :is="renderSubRows({row})" />
						</td>
					</tr>
				</template>
			</tbody>
			<tfoot v-if="showSummary">
				<tr
					v-for="footerGroup in table.getFooterGroups()"
					:key="footerGroup.id"
				>
					<th
						v-for="header in footerGroup.headers"
						:key="header.id"
						:class="getFooterClass(header)"
					>
						<FlexRender
							v-if="!header.isPlaceholder"
							:render="header.column.columnDef.footer"
							:props="header.getContext()"
						/>
					</th>
				</tr>
			</tfoot>
		</table>
	</article>
</template>
