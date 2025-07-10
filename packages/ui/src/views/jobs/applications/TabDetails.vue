<script setup lang="ts">
import FieldDate from "@/components/FieldDate.vue";
import FieldText from "@/components/FieldText.vue";
import { injectApplicationRecord } from "@/views/jobs/composables/applications.ts";
import FieldApplicationStatus from "@/views/jobs/shared/FieldApplicationStatus.vue";
import FieldCompanies from "@/views/jobs/shared/FieldCompanies.vue";
import FieldLocationTypes from "@/views/jobs/shared/FieldLocationTypes.vue";

const { viewRecord } = injectApplicationRecord();
</script>

<template>
	<article
		v-if="viewRecord"
		class="flex flex-col gap-form"
	>
		<section class="flex gap-form">
			<FieldCompanies
				v-model="viewRecord.company"
				label-align="top"
				custom-value
				required
				class="flex-1"
			/>
			<FieldText
				v-model="viewRecord.positionTitle"
				label="Position"
				label-align="top"
				wrapper-cls="flex-1"
				required
			/>
		</section>
		<section class="flex gap-form">
			<FieldApplicationStatus
				v-model="viewRecord.status"
				class="flex-1"
				required
			/>
			<div class="flex flex-1">
				<FieldDate
					v-model="viewRecord.dateApplied"
					label="Applied On"
					label-align="top"
					required
				/>
			</div>
		</section>
		<section class="flex gap-form">
			<FieldText
				v-model="viewRecord.compensation"
				label="Compensation"
				label-align="top"
				wrapper-cls="flex-1"
			/>
			<FieldLocationTypes
				v-model="viewRecord.locationType"
				class="flex-1"
				required
			/>
		</section>
		<FieldText
			v-model="viewRecord.url"
			label="URL"
			wrapper-cls="flex-1"
			label-align="top"
			required
		/>
	</article>
</template>
