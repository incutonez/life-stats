import { EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import MimeTypes from "mime-types";
import PapaParse from "papaparse";
import { v4 } from "uuid";
import type { IOption, IPluginPaste, TLabelAlign } from "@/types/components.ts";

export const getUniqueId = v4;
const CapitalizeWordBoundary = /(?=[A-Z])/;
const CSVFields = [
	"company",
	"positionTitle",
	"dateApplied",
	"url",
	"compensation",
	"comments",
	"status",
];
const dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "2-digit",
	day: "2-digit",
	year: "numeric",
});
const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
	month: "2-digit",
	day: "2-digit",
	year: "numeric",
	hour: "numeric",
	minute: "2-digit",
	second: "2-digit",
});

export function toDate(value?: number | Date) {
	if (value === undefined || isNaN(value as number)) {
		return undefined;
	}
	return dateFormatter.format(value);
}

export function toDateTime(value?: number | Date) {
	if (value === undefined || isNaN(value as number)) {
		return undefined;
	}
	return dateTimeFormatter.format(value).replace(",", "");
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

export function parseCSV(value: string, addHeader = false) {
	if (addHeader) {
		// Add the headers, so we get back an array of objects instead of array of string[]
		value = `${CSVFields.join(";")}\n${value}`;
	}
	const { data } = PapaParse.parse<IPluginPaste>(value, {
		delimiter: ";",
		header: true,
	});
	return data;
}

export function csvToApplicationViewModel(value: string, addHeader = false) {
	const data = parseCSV(value, addHeader);
	return data.map((item) => {
		return {
			id: "",
			site: "",
			url: item.url ?? "",
			order: EnumApplicationStatus.NoStatus,
			dateApplied: new Date(item.dateApplied).getTime(),
			positionTitle: item.positionTitle,
			compensation: item.compensation ?? "",
			company: {
				id: getUniqueId(),
				name: item.company,
			},
			comments: [],
		};
	});
}

export function makeCSV() {
	return PapaParse.unparse({
		data: [],
		fields: CSVFields,
	}, {
		delimiter: ";",
	});
}

export function downloadFile(blob: Blob, name = "download", extension = MimeTypes.extension(blob.type)) {
	if (!extension) {
		return;
	}
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	// the filename you want
	a.download = `${name}.${extension}`;
	document.body.appendChild(a);
	a.click();
	URL.revokeObjectURL(url);
}
