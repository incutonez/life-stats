<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog, { type IBaseDialogEmits, type IBaseDialogProps } from "@/components/BaseDialog.vue";
import { IconDelete } from "@/components/Icons.ts";

export interface IDeleteDialogProp extends IBaseDialogProps {
	entityName?: string;
	loading?: boolean;
}

export interface IDeleteDialogEmits extends IBaseDialogEmits {
	(event: "delete"): void;
}

defineProps<IDeleteDialogProp>();
const emit = defineEmits<IDeleteDialogEmits>();

async function onClickDelete() {
	emit("delete");
}
</script>

<template>
	<BaseDialog title="Delete Entity">
		<template #content>
			<p>Are you sure you want to delete {{ entityName ?? "" }}?</p>
		</template>
		<template #footer>
			<BaseButton
				text="Delete"
				:icon="IconDelete"
				:loading="loading"
				@click="onClickDelete"
			/>
		</template>
	</BaseDialog>
</template>
