<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { IconCompanies, IconHome } from "@/components/Icons.ts";
import LoadingMask from "@/components/LoadingMask.vue";
import { viewApplications, viewCompanies } from "@/router.ts";

function onClickViewApplications() {
	viewApplications();
}

function onClickViewCompanies() {
	viewCompanies();
}
</script>

<template>
	<nav class="flex flex-col space-y-4 p-2 bg-slate-600">
		<BaseButton
			:icon="IconHome"
			title="Applications"
			@click="onClickViewApplications"
		/>
		<BaseButton
			:icon="IconCompanies"
			title="Companies"
			@click="onClickViewCompanies"
		/>
	</nav>
	<main class="flex-1 overflow-hidden">
		<RouterView />
	</main>
	<LoadingMask />
</template>
