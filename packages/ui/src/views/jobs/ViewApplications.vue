<script setup lang="ts">
import { h, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { type ApplicationViewModel, type CommentViewModel, EnumApplicationStatus } from "@incutonez/life-stats-spec";
import BaseButton from "@/components/BaseButton.vue";
import FieldText from "@/components/FieldText.vue";
import { IconAdd, IconDelete, IconEdit } from "@/components/Icons.ts";
import TableData from "@/components/TableData.vue";
import TablePagination from "@/components/TablePagination.vue";
import { injectGlobalError } from "@/composables/app.ts";
import { providePastedApplication, useApplicationsList, useDeleteApplication } from "@/composables/applications.ts";
import {
	useDateColumn,
	useDateCreatedColumn,
	useDateUpdatedColumn,
	useExpandableRow,
	useTableActions,
	useTableData,
} from "@/composables/table.ts";
import { RouteCreate } from "@/router/index.ts";
import { RouteJobApplications, useJobRoutes } from "@/router/jobs.ts";
import { getApplicationRecords } from "@/stores/applications.ts";
import { useAppSelector } from "@/stores/main.ts";
import type { ISubRowRenderer, ITableColumn, ITableData, ITableRow, TInputValue } from "@/types/components.ts";
import { getEnumDisplay, pasteToApplicationViewModel } from "@/utils/common.ts";
import CellLink from "@/views/applications/CellLink.vue";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

export interface IViewApplicationsProps {
	data?: ApplicationViewModel[];
	showCompany?: boolean;
	viewRoute?: string;
	isSubRow?: boolean;
}

const { Applied, CurrentWeek, Rejected, Initial, InterviewedAndRejected, Interviewing, Declined, Accepted, Ghosted } = EnumApplicationStatus;
const { data = undefined, showCompany = true, viewRoute = undefined, isSubRow = false } = defineProps<IViewApplicationsProps>();
const { deleteApplication, deletingApplication } = useDeleteApplication();
const { viewApplication } = useJobRoutes();
const { errorTitle, errorMsg, errorMsgStack } = injectGlobalError();
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
		columnWidth: "min-w-32",
		columnAlign: "center",
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
}, useDateColumn("dateApplied", "Applied", "min-w-30 w-30")];
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
}, {
	accessorKey: "compensation",
	header: "Compensation",
	meta: {
		columnWidth: "min-w-64",
	},
}, useDateCreatedColumn(), useDateUpdatedColumn());
const { table, search, getColumnSortIdentity } = useTableData<ApplicationViewModel>({
	data: data ?? useAppSelector(getApplicationRecords),
	columns,
	paginated: true,
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
			// eslint-disable-next-line @incutonez/array-bracket-newline
		}, useDateCreatedColumn(), useDateUpdatedColumn()],
	});

	return h<ITableData<CommentViewModel>>(TableData, {
		table: table.table,
		isSubRow: true,
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
		case Ghosted:
			return "bg-fuchsia-200";
	}
}

function onInputEnd(value: TInputValue = "") {
	search.value = value as string;
}

function onClickAddApplication() {
	viewApplication(RouteCreate, viewRoute);
}

async function onClickDelete() {
	await deleteApplication(selectedRow.value);
	showDelete.value = false;
}

function onPaste(event: ClipboardEvent) {
	// We don't want the pasting to hijack any pasting we do that's in a dialog or different route
	if (route.name !== RouteJobApplications) {
		return;
	}
	event.stopPropagation();
	event.preventDefault();
	const paste = event.clipboardData?.getData("text");
	if (paste) {
		try {
			const item = pasteToApplicationViewModel(paste);
			if (item) {
				pastedRecord.value = item;
				viewApplication(RouteCreate);
			}
		}
		catch (error) {
			errorTitle.value = "Paste Error";
			errorMsg.value = "Paste is invalid";
			errorMsgStack.value = `Your paste was: ${paste}`;
			throw error;
		}
	}
}

addEventListener("paste", onPaste, true);

onUnmounted(() => removeEventListener("paste", onPaste));

if (!data) {
	useApplicationsList();
}
</script>

<template>
	<article class="size-full pt-2 flex flex-col">
		<section class="flex px-4 items-center">
			<section class="flex space-x-2">
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
			<TablePagination
				:table="table"
				class="ml-auto border-b-0"
			/>
		</section>
		<TableData
			class="flex-1"
			table-layout="auto"
			:is-sub-row="isSubRow"
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
