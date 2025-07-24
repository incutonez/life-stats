import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export function ApiEnum(value: Record<string, Record<string, unknown>>) {
	const [enumName] = Object.keys(value);
	const enumValue = value[enumName];
	return ApiProperty({
		enum: enumValue,
		enumName,
		/**
		 * It's good to note that we convert this to x-enum-varnames in the spec dir before generating the resulting
		 * generated and dist dirs... this is because the OpenAPI TypeScript generator uses x-enum-varnames, and we
		 * can't specify this here
		 */
		"x-enumNames": Object.keys(enumValue),
	});
}

export function TransformNull() {
	return Transform(({ value }) => value || undefined);
}
