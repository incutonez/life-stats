<script setup lang="ts">
import { EnumFeatures } from "@incutonez/life-stats-spec";
import FieldComboBox from "@/components/FieldComboBox.vue";
import { enumToOptions } from "@/utils/common.ts";

const options = enumToOptions(EnumFeatures);
</script>

<template>
	<FieldComboBox
		label="Feature"
		value-field="id"
		display-field="display"
		:options="options"
	/>
</template>
