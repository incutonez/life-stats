<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { IconCompanies, IconDownload, IconHome } from "@/components/Icons.ts";
import LoadingMask from "@/components/LoadingMask.vue";
import { viewApplications, viewCompanies } from "@/router.ts";
import ViewApplicationsImport from "@/views/ViewApplicationsImport.vue";

const showImportDialog = ref(false);

function onClickViewApplications() {
	viewApplications();
}

function onClickViewCompanies() {
	viewCompanies();
}

function onClickImportApplications() {
	showImportDialog.value = true;
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
		<BaseButton
			:icon="IconDownload"
			title="Import"
			@click="onClickImportApplications"
		/>
	</nav>
	<main class="flex-1 overflow-hidden">
		<RouterView />
		<ViewApplicationsImport v-model="showImportDialog" />
	</main>
	<LoadingMask />
</template>
