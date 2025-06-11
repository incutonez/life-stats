<script setup lang="ts">
import FieldDisplay from "@/components/FieldDisplay.vue";
import { numberToDisplay } from "@/utils/formatters.ts";

export interface ICellActivityDetailsProps {
	duration?: number;
	calories?: number;
	weightLost?: number;
}

defineProps<ICellActivityDetailsProps>();
</script>

<template>
	<article class="flex flex-col space-y-2">
		<FieldDisplay
			v-if="duration"
			label="Duration"
			class="w-max"
			label-align="top"
			:value="numberToDisplay(duration, 2, 'hours')"
		/>
		<FieldDisplay
			v-if="calories"
			label="Calories Burned"
			class="w-max"
			label-align="top"
			:value="numberToDisplay(calories)"
		/>
		<FieldDisplay
			v-if="weightLost"
			label="Weight Lost"
			class="w-max"
			label-align="top"
			:value="numberToDisplay(weightLost, 2, 'lbs')"
		/>
	</article>
</template>
