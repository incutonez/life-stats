<script setup lang="ts">
import { ref } from "vue";
import { type AttributeTypeListViewModel, EnumFeatures } from "@incutonez/life-stats-spec";
import { IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useListAttributeTypes } from "@/composables/attributeTypes.ts";
import { useAppRoutes } from "@/composables/routes.ts";
import { useDateCreatedColumn, useDateUpdatedColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { ColumnFitWidth } from "@/constants.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import FieldFeatures from "@/views/shared/FieldFeatures.vue";

const selectedFeature = ref(EnumFeatures.all);
const { viewAttributeType } = useAppRoutes();
const { attributeTypeRecords } = useListAttributeTypes(selectedFeature);
const { table } = useTableData<AttributeTypeListViewModel>({
	data: attributeTypeRecords,
	columns: [
		useTableActions([{
			icon: IconEdit,
			handler(record) {
				viewAttributeType(record.id!);
			},
		}, {
			icon: IconDelete,
			handler(record) {
				if (record.attributes) {
				// TODOJEF: Show warning that this can't be deleted because it has associated attributes
				}
			},
		}]), {
			accessorKey: "name",
			header: "Name",
		}, {
			accessorKey: "feature",
			header: "Feature",
			meta: {
				...ColumnFitWidth,
			},
			cell(info) {
				const value = getEnumDisplay(EnumFeatures, info.getValue<EnumFeatures>());
				if (value) {
					return value;
				}
				return "None";
			},
		}, {
			accessorKey: "attributes",
			header: "Total Attributes",
			meta: {
				...ColumnFitWidth,
			},
		},
		useDateCreatedColumn(),
		useDateUpdatedColumn(),
	],
});
</script>

<template>
	<article class="size-full flex flex-col">
		<section class="flex border-x p-2">
			<FieldFeatures
				v-model="selectedFeature"
				value-only
				required
			/>
		</section>
		<TableData
			:table="table"
			class="flex-1"
			table-layout="table-auto"
		/>
		<RouterView />
	</article>
</template>
