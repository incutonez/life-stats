<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { useGetRoutines } from "@/views/exercises/composables/routines.ts";

const { data } = useGetRoutines();
</script>

<template>
	<FieldComboBox
		value-field="id"
		display-field="name"
		:options="data ?? []"
	/>
</template>
