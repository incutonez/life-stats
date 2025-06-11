<script setup lang="ts">
import { computed } from "vue";
import FieldLabel from "@/components/FieldLabel.vue";
import type { TLabelAlign } from "@/types/components.ts";
import { getLabelAlign } from "@/utils/common.ts";

export interface IFieldDisplayProps {
	value?: string;
	label?: string;
	labelAlign?: TLabelAlign;
}

const props = defineProps<IFieldDisplayProps>();

const componentClasses = computed(() => {
	return {
		[getLabelAlign(props.labelAlign ?? "left")]: true,
	};
});
</script>

<template>
	<article :class="componentClasses">
		<FieldLabel :text="label" />
		<span class="text-sm font-semibold">{{ value }}</span>
	</article>
</template>
