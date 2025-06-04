<script setup lang="ts">
import type { CompanyViewModel } from "@incutonez/life-stats-spec";
import FieldComboBoxVirtual from "@/components/FieldComboBoxVirtual.vue";
import { getCompanyRecords } from "@/stores/companies.ts";
import { useAppSelector } from "@/stores/main.ts";
import type { IExtendedComboBox } from "@/types/components.ts";
import { useGetCompanies } from "@/views/jobs/composables/companies.ts";

defineProps<IExtendedComboBox<CompanyViewModel>>();
const companies = useAppSelector(getCompanyRecords);

useGetCompanies();
</script>

<template>
	<FieldComboBoxVirtual
		v-bind="$props"
		:options="companies"
		label="Company"
		display-field="name"
		value-field="id"
	/>
</template>
