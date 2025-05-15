import type { IOption, TLabelAlign } from "@/types/components.ts";

export { v4 as getUniqueId } from "uuid";

const CapitalizeWordBoundary = /(?=[A-Z])/;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "2-digit",
	day: "2-digit",
	year: "numeric",
});

export function toDate(value?: number | Date) {
	return dateFormatter.format(value);
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(() => {
		resolve(true);
	}, ms));
}

export function getLabelAlign(align: TLabelAlign) {
	return align === "left" ? "field-label-left" : "field-label-top";
}

export function splitPascal(value: string) {
	return value.split(CapitalizeWordBoundary).join(" ");
}

export function isObject(value: unknown) {
	return value && typeof value === "object" && !Array.isArray(value);
}

export function enumToOptions<T extends object>(items: T) {
	const options: IOption[] = [];
	for (const key in items) {
		options.push({
			id: items[key] as string,
			display: splitPascal(key),
		});
	}
	return options;
}

export function getEnumDisplay(enums: Record<string, number | string>, value: string | number) {
	let found = "";
	for (const key in enums) {
		if (value === enums[key]) {
			found = key;
			break;
		}
	}
	return splitPascal(found);
}
