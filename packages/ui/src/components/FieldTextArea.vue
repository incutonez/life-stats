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
const emit = defineEmits<IFieldTextEmit<string>>();
const model = defineModel<string>({
	default: "",
});
const { wrapperClasses, onUpdateModel, inputEl } = useFieldText<HTMLTextAreaElement, string>({
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
				v-if="!!props.label"
				:text="props.label"
				v-bind="props.labelProps"
			/>
		</slot>
		<textarea
			ref="inputEl"
			v-model="model"
			class="field-text field-text-input h-16"
			v-bind="$attrs"
			@input="onUpdateModel"
		/>
	</article>
</template>
