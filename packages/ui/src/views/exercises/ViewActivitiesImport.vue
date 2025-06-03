<script setup lang="ts">
import { h, ref } from "vue";
import {
	EnumUnitTypes,
	type ExerciseActivityAttributeViewModel,
	type ExerciseActivityCreateViewModel,
} from "@incutonez/life-stats-spec";
import MimeTypes from "mime-types";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import { IconSave } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useDateColumn, useTableData } from "@/composables/table.ts";
import type { ITableData } from "@/types/components.ts";
import { downloadFile, getEnumDisplay, makeCSV } from "@/utils/common.ts";
import { numberToDisplay } from "@/utils/formatters.ts";
import { useImportActivities, useUploadActivities } from "@/views/exercises/composables/activities.ts";
import DialogEntityImport from "@/views/shared/DialogEntityImport.vue";

// TODOJEF: The issue I have is uploading and the values changing... I almost might want to shift the converting to the UI?
const addHeaders = ref(true);
const showingImport = ref(true);
const dialogCmp = ref<InstanceType<typeof BaseDialog>>();
const { importFile, uploadFile, uploadingFile } = useImportActivities();
const { addedRecords, addingRecords, createApplications } = useUploadActivities();
const { table } = useTableData<ExerciseActivityCreateViewModel>({
	data: addedRecords,
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
							const display: string[] = [getEnumDisplay(EnumUnitTypes, original.unitDisplay ?? original.unit)];
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

async function onClickImportButton() {
	addedRecords.value = await uploadFile();
	showingImport.value = false;
}

async function onClickSaveButton() {
	await createApplications();
	dialogCmp.value?.toggle(false);
}

function onChangeFile(importedFiles?: FileList) {
	importFile.value = importedFiles?.[0];
}

function onClickDownloadTemplate() {
	const csv = makeCSV();
	downloadFile(new Blob([csv], {
		type: MimeTypes.contentType("csv") || "text/csv",
	}), "template");
}

function onCloseDialog() {
	importFile.value = undefined;
	addedRecords.value = [];
	showingImport.value = true;
}
</script>

<template>
	<BaseDialog
		ref="dialogCmp"
		title="Import Activities"
		@close="onCloseDialog"
	>
		<template #content>
			<DialogEntityImport
				v-if="showingImport"
				v-model:add-headers="addHeaders"
				@changed-files="onChangeFile"
				@click-template="onClickDownloadTemplate"
			/>
			<TableData
				v-else
				class="max-h-[70vh] max-w-[90vw]"
				:table="table"
			/>
		</template>
		<template #footer>
			<BaseButton
				v-if="showingImport"
				text="Import"
				theme="info"
				:icon="IconSave"
				:loading="uploadingFile"
				:disabled="!importFile"
				@click="onClickImportButton"
			/>
			<BaseButton
				v-else
				text="Save"
				theme="info"
				:loading="addingRecords"
				:icon="IconSave"
				@click="onClickSaveButton"
			/>
		</template>
	</BaseDialog>
</template>
