<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldDate from "@/components/FieldDate.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import { numberToDisplay } from "@/utils/formatters.ts";
import { injectActivityRecord } from "@/views/exercises/composables/activities.ts";
import { ActivitySourceOptions } from "@/views/exercises/constants.ts";
import FieldActivityTypes from "@/views/exercises/shared/FieldActivityTypes.vue";

const { viewRecord } = injectActivityRecord();
</script>

<template>
	<article class="flex gap-form">
		<section class="flex flex-col gap-form">
			<FieldText
				v-model="viewRecord.title"
				label="Title"
				label-align="top"
				autofocus
				required
			/>
			<FieldActivityTypes
				v-model="viewRecord.activityType"
				label="Type"
				label-align="top"
				required
			/>
			<FieldNumber
				v-model="viewRecord.weight"
				label="Weight (lbs)"
				label-align="top"
			/>
			<FieldText
				v-model="viewRecord.description"
				label="Description"
				label-align="top"
			/>
			<FieldDisplay
				v-if="viewRecord.calories"
				:value="numberToDisplay(viewRecord.calories)"
				label="Calories Burned"
				label-align="top"
			/>
		</section>
		<section class="flex flex-col space-y-form">
			<FieldDate
				v-model="viewRecord.dateOccurred"
				label="Date"
				label-align="top"
				class="self-start"
				required
			/>
			<FieldNumber
				v-model="viewRecord.duration"
				label="Duration (hours)"
				label-align="top"
			/>
			<FieldComboBox
				v-model="viewRecord.source"
				value-field="id"
				display-field="display"
				label="Source"
				label-align="top"
				value-only
				:options="ActivitySourceOptions"
			/>
			<FieldText
				v-if="!!viewRecord.source"
				v-model="viewRecord.sourceId"
				label="Source ID"
				label-align="top"
			/>
			<FieldDisplay
				v-if="viewRecord.weightLost"
				:value="numberToDisplay(viewRecord.weightLost, 2, 'lbs')"
				label="Weight Lost"
				label-align="top"
			/>
		</section>
	</article>
</template>
