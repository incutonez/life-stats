export function isObject(value: unknown) {
	return value && typeof value === "object" && !Array.isArray(value);
}

export function addMetaInfo(value: Record<string, unknown>, user_id: string, created_at?: Date, updated_at?: Date) {
	Object.assign(value, {
		userId: user_id,
		dateCreated: created_at?.getTime(),
		dateUpdated: updated_at?.getTime(),
	});
}
