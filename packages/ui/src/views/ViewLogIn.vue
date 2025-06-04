<script setup lang="ts">
import { unref } from "vue";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import { setAccessToken } from "@/authentication.ts";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import { restoreRoute, RouteHome } from "@/constants.ts";

const { loginWithPopup } = useAuth0();
const router = useRouter();

async function viewRestoredRoute() {
	const $restoreRoute = unref(restoreRoute) ?? {
		name: RouteHome,
	};
	restoreRoute.value = undefined;
	return router.push($restoreRoute);
}

/**
 * We don't call this automatically because we get a pop-up blocked warning in the browser, but if the user initiates
 * the call to loginWithPopup (through a button click), then the warning doesn't show, which is what we want
 */
async function onClickShowLogIn() {
	await loginWithPopup();
	await setAccessToken();
	await viewRestoredRoute();
}
</script>

<template>
	<BaseDialog
		:model-value="true"
		title="Log In"
		:closable="false"
		class="size-64 view-log-in"
		body-class="p-4 items-center flex justify-center"
	>
		<template #content>
			<BaseButton
				text="Show Log In"
				@click="onClickShowLogIn"
			/>
		</template>
	</BaseDialog>
</template>
