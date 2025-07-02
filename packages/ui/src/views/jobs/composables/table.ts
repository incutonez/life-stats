import { h } from "vue";
import { type ApplicationViewModel, EnumApplicationStatus, EnumLocationTypes } from "@incutonez/life-stats-spec";
import { useDateColumn } from "@/composables/table.ts";
import type { ITable, ITableColumn, ITableRow } from "@/types/components.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import CellLink from "@/views/jobs/applications/CellLink.vue";

const { Applied, CurrentWeek, Rejected, Initial, InterviewedAndRejected, Interviewing, Declined, Accepted, Ghosted } = EnumApplicationStatus;

export function getApplicationRowCls(row: ITableRow<ApplicationViewModel>) {
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

export function useApplicationsColumns(table: ITable<ApplicationViewModel>, showCompany = true) {
	const columns: ITableColumn<ApplicationViewModel>[] = [{
		accessorKey: "status",
		header: "Status",
		meta: {
			columnWidth: "min-w-32",
			columnAlign: "center",
		},
		cell: (info) => getEnumDisplay(EnumApplicationStatus, info.getValue<number>()),
		sortUndefined: "last",
		sortingFn(lhs, rhs) {
			const lhsStatus = lhs.original.status;
			const rhsStatus = rhs.original.status;
			if (lhsStatus === rhsStatus) {
				return lhs.original.dateApplied < rhs.original.dateApplied ? -1 : 1;
			}
			if (lhsStatus === Rejected) {
				return -1;
			}
			else if (rhsStatus === Rejected) {
				return 1;
			}
			else if (lhsStatus === Declined) {
				return -1;
			}
			else if (rhsStatus === Declined) {
				return 1;
			}
			else if (lhsStatus === Ghosted) {
				return -1;
			}
			else if (rhsStatus === Ghosted) {
				return 1;
			}
			else if (lhsStatus === InterviewedAndRejected) {
				return -1;
			}
			else if (rhsStatus === InterviewedAndRejected) {
				return 1;
			}
			else if (lhsStatus === Applied) {
				return -1;
			}
			else if (rhsStatus === Applied) {
				return 1;
			}
			else if (lhsStatus === CurrentWeek) {
				return -1;
			}
			else if (rhsStatus === CurrentWeek) {
				return 1;
			}
			else if (lhsStatus === Initial) {
				return -1;
			}
			else if (rhsStatus === Initial) {
				return 1;
			}
			else if (lhsStatus === Interviewing) {
				return -1;
			}
			else if (rhsStatus === Interviewing) {
				return 1;
			}
			return lhsStatus < rhsStatus ? -1 : 1;
		},
		// eslint-disable-next-line @incutonez/array-bracket-newline
	}, useDateColumn("dateApplied", "Applied", "min-w-30 w-30")];
	if (showCompany) {
		columns.push({
			id: "companyName",
			accessorKey: "company.name",
			header: "Company Name",
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
		accessorKey: "locationType",
		header: "Location",
		cell: (info) => getEnumDisplay(EnumLocationTypes, info.getValue<number>()),
		meta: {
			columnWidth: "min-w-auto",
			columnAlign: "center",
		},
	}, {
		accessorKey: "site",
		header: "Site",
	}, {
		accessorKey: "compensation",
		header: "Compensation",
		meta: {
			columnWidth: "min-w-64",
		},
	});
	return columns;
}
