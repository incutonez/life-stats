<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { useGetActivityTypes } from "@/views/exercises/composables/activities.ts";

const { data } = useGetActivityTypes();
</script>

<template>
	<FieldComboBox
		value-field="id"
		display-field="name"
		:options="data ?? []"
		custom-value
	/>
</template>
