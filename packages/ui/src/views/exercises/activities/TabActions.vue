<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import type { ActivityActionViewModel } from "@incutonez/life-stats-spec";
import { moveArrayElement, useSortable } from "@vueuse/integrations/useSortable";
import clone from "just-clone";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import ButtonHelp from "@/components/ButtonHelp.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import { IconAdd, IconDelete, IconEdit, IconSave } from "@/components/Icons.ts";
import TableData, { type TableDataComponent } from "@/components/TableData.vue";
import { useTableActions, useTableData } from "@/composables/table.ts";
import { injectActivityRecord } from "@/views/exercises/composables/activities.ts";
import FieldActionTypes from "@/views/exercises/shared/FieldActionTypes.vue";

const showDialog = ref(false);
const selectedRecord = ref<ActivityActionViewModel>();
const tableRef = useTemplateRef<TableDataComponent<ActivityActionViewModel>>("tableRef");
const { viewRecord, saveAction } = injectActivityRecord();
const data = computed({
	get() {
		return viewRecord.value.actions ?? [];
	},
	set(rows) {
		viewRecord.value.actions = rows;
	},
});
const dialogTitle = computed(() => selectedRecord.value?.id ? "Edit Action" : "Create Action");
const { table } = useTableData<ActivityActionViewModel>({
	data,
	sortInitial: [{
		desc: false,
		id: "order",
	}],
	columns: [useTableActions([{
		icon: IconEdit,
		handler(record) {
			selectedRecord.value = clone(record);
			showDialog.value = true;
		},
	}, {
		icon: IconDelete,
		handler({ id }) {
			viewRecord.value!.actions = data.value.filter((item) => item.id !== id);
		},
	}]), {
		accessorKey: "value",
		header: "Value",
		meta: {
			columnAlign: "center",
			columnWidth: "w-auto",
			cellCls: "w-0",
		},
	}, {
		accessorKey: "actionType.name",
		header: "Name",
	}, {
		accessorKey: "order",
		header: "Order",
		meta: {
			columnWidth: "w-auto",
			cellCls: "w-0",
		},
	}],
});

function onClickAddAction() {
	selectedRecord.value = {
		id: "",
		order: data.value.length + 1,
		value: "",
		actionType: {
			id: "",
			name: "",
		},
	};
	showDialog.value = true;
}

function onClickSaveAction() {
	saveAction(selectedRecord.value);
	reIndexData();
	showDialog.value = false;
}

function reIndexData() {
	// After we've moved to a new index, let's re-index the orders
	data.value.forEach((item, index) => item.order = index + 1);
}

watch(showDialog, ($showDialog) => {
	if (!$showDialog) {
		selectedRecord.value = undefined;
	}
});

useSortable(() => tableRef.value?.rowBody, data, {
	// The TS support for SortableJS is pretty lackluster, so we have to any this event
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async onUpdate(event: any) {
		moveArrayElement(data, event.oldIndex, event.newIndex, event);
		await nextTick();
		reIndexData();
	},
});
</script>

<template>
	<section class="flex p-2">
		<ButtonHelp content="Actions are the steps/routine of the activity... e.g. 25 pushups, 10 superman, etc." />
		<BaseButton
			text="Action"
			:icon="IconAdd"
			class="ml-auto"
			theme="info"
			@click="onClickAddAction"
		/>
	</section>
	<TableData
		ref="tableRef"
		class="border-x-0 border-b-0"
		:table="table"
		table-layout="table-auto"
	/>
	<BaseDialog
		v-if="selectedRecord"
		v-model="showDialog"
		body-class="gap-form flex flex-col"
		:title="dialogTitle"
	>
		<template #content>
			<FieldActionTypes
				v-model="selectedRecord.actionType"
				label-align="top"
				autofocus
				required
			/>
			<FieldText
				v-model="selectedRecord.value"
				label="Value"
				label-align="top"
				required
			/>
			<FieldNumber
				v-model="selectedRecord.order"
				label="Order"
				label-align="top"
				required
			/>
		</template>
		<template #footer>
			<BaseButton
				text="Save"
				theme="info"
				:icon="IconSave"
				@click="onClickSaveAction"
			/>
		</template>
	</BaseDialog>
</template>
