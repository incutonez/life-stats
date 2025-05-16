<script setup lang="ts">
import { h, onUnmounted, ref } from "vue";
import { type ApplicationViewModel, type CommentViewModel, EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import BaseButton from "@/components/BaseButton.vue";
import FieldText from "@/components/FieldText.vue";
import { IconAdd, IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { providePastedApplication, useDeleteApplication, useGetApplications } from "@/composables/applications.ts";
import { useExpandableRow, useTableActions, useTableData } from "@/composables/table.ts";
import { RouteCreate, viewApplication } from "@/router.ts";
import { getApplicationRecords } from "@/stores/applications.ts";
import { useAppSelector } from "@/stores/main.ts";
import type { ISubRowRenderer, ITableColumn, ITableData, ITableRow } from "@/types/components.ts";
import { csvToApplicationViewModel, getEnumDisplay, toDate } from "@/utils/common.ts";
import CellLink from "@/views/applications/CellLink.vue";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

export interface IViewApplicationsProps {
	data?: ApplicationViewModel[];
	showCompany?: boolean;
	viewRoute?: string;
}

const { NoStatus, CurrentWeek, Rejected, Initial, InterviewedAndRejected, Interviewing } = EnumApplicationStatus;
const { data = undefined, showCompany = true, viewRoute = undefined } = defineProps<IViewApplicationsProps>();
const { deleteApplication, deletingApplication } = useDeleteApplication();
const pastedRecord = providePastedApplication();
const showDelete = ref(false);
const selectedRow = ref<ApplicationViewModel>();
const columns: ITableColumn<ApplicationViewModel>[] = [useExpandableRow(), useTableActions([{
	icon: IconEdit,
	handler(record) {
		viewApplication(record.id, viewRoute);
	},
}, {
	icon: IconDelete,
	handler(record) {
		selectedRow.value = record;
		showDelete.value = true;
	},
}]), {
	accessorKey: "order",
	header: "Status",
	meta: {
		columnWidth: "w-min",
		cellCls: "text-center",
	},
	cell: (info) => getEnumDisplay(EnumApplicationStatus, info.getValue<number>()),
	sortUndefined: "last",
	sortingFn(lhs, rhs, columnId) {
		// TODOJEF: There's a weird issue here... if we don't specify number as the type, then we get a circular err
		// It's weird because this doesn't error https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgJIGUD2UzIN4CwAUMqcgCYQDOCAXMgEaaYA2EcIA3MWcsOfSpgooAObciAX2LFQkWIhSoAwqwCuAWxD4eZKtjAAxEPQAUASmQBeAHzIQmhtAnSixGGpAIwwTNrVUEACyAJ4AKnAMbKYI6lpU9CpxIADaALoANHwgwD5wLFg4iYVg6ZaEJGSxIELI+jhixQbp1tm5wPklErqkHl4+fowscAAWMcmoAnXCYuU9vMhsuPwQ4LkhrQCMEgtVfrUwmJ7krfU+IKIAdDCg5KamePySlrZ8J1YfyLEsmiCT5jtdnwYMhTIdjnNKkCyCs1mANlZkOCQORLpQaMgAPzITbIegAWm2814rmhUAgYDUUG0sJ88MBpFc83JlOpOihCyio3mriZRGqtTwQ1GyEkrQCwXCkWiKQqvDOxgs7OhAtw5KoAAd9ihEVyxgAiTb6gHEsgsqnadVamoQBmi4iSTLIMpAA
		const identity: number = getColumnSortIdentity(columnId);
		const lhsOrder = lhs.original.order;
		const rhsOrder = rhs.original.order;
		// First, we want to sort all no statuses to the bottom EVERY TIME
		if (lhsOrder === NoStatus) {
			return -1 * identity;
		}
		else if (rhsOrder === NoStatus) {
			return identity;
		}
		// Next, we want to sort the current week to come after rejections EVERY TIME
		else if (lhsOrder === CurrentWeek) {
			return -1 * identity;
		}
		else if (rhsOrder === CurrentWeek) {
			return identity;
		}
		// Then rejections
		else if (lhsOrder === Rejected) {
			return -1 * identity;
		}
		else if (rhsOrder === Rejected) {
			return identity;
		}
		// Then we just do a normal sort between the rest of the statuses
		else if (lhsOrder === rhsOrder) {
			return 0;
		}
		return lhsOrder < rhsOrder ? -1 : 1;
	},
}, {
	accessorKey: "dateApplied",
	header: "Applied",
	cell: (info) => toDate(info.getValue<number>()),
	meta: {
		columnWidth: "w-auto",
		cellCls: "text-center",
	},
}];
if (showCompany) {
	columns.push({
		id: "companyName",
		accessorKey: "company.name",
		header: "Company Name",
		cell: (info) => info.getValue(),
	});
}
columns.push({
	accessorKey: "positionTitle",
	header: "Position",
	cell: ({ row }) => h(CellLink, {
		text: row.original.positionTitle,
		url: row.original.url,
		status: row.original.order,
	}),
}, {
	accessorKey: "site",
	header: "Site",
	cell: (info) => info.getValue(),
	meta: {
		columnWidth: "w-auto",
		cellCls: "text-center",
	},
}, {
	accessorKey: "compensation",
	header: "Compensation",
	meta: {
		cellCls: "text-center",
	},
});
const { table, search, getColumnSortIdentity } = useTableData<ApplicationViewModel>({
	data: data ?? useAppSelector(getApplicationRecords),
	columns,
	canExpand(row) {
		return !!row.original.comments.length;
	},
	sortInitial: [{
		id: "dateApplied",
		desc: true,
	}],
});

function renderCommentRows({ row }: ISubRowRenderer<ApplicationViewModel>) {
	const table = useTableData<CommentViewModel>({
		data: row.original.comments,
		columns: [{
			accessorKey: "comment",
		}],
	});

	return h<ITableData<CommentViewModel>>(TableData, {
		table: table.table,
		hideHeaders: true,
	});
}

function rowCls(row: ITableRow<ApplicationViewModel>) {
	switch (row.original.order) {
		case CurrentWeek:
			return "bg-white";
		case Initial:
			return "bg-yellow-200";
		case Interviewing:
			return "bg-amber-400";
		case InterviewedAndRejected:
			return "bg-violet-300";
		case Rejected:
			return "bg-rose-300";
		case NoStatus:
			return "bg-gray-200";
	}
}

function onInputEnd(value = "") {
	search.value = value;
}

function onClickAddApplication() {
	viewApplication(RouteCreate, viewRoute);
}

async function onClickDelete() {
	await deleteApplication(selectedRow.value);
	showDelete.value = false;
}

function onPaste({ clipboardData }: ClipboardEvent) {
	const paste = clipboardData?.getData("text");
	if (paste) {
		const [item] = csvToApplicationViewModel(paste, true);
		if (item) {
			pastedRecord.value = item;
			viewApplication(RouteCreate);
		}
	}
}

addEventListener("paste", onPaste);

onUnmounted(() => removeEventListener("paste", onPaste));

if (!data) {
	useGetApplications();
}
</script>

<template>
	<article class="size-full pt-2 flex flex-col space-y-2">
		<section class="flex space-x-2 px-4 ml-auto">
			<FieldText
				:model-value="search"
				label="Search"
				placeholder="Search Applications..."
				@input-end="onInputEnd"
			/>
			<BaseButton
				text="Application"
				theme="info"
				:icon="IconAdd"
				@click="onClickAddApplication"
			/>
		</section>
		<TableData
			class="flex-1"
			:table="table"
			:row-cls="rowCls"
			:render-sub-rows="renderCommentRows"
		/>
		<DeleteDialog
			v-model="showDelete"
			entity-name="this application"
			:loading="deletingApplication"
			@delete="onClickDelete"
		/>
		<RouterView />
	</article>
</template>
