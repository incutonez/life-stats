import convert, { Unit } from "convert";
import { EnumMappedUnitTypes, EnumUnitTypes, SecondsInHour } from "@/constants";

export function isObject(value: unknown) {
	return value && typeof value === "object" && !Array.isArray(value);
}

export function dateToUTC(date: string | Date | number) {
	if (typeof date === "string" || typeof date === "number") {
		date = new Date(date);
	}
	return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}

export function addMetaInfo<T extends Record<string, unknown>>(value: T, user_id: string, created_at?: Date, updated_at?: Date) {
	return Object.assign(value, {
		userId: user_id,
		dateCreated: created_at?.getTime(),
		dateUpdated: updated_at?.getTime(),
	});
}

export interface IValueToLocalUnit {
	value: string;
	measurementSystem: "imperial" | "metric";
	reverse?: boolean;
	unit?: EnumUnitTypes;
}

export interface IValueConvert {
	value: string;
	unit?: EnumUnitTypes;
	unitTo?: EnumUnitTypes;
}

export interface IValueToLocalUnitResponse {
	value: string;
	unit?: EnumUnitTypes;
}

/**
 * Returns valid Unit in the conversion library, to be used directly in the convert method
 */
export function mapUnit(unit: EnumUnitTypes): Unit | undefined {
	switch (unit) {
		case EnumUnitTypes.Inches:
			return "inches";
		case EnumUnitTypes.Feet:
			return "feet";
		case EnumUnitTypes.Miles:
		case EnumUnitTypes.MilesPerHour:
			return "miles";
		case EnumUnitTypes.Centimeters:
			return "centimeters";
		case EnumUnitTypes.Meters:
		case EnumUnitTypes.MetersPerSecond:
			return "meters";
		case EnumUnitTypes.Kilometers:
		case EnumUnitTypes.KilometersPerHour:
			return "kilometers";
		case EnumUnitTypes.Seconds:
			return "seconds";
		case EnumUnitTypes.Minutes:
			return "minutes";
		case EnumUnitTypes.Hours:
			return "hours";
	}
}

export function imperialToMetric(unit?: EnumUnitTypes) {
	switch (unit) {
		case EnumUnitTypes.Inches:
			return EnumUnitTypes.Centimeters;
		case EnumUnitTypes.Feet:
			return EnumUnitTypes.Meters;
		case EnumUnitTypes.Miles:
			return EnumUnitTypes.Kilometers;
		case EnumUnitTypes.MilesPerHour:
			return EnumUnitTypes.KilometersPerHour;
		case EnumUnitTypes.Centimeters:
			return EnumUnitTypes.Inches;
		case EnumUnitTypes.Meters:
			return EnumUnitTypes.Feet;
		case EnumUnitTypes.MetersPerSecond:
			return EnumUnitTypes.FeetPerSecond;
		case EnumUnitTypes.Kilometers:
			return EnumUnitTypes.Miles;
		case EnumUnitTypes.KilometersPerHour:
			return EnumUnitTypes.MilesPerHour;
		default:
			return unit;
	}
}

export function localizeValue({ value, unit, measurementSystem, reverse }: IValueToLocalUnit): IValueToLocalUnitResponse {
	let parsedValue = parseFloat(value);
	if (reverse && measurementSystem === "imperial") {
		unit = imperialToMetric(unit);
	}
	let mappedUnit = unit !== undefined && mapUnit(unit);
	let mappedTranslatedUnit: Unit | undefined;
	if (!mappedUnit) {
		return {
			value,
		};
	}
	if (measurementSystem === "imperial") {
		switch (unit) {
			case EnumUnitTypes.Kilometers:
				mappedTranslatedUnit = EnumMappedUnitTypes.Miles;
				unit = EnumUnitTypes.Miles;
				break;
			case EnumUnitTypes.Meters:
				mappedTranslatedUnit = EnumMappedUnitTypes.Feet;
				unit = EnumUnitTypes.Feet;
				break;
			case EnumUnitTypes.KilometersPerHour:
				mappedTranslatedUnit = EnumMappedUnitTypes.MilesPerHour;
				unit = EnumUnitTypes.MilesPerHour;
				break;
		}
	}
	else {
		switch (unit) {
			case EnumUnitTypes.Miles:
				mappedTranslatedUnit = EnumMappedUnitTypes.Kilometers;
				unit = EnumUnitTypes.Kilometers;
				break;
			case EnumUnitTypes.MilesPerHour:
				mappedTranslatedUnit = EnumMappedUnitTypes.KilometersPerHour;
				unit = EnumUnitTypes.KilometersPerHour;
				break;
		}
	}
	// We store things in metric, so if they're coming from imperial, let's make sure we reverse it
	if (reverse && measurementSystem === "imperial") {
		const temp = mappedUnit;
		mappedUnit = mappedTranslatedUnit;
		mappedTranslatedUnit = temp;
		unit = imperialToMetric(unit);
	}
	if (mappedUnit && mappedTranslatedUnit) {
		parsedValue = convert(parsedValue, mappedUnit).to(mappedTranslatedUnit);
	}
	return {
		unit,
		value: parsedValue.toString(),
	};
}

/**
 * This is only used for initially importing data (from Strava currently) and converting it to its more appropriate
 * storage value.
 */
export function convertToUnit({ unit, unitTo, value }: IValueConvert): IValueToLocalUnitResponse {
	let parsedValue = parseFloat(value);
	const mappedUnit = unit !== undefined && mapUnit(unit);
	const mappedUnitTo = unitTo !== undefined && mapUnit(unitTo);
	if (!(mappedUnit && mappedUnitTo)) {
		return {
			value,
			unit,
		};
	}
	switch (unit) {
		case EnumUnitTypes.MetersPerSecond:
			if (mappedUnitTo === EnumMappedUnitTypes.KilometersPerHour) {
				parsedValue *= SecondsInHour;
			}
			break;
	}
	return {
		value: convert(parsedValue, mappedUnit).to(mappedUnitTo).toString(),
		unit: unitTo,
	};
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}
	else if (typeof error === "string") {
		return error;
	}
	return "";
}
