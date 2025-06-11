<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldText from "@/components/FieldText.vue";
import { IconSave } from "@/components/Icons.ts";
import { injectActivityRecord } from "@/views/exercises/composables/activities.ts";
import FieldUnitTypes from "@/views/exercises/shared/FieldUnitTypes.vue";
import FieldAttributeTypes from "@/views/shared/FieldAttributeTypes.vue";

const rootComponent = ref<InstanceType<typeof BaseDialog>>();
const { selectedAttributeRecord: viewRecord, saveSelectedAttribute } = injectActivityRecord();

function onClickSave() {
	saveSelectedAttribute();
	rootComponent.value?.toggle(false);
}
</script>

<template>
	<BaseDialog
		v-if="viewRecord"
		ref="rootComponent"
		title="Attribute"
		body-class="gap-form flex flex-col"
	>
		<template #content>
			<section class="flex gap-form">
				<FieldAttributeTypes
					v-model="viewRecord.attributeType"
					label="Name"
					label-align="top"
					required
					auto-focus
				/>
				<FieldDisplay
					v-if="viewRecord.valueDisplay"
					:value="viewRecord.valueDisplay"
					label="Display Value"
					label-align="top"
				/>
			</section>
			<section class="flex gap-form">
				<FieldText
					v-model="viewRecord.value"
					label="Value"
					required
					label-align="top"
				/>
				<FieldUnitTypes
					v-model="viewRecord.unit"
					label-align="top"
					required
					value-only
				/>
			</section>
		</template>
		<template #footer>
			<BaseButton
				text="Save"
				:icon="IconSave"
				theme="info"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>
