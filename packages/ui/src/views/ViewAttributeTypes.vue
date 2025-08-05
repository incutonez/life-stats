<script setup lang="ts">
import { ref } from "vue";
import { type AttributeTypeListViewModel, EnumFeatures } from "@incutonez/life-stats-spec";
import { IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useDeleteAttributeType, useListAttributeTypes } from "@/composables/attributeTypes.ts";
import { useAppRoutes } from "@/composables/routes.ts";
import { useDateCreatedColumn, useDateUpdatedColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { ColumnFitWidth } from "@/constants.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";
import FieldFeatures from "@/views/shared/FieldFeatures.vue";

const selectedFeature = ref(EnumFeatures.all);
const showDeleteError = ref(false);
const selectedRecord = ref<AttributeTypeListViewModel>();
const { viewAttributeType } = useAppRoutes();
const { attributeTypeRecords } = useListAttributeTypes(selectedFeature);
const { deletingAttributeType, deleteAttributeType } = useDeleteAttributeType();
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
				selectedRecord.value = record;
				showDeleteError.value = true;
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

async function onClickDelete() {
	await deleteAttributeType(selectedRecord.value?.id);
	showDeleteError.value = false;
}
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
		<DeleteDialog
			v-model="showDeleteError"
			body-class="!items-start"
			:loading="deletingAttributeType"
			@delete="onClickDelete"
		>
			<template #message>
				<div class="flex flex-col gap-4">
					<p>Deleting this Attribute Type will delete all associated Attributes.</p>
					<p>Are you sure you want to delete this Attribute Type?</p>
				</div>
			</template>
		</DeleteDialog>
	</article>
</template>
