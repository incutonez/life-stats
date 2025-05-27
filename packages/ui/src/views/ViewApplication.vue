<script setup lang="ts">
import { computed, ref, unref, watch } from "vue";
import type { CommentViewModel } from "@incutonez/job-applications-openapi";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDate from "@/components/FieldDate.vue";
import FieldText from "@/components/FieldText.vue";
import { IconAdd, IconDelete, IconEdit, IconSave } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { provideApplicationRecord, useDeleteApplication } from "@/composables/applications.ts";
import { useDateCreatedColumn, useDateUpdatedColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { viewApplicationParent } from "@/router.ts";
import { getUniqueId } from "@/utils/common.ts";
import ViewCommentDialog from "@/views/applications/ViewCommentDialog.vue";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";
import FieldApplicationStatus from "@/views/shared/FieldApplicationStatus.vue";
import FieldCompanies from "@/views/shared/FieldCompanies.vue";

export interface IViewApplicationProps {
	applicationId: string;
}

const props = defineProps<IViewApplicationProps>();
const open = ref(true);
const showCommentDialog = ref(false);
const selectedComment = ref<CommentViewModel>();
const comment = computed(() => selectedComment.value?.comment ?? "");
const applicationId = computed(() => props.applicationId);
const { viewRecord, save, pastedRecord, isEdit, savingApplication } = provideApplicationRecord(applicationId);
const showDelete = ref(false);
const { deleteApplication, deletingApplication } = useDeleteApplication();
const data = ref<CommentViewModel[]>([]);
const title = computed(() => isEdit.value ? "Edit Application" : "Add Application");
const { table } = useTableData<CommentViewModel>({
	data,
	columns: [useTableActions([{
		icon: IconEdit,
		handler(record) {
			selectedComment.value = record;
			showCommentDialog.value = true;
		},
	}, {
		icon: IconDelete,
		handler(record) {
			const { id } = record;
			const found = viewRecord.value!.comments.findIndex((item) => item.id === id);
			if (found >= 0) {
				viewRecord.value!.comments.splice(found, 1);
			}
		},
	}]), {
		accessorKey: "comment",
		header: "Name",
	}, useDateCreatedColumn(), useDateUpdatedColumn()],
});

function onCloseView() {
	pastedRecord.value = undefined;
	viewApplicationParent();
}

function onClickAddComment() {
	selectedComment.value = undefined;
	showCommentDialog.value = true;
}

function onClickUpdateComment(value: string) {
	const $viewRecord = unref(viewRecord);
	const $selectedComment = unref(selectedComment);
	if (!$viewRecord) {
		return;
	}
	if ($selectedComment) {
		const found = $viewRecord.comments.find(({ id }) => id === $selectedComment.id);
		if (found) {
			found.comment = value;
		}
	}
	else {
		$viewRecord.comments.push({
			comment: value,
			id: getUniqueId(),
			userId: "",
		});
	}
	showCommentDialog.value = false;
}

async function onClickSave() {
	await save();
	open.value = false;
}

function onClickDeleteButton() {
	showDelete.value = true;
}

async function onClickDelete() {
	await deleteApplication(viewRecord.value);
	open.value = false;
}

/**
 * TanStack Table uses a shallow ref for the data, so we have to create a new reference in order for it to update
 * Source: https://tanstack.com/table/latest/docs/framework/vue/guide/table-state#using-reactive-data
 */
watch(() => viewRecord.value?.comments, ($comments = []) => {
	data.value = [...$comments];
}, {
	immediate: true,
	deep: true,
});
</script>

<template>
	<BaseDialog
		v-if="viewRecord"
		v-model="open"
		:title="title"
		class="size-9/10"
		body-class="flex space-x-4"
		@close="onCloseView"
	>
		<template #content>
			<section class="flex flex-col space-y-4">
				<section class="flex space-x-4">
					<FieldCompanies
						v-model="viewRecord.company"
						label-align="top"
						:custom-value="true"
						class="w-48"
						required
					/>
					<FieldText
						v-model="viewRecord.positionTitle"
						label="Position"
						label-align="top"
						wrapper-cls="w-48"
						required
					/>
					<FieldDate
						v-model="viewRecord.dateApplied"
						label="Applied"
						label-align="top"
						required
					/>
				</section>
				<section class="flex space-x-4">
					<FieldText
						v-model="viewRecord.compensation"
						label="Compensation"
						label-align="top"
						wrapper-cls="w-48"
					/>
					<FieldApplicationStatus v-model="viewRecord.status" />
				</section>
				<FieldText
					v-model="viewRecord.url"
					label="URL"
					wrapper-cls="flex-1"
					label-align="top"
					required
				/>
			</section>
			<section class="flex flex-col space-y-2">
				<BaseButton
					text="Comment"
					class="self-start"
					theme="info"
					:icon="IconAdd"
					@click="onClickAddComment"
				/>
				<TableData
					class="flex-1"
					:table="table"
				/>
			</section>
			<ViewCommentDialog
				v-model="showCommentDialog"
				:comment="comment"
				@click:update="onClickUpdateComment"
			/>
			<DeleteDialog
				v-model="showDelete"
				entity-name="this application"
				:loading="deletingApplication"
				@delete="onClickDelete"
			/>
		</template>
		<template #footer>
			<BaseButton
				v-if="isEdit"
				text="Delete"
				:icon="IconDelete"
				theme="danger"
				:loading="deletingApplication"
				@click="onClickDeleteButton"
			/>
			<BaseButton
				text="Save"
				:icon="IconSave"
				theme="info"
				:loading="savingApplication"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>
