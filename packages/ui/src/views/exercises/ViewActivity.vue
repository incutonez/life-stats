<script setup lang="ts">
import { computed, reactive, ref, unref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseTabs from "@/components/BaseTabs.vue";
import { IconDelete, IconSave } from "@/components/Icons.ts";
import { injectUserProfile } from "@/composables/app.ts";
import type { IBaseTab } from "@/types/components.ts";
import TabActions from "@/views/exercises/activities/TabActions.vue";
import TabAttributes from "@/views/exercises/activities/TabAttributes.vue";
import TabDetails from "@/views/exercises/activities/TabDetails.vue";
import { provideActivityRecord, useDeleteActivity } from "@/views/exercises/composables/activities.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

interface IViewActivityProps {
	activityId: string;
}

const props = defineProps<IViewActivityProps>();
const show = ref(true);
const showDeleteDialog = ref(false);
const recordId = computed(() => props.activityId);
const { deletingRecord, deleteRecord } = useDeleteActivity();
const { save, savingRecord, viewRecord, isEdit } = provideActivityRecord(recordId);
const { viewActivities } = useExerciseRoutes();
const { userProfile } = injectUserProfile();
const dialogTitle = computed(() => isEdit.value ? "Edit Activity" : "Create Activity");
const tabs = reactive<IBaseTab[]>([{
	title: "Details",
	contentClasses: "p-form",
}, {
	title: "Steps",
	contentClasses: "overflow-hidden",
}, {
	title: "Attributes",
}]);

async function onClickSave() {
	await save();
	show.value = false;
}

function onClickDeleteButton() {
	showDeleteDialog.value = true;
}

async function onClickDelete() {
	await deleteRecord(viewRecord.value);
	show.value = false;
}

function onClose() {
	viewActivities();
}

watch(userProfile, ($userProfile) => {
	const $viewRecord = unref(viewRecord);
	if (!isEdit.value && $viewRecord && !$viewRecord.weight) {
		$viewRecord.weight = $userProfile?.settings.exercises.weight;
	}
});
</script>

<template>
	<BaseDialog
		v-if="!!viewRecord"
		v-model="show"
		:title="dialogTitle"
		body-padding=""
		class="size-4/5"
		@close="onClose"
	>
		<template #content>
			<BaseTabs
				:tabs="tabs"
				orientation="vertical"
			>
				<template #Details>
					<TabDetails />
				</template>
				<template #Steps>
					<TabActions />
				</template>
				<template #Attributes>
					<TabAttributes />
				</template>
			</BaseTabs>
		</template>
		<template #footer>
			<BaseButton
				v-if="isEdit"
				text="Delete"
				theme="danger"
				:loading="deletingRecord"
				:icon="IconDelete"
				@click="onClickDeleteButton"
			/>
			<BaseButton
				text="Save"
				theme="info"
				:loading="savingRecord"
				:icon="IconSave"
				@click="onClickSave"
			/>
			<DeleteDialog
				v-model="showDeleteDialog"
				entity-name="this activity"
				:loading="deletingRecord"
				@delete="onClickDelete"
			/>
		</template>
	</BaseDialog>
</template>
