<script setup lang="ts">
import { computed, ref } from "vue";
import { type ActivityAttributeViewModel, EnumFeatures, EnumUnitTypes } from "@incutonez/life-stats-spec";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldText from "@/components/FieldText.vue";
import { IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useGetAttributeType } from "@/composables/attributeTypes.ts";
import { useAppRoutes } from "@/composables/routes.ts";
import { useDateColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { ColumnFitWidth } from "@/constants.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import { numberToDisplay } from "@/utils/formatters.ts";
import { useDeleteAttribute } from "@/views/exercises/composables/attributes.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import { RouteViewActivityTabs } from "@/views/exercises/constants.ts";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

interface ViewAttributeTypeProps {
	attributeTypeId: string;
}

const props = defineProps<ViewAttributeTypeProps>();
const show = ref(true);
const showDelete = ref(false);
const selectedRecord = ref<ActivityAttributeViewModel>();
const attributeTypeId = computed(() => props.attributeTypeId);
const { viewAttributeTypes } = useAppRoutes();
const { viewActivity } = useExerciseRoutes();
const { attributeTypeRecord, reloadAttributeType } = useGetAttributeType(attributeTypeId);
const attributeRecords = computed(() => attributeTypeRecord.value?.activityAttributes ?? []);
const { deleteAttribute, deletingAttribute } = useDeleteAttribute();
const attributesTable = useTableData<ActivityAttributeViewModel>({
	data: attributeRecords,
	columns: [useTableActions([{
		icon: IconEdit,
		title: "Edit Activity",
		handler(record) {
			const { activity } = record;
			if (activity) {
				viewActivity(activity.id!, RouteViewActivityTabs.attributes);
			}
		},
	}, {
		icon: IconDelete,
		title: "Delete Attribute",
		handler(record) {
			selectedRecord.value = record;
			showDelete.value = true;
		},
	}]), {
		accessorKey: "value",
		header: "Value",
		meta: {
			...ColumnFitWidth,
		},
		cell(info) {
			return numberToDisplay(info.getValue<string>(), 2, getEnumDisplay(EnumUnitTypes, info.row.original.unit));
		},
	}, {
		header: "Activity",
		meta: {
			columnAlign: "center",
		},
		columns: [{
			header: "Title",
			accessorFn(info) {
				return info.activity?.title;
			},
		}, {
			header: "Time",
			meta: {
				...ColumnFitWidth,
			},
			accessorFn(info) {
				return info.activity?.duration;
			},
			cell(info) {
				const value = info.getValue<number>();
				if (value) {
					return numberToDisplay(value, 2, "hours");
				}
			},
			// eslint-disable-next-line @incutonez/array-bracket-newline
		}, useDateColumn("activity.dateOccurred", "Date")],
	}],
});

async function onClickDelete() {
	await deleteAttribute(selectedRecord.value?.id);
	await reloadAttributeType();
	showDelete.value = false;
}

function onClose() {
	viewAttributeTypes();
}
</script>

<template>
	<BaseDialog
		v-if="attributeTypeRecord"
		v-model="show"
		title="Edit Attribute Type:"
		:subtitle="attributeTypeRecord.name"
		body-class="flex flex-col gap-form size-full"
		class="size-4/5"
		@close="onClose"
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
			<DeleteDialog
				v-model="showDelete"
				entity-name="this Attribute"
				:loading="deletingAttribute"
				@delete="onClickDelete"
			/>
		</template>
	</BaseDialog>
</template>
