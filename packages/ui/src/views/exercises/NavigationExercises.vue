<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { IconActivities, IconDownload, IconHistory } from "@/components/Icons.ts";
import { RouteExercisesActivities, RouteExercisesHistory, useExerciseRoutes } from "@/router/exercises.ts";
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
		<BaseButton
			:icon="IconDownload"
			text="Import"
			theme="navigation"
			@click="onClickImport"
		/>
		<ViewActivitiesImport
			v-if="showActivitiesImport"
			v-model="showActivitiesImport"
		/>
	</nav>
</template>
