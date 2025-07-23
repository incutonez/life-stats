<script setup lang="ts">
import { computed, ref, unref, useTemplateRef, watch } from "vue";
import type { ActivityActionViewModel } from "@incutonez/life-stats-spec";
import { useSortable } from "@vueuse/integrations/useSortable";
import clone from "just-clone";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import { IconAdd, IconDelete, IconEdit, IconSave } from "@/components/Icons.ts";
import TableData, { type TableDataComponent } from "@/components/TableData.vue";
import { useTableActions, useTableData } from "@/composables/table.ts";
import { getDialogTitle, getUniqueId } from "@/utils/common.ts";
import { useActionsColumns } from "@/views/exercises/composables/table.ts";
import FieldActionTypes from "@/views/exercises/shared/FieldActionTypes.vue";
import type { AllowedActionType } from "@/views/exercises/types.ts";

interface ExerciseActionsProps {
	isTab?: boolean;
}

defineProps<ExerciseActionsProps>();
const records = defineModel<AllowedActionType[]>("records", {
	default: [],
});
const tableRef = useTemplateRef<TableDataComponent<ActivityActionViewModel>>("tableRef");
const selectedRecord = ref<AllowedActionType>();
const showDialogAction = ref(false);
const isEdit = computed(() => !!selectedRecord.value?.id);
const dialogActionTitle = getDialogTitle(isEdit, "Step");
const { table } = useTableData<AllowedActionType>({
	data: records,
	sortInitial: [{
		desc: false,
		id: "order",
	}],
	columns: [useTableActions([{
		icon: IconEdit,
		handler(record) {
			selectedRecord.value = clone(record);
			showDialogAction.value = true;
		},
	}, {
		icon: IconDelete,
		handler({ id }) {
			records.value = records.value.filter((item) => item.id !== id);
		},
	}]), ...useActionsColumns()],
});

function onClickAddAction() {
	selectedRecord.value = {
		id: "",
		order: records.value.length + 1,
		value: "",
		actionType: {
			id: "",
			name: "",
		},
	};
	showDialogAction.value = true;
}

function onClickSaveAction() {
	const $records = unref(records);
	const $selectedRecord = unref(selectedRecord);
	if ($selectedRecord) {
		const id = $selectedRecord.id;
		if (id) {
			const foundIndex = $records.findIndex((action) => action.id === id) ?? -1;
			if (foundIndex >= 0) {
				$records[foundIndex] = $selectedRecord;
			}
		}
		else {
			$selectedRecord.id = getUniqueId();
			$records.push($selectedRecord);
		}
		records.value = [...$records];
	}
	showDialogAction.value = false;
}

watch(showDialogAction, ($showDialog) => {
	if (!$showDialog) {
		selectedRecord.value = undefined;
	}
});

useSortable(() => tableRef.value?.rowBody, records, {
	// The TS support for SortableJS is pretty lackluster, so we have to any this event
	async onUpdate({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
		const $records = unref(records);
		const temp = $records[newIndex].order;
		$records[newIndex].order = $records[oldIndex].order;
		$records[oldIndex].order = temp;
		// Must do this, so the datatable updates properly, as it doesn't do a deep watch on the objects
		records.value = [...records.value];
	},
});
</script>

<template>
	<article
		class="flex flex-col overflow-hidden"
		:class="isTab ? '' : 'gap-2'"
	>
		<section
			class="flex gap-2 items-center justify-end"
			:class="isTab ? 'p-2' : ''"
		>
			<slot name="beforeAdd" />
			<BaseButton
				text="Step"
				:icon="IconAdd"
				theme="info"
				@click="onClickAddAction"
			/>
		</section>
		<TableData
			ref="tableRef"
			class="flex-1"
			:class="isTab ? 'border-x-0 border-b-0' : ''"
			:table="table"
			table-layout="table-auto"
		/>
		<BaseDialog
			v-if="selectedRecord"
			v-model="showDialogAction"
			body-class="gap-form flex flex-col"
			:title="dialogActionTitle"
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
	</article>
</template>
