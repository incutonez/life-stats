import { h } from "vue";
import {
	EnumUnitTypes,
	type ExerciseActivityAttributeViewModel,
	type ExerciseActivityCreateViewModel,
} from "@incutonez/life-stats-spec";
import TableData from "@/components/TableData.vue";
import { useDateColumn, useTableData } from "@/composables/table.ts";
import type { ITableColumn, ITableData } from "@/types/components.ts";
import { numberToDisplay } from "@/utils/formatters.ts";

export function useActivitiesColumns<T extends ExerciseActivityCreateViewModel>(): ITableColumn<T>[] {
	return [
		useDateColumn("dateOccurred", "Date"), {
			accessorKey: "activityType.name",
			header: "Type",
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
			accessorKey: "calories",
			header: "Calories Burned",
			meta: {
				columnWidth: "min-w-36",
				columnAlign: "center",
			},
			cell(info) {
				const value = info.getValue<number>();
				return value ? numberToDisplay(value) : "";
			},
		}, {
			accessorKey: "weightLost",
			header: "Weight Lost (lbs)",
			meta: {
				columnWidth: "min-w-40",
				columnAlign: "center",
			},
			cell(info) {
				const value = info.getValue<number>();
				return value ? numberToDisplay(value) : "";
			},
		}, {
			accessorKey: "source",
			header: "Source",
			meta: {
				columnWidth: "w-max",
			},
		}, {
			id: "attribute",
			accessorKey: "attributes",
			header: "Attributes",
			meta: {
				cellCls: "!p-0",
			},
			cell(info) {
				const attributes = info.getValue<ExerciseActivityAttributeViewModel[]>();
				const attributesTable = useTableData<ExerciseActivityAttributeViewModel>({
					data: attributes,
					sortInitial: [{
						desc: false,
						id: "attributeTypeName",
					}],
					columns: useAttributesColumns(),
				});
				return h<ITableData<ExerciseActivityAttributeViewModel>>(TableData, {
					table: attributesTable.table,
					hideHeaders: true,
					class: "!border-0",
				});
			},
		},
	];
}

export function useAttributesColumns<T extends ExerciseActivityAttributeViewModel>(): ITableColumn<T>[] {
	return [{
		id: "attributeTypeName",
		accessorKey: "attributeType.name",
		header: "Attribute",
	}, {
		accessorKey: "value",
		header: "Value",
		meta: {
			cellCls: "!border-r-0",
		},
		cell(info) {
			const { original } = info.row;
			const display: string[] = [];
			const value = original.valueDisplay || original.value;
			const attributeType = original.attributeType.type;
			switch (original.unitDisplay ?? original.unit) {
				case EnumUnitTypes.KilometersPerHour:
					display.push("kph");
					break;
				case EnumUnitTypes.Meters:
					display.push("m");
					break;
				case EnumUnitTypes.Kilometers:
					display.push("km");
					break;
				case EnumUnitTypes.MilesPerHour:
					display.push("mph");
					break;
				case EnumUnitTypes.Feet:
					display.push("ft");
					break;
				case EnumUnitTypes.Miles:
					display.push("mi");
					break;
				case EnumUnitTypes.Hours:
					display.push("hrs");
					break;
				case EnumUnitTypes.Minutes:
					display.push("mins");
					break;
				case EnumUnitTypes.Seconds:
					display.push("secs");
					break;
			}
			if (attributeType === "number") {
				display.unshift(numberToDisplay(value));
			}
			return display.join(" ");
		},
	}];
}
