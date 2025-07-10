<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "reka-ui";
import { IconHelp } from "@/components/Icons.ts";

interface ButtonHelpProps {
	content?: string;
}

defineProps<ButtonHelpProps>();
</script>

<template>
	<TooltipProvider :delay-duration="0">
		<TooltipRoot>
			<TooltipTrigger class="cursor-help inline-flex size-8 outline-none items-center justify-center bg-white">
				<IconHelp class="size-8 hover:fill-sky-700" />
			</TooltipTrigger>
			<TooltipPortal>
				<TooltipContent
					class="select-none rounded-md bg-white p-2 text-sm shadow-sm border z-1"
					:side-offset="5"
					avoid-collisions
					side="right"
				>
					<slot name="content">
						{{ content }}
					</slot>
					<TooltipArrow
						class="fill-white stroke-gray-500"
						:width="12"
						:height="6"
					/>
				</TooltipContent>
			</TooltipPortal>
		</TooltipRoot>
	</TooltipProvider>
</template>
