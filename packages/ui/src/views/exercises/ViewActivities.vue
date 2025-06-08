<script setup lang="ts">
import { ref } from "vue";
import { type ExerciseActivityViewModel } from "@incutonez/life-stats-spec";
import BaseButton from "@/components/BaseButton.vue";
import { IconDelete, IconSync } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useTableActions, useTableData } from "@/composables/table.ts";
import { useDeleteActivity, useListActivities } from "@/views/exercises/composables/activities.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import { useActivitiesColumns } from "@/views/exercises/composables/table.ts";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

const selectedRecord = ref<ExerciseActivityViewModel>();
const showDeleteDialog = ref(false);
const { data } = useListActivities();
const { viewStravaSync } = useExerciseRoutes();
const { deleteRecord, deletingRecord } = useDeleteActivity();
// TODOJEF: Add edit and create action
const { table, search } = useTableData<ExerciseActivityViewModel>({
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

function onClickStravaSync() {
	viewStravaSync();
}
</script>

<template>
	<article class="size-full flex flex-col">
		<TablePagination
			v-model:search="search"
			:table="table"
		>
			<template #after-search>
				<BaseButton
					:icon="IconSync"
					text="Strava Sync"
					@click="onClickStravaSync"
				/>
			</template>
		</TablePagination>
		<TableData
			:table="table"
			class="flex-1"
			table-layout="table-auto"
		/>
		<DeleteDialog
			v-model="showDeleteDialog"
			entity-name="this activity"
			:loading="deletingRecord"
			@delete="onClickDelete"
		/>
		<RouterView />
	</article>
</template>
