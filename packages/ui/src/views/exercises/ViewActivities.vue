<script setup lang="ts">
import { ref } from "vue";
import { type ExerciseActivityViewModel } from "@incutonez/life-stats-spec";
import { IconDelete } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useTableActions, useTableData } from "@/composables/table.ts";
import { useDeleteActivity, useListActivities } from "@/views/exercises/composables/activities.ts";
import { useActivitiesColumns } from "@/views/exercises/composables/table.ts";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

const selectedRecord = ref<ExerciseActivityViewModel>();
const showDeleteDialog = ref(false);
const { data } = useListActivities();
const { deleteRecord, deletingRecord } = useDeleteActivity();
const { table } = useTableData<ExerciseActivityViewModel>({
	data,
	paginated: true,
	columns: [useTableActions([{
		icon: IconDelete,
		handler(record) {
			selectedRecord.value = record;
			showDeleteDialog.value = true;
		},
	}]), ...useActivitiesColumns<ExerciseActivityViewModel>()],
	sortInitial: [{
		desc: true,
		id: "dateOccurred",
	}],
});

async function onClickDelete() {
	await deleteRecord(selectedRecord.value);
	showDeleteDialog.value = false;
}
</script>

<template>
	<article class="size-full flex flex-col">
		<TablePagination :table="table" />
		<TableData
			:table="table"
			class="flex-1"
		/>
		<DeleteDialog
			v-model="showDeleteDialog"
			entity-name="this activity"
			:loading="deletingRecord"
			@delete="onClickDelete"
		/>
	</article>
</template>
