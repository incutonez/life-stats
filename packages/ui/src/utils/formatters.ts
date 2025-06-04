import { UserLanguage } from "@/constants.ts";

export function numberToDisplay(value: string | number, maximumFractionDigits = 2) {
	if (typeof value === "string") {
		value = parseFloat(value);
	}
	return new Intl.NumberFormat(UserLanguage, {
		maximumFractionDigits,
	}).format(value);
}
