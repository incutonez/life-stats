<script setup lang="ts">
import { computed } from "vue";

export interface ICellLinkProps {
	text?: string;
	url: string;
	status: number;
}

const { url } = defineProps<ICellLinkProps>();
const isValid = computed(() => isValidHttpUrl(url));

function isValidHttpUrl(value: string) {
	let url;

	try {
		url = new URL(value);
	}
	catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
}
</script>

<template>
	<a
		v-if="isValid"
		:href="url"
		target="_blank"
		class="underline text-blue-600"
	>
		{{ text }}
	</a>
	<span v-else>{{ text }}</span>
</template>
