<script setup lang="ts">
import { useListExercisesHistory } from "@/composables/audits.ts";
import ViewFeatureHistory from "@/views/ViewFeatureHistory.vue";

const { data } = useListExercisesHistory();
</script>

<template>
	<ViewFeatureHistory :data="data" />
</template>
