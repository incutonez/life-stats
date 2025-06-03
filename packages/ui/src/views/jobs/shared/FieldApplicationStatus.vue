<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { ApplicationStatusOptions } from "@/enumOptions.ts";
</script>

<template>
	<FieldComboBox
		label="Status"
		label-align="top"
		value-field="id"
		display-field="display"
		combo-width="w-52"
		:value-only="true"
		:options="ApplicationStatusOptions"
	/>
</template>
