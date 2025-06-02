<script setup lang="ts">
import { h, ref } from "vue";
import type { ApplicationViewModel, CommentViewModel } from "@incutonez/life-stats-spec";
import MimeTypes from "mime-types";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import { IconDelete, IconSave } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useBulkApplications, useImportApplications } from "@/composables/applications.ts";
import { useDateColumn, useExpandableRow, useTableActions, useTableData } from "@/composables/table.ts";
import type { ISubRowRenderer, ITableData } from "@/types/components.ts";
import { downloadFile, makeCSV } from "@/utils/common.ts";
import DialogEntityImport from "@/views/shared/DialogEntityImport.vue";

const addHeaders = ref(true);
const showingImport = ref(true);
const dialogCmp = ref<InstanceType<typeof BaseDialog>>();
const { importFile, uploadApplications, uploadingFile } = useImportApplications();
const { addedApplications, addingApplications, createApplications } = useBulkApplications();
const { table } = useTableData<ApplicationViewModel>({
	data: addedApplications,
	canExpand(row) {
		return !!row.original.comments.length;
	},
	columns: [
		useExpandableRow(),
		useTableActions([{
			icon: IconDelete,
			handler(record) {
				// Must update the reference in order to trigger the data table reload
				addedApplications.value = addedApplications.value.filter((item) => item !== record);
			},
		}]), {
			accessorKey: "company.name",
			header: "Company",
		}, {
			accessorKey: "positionTitle",
			header: "Position",
		},
		useDateColumn("dateApplied", "Applied", "min-w-30 w-30"), {
			accessorKey: "url",
			header: "URL",
		}, {
			accessorKey: "compensation",
			header: "Compensation",
		},
	],
});

function renderCommentRows({ row }: ISubRowRenderer<ApplicationViewModel>) {
	const table = useTableData<CommentViewModel>({
		data: row.original.comments,
		columns: [{
			accessorKey: "comment",
		}],
	});

	return h<ITableData<CommentViewModel>>(TableData, {
		table: table.table,
		hideHeaders: true,
	});
}

console.log(addHeaders);

async function onClickImportButton() {
	addedApplications.value = await uploadApplications(addHeaders.value);
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
	addedApplications.value = [];
	showingImport.value = true;
}
</script>

<template>
	<BaseDialog
		ref="dialogCmp"
		title="Import Applications"
		@close="onCloseDialog"
	>
		<template #content>
			<DialogEntityImport
				v-if="showingImport"
				v-model:add-headers="addHeaders"
				show-template-button
				@changed-files="onChangeFile"
				@click-template="onClickDownloadTemplate"
			/>
			<TableData
				v-else
				class="max-h-[70vh] max-w-[90vw]"
				:table="table"
				:render-sub-rows="renderCommentRows"
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
				:loading="addingApplications"
				:icon="IconSave"
				@click="onClickSaveButton"
			/>
		</template>
	</BaseDialog>
</template>
