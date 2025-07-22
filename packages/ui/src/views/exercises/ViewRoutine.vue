<script setup lang="ts">
import { computed, ref, unref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import FieldText from "@/components/FieldText.vue";
import { IconSave } from "@/components/Icons.ts";
import { RouteCreate } from "@/constants.ts";
import { getDialogTitle } from "@/utils/common.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import { useGetRoutine, useSaveRoutine } from "@/views/exercises/composables/routines.ts";
import ExerciseActions from "@/views/exercises/shared/ExerciseActions.vue";
import type { AllowedActionType } from "@/views/exercises/types.ts";

interface ViewRoutineProps {
	routineId: string;
	disableRouting?: boolean;
	actions?: AllowedActionType[];
}

const props = defineProps<ViewRoutineProps>();
const show = ref(true);
const { viewRoutines } = useExerciseRoutes();
const recordId = computed(() => props.routineId);
const { routineRecord } = useGetRoutine(recordId);
const { saveRoutine, savingRoutine } = useSaveRoutine();
const isEdit = computed(() => recordId.value !== RouteCreate);
const title = getDialogTitle(isEdit, "Routine");

function onClose() {
	if (props.disableRouting) {
		return;
	}
	viewRoutines();
}

async function onClickSave() {
	const $routineRecord = unref(routineRecord);
	if ($routineRecord) {
		await saveRoutine($routineRecord);
		show.value = false;
	}
}

watch(() => props.actions, ($actions) => {
	const $routineRecord = unref(routineRecord);
	if ($routineRecord && $actions) {
		$routineRecord.actions = $actions;
	}
}, {
	immediate: true,
});
</script>

<template>
	<BaseDialog
		v-if="!!routineRecord"
		v-model="show"
		:title="title"
		class="size-4/5"
		body-class="flex flex-col gap-form"
		@close="onClose"
	>
		<template #content>
			<FieldText
				v-model="routineRecord.name"
				autofocus
				required
				label="Name"
				wrapper-cls="self-start"
			/>
			<ExerciseActions
				v-model:records="routineRecord.actions"
				class="flex-1"
			>
				<template #beforeAdd>
					<FieldLabel
						text="Steps"
						class="mr-auto"
					/>
				</template>
			</ExerciseActions>
		</template>
		<template #footer>
			<BaseButton
				text="Save"
				:icon="IconSave"
				:loading="savingRoutine"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>
