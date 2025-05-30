<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { IconCompanies } from "@/components/Icons.ts";
import { useJobRoutes } from "@/router/jobs.ts";

const { viewApplications } = useJobRoutes();

function onClickViewApplications() {
	viewApplications();
}
</script>

<template>
	<nav class="flex flex-col space-y-4 p-2 bg-slate-600">
		<BaseButton
			:icon="IconCompanies"
			title="Jobs"
			@click="onClickViewApplications"
		/>
	</nav>
</template>
