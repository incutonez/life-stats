<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import { IconDownload } from "@/components/Icons.ts";
import type { IDialogEntityImportEmit } from "@/types/components.ts";

export interface IDialogEntityImportProps {
	showTemplateButton?: boolean;
}

defineProps<IDialogEntityImportProps>();
const emit = defineEmits<IDialogEntityImportEmit>();
const addHeaders = defineModel<boolean>("addHeaders", {
	default: true,
});
// We use this to tie the field and label together, so when the user clicks in the label, it pops open the file input
const fileId = useId();
const hasDragOver = ref(false);
const importedFiles = ref<FileList>();
const cls = computed(() => {
	return {
		"!border-red-500": hasDragOver.value,
	};
});

function onChangeFile({ target }: Event) {
	importedFiles.value = (target as HTMLInputElement).files ?? undefined;
}

function onDrop({ dataTransfer }: DragEvent) {
	hasDragOver.value = false;
	importedFiles.value = dataTransfer?.files;
}

function onDragOver() {
	hasDragOver.value = true;
}

function onDragEnd() {
	hasDragOver.value = false;
}

function onClickDownloadTemplate() {
	emit("clickTemplate");
}

watch(importedFiles, ($importedFiles) => emit("changedFiles", $importedFiles));
</script>

<template>
	<article class="flex flex-col space-y-2">
		<section class="flex space-x-2 items-center">
			<BaseButton
				v-if="showTemplateButton"
				text="Template"
				title="Download CSV Template"
				:icon="IconDownload"
				@click="onClickDownloadTemplate"
			/>
			<FieldCheckbox
				v-if="showTemplateButton"
				v-model="addHeaders"
				box-label="Add Headers"
			/>
		</section>
		<label
			:for="fileId"
			class="flex flex-col border-2 cursor-pointer border-slate-700 rounded-md border-dashed p-4 items-center justify-center h-48 w-96 hover:border-red-600"
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
				v-if="importedFiles"
				class="text-sm"
			>
				<span
					v-for="importedFile in importedFiles"
					:key="importedFile.name"
				>
					<span class="font-semibold">Selected:</span>
					<span>{{ importedFile.name }}</span>
				</span>
			</span>
		</label>
	</article>
</template>
