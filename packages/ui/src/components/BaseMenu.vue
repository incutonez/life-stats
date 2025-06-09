<script setup lang="ts">
import { ref } from "vue";
import { MenubarContent, MenubarMenu, type MenubarMenuProps, MenubarPortal, MenubarRoot, MenubarTrigger } from "reka-ui";
import BaseButton, { type IBaseButtonProps } from "@/components/BaseButton.vue";

export interface IBaseMenuProps extends MenubarMenuProps {
	config: IBaseButtonProps;
}

defineProps<IBaseMenuProps>();
const currentMenu = ref("");
</script>

<template>
	<MenubarRoot v-model="currentMenu">
		<MenubarMenu :value="value || 'menu'">
			<MenubarTrigger>
				<BaseButton
					theme="info"
					v-bind="config"
				/>
			</MenubarTrigger>
			<MenubarPortal>
				<MenubarContent
					class="outline-none bg-white border shadow-lg z-1"
					align="start"
					:side-offset="2"
				>
					<slot name="items" />
				</MenubarContent>
			</MenubarPortal>
		</MenubarMenu>
	</MenubarRoot>
</template>
