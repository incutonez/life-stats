<script setup lang="ts">
import { h, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { type ApplicationViewModel, type CommentViewModel, EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import BaseButton from "@/components/BaseButton.vue";
import FieldText from "@/components/FieldText.vue";
import { IconAdd, IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import { providePastedApplication, useDeleteApplication, useGetApplications } from "@/composables/applications.ts";
import { useExpandableRow, useTableActions, useTableData } from "@/composables/table.ts";
import { RouteApplications, RouteCreate, viewApplication } from "@/router.ts";
import { getApplicationRecords } from "@/stores/applications.ts";
import { useAppSelector } from "@/stores/main.ts";
import type { ISubRowRenderer, ITableColumn, ITableData, ITableRow } from "@/types/components.ts";
import { csvToApplicationViewModel, getEnumDisplay, toDate, toDateTime } from "@/utils/common.ts";
import CellLink from "@/views/applications/CellLink.vue";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

export interface IViewApplicationsProps {
	data?: ApplicationViewModel[];
	showCompany?: boolean;
	viewRoute?: string;
}

const { Applied, CurrentWeek, Rejected, Initial, InterviewedAndRejected, Interviewing, Declined, Accepted } = EnumApplicationStatus;
const { data = undefined, showCompany = true, viewRoute = undefined } = defineProps<IViewApplicationsProps>();
const { deleteApplication, deletingApplication } = useDeleteApplication();
const pastedRecord = providePastedApplication();
const showDelete = ref(false);
const route = useRoute();
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
	accessorKey: "status",
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
		const lhsStatus = lhs.original.status;
		const rhsStatus = rhs.original.status;
		// First, we want to sort all applied statuses to the bottom EVERY TIME
		if (lhsStatus === Applied) {
			return -1 * identity;
		}
		else if (rhsStatus === Applied) {
			return identity;
		}
		// Next, we want to sort the current week to come after rejections EVERY TIME
		else if (lhsStatus === CurrentWeek) {
			return -1 * identity;
		}
		else if (rhsStatus === CurrentWeek) {
			return identity;
		}
		// Then rejections
		else if (lhsStatus === Rejected) {
			return -1 * identity;
		}
		else if (rhsStatus === Rejected) {
			return identity;
		}
		// Then we just do a normal sort between the rest of the statuses
		else if (lhsStatus === rhsStatus) {
			return 0;
		}
		return lhsStatus < rhsStatus ? -1 : 1;
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
		status: row.original.status,
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
}, {
	accessorKey: "dateCreated",
	header: "Created",
	cell: (info) => toDateTime(info.getValue<number>()),
	meta: {
		columnWidth: "w-auto",
		cellCls: "text-center text-sm font-semibold",
	},
}, {
	accessorKey: "dateUpdated",
	header: "Updated",
	cell: (info) => toDateTime(info.getValue<number>()),
	meta: {
		columnWidth: "w-auto",
		cellCls: "text-center text-sm font-semibold",
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
	switch (row.original.status) {
		case Applied:
			return "bg-blue-200";
		case CurrentWeek:
			return "bg-white";
		case Initial:
			return "bg-yellow-200";
		case Interviewing:
			return "bg-amber-300";
		case InterviewedAndRejected:
			return "bg-violet-200";
		case Rejected:
			return "bg-rose-200";
		case Declined:
			return "bg-stone-300";
		case Accepted:
			return "bg-green-200";
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
	// We don't want the pasting to hijack any pasting we do that's in a dialog or different route
	if (route.name !== RouteApplications) {
		return;
	}
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
