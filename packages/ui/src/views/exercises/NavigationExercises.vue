<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { IconActivities, IconDownload, IconHistory } from "@/components/Icons.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import { RouteExercisesActivities, RouteExercisesHistory } from "@/views/exercises/constants.ts";
import ViewActivitiesImport from "@/views/exercises/ViewActivitiesImport.vue";

const showActivitiesImport = ref(false);
const { isRouteSelected, viewHistory, ViewActivities } = useExerciseRoutes();

function onClickViewActivities() {
	ViewActivities();
}

function onClickHistory() {
	viewHistory();
}

function onClickImport() {
	showActivitiesImport.value = true;
}
</script>

<template>
	<nav class="flex space-x-4">
		<BaseButton
			text="Activities"
			theme="navigation"
			:icon="IconActivities"
			:aria-selected="isRouteSelected(RouteExercisesActivities)"
			@click="onClickViewActivities"
		/>
		<BaseButton
			:icon="IconHistory"
			text="History"
			theme="navigation"
			:aria-selected="isRouteSelected(RouteExercisesHistory)"
			@click="onClickHistory"
		/>
		<ViewActivitiesImport
			v-if="showActivitiesImport"
			v-model="showActivitiesImport"
		/>
		<BaseButton
			:icon="IconDownload"
			text="Import"
			theme="navigation"
			@click="onClickImport"
		/>
	</nav>
</template>
