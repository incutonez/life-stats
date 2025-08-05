<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import { IconDelete, IconWarning } from "@/components/Icons.ts";
import type { BaseDialogEmits, BaseDialogProps } from "@/types/components.ts";

export interface IDeleteDialogProp extends BaseDialogProps {
	entityName?: string;
	loading?: boolean;
	showAction?: boolean;
}

export interface IDeleteDialogEmits extends BaseDialogEmits {
	(event: "delete"): void;
}

const { entityName = "", showAction = true } = defineProps<IDeleteDialogProp>();
const emit = defineEmits<IDeleteDialogEmits>();

async function onClickDelete() {
	emit("delete");
}
</script>

<template>
	<BaseDialog
		title="Delete Entity"
		body-class="flex items-center gap-2"
	>
		<template #content>
			<IconWarning class="size-8 fill-yellow-500 self-start" />
			<slot name="message">
				<p>Are you sure you want to delete {{ entityName }}?</p>
			</slot>
		</template>
		<template #footer>
			<BaseButton
				v-if="showAction"
				text="Delete"
				:icon="IconDelete"
				:loading="loading"
				theme="danger"
				@click="onClickDelete"
			/>
		</template>
	</BaseDialog>
</template>
