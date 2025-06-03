<script setup lang="ts">
import { h } from "vue";
import {
	EnumUnitTypes,
	type ExerciseActivityAttributeViewModel,
	type ExerciseActivityViewModel,
} from "@incutonez/life-stats-spec";
import TableData from "@/components/TableData.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useDateColumn, useTableData } from "@/composables/table.ts";
import type { ITableData } from "@/types/components.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import { numberToDisplay } from "@/utils/formatters.ts";
import { useListActivities } from "@/views/exercises/composables/activities.ts";

const { data } = useListActivities();
const { table } = useTableData<ExerciseActivityViewModel>({
	data,
	paginated: true,
	columns: [
		useDateColumn("dateOccurred", "Date"), {
			accessorKey: "activityType.name",
			header: "Activity",
			meta: {
				columnWidth: "w-max",
				columnAlign: "center",
			},
		}, {
			accessorKey: "title",
			header: "Title",
		}, {
			accessorKey: "description",
			header: "Description",
		}, {
			accessorKey: "source",
			header: "Source",
		}, {
			accessorKey: "attributes",
			header: "Attributes",
			meta: {
				columnWidth: "w-100",
			},
			cell(info) {
				const attributes = info.getValue<ExerciseActivityAttributeViewModel[]>();
				const attributesTable = useTableData<ExerciseActivityAttributeViewModel>({
					data: attributes,
					sortInitial: [{
						desc: false,
						id: "attributeTypeName",
					}],
					columns: [{
						id: "attributeTypeName",
						accessorKey: "attributeType.name",
						header: "Attribute",
						meta: {
							columnWidth: "w-max",
						},
					}, {
						accessorKey: "value",
						header: "Value",
						meta: {
							columnWidth: "w-max",
						},
						cell(info) {
							const { original } = info.row;
							const display: string[] = [getEnumDisplay(EnumUnitTypes, original.unit)];
							const value = info.getValue<string>();
							const attributeType = original.attributeType.type;
							if (attributeType === "number") {
								display.unshift(numberToDisplay(value));
							}
							return display.join(" ");
						},
					}],
				});
				return h<ITableData<ExerciseActivityAttributeViewModel>>(TableData, {
					table: attributesTable.table,
					isSubRow: true,
					tableLayout: "table-auto",
				});
			},
		},
	],
	sortInitial: [{
		desc: true,
		id: "dateOccurred",
	}],
});
</script>

<template>
	<article class="size-full flex flex-col">
		<TablePagination :table="table" />
		<TableData
			:table="table"
			class="flex-1"
		/>
	</article>
</template>
