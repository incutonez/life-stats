<script setup lang="ts">
import { computed } from "vue";
import { toDate, toTime } from "@/utils/common.ts";

export interface ICellDateTimeProps {
	value?: number;
}

const { value = 0 } = defineProps<ICellDateTimeProps>();
const dateValue = computed(() => value && new Date(value));
const date = computed(() => toDate(dateValue.value));
const time = computed(() => toTime(dateValue.value));
</script>

<template>
	<div
		v-if="value"
		class="flex flex-col"
	>
		<span>{{ date }}</span>
		<span>{{ time }}</span>
	</div>
</template>
