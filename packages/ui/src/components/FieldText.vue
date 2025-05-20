<script setup lang="ts">
import { computed, ref } from "vue";
import FieldLabel from "@/components/FieldLabel.vue";
import type { IFieldTextEmit, IFieldTextProps, TInputValue } from "@/types/components.ts";
import { getLabelAlign } from "@/utils/common.ts";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<IFieldTextProps>();
const valid = defineModel<boolean>("valid", {
	default: true,
});
const emit = defineEmits<IFieldTextEmit>();
const [model, modelModifiers] = defineModel<TInputValue>();
const inputEl = ref<HTMLInputElement>();
let inputEndTimer: ReturnType<typeof setTimeout>;
const wrapperClasses = computed(() => {
	return {
		[props.wrapperCls ?? ""]: true,
		[getLabelAlign(props.labelAlign ?? "left")]: true,
	};
});

function updateValue(value: string) {
	let modelValue = value as TInputValue;

	if (modelModifiers.trim) {
		modelValue = value.trim();
	}
	if (modelModifiers.number) {
		modelValue = parseInt(value, 10);
		if (isNaN(modelValue)) {
			modelValue = undefined;
		}
	}
	model.value = modelValue;
}

function onFieldInput(event: Event) {
	const { value } = (event.target as HTMLInputElement);
	updateValue(value);
	valid.value = inputEl.value?.checkValidity() ?? false;
	clearTimeout(inputEndTimer);
	if (value) {
		inputEndTimer = setTimeout(() => emit("inputEnd", model.value), props.delay ?? 250);
	}
	else {
		emit("inputEnd", undefined);
	}
}

function onFieldFocus() {
	if (props.selectOnFocus) {
		inputEl.value?.select();
	}
}
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
			:value="model"
			v-bind="$attrs"
			:type="type"
			class="field-text field-text-input"
			@input="onFieldInput"
			@focus="onFieldFocus"
		>
	</article>
</template>
