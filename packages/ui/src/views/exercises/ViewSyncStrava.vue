<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconAuthorize, IconSync } from "@/components/Icons.ts";
import { useStravaSync } from "@/views/exercises/composables/activities.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";

const urlParams = new URLSearchParams(location.hash);
const code = urlParams.get("code") ?? "";
const { viewActivities, viewStravaSync } = useExerciseRoutes();
const { syncStravaActivities, syncingRecords } = useStravaSync();

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
	await syncStravaActivities(code);
}

function onCloseDialog() {
	viewActivities();
}

if (code) {
	// Make sure we remove the code from the URL
	viewStravaSync();
}
</script>

<template>
	<BaseDialog
		title="Sync Strava"
		:model-value="true"
		body-class="flex flex-col"
		@close="onCloseDialog"
	>
		<template #content>
			<section class="flex items-center space-x-2">
				<FieldLabel text="Step 1" />
				<BaseButton
					:icon="IconAuthorize"
					text="Authorize"
					:disabled="!!code"
					@click="onClickAuthorize"
				/>
			</section>
			<section class="flex items-center space-x-2">
				<FieldLabel text="Step 2" />
				<BaseButton
					:icon="IconSync"
					:loading="syncingRecords"
					:disabled="!code"
					text="Sync"
					@click="onClickSync"
				/>
			</section>
		</template>
	</BaseDialog>
</template>
