<script setup lang="ts">
import { computed, h, ref, unref, watch } from "vue";
import type { CommentViewModel } from "@incutonez/life-stats-spec";
import BaseButton from "@/components/BaseButton.vue";
import { IconAdd, IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useDateCreatedColumn, useDateUpdatedColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { getUniqueId } from "@/utils/common.ts";
import ViewCommentDialog from "@/views/jobs/applications/ViewCommentDialog.vue";
import { injectApplicationRecord } from "@/views/jobs/composables/applications.ts";

const { viewRecord } = injectApplicationRecord();
const data = ref<CommentViewModel[]>([]);
const selectedComment = ref<CommentViewModel>();
const showCommentDialog = ref(false);
const comment = computed(() => selectedComment.value?.comment ?? "");
const commentsTable = useTableData<CommentViewModel>({
	data,
	sortInitial: [{
		id: "dateCreated",
		desc: true,
	}],
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
		header: "Comment",
		cell(info) {
			return h("pre", {
				class: "whitespace-break-spaces",
			}, info.getValue<string>());
		},
	}, useDateCreatedColumn(), useDateUpdatedColumn()],
});

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
			applicationId: "",
		});
	}
	showCommentDialog.value = false;
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
	<BaseButton
		text="Comment"
		class="self-start ml-2"
		theme="info"
		:icon="IconAdd"
		@click="onClickAddComment"
	/>
	<TableData
		class="flex-1 border-0 border-t"
		:table="commentsTable.table"
	/>
	<ViewCommentDialog
		v-model="showCommentDialog"
		:comment="comment"
		@click:update="onClickUpdateComment"
	/>
</template>
