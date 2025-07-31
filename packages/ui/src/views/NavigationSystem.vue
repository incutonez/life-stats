<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { IconAttributeTypes } from "@/components/Icons.ts";
import { useAppRoutes } from "@/composables/routes.ts";
import { RouteAttributeTypes } from "@/constants.ts";

const { viewAttributeTypes, isRouteSelected } = useAppRoutes();

function onClickViewAttributeTypes() {
	viewAttributeTypes();
}
</script>

<template>
	<nav>
		<BaseButton
			:icon="IconAttributeTypes"
			text="Attribute Types"
			theme="navigation"
			:aria-selected="isRouteSelected(RouteAttributeTypes)"
			@click="onClickViewAttributeTypes"
		/>
	</nav>
</template>
