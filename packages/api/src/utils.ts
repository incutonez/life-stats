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

export function addMetaInfo(value: Record<string, unknown>, user_id: string, created_at?: Date, updated_at?: Date) {
	Object.assign(value, {
		userId: user_id,
		dateCreated: created_at?.getTime(),
		dateUpdated: updated_at?.getTime(),
	});
}

export interface IValueToLocalUnit {
	value: string;
	measurementSystem: "imperial" | "metric";
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

export function valueToLocalUnit({ value, unit, measurementSystem, unitTo }: IValueToLocalUnit): IValueToLocalUnitResponse {
	let parsedValue = parseFloat(value);
	const mappedUnit = unit !== undefined && mapUnit(unit);
	const mappedUnitTo = unitTo !== undefined && mapUnit(unitTo);
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
				unitTo = EnumUnitTypes.Miles;
				break;
			case EnumUnitTypes.Meters:
				mappedTranslatedUnit = EnumMappedUnitTypes.Feet;
				unitTo = EnumUnitTypes.Feet;
				break;
			case EnumUnitTypes.MetersPerSecond:
				mappedTranslatedUnit = EnumMappedUnitTypes.MilesPerHour;
				unitTo = EnumUnitTypes.MilesPerHour;
				if (mappedUnitTo === EnumMappedUnitTypes.KilometersPerHour) {
					parsedValue *= SecondsInHour;
				}
				break;
		}
	}
	else {
		switch (unit) {
			case EnumUnitTypes.MetersPerSecond:
				mappedTranslatedUnit = EnumMappedUnitTypes.KilometersPerHour;
				unitTo = EnumUnitTypes.KilometersPerHour;
				if (mappedUnitTo === EnumMappedUnitTypes.MilesPerHour) {
					parsedValue *= SecondsInHour;
				}
				break;
		}
	}
	if (mappedUnitTo) {
		parsedValue = convert(parsedValue, mappedUnit).to(mappedUnitTo);
	}
	if (mappedTranslatedUnit) {
		parsedValue = convert(parsedValue, mappedUnitTo || mappedUnit).to(mappedTranslatedUnit);
	}
	return {
		value: parsedValue.toString(),
		unit: unitTo,
	};
}
