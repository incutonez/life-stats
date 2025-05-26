<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import { IconDownload, IconJobApplications, IconJobCompanies } from "@/components/Icons.ts";
import { RouteApplications, RouteCompanies, viewApplications, viewCompanies } from "@/router.ts";
import ViewApplicationsImport from "@/views/ViewApplicationsImport.vue";

const route = useRoute();
const showImportDialog = ref(false);
const selectedApplications = computed(() => route.matched[0]?.name === RouteApplications);
const selectedCompanies = computed(() => route.matched[0]?.name === RouteCompanies);

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
	<nav class="flex space-x-4">
		<BaseButton
			:icon="IconJobApplications"
			text="Applications"
			theme="navigation"
			:aria-selected="selectedApplications"
			@click="onClickViewApplications"
		/>
		<BaseButton
			:icon="IconJobCompanies"
			text="Companies"
			theme="navigation"
			:aria-selected="selectedCompanies"
			@click="onClickViewCompanies"
		/>
		<BaseButton
			:icon="IconDownload"
			text="Import"
			theme="navigation"
			@click="onClickImportApplications"
		/>
		<ViewApplicationsImport
			v-if="showImportDialog"
			v-model="showImportDialog"
		/>
	</nav>
</template>
