<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { IconCompanies, IconExercises, IconSettings } from "@/components/Icons.ts";
import { useAppRoutes } from "@/composables/routes.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes";
import { useJobRoutes } from "@/views/jobs/composables/routes.ts";

const { viewSystemSettings } = useAppRoutes();
const { viewApplications } = useJobRoutes();
const { viewExercises } = useExerciseRoutes();

function onClickViewApplications() {
	viewApplications();
}

function onClickViewExercises() {
	viewExercises();
}

function onClickViewSystemSettings() {
	viewSystemSettings();
}
</script>

<template>
	<nav class="flex flex-col space-y-4 p-2 bg-slate-600">
		<BaseButton
			:icon="IconCompanies"
			title="Jobs"
			@click="onClickViewApplications"
		/>
		<BaseButton
			title="Exercises"
			@click="onClickViewExercises"
		>
			<template #icon>
				<Component
					:is="IconExercises"
					class="-rotate-45"
				/>
			</template>
		</BaseButton>
		<BaseButton
			:icon="IconSettings"
			title="System Settings"
			@click="onClickViewSystemSettings"
		/>
	</nav>
</template>
