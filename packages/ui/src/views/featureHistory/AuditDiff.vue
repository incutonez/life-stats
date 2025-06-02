<script setup lang="ts">
import { computed } from "vue";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

export interface IAuditPayloadProps {
	value: unknown;
}

hljs.registerLanguage("json", json);

const { value } = defineProps<IAuditPayloadProps>();
const display = computed(() => hljs.highlight(JSON.stringify(value, null, 2), {
	language: "json",
}).value);
</script>

<template>
	<article>
		<pre
			class="text-sm whitespace-break-spaces"
			v-html="display"
		/>
	</article>
</template>
