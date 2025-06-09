<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import { IconSave } from "@/components/Icons.ts";
import { injectUserProfile } from "@/composables/app.ts";

const rootComponent = ref<InstanceType<typeof BaseDialog>>();
const { userProfile, updateSettings, updatingSettings } = injectUserProfile();

async function onClickSave() {
	await updateSettings();
	rootComponent.value!.toggle(false);
}
</script>

<template>
	<BaseDialog
		v-if="userProfile"
		ref="rootComponent"
		title="User Settings"
	>
		<template #content>
			<FieldNumber
				v-model="userProfile.settings.exercises.weight"
				label="Weight"
			/>
		</template>
		<template #footer>
			<BaseButton
				text="Save"
				:loading="updatingSettings"
				:icon="IconSave"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>
