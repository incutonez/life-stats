<script setup lang="ts">
import { useListJobsHistory } from "@/composables/audits.ts";
import ViewFeatureHistory from "@/views/ViewFeatureHistory.vue";

const { data } = useListJobsHistory();
</script>

<template>
	<ViewFeatureHistory :data="data" />
</template>
