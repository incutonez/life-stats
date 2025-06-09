<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconAuthorize, IconSync } from "@/components/Icons.ts";
import { initStravaToken, stravaToken, useStravaSync } from "@/views/exercises/composables/activities.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";

const showSelf = ref(true);
const { viewActivities, viewStravaSync } = useExerciseRoutes();
const { syncStravaActivities, syncingRecords } = useStravaSync();

initStravaToken();

/**
 * Our hands are tied with Strava... we MUST redirect the user to their authorize endpoint, which gives us back a code
 * in the query string (if the user authorized our app).  We can then use the code to log into Strava with their token
 * endpoint, which returns an access_token and a refresh_token.  The access_token expires 6 hours after it's issued...
 * so before every request, check if expires_at < Date.now()... if so, use the logIn function below, but instead of
 * using grant_type authorization_code, use refresh_token and pass refresh_token instead of code... when that comes back
 * store the value like normal (including updated refresh_token and expires_at) and continue from there.
 */
async function onClickAuthorize() {
	window.location.href = `https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(location.href)}&scope=activity:read`;
}

async function onClickSync() {
	await syncStravaActivities();
	showSelf.value = false;
}

function onCloseDialog() {
	viewActivities();
}

if (stravaToken.value) {
	// Make sure we remove the code from the URL
	viewStravaSync();
}
</script>

<template>
	<BaseDialog
		v-model="showSelf"
		title="Sync Strava"
		body-class="flex flex-col space-y-2"
		@close="onCloseDialog"
	>
		<template #content>
			<section class="flex items-center space-x-2">
				<FieldLabel text="Step 1" />
				<BaseButton
					:icon="IconAuthorize"
					text="Authorize"
					:disabled="!!stravaToken"
					@click="onClickAuthorize"
				/>
			</section>
			<section class="flex items-center space-x-2">
				<FieldLabel text="Step 2" />
				<BaseButton
					:icon="IconSync"
					:loading="syncingRecords"
					:disabled="!stravaToken"
					text="Sync"
					@click="onClickSync"
				/>
			</section>
		</template>
	</BaseDialog>
</template>
