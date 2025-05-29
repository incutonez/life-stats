<script setup lang="ts">
import { computed, h, ref, useId } from "vue";
import type { ApplicationViewModel, CommentViewModel } from "@incutonez/job-applications-openapi";
import MimeTypes from "mime-types";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import { IconDelete, IconDownload, IconSave } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useBulkApplications, useImportApplications } from "@/composables/applications.ts";
import { useDateColumn, useExpandableRow, useTableActions, useTableData } from "@/composables/table.ts";
import type { ISubRowRenderer, ITableData } from "@/types/components.ts";
import { downloadFile, makeCSV } from "@/utils/common.ts";

// We use this to tie the field and label together, so when the user clicks in the label, it pops open the file input
const fileId = useId();
const hasDragOver = ref(false);
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
const cls = computed(() => {
	return {
		"!border-red-500": hasDragOver.value,
	};
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

async function onClickImportButton() {
	addedApplications.value = await uploadApplications(addHeaders.value);
	showingImport.value = false;
}

async function onClickSaveButton() {
	await createApplications();
	dialogCmp.value?.toggle(false);
}

function onChangeFile({ target }: Event) {
	importFile.value = (target as HTMLInputElement).files?.[0];
}

function onDrop({ dataTransfer }: DragEvent) {
	hasDragOver.value = false;
	importFile.value = dataTransfer?.files[0];
}

function onDragOver() {
	hasDragOver.value = true;
}

function onDragEnd() {
	hasDragOver.value = false;
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
			<article
				v-if="showingImport"
				class="flex flex-col space-y-2"
			>
				<section class="flex space-x-2 items-center">
					<BaseButton
						text="Template"
						title="Download CSV Template"
						:icon="IconDownload"
						@click="onClickDownloadTemplate"
					/>
					<FieldCheckbox
						v-model="addHeaders"
						box-label="Add Headers"
					/>
				</section>
				<label
					:for="fileId"
					class="flex flex-col border-2 cursor-default border-slate-700 rounded-md border-dashed p-4 items-center justify-center h-48 w-96 hover:border-red-600"
					:class="cls"
					@drop.prevent="onDrop"
					@dragover.prevent="onDragOver"
					@dragleave="onDragEnd"
				>
					<input
						:id="fileId"
						type="file"
						accept="text/csv"
						class="hidden"
						@change="onChangeFile"
					>
					<span class="text-sm font-semibold text-slate-700">Click or drag file here</span>
					<span
						v-if="importFile"
						class="text-sm"
					><span class="font-semibold">Selected:</span> {{ importFile.name }}</span>
				</label>
			</article>
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
