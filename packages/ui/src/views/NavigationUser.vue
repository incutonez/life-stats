<script setup lang="ts">
import { computed, unref } from "vue";
import { logOut } from "@/authentication.ts";
import BaseMenu from "@/components/BaseMenu.vue";
import BaseMenuItem from "@/components/BaseMenuItem.vue";
import { IconLogOut, IconMenu } from "@/components/Icons.ts";
import { injectUserProfile } from "@/composables/app.ts";

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
			</template>
		</BaseMenu>
	</article>
</template>
