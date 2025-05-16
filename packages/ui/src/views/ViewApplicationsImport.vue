<script setup lang="ts">
import { computed, ref, useId } from "vue";
import type { ApplicationViewModel } from "@incutonez/job-applications-openapi";
import MimeTypes from "mime-types";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import { IconDelete, IconDownload, IconSave } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useBulkApplications } from "@/composables/applications.ts";
import { useTableActions, useTableData } from "@/composables/table.ts";
import { csvToApplicationViewModel, downloadFile, makeCSV, readFile, toDate } from "@/utils/common.ts";

// We use this to tie the field and label together, so when the user clicks in the label, it pops open the file input
const fileId = useId();
const file = ref<File>();
const hasDragOver = ref(false);
const addHeader = ref(true);
const showingImport = ref(true);
const dialogCmp = ref<InstanceType<typeof BaseDialog>>();
const { addedApplications, addingApplications, createApplications } = useBulkApplications();
const { table } = useTableData<ApplicationViewModel>({
	data: addedApplications,
	columns: [
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
		}, {
			accessorKey: "dateApplied",
			header: "Applied",
			cell: (info) => toDate(info.getValue<number>()),
			meta: {
				columnWidth: "w-auto",
				cellCls: "text-center",
			},
		}, {
			accessorKey: "url",
			header: "URL",
		}, {
			accessorKey: "compensation",
			header: "Compensation",
			meta: {
				cellCls: "text-center",
			},
		},
	],
});
const cls = computed(() => {
	return {
		"!border-red-500": hasDragOver.value,
	};
});

async function onClickImportButton() {
	if (file.value) {
		const results = await readFile<string>(file.value);
		addedApplications.value = csvToApplicationViewModel(results, addHeader.value);
		showingImport.value = false;
	}
}

async function onClickSaveButton() {
	await createApplications();
	dialogCmp.value?.toggle(false);
}

function onChangeFile({ target }: Event) {
	file.value = (target as HTMLInputElement).files?.[0];
}

function onDrop({ dataTransfer }: DragEvent) {
	hasDragOver.value = false;
	file.value = dataTransfer?.files[0];
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
	file.value = undefined;
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
						v-model="addHeader"
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
						v-if="file"
						class="text-sm"
					><span class="font-semibold">Selected:</span> {{ file.name }}</span>
				</label>
			</article>
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
				:disabled="!file"
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
