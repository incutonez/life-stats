<script setup lang="ts">
import { computed, ref } from "vue";
import { type ActivityAttributeViewModel, EnumFeatures, EnumUnitTypes } from "@incutonez/life-stats-spec";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldText from "@/components/FieldText.vue";
import TableData from "@/components/TableData.vue";
import { useGetAttributeType } from "@/composables/attributeTypes.ts";
import { useDateColumn, useTableData } from "@/composables/table.ts";
import { ColumnFitWidth } from "@/constants.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import { numberToDisplay } from "@/utils/formatters.ts";

interface ViewAttributeTypeProps {
	attributeTypeId: string;
}

const props = defineProps<ViewAttributeTypeProps>();
const show = ref(true);
const attributeTypeId = computed(() => props.attributeTypeId);
const { attributeTypeRecord } = useGetAttributeType(attributeTypeId);
const attributeRecords = computed(() => attributeTypeRecord.value?.activityAttributes ?? []);
const attributesTable = useTableData<ActivityAttributeViewModel>({
	data: attributeRecords,
	// TODOJEF: Add deleting attributeType here
	columns: [{
		accessorKey: "activity.title",
		header: "Activity Name",
	}, {
		accessorKey: "value",
		header: "Value",
		meta: {
			...ColumnFitWidth,
		},
		cell(info) {
			return numberToDisplay(info.getValue<string>(), 2, getEnumDisplay(EnumUnitTypes, info.row.original.unit));
		},
	}, {
		accessorKey: "activity.duration",
		header: "Time",
		meta: {
			...ColumnFitWidth,
		},
		cell(info) {
			return numberToDisplay(info.getValue<number>(), 2, "hours");
		},
		// eslint-disable-next-line @incutonez/array-bracket-newline
	}, useDateColumn("activity.dateOccurred", "Date")],
});
</script>

<template>
	<BaseDialog
		v-if="attributeTypeRecord"
		v-model="show"
		title="Edit Attribute Type:"
		:subtitle="attributeTypeRecord.name"
		body-class="flex flex-col gap-form"
		class="size-4/5"
	>
		<template #content>
			<section class="flex gap-form">
				<FieldText
					v-model="attributeTypeRecord.name"
					label="Name"
					autofocus
					label-align="top"
				/>
				<FieldDisplay
					label="Feature"
					:value="getEnumDisplay(EnumFeatures, attributeTypeRecord.feature)"
					label-align="top"
				/>
			</section>
			<TableData
				class="flex-1"
				:table="attributesTable.table"
				table-layout="table-auto"
			/>
		</template>
	</BaseDialog>
</template>
