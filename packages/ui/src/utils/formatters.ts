import { UserLanguage } from "@/constants.ts";

export function numberToDisplay(value: string | number, maximumFractionDigits = 2, unit = "") {
	if (typeof value === "string") {
		value = parseFloat(value);
	}
	value = new Intl.NumberFormat(UserLanguage, {
		maximumFractionDigits,
	}).format(value);
	if (unit) {
		value += ` ${unit}`;
	}
	return value;
}
