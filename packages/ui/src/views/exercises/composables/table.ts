import { h } from "vue";
import {
	EnumUnitTypes,
	type ExerciseActivityAttributeViewModel,
	type ExerciseActivityCreateViewModel,
} from "@incutonez/life-stats-spec";
import TableData from "@/components/TableData.vue";
import { useDateColumn, useTableData } from "@/composables/table.ts";
import type { ITableColumn, ITableData } from "@/types/components.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import { numberToDisplay } from "@/utils/formatters.ts";

export function useActivitiesColumns<T extends ExerciseActivityCreateViewModel>(): ITableColumn<T>[] {
	return [
		useDateColumn("dateOccurred", "Date"), {
			accessorKey: "activityType.name",
			header: "Activity",
			meta: {
				columnWidth: "w-max",
				columnAlign: "center",
			},
		}, {
			accessorKey: "title",
			header: "Title",
		}, {
			accessorKey: "description",
			header: "Description",
		}, {
			accessorKey: "source",
			header: "Source",
		}, {
			accessorKey: "attributes",
			header: "Attributes",
			meta: {
				columnWidth: "w-100",
			},
			cell(info) {
				const attributes = info.getValue<ExerciseActivityAttributeViewModel[]>();
				const attributesTable = useTableData<ExerciseActivityAttributeViewModel>({
					data: attributes,
					sortInitial: [{
						desc: false,
						id: "attributeTypeName",
					}],
					columns: [{
						id: "attributeTypeName",
						accessorKey: "attributeType.name",
						header: "Attribute",
						meta: {
							columnWidth: "w-max",
						},
					}, {
						accessorKey: "value",
						header: "Value",
						meta: {
							columnWidth: "w-max",
						},
						cell(info) {
							const { original } = info.row;
							const display: string[] = [getEnumDisplay(EnumUnitTypes, original.unitDisplay ?? original.unit)];
							const value = original.valueDisplay || info.getValue<string>();
							const attributeType = original.attributeType.type;
							if (attributeType === "number") {
								display.unshift(numberToDisplay(value));
							}
							return display.join(" ");
						},
					}],
				});
				return h<ITableData<ExerciseActivityAttributeViewModel>>(TableData, {
					table: attributesTable.table,
					isSubRow: true,
					tableLayout: "table-auto",
				});
			},
		},
	];
}
