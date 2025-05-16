<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, type CheckboxRootProps } from "reka-ui";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconCheck } from "@/components/Icons.ts";

export interface IFieldCheckboxProps extends CheckboxRootProps {
	label?: string;
	boxLabel?: string;
}

defineProps<IFieldCheckboxProps>();
const model = defineModel<boolean>();
</script>

<template>
	<article class="flex flex-col gap-2.5">
		<FieldLabel :text="label" />
		<label class="flex flex-row gap-2 items-center cursor-pointer">
			<CheckboxRoot
				v-model="model"
				class="field-checkbox"
			>
				<CheckboxIndicator class="size-full rounded-md flex items-center justify-center">
					<IconCheck class="size-5 fill-sky-700" />
				</CheckboxIndicator>
			</CheckboxRoot>
			<span
				v-if="!!boxLabel"
				class="text-sm"
			>{{ boxLabel }}</span>
		</label>
	</article>
</template>
