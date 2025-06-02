<script setup lang="ts">
import { computed, unref } from "vue";
import { useRoute } from "vue-router";
import { isAuthenticated } from "@/authentication.ts";
import LoadingMask from "@/components/LoadingMask.vue";
import { useGlobalError } from "@/composables/app.ts";
import { RouteExercises } from "@/router/exercises.ts";
import { RouteJobs } from "@/router/jobs.ts";
import NavigationExercises from "@/views/exercises/NavigationExercises.vue";
import NavigationJobs from "@/views/jobs/NavigationJobs.vue";
import NavigationProducts from "@/views/NavigationProducts.vue";
import NavigationUser from "@/views/NavigationUser.vue";
import ErrorDialog from "@/views/shared/ErrorDialog.vue";

const route = useRoute();
const navigationComponent = computed(() => {
	const $route = unref(route);
	switch ($route.matched[0]?.name) {
		case RouteJobs:
			return NavigationJobs;
		case RouteExercises:
			return NavigationExercises;
	}
	return undefined;
});
useGlobalError();
</script>

<template>
	<template v-if="isAuthenticated">
		<NavigationProducts />
		<section class="flex-1 flex flex-col overflow-hidden">
			<section class="p-2 flex bg-slate-200 border-b items-center">
				<Component
					:is="navigationComponent"
					v-if="navigationComponent"
				/>
				<NavigationUser class="ml-auto" />
			</section>
			<main class="flex-1 overflow-hidden">
				<RouterView />
				<ErrorDialog />
			</main>
		</section>
		<LoadingMask />
	</template>
	<RouterView v-else />
</template>
