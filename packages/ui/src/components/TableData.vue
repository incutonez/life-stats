<script setup lang="ts" generic="TData">
import { computed, useTemplateRef } from "vue";
import type { ComponentExposed } from "vue-component-type-helpers";
import { FlexRender } from "@tanstack/vue-table";
import { IconSort } from "@/components/Icons.ts";
import type TableData from "@/components/TableData.vue";
import type { ITableCell, ITableData, ITableHeader, ITableRow } from "@/types/components.ts";

/**
 * Apparently for generic components, you MUST use ComponentExposed if you'd like to ref it later on somewhere
 * Source: https://github.com/vuejs/language-tools/issues/3206
 */
export type TableDataComponent<TData> = ComponentExposed<typeof TableData<TData>>;

const { table, hideHeaders, rowCls, tableClasses = "", tableLayout = "table-fixed", isSubRow } = defineProps<ITableData<TData>>();
const DefaultCellCls = "table-data-cell border-r border-b px-2 py-1";
const rowBody = useTemplateRef<HTMLElement>("rowBody");
const tableCls = computed(() => {
	return {
		[tableLayout]: true,
		[tableClasses]: true,
	};
});

function getAlignment(columnAlign?: "left" | "center" | "right") {
	let cls = "text-left";
	switch (columnAlign) {
		case "center":
			cls = "text-center";
			break;
		case "right":
			cls = "text-right";
			break;
	}
	return cls;
}

function getHeaderClass(header: ITableHeader<TData>) {
	const meta = header.column.columnDef.meta;
	const cls = ["p-2 border-r border-b", isSubRow ? "" : "z-auto", getAlignment(meta?.columnAlign), meta?.columnWidth ?? "min-w-64"];
	if (header.column.getCanSort()) {
		cls.push("cursor-pointer select-none hover:bg-sky-200");
	}
	if (header.column.getIsSorted()) {
		cls.push("bg-sky-300");
	}
	else {
		cls.push("bg-gray-200");
	}
	return cls.join(" ");
}

function getCellClass(cell: ITableCell<TData>) {
	const { column } = cell;
	const { meta } = column.columnDef;
	const cls = [DefaultCellCls, getAlignment(meta?.columnAlign)];
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
	const cls = ["table-data-footer-cell z-1 p-2 border-r last:border-r-0 border-t sticky bottom-0", meta?.columnWidth ?? "min-w-64"];
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
	if (header.column.getIsSorted()) {
		return "italic";
	}
	return "";
}

function getSortIconCls({ column }: ITableHeader<TData>) {
	let cls = "";
	if (column.getIsSorted() === "asc") {
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

function processSubHeaders(headers: ITableHeader<TData>[], parentPlaceholder = false, rowSpan = 1) {
	headers.forEach((header) => {
		const response = processSubHeaders(header.subHeaders, header.isPlaceholder, rowSpan);
		if (parentPlaceholder) {
			rowSpan = response.rowSpan + 1;
			// We don't render children that are descendants of a placeholder... because the placeholder is rendered instead
			header.colSpan = 0;
			header.rowSpan = 0;
		}
		else {
			header.colSpan = response.colSpan;
			header.rowSpan = response.rowSpan;
		}
	});
	return {
		rowSpan,
		colSpan: headers.reduce((total, header) => total + header.colSpan, 0) || 1,
	};
}

const groups = computed(() => {
	const group = table.getHeaderGroups()[0];
	group.headers.forEach((header) => {
		const { rowSpan, colSpan } = processSubHeaders(header.subHeaders, header.isPlaceholder);
		header.rowSpan = rowSpan;
		header.colSpan = colSpan;
	});
	return table.getHeaderGroups();
});

defineExpose({
	rowBody,
});
</script>

<template>
	<article
		class="overflow-auto"
		:class="isSubRow ? '' : 'border'"
	>
		<table
			class="border-spacing-0 border-separate w-full"
			:class="tableCls"
		>
			<thead
				v-if="!hideHeaders"
				class="sticky top-0"
			>
				<tr
					v-for="headerGroup in groups"
					:key="headerGroup.id"
				>
					<template
						v-for="header in headerGroup.headers"
						:key="header.id"
					>
						<th
							v-if="header.colSpan"
							:colspan="header.colSpan"
							:rowspan="header.rowSpan"
							:class="getHeaderClass(header)"
							:title="getHeaderTitle(header)"
							@click="header.column.getToggleSortingHandler()?.($event)"
						>
							<div class="inline-flex">
								<span :class="getHeaderTextCls(header)">
									<FlexRender
										:render="header.column.columnDef.header"
										:props="header.getContext()"
									/>
								</span>
								<span
									v-if="header.column.getCanSort()"
									v-show="header.column.getIsSorted()"
									class="ml-auto"
									:class="getSortIconCls(header)"
								>
									<IconSort class="size-6" />
								</span>
							</div>
						</th>
					</template>
				</tr>
			</thead>
			<tbody ref="rowBody">
				<template
					v-for="row in table.getRowModel().rows"
					:key="row.id"
				>
					<tr
						:class="getRowClass(row)"
						class="table-row"
					>
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
