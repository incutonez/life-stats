<script setup lang="ts">
import { isAuthenticated } from "@/authentication.ts";
import LoadingMask from "@/components/LoadingMask.vue";
import { useGlobalError } from "@/composables/app.ts";
import NavigationJobs from "@/views/applications/NavigationJobs.vue";
import NavigationProducts from "@/views/NavigationProducts.vue";
import NavigationUser from "@/views/NavigationUser.vue";
import ErrorDialog from "@/views/shared/ErrorDialog.vue";

useGlobalError();
</script>

<template>
	<template v-if="isAuthenticated">
		<NavigationProducts />
		<section class="flex-1 flex flex-col overflow-hidden">
			<section class="p-2 flex bg-slate-200 border-b items-center">
				<NavigationJobs />
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
