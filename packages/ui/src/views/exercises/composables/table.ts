import { h } from "vue";
import {
	type ActivityActionViewModel,
	type ActivityAttributeViewModel,
	type ActivityViewModel,
	EnumActivitySource,
	EnumUnitTypes,
} from "@incutonez/life-stats-spec";
import { useDateColumn } from "@/composables/table.ts";
import { ColumnFitWidth } from "@/constants.ts";
import type { ITableColumn } from "@/types/components.ts";
import { getEnumDisplay } from "@/utils/common.ts";
import { numberToDisplay } from "@/utils/formatters.ts";
import CellActivityDetails from "@/views/exercises/CellActivityDetails.vue";

export function useActivitiesColumns<T extends ActivityViewModel>(): ITableColumn<T>[] {
	return [
		useDateColumn("dateOccurred", "Date"), {
			accessorKey: "activityType.name",
			header: "Type",
			meta: {
				columnAlign: "center",
				...ColumnFitWidth,
			},
		}, {
			accessorKey: "title",
			header: "Title",
		}, {
			accessorKey: "description",
			header: "Description",
		}, {
			accessorKey: "calories",
			header: "Details",
			meta: {
				columnWidth: "min-w-auto",
			},
			cell({ row }) {
				const { calories, weightLost, duration } = row.original;
				return h(CellActivityDetails, {
					calories,
					weightLost,
					duration,
				});
			},
		}, {
			accessorKey: "source",
			header: "Source",
			meta: {
				columnWidth: "w-max",
			},
			cell(info) {
				const value = info.getValue<number>();
				if (value === EnumActivitySource.None) {
					return "";
				}
				return getEnumDisplay(EnumActivitySource, value);
			},
		}, {
			id: "attribute",
			accessorKey: "attributes",
			header: "Attributes",
			cell(info) {
				const records = info.getValue<ActivityAttributeViewModel[]>();
				return h("span", null, records.length);
			},
		}, {
			accessorKey: "actions",
			header: "Steps",
			cell(info) {
				const records = info.getValue<ActivityActionViewModel[]>();
				return h("span", null, records.length);
			},
		},
	];
}

export function useActionsColumns<T extends ActivityActionViewModel>(): ITableColumn<T>[] {
	return [{
		accessorKey: "order",
		header: "Order",
		meta: {
			columnAlign: "center",
			...ColumnFitWidth,
		},
	}, {
		accessorKey: "actionType.name",
		header: "Name",
		meta: {
			cellCls: "w-full",
		},
	}, {
		accessorKey: "value",
		header: "Value",
		meta: {
			columnAlign: "center",
			...ColumnFitWidth,
		},
	}];
}

export function useAttributesColumns<T extends ActivityAttributeViewModel>(): ITableColumn<T>[] {
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
			let isNumber = true;
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
					display.push("hours");
					break;
				case EnumUnitTypes.Minutes:
					display.push("mins");
					break;
				case EnumUnitTypes.Seconds:
					display.push("secs");
					break;
				default:
					isNumber = false;
			}
			if (isNumber) {
				display.unshift(numberToDisplay(value));
			}
			else {
				display.unshift(value);
			}
			return display.join(" ");
		},
	}];
}
