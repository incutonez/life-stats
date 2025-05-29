export function isObject(value: unknown) {
	return value && typeof value === "object" && !Array.isArray(value);
}
