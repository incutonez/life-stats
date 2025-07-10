<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { useGetActionTypes } from "@/views/exercises/composables/activities.ts";

const { data } = useGetActionTypes();
</script>

<template>
	<FieldComboBox
		value-field="id"
		display-field="name"
		label="Action Type"
		:options="data ?? []"
		custom-value
	/>
</template>
