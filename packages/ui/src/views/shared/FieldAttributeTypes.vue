<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { useGetAttributeTypes } from "@/composables/app.ts";

const { data } = useGetAttributeTypes();
</script>

<template>
	<FieldComboBox
		value-field="id"
		display-field="name"
		custom-value
		:options="data ?? []"
	/>
</template>
