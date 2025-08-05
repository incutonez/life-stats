import { EnumAuditActionTypes, EnumFeatures, EnumTableNames } from "@/constants";
import { ModelInterface } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { ApiEnum } from "@/viewModels/decorators";

export type IAuditViewModel = ModelInterface<AuditViewModel>;

export type IAuditDiffViewModel = ModelInterface<AuditDiffViewModel>;

export class AuditDiffViewModel {
	@ApiEnum({
		EnumAuditActionTypes,
	})
	action: EnumAuditActionTypes;

	field: string;

	valueCurrent?: string | number;

	valuePrevious?: string | number;
}

export class AuditViewModel {
	id: string;

	userId: string;

	@ApiEnum({
		EnumTableNames,
	})
	entity: EnumTableNames;

	entityId: string;

	@ApiEnum({
		EnumAuditActionTypes,
	})
	action: EnumAuditActionTypes;

	@ApiEnum({
		EnumFeatures,
	})
	feature: EnumFeatures;

	diff: AuditDiffViewModel[];

	dateCreated: number;
}

export class AuditListViewModel extends GetResponseModel<AuditViewModel>(AuditViewModel) {}
