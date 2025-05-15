<script setup lang="ts" generic="TData">
/**
 * The virtualization for this component adds a bit more custom CSS, as it needs to know the heights and whatnot
 * Reference: https://tanstack.com/table/v8/docs/framework/vue/examples/virtualized-rows
 *
 * I don't necessarily like virtual scrolling, but I wanted to keep this component around as an example
 */
import { computed, ref } from "vue";
import { type Cell, type Column, FlexRender, type Header } from "@tanstack/vue-table";
import { useVirtualizer, type VirtualItem } from "@tanstack/vue-virtual";
import type { ITableData } from "@/types/components.ts";

const tableContainerRef = ref<HTMLDivElement | null>(null);
const { table } = defineProps<ITableData<TData>>();
const DefaultCellCls = "table-data-cell border-r border-b last:border-r-0 px-2 py-1";
const rows = computed(() => table.getRowModel().rows);
const rowVirtualizerOptions = computed(() => {
	return {
		count: rows.value.length,
		estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => tableContainerRef.value,
		overscan: 5,
	};
});
const rowVirtualizer = useVirtualizer(rowVirtualizerOptions);
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());
const tbodyStyle = computed(() => {
	return {
		height: `${totalSize.value}px`,
	};
});

function measureElement(el?: Element) {
	if (!el) {
		return;
	}

	rowVirtualizer.value.measureElement(el);

	return undefined;
}

function getHeaderClass(header: Header<TData, unknown>) {
	const cls = ["z-1 p-2 border-r last:border-r-0 border-b border-t sticky top-0", header.column.columnDef.meta?.columnWidth ?? ""];
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

function getRowStyle(row: VirtualItem) {
	return {
		transform: `translateY(${row.start}px)`,
	};
}

function getCellStyleWidth(column: Column<TData>) {
	return {
		width: `${column.getSize()}px`,
	};
}

function getCellClass(cell: Cell<TData, unknown>) {
	const cls = [DefaultCellCls, cell.column.columnDef.meta?.columnWidth ?? ""];
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

function getFooterClass(header: Header<TData, unknown>) {
	const meta = header.column.columnDef.meta;
	const cls = ["table-data-footer-cell z-1 p-2 border-r last:border-r-0 border-b border-t sticky bottom-0", meta?.columnWidth ?? "min-w-64"];
	if (meta?.footerCls) {
		cls.push(meta.footerCls(header));
	}
	return cls.join(" ");
}

function onClickCell(cell: Cell<TData, unknown>) {
	const onClickCellFn = cell.column.columnDef.meta?.onClickCell;
	if (onClickCellFn) {
		onClickCellFn(cell);
	}
}

</script>

<template>
	<article
		ref="tableContainerRef"
		class="size-full overflow-auto relative"
	>
		<table class="grid">
			<thead class="grid sticky top-0 z-1">
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
					class="flex w-full"
				>
					<th
						v-for="header in headerGroup.headers"
						:key="header.id"
						:style="getCellStyleWidth(header.column)"
						:class="getHeaderClass(header)"
					>
						<FlexRender
							:render="header.column.columnDef.header"
							:props="header.getContext()"
						/>
						<!-- TODOJEF: Add SortIcon here -->
					</th>
				</tr>
			</thead>
			<tbody
				class="grid relative"
				:style="tbodyStyle"
			>
				<tr
					v-for="row in virtualRows"
					:key="rows[row.index].id"
					:ref="measureElement"
					:data-index="row.index"
					class="flex absolute w-full"
					:style="getRowStyle(row)"
				>
					<td
						v-for="cell in rows[row.index].getVisibleCells()"
						:key="cell.id"
						:class="getCellClass(cell)"
						:style="getCellStyleWidth(cell.column)"
						@click="() => onClickCell(cell)"
					>
						<FlexRender
							:render="cell.column.columnDef.cell"
							:props="cell.getContext()"
						/>
					</td>
				</tr>
			</tbody>
			<tfoot v-if="showSummary">
				<tr
					v-for="footerGroup in table.getFooterGroups()"
					:key="footerGroup.id"
				>
					<th
						v-for="header in footerGroup.headers"
						:key="header.id"
						:style="getCellStyleWidth(header.column)"
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
