<script setup lang="ts">
import FieldText from "@/components/FieldText.vue";
import type { IFieldTextEmit, IFieldTextProps } from "@/types/components.ts";

/* We have to redefine all of this because we want autocomplete, and Vue doesn't provide great support for extended
 * components */
const props = defineProps<IFieldTextProps>();
const valid = defineModel<boolean>("valid", {
	default: true,
});
defineEmits<IFieldTextEmit>();
const model = defineModel<number>();
</script>

<template>
	<FieldText
		v-bind="props"
		v-model.number="model"
		v-model:valid="valid"
		type="number"
	/>
</template>
