<script setup lang="ts">
import { useListExercisesHistory } from "@/views/exercises/composables/activities.ts";
import ViewFeatureHistory from "@/views/ViewFeatureHistory.vue";

const { data } = useListExercisesHistory();
</script>

<template>
	<ViewFeatureHistory :data="data" />
</template>
