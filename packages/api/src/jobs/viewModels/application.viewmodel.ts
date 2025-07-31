import { OmitType } from "@nestjs/swagger";
import { EnumApplicationStatus, EnumLinkType, EnumLocationTypes } from "@/jobs/constants";
import { CommentViewModel } from "@/jobs/viewModels/comment.viewmodel";
import { CompanyViewModel } from "@/jobs/viewModels/company.viewmodel";
import { ModelInterface, OmitRecursively } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";

export type IApplicationViewModel = ModelInterface<ApplicationViewModel>;

export type IApplicationUpdateViewModel = Omit<IApplicationViewModel, "site">;

export type IApplicationCreateViewModel = OmitRecursively<IApplicationViewModel, "id" | "site" | "applicationId">;

export type IApplicationNestedViewModel = Omit<IApplicationViewModel, "company">;

export type IApplicationLinkViewModel = ModelInterface<ApplicationLinkViewModel>;

export class ApplicationViewModel extends BaseViewModel {
	positionTitle: string;

	dateApplied: number;

	url: string;

	compensation: string;

	@ApiEnum({
		EnumApplicationStatus,
	})
	status: EnumApplicationStatus;

	@ApiEnum({
		EnumLocationTypes,
	})
	locationType: EnumLocationTypes;

	company: CompanyViewModel;

	comments: CommentViewModel[];

	links?: ApplicationLinkViewModel[];

	site?: string = "";
}

export class ApplicationLinkViewModel extends BaseViewModel {
	// This ID is required, so we override BaseViewModel's impl
	declare id: string;

	@ApiEnum({
		EnumLinkType,
	})
	type: EnumLinkType;

	positionTitle?: string;

	@ApiEnum({
		EnumApplicationStatus,
	})
	status?: EnumApplicationStatus;

	dateApplied?: number;
}

export class ApplicationNestedViewModel extends OmitType(ApplicationViewModel, ["company"]) {}

export class ApplicationListViewModel extends GetResponseModel<ApplicationViewModel>(ApplicationViewModel) {}
