<script setup lang="ts">
import type { CompanyViewModel } from "@incutonez/job-applications-openapi";
import FieldComboBoxVirtual from "@/components/FieldComboBoxVirtual.vue";
import { useGetCompanies } from "@/composables/companies.ts";
import { getCompanyRecords } from "@/stores/companies.ts";
import { useAppSelector } from "@/stores/main.ts";
import type { IExtendedComboBox } from "@/types/components.ts";

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
