<script setup lang="ts">
import type { CommentViewModel } from "@incutonez/life-stats-spec";

export interface ICellCommentsProps {
	comments: CommentViewModel[];
}

defineProps<ICellCommentsProps>();
</script>

<template>
	<ol class="list-decimal ml-4">
		<li
			v-for="comment in comments"
			:key="comment.id"
		>
			{{ comment.comment }}
		</li>
	</ol>
</template>
