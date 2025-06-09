<script setup lang="ts">
import { computed, ref, unref } from "vue";
import { logOut } from "@/authentication.ts";
import BaseMenu from "@/components/BaseMenu.vue";
import BaseMenuItem from "@/components/BaseMenuItem.vue";
import { IconLogOut, IconMenu, IconSettings } from "@/components/Icons.ts";
import { injectUserProfile } from "@/composables/app.ts";
import ViewUserSettings from "@/views/ViewUserSettings.vue";

const showUserSettings = ref(false);
const { userProfile } = injectUserProfile();
const displayName = computed(() => {
	const $user = unref(userProfile);
	if (!$user) {
		return "";
	}
	return $user.nickname || $user.firstName;
});

function onClickLogOut() {
	logOut();
}

function onClickSettings() {
	showUserSettings.value = true;
}
</script>

<template>
	<article class="flex items-center space-x-2">
		<span class="text-sm font-semibold">Howdy {{ displayName }}!</span>
		<BaseMenu :config="{icon: IconMenu}">
			<template #items>
				<BaseMenuItem
					text="Log Out"
					:icon="IconLogOut"
					@click="onClickLogOut"
				/>
				<BaseMenuItem
					text="Settings"
					:icon="IconSettings"
					@click="onClickSettings"
				/>
			</template>
		</BaseMenu>
		<ViewUserSettings v-model="showUserSettings" />
	</article>
</template>
