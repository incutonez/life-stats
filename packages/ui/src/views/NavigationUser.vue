<script setup lang="ts">
import { logOut, user } from "@/authentication.ts";
import BaseMenu from "@/components/BaseMenu.vue";
import BaseMenuItem from "@/components/BaseMenuItem.vue";
import { IconLogOut, IconMenu } from "@/components/Icons.ts";

function onClickLogOut() {
	logOut();
}
</script>

<template>
	<article class="flex items-center space-x-2">
		<span class="text-sm font-semibold">Howdy {{ user?.name }}!</span>
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
