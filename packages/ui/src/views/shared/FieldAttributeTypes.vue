<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { useGetExerciseAttributeTypes } from "@/composables/attributeTypes.ts";

const { data } = useGetExerciseAttributeTypes();
</script>

<template>
	<FieldComboBox
		value-field="id"
		display-field="name"
		custom-value
		:options="data ?? []"
	/>
</template>
