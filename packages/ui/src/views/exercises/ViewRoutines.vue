<script setup lang="ts">
import { ref, unref } from "vue";
import type { RoutineViewModel } from "@incutonez/life-stats-spec";
import BaseButton from "@/components/BaseButton.vue";
import { IconAdd, IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useDateCreatedColumn, useDateUpdatedColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import { useDeleteRoutine, useGetRoutines } from "@/views/exercises/composables/routines.ts";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

const selectedRoutine = ref<RoutineViewModel>();
const showDelete = ref(false);
const { data } = useGetRoutines();
const { viewRoutine } = useExerciseRoutes();
const { deletingRoutine, deleteRoutine } = useDeleteRoutine();
const { table, search } = useTableData<RoutineViewModel>({
	data,
	columns: [useTableActions([{
		icon: IconEdit,
		handler(record) {
			viewRoutine(record.id!);
		},
	}, {
		icon: IconDelete,
		handler(record) {
			selectedRoutine.value = record;
			showDelete.value = true;
		},
	}]), {
		accessorKey: "name",
		header: "Name",

	}, useDateCreatedColumn(), useDateUpdatedColumn()],
});

function onClickAddRoutine() {
	viewRoutine();
}

async function onClickDelete() {
	const $selectedRoutine = unref(selectedRoutine);
	if ($selectedRoutine?.id) {
		await deleteRoutine($selectedRoutine.id);
	}
	showDelete.value = false;
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
					:icon="IconAdd"
					text="Routine"
					@click="onClickAddRoutine"
				/>
			</template>
		</TablePagination>
		<TableData
			:table="table"
			class="flex-1"
		/>
		<DeleteDialog
			v-model="showDelete"
			entity-name="this routine"
			:loading="deletingRoutine"
			@delete="onClickDelete"
		/>
		<RouterView />
	</article>
</template>
