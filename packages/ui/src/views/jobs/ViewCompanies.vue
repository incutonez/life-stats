<script setup lang="ts">
import { h, ref } from "vue";
import type { ApplicationViewModel, CompanyFullViewModel } from "@incutonez/life-stats-spec";
import FieldText from "@/components/FieldText.vue";
import { IconDelete } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useExpandableRow, useTableActions, useTableData } from "@/composables/table.ts";
import { getCompanyFullRecords } from "@/stores/companies.ts";
import { useAppSelector } from "@/stores/main.ts";
import type { ISubRowRenderer } from "@/types/components.ts";
import { useDeleteCompany, useGetCompaniesList } from "@/views/jobs/composables/companies.ts";
import { RouteJobCompanyApplication } from "@/views/jobs/constants.ts";
import ViewApplications, { type IViewApplicationsProps } from "@/views/jobs/ViewApplications.vue";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

useGetCompaniesList();
const { deleteCompany, selectedCompany, deletingCompany } = useDeleteCompany();
const data = useAppSelector(getCompanyFullRecords);
const showDeleteCompany = ref(false);
const { table, search } = useTableData<CompanyFullViewModel>({
	data,
	paginated: true,
	canExpand(row) {
		return !!row.original.applications.length;
	},
	columns: [useExpandableRow(), useTableActions([{
		icon: IconDelete,
		// Only allow deleting if there are no Applications associated to the company
		canClick(record) {
			return record.applications.length === 0;
		},
		handler(record) {
			selectedCompany.value = record;
			showDeleteCompany.value = true;
		},
	}]), {
		accessorKey: "name",
		header: "Name",
	}, {
		accessorKey: "applications",
		header: "Applications",
		meta: {
			columnWidth: "w-min",
			columnAlign: "center",
		},
		cell({ row }) {
			return row.original.applications.length;
		},
	}],
});

async function onDeleteCompany() {
	deletingCompany.value = true;
	await deleteCompany();
	deletingCompany.value = false;
	showDeleteCompany.value = false;
}

function renderSubRows({ row }: ISubRowRenderer<CompanyFullViewModel>) {
	return h<IViewApplicationsProps>(ViewApplications, {
		data: row.original.applications as ApplicationViewModel[],
		showCompany: false,
		viewRoute: RouteJobCompanyApplication,
		class: "p-2",
		isSubRow: true,
	});
}
</script>

<template>
	<article class="size-full flex flex-col pt-2">
		<section class="flex px-4">
			<FieldText
				v-model="search"
				label="Search"
				placeholder="Search Companies..."
			/>
			<TablePagination
				:table="table"
				class="ml-auto border-b-0"
			/>
		</section>
		<TableData
			:table="table"
			:render-sub-rows="renderSubRows"
		/>
		<DeleteDialog
			v-model="showDeleteCompany"
			:entity-name="selectedCompany?.name"
			:loading="deletingCompany"
			@delete="onDeleteCompany"
		/>
		<RouterView />
	</article>
</template>
