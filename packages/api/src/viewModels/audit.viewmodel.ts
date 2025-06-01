import { EnumAuditActionTypes, EnumTableNames } from "@/constants";
import { ModelInterface } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { ApiEnum } from "@/viewModels/decorators";

export type IAuditViewModel = ModelInterface<AuditViewModel>;

export type IAuditDiffViewModel = ModelInterface<AuditDiffViewModel>;

export class AuditDiffViewModel {
	@ApiEnum({
		EnumAuditActionTypes,
	})
	declare action: EnumAuditActionTypes;

	declare field: string;

	declare valueCurrent?: string | number;

	declare valuePrevious?: string | number;
}

export class AuditViewModel {
	declare id: string;

	declare userId: string;

	@ApiEnum({
		EnumTableNames,
	})
	declare entity: EnumTableNames;

	declare entityId: string;

	@ApiEnum({
		EnumAuditActionTypes,
	})
	declare action: EnumAuditActionTypes;

	declare diff: AuditDiffViewModel[];

	declare dateCreated: number;
}

export class AuditListViewModel extends GetResponseModel<AuditViewModel>(AuditViewModel) {}
