<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { RoutineViewModel } from "@incutonez/life-stats-spec";
import BaseButton from "@/components/BaseButton.vue";
import ButtonHelp from "@/components/ButtonHelp.vue";
import { IconAdd } from "@/components/Icons.ts";
import { RouteCreate } from "@/constants.ts";
import { injectActivityRecord } from "@/views/exercises/composables/activities.ts";
import ExerciseActions from "@/views/exercises/shared/ExerciseActions.vue";
import FieldRoutines from "@/views/exercises/shared/FieldRoutines.vue";
import ViewRoutine from "@/views/exercises/ViewRoutine.vue";

const showDialogRoutine = ref(false);
const selectedRoutine = ref<RoutineViewModel>();
const { viewRecord } = injectActivityRecord();
const data = computed({
	get() {
		return viewRecord.value.actions ?? [];
	},
	set(rows) {
		viewRecord.value.actions = rows;
	},
});

function onClickAddRoutine() {
	showDialogRoutine.value = true;
}

watch(selectedRoutine, ($selectedRoutine) => {
	if ($selectedRoutine?.id) {
		data.value = $selectedRoutine.actions;
	}
});
</script>

<template>
	<article class="size-full flex">
		<ExerciseActions
			v-model:records="data"
			class="flex-1"
			is-tab
		>
			<template #beforeAdd>
				<ButtonHelp
					trigger-classes="mr-auto"
					content="Steps are the overall plan/routine of the activity... e.g. 25 pushups, 10 superman, etc."
				/>
				<FieldRoutines
					v-model="selectedRoutine"
					placeholder="Use Routine's Steps"
				/>
				<BaseButton
					text="Routine"
					title="Create Routine from Steps"
					:icon="IconAdd"
					theme="info"
					:disabled="!data.length"
					@click="onClickAddRoutine"
				/>
			</template>
		</ExerciseActions>
		<ViewRoutine
			v-model="showDialogRoutine"
			:routine-id="RouteCreate"
			:actions="data"
			disable-routing
		/>
	</article>
</template>
