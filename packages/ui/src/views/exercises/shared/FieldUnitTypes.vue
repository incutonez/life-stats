<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { UnitTypeOptions } from "@/views/exercises/constants.ts";
</script>

<template>
	<FieldComboBox
		value-field="id"
		display-field="display"
		label="Unit Type"
		:options="UnitTypeOptions"
	/>
</template>
