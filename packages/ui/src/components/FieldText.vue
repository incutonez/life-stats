<script setup lang="ts">
import FieldLabel from "@/components/FieldLabel.vue";
import { useFieldText } from "@/composables/fields.ts";
import type { IFieldTextEmit, IFieldTextProps } from "@/types/components.ts";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<IFieldTextProps>();
const valid = defineModel<boolean>("valid", {
	default: true,
});
const emit = defineEmits<IFieldTextEmit>();
const model = defineModel<string>({
	default: "",
});
const { wrapperClasses, onUpdateModel, inputEl } = useFieldText<HTMLInputElement>({
	props,
	valid,
	emit,
	model,
});
</script>

<template>
	<article :class="wrapperClasses">
		<slot name="label">
			<FieldLabel
				v-if="!!label"
				:text="label"
				v-bind="labelProps"
			/>
		</slot>
		<input
			ref="inputEl"
			v-model="model"
			v-bind="$attrs"
			class="field-text field-text-input"
			@input="onUpdateModel"
		>
	</article>
</template>
