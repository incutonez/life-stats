<script setup lang="ts">
import { useIsFetching } from "@tanstack/vue-query";
import { IconLoading } from "@/components/Icons.ts";

const isLoading = useIsFetching();
</script>

<template>
	<Teleport to="body">
		<div
			v-if="!!isLoading"
			class="absolute inset-0 flex items-center justify-center loading-mask"
		>
			<IconLoading class="animate-spin" />
		</div>
	</Teleport>
</template>
