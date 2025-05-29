<script setup lang="ts">
import { computed } from "vue";
import { toDate, toTime } from "@/utils/common.ts";

export interface ICellDateTimeProps {
	value: number;
}

const { value } = defineProps<ICellDateTimeProps>();
const dateValue = computed(() => new Date(value));
const date = computed(() => toDate(dateValue.value));
const time = computed(() => toTime(dateValue.value));
</script>

<template>
	<div class="flex flex-col">
		<span>{{ date }}</span>
		<span>{{ time }}</span>
	</div>
</template>
