<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import BaseButton from "@/components/BaseButton.vue";
import { IconActivities, IconDownload, IconHistory } from "@/components/Icons.ts";
import { useExerciseRoutes } from "@/views/exercises/composables/routes.ts";
import { RouteExercisesActivities, RouteExercisesHistory } from "@/views/exercises/constants.ts";
import ViewActivitiesImport from "@/views/exercises/ViewActivitiesImport.vue";

const showActivitiesImport = ref(false);
const { isRouteSelected, viewHistory, ViewActivities } = useExerciseRoutes();
const urlParams = new URLSearchParams(location.hash);
const code = urlParams.get("code");

function onClickViewActivities() {
	ViewActivities();
}

function onClickHistory() {
	viewHistory();
}

function onClickImport() {
	showActivitiesImport.value = true;
}

/**
 * Our hands are tied with Strava... we MUST redirect the user to their authorize endpoint, which gives us back a code
 * in the query string (if the user authorized our app).  We can then use the code to log into Strava with their token
 * endpoint, which returns an access_token and a refresh_token.  The access_token expires 6 hours after it's issued...
 * so before every request, check if expires_at < Date.now()... if so, use the logIn function below, but instead of
 * using grant_type authorization_code, use refresh_token and pass refresh_token instead of code... when that comes back
 * store the value like normal (including updated refresh_token and expires_at) and continue from there.
 */
async function onClickImportStrava() {
	window.location.href = `https://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(location.href)}&scope=read`;
}

async function logIn() {
	if (code) {
		// TODOJEF: We'll want to store the access_token, refresh_token, and expires_at in localStorage probably
		// TODOJEF: I think this should be handled in the API because we don't want to expose our secret in the browser
		await axios({
			url: "https://www.strava.com/api/v3/oauth/token",
			method: "POST",
			params: {
				code,
				client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
				client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
				grant_type: "authorization_code",
			},
		});
	}
}

logIn();
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
		<BaseButton
			:icon="IconDownload"
			text="Import Strava"
			theme="navigation"
			@click="onClickImportStrava"
		/>
	</nav>
</template>
