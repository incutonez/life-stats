import { ApiProperty } from "@nestjs/swagger";
import { EnumAuditActionTypes } from "@/constants";
import { ModelInterface } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";

export type IAuditViewModel = ModelInterface<AuditViewModel>;

export type IAuditDiffViewModel = ModelInterface<AuditDiffViewModel>;

export class AuditDiffViewModel {
	@ApiProperty({
		enum: EnumAuditActionTypes,
		enumName: "EnumAuditActionTypes",
		/**
		 * It's good to note that we convert this to x-enum-varnames in the spec dir before generating the resulting
		 * generated and dist dirs... this is because the OpenAPI TypeScript generator uses x-enum-varnames, and we
		 * can't specify this here
		 */
		"x-enumNames": Object.keys(EnumAuditActionTypes),
	})
	declare action: EnumAuditActionTypes;

	declare field: string;

	declare valueCurrent?: string | number;

	declare valuePrevious?: string | number;
}

export class AuditViewModel {
	declare id: string;

	declare userId: string;

	declare entity: string;

	@ApiProperty({
		enum: EnumAuditActionTypes,
		enumName: "EnumAuditActionTypes",
		/**
		 * It's good to note that we convert this to x-enum-varnames in the spec dir before generating the resulting
		 * generated and dist dirs... this is because the OpenAPI TypeScript generator uses x-enum-varnames, and we
		 * can't specify this here
		 */
		"x-enumNames": Object.keys(EnumAuditActionTypes),
	})
	declare action: EnumAuditActionTypes;

	declare diff: AuditDiffViewModel[];

	declare dateCreated: number;
}

export class AuditListViewModel extends GetResponseModel<AuditViewModel>(AuditViewModel) {}
