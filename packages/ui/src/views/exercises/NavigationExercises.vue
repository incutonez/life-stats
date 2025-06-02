<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { IconActivities, IconHistory } from "@/components/Icons.ts";
import { RouteExercisesActivities, RouteExercisesHistory, useExerciseRoutes } from "@/router/exercises.ts";

const { isRouteSelected, viewHistory, ViewActivities } = useExerciseRoutes();

function onClickViewActivities() {
	ViewActivities();
}

function onClickHistory() {
	viewHistory();
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
	</nav>
</template>
