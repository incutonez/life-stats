<script setup lang="ts">
import { ref } from "vue";
import type { ActivityAttributeViewModel } from "@incutonez/life-stats-spec";
import clone from "just-clone";
import BaseButton from "@/components/BaseButton.vue";
import ButtonHelp from "@/components/ButtonHelp.vue";
import { IconAdd, IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useTableActions, useTableData } from "@/composables/table.ts";
import { getUniqueId } from "@/utils/common.ts";
import { injectActivityRecord } from "@/views/exercises/composables/activities.ts";
import { useAttributesColumns } from "@/views/exercises/composables/table.ts";
import ViewAttribute from "@/views/exercises/ViewAttribute.vue";

const showAttributeDialog = ref(false);
const { viewRecord, attributeRecords, selectedAttributeRecord } = injectActivityRecord();
const attributesTable = useTableData<ActivityAttributeViewModel>({
	data: attributeRecords,
	sortInitial: [{
		desc: false,
		id: "attributeTypeName",
	}],
	columns: [useTableActions([{
		icon: IconEdit,
		handler(record) {
			selectedAttributeRecord.value = clone(record);
			showAttributeDialog.value = true;
		},
	}, {
		icon: IconDelete,
		handler({ id }) {
			viewRecord.value!.attributes = attributeRecords.value.filter((item) => item.id !== id);
		},
	}]), ...useAttributesColumns()],
});

function onClickAddAttribute() {
	selectedAttributeRecord.value = {
		id: getUniqueId(),
		value: "",
		attributeType: {
			id: "",
			name: "",
		},
	};
	showAttributeDialog.value = true;
}
</script>

<template>
	<article class="flex-1 flex flex-col">
		<section class="flex p-2 items-center">
			<ButtonHelp content="Attributes are activity metadata... e.g. elevation, start time, weather, location, etc." />
			<BaseButton
				:icon="IconAdd"
				class="ml-auto"
				text="Attribute"
				theme="info"
				@click="onClickAddAttribute"
			/>
		</section>
		<TableData
			class="border-x-0 border-b-0"
			:table="attributesTable.table"
		/>
		<ViewAttribute
			v-if="showAttributeDialog"
			v-model="showAttributeDialog"
		/>
	</article>
</template>
