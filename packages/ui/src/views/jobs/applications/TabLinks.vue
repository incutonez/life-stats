<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { type ApplicationLinkViewModel, EnumApplicationStatus, EnumLinkType } from "@incutonez/life-stats-spec";
import FieldComboBox from "@/components/FieldComboBox.vue";
import { IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { useDateColumn, useTableActions, useTableData } from "@/composables/table.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import { injectApplicationRecord, useApplicationsList } from "@/views/jobs/composables/applications.ts";
import ViewApplication from "@/views/jobs/ViewApplication.vue";

const { data } = useApplicationsList();
const { viewRecord } = injectApplicationRecord();
const selectedLinkRecordId = ref<string>("");
const linksData = ref<ApplicationLinkViewModel[]>([]);
const linksTable = useTableData<ApplicationLinkViewModel>({
	data: linksData,
	columns: [
		useTableActions([{
			icon: IconEdit,
			handler(record) {
				selectedLinkRecordId.value = record.id;
			},
		}, {
			icon: IconDelete,
			handler(record) {
				const links = viewRecord.value!.links ?? [];
				const { id } = record;
				const found = links.findIndex((item) => item.id === id);
				if (found !== undefined && found >= 0) {
					links.splice(found, 1);
				}
			},
		}]), {
			accessorKey: "type",
			header: "Linked",
			cell: (info) => getEnumDisplay(EnumLinkType, info.getValue<number>()),
			meta: {
				columnWidth: "min-w-fit",
				columnAlign: "center",
			},
		}, {
			accessorKey: "positionTitle",
			header: "Position",
			meta: {
				columnWidth: "w-full",
			},
		}, {
			accessorKey: "status",
			header: "Status",
			cell: (info) => getEnumDisplay(EnumApplicationStatus, info.getValue<number>()),
			meta: {
				columnWidth: "max-w-fit",
				columnAlign: "center",
			},
		},
		useDateColumn("dateApplied", "Applied"),
	],
});
const applicationRecords = computed(() => {
	const { id, company } = viewRecord.value!;
	const companyId = company.id;
	const items = data.value?.data ?? [];
	/* Right now we filter out the current view record and anything that's not its company... I'm not sure why you'd want
   * to link an application to another application if they don't have the same company, unless maybe the company name
   * changes?  But then I'd think you'd just modify the company record's name */
	return items.filter((item) => item.id !== id && item.company.id === companyId);
});
const selectedIds = computed({
	get() {
		return viewRecord.value!.links?.map((item) => item.id) ?? [];
	},
	set(value) {
		const { links = [] } = viewRecord.value!;
		viewRecord.value!.links = value.map((id) => {
			const existingLink = links.find((link) => link.id === id);
			if (existingLink) {
				return existingLink;
			}
			const found = applicationRecords.value.find((record) => record.id === id)!;
			return {
				id: found.id,
				positionTitle: found.positionTitle,
				status: found.status,
				// Newly selected records are linked to this model
				type: EnumLinkType.To,
				dateApplied: found.dateApplied,
			};
		});
	},
});

function onCloseViewApplicationLink() {
	selectedLinkRecordId.value = "";
}

watch(() => viewRecord.value?.links, ($links = []) => {
	linksData.value = [...$links];
}, {
	immediate: true,
	deep: true,
});
</script>

<template>
	<section class="px-2 flex">
		<FieldComboBox
			v-model="selectedIds"
			value-field="id"
			display-field="positionTitle"
			multiple
			value-only
			:options="applicationRecords"
		/>
	</section>
	<TableData
		class="flex-1 border-0 border-t"
		:table="linksTable.table"
		table-layout="table-auto"
	/>
	<ViewApplication
		v-if="selectedLinkRecordId"
		suppress-routing
		:value="!!selectedLinkRecordId"
		:application-id="selectedLinkRecordId"
		@close="onCloseViewApplicationLink"
	/>
</template>
