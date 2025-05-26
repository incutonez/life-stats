<script setup lang="ts">
import { MenubarItem, type MenubarItemProps } from "reka-ui";

export interface IBaseMenuItemProps extends MenubarItemProps {
	text?: string;
	icon?: object | string;
}

defineProps<IBaseMenuItemProps>();
</script>

<template>
	<MenubarItem class="text-sm text-gray-700 font-semibold flex space-x-1 items-center px-3 py-1.5 relative select-none outline-none data-[state=open]:bg-sky-200 data-[state=open]:text-black data-[highlighted]:bg-sky-200 data-[disabled]:opacity-60 data-[disabled]:pointer-events-none cursor-pointer">
		<slot>
			<Component
				:is="icon"
				v-if="!!icon"
				class="size-4"
			/>
			<span>{{ text }}</span>
		</slot>
	</MenubarItem>
</template>
