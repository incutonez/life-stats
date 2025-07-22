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
	id?: string;

	declare positionTitle: string;

	declare dateApplied: number;

	declare url: string;

	declare compensation: string;

	@ApiEnum({
		EnumApplicationStatus,
	})
	declare status: EnumApplicationStatus;

	@ApiEnum({
		EnumLocationTypes,
	})
	declare locationType: EnumLocationTypes;

	declare company: CompanyViewModel;

	declare comments: CommentViewModel[];

	links?: ApplicationLinkViewModel[];

	site?: string = "";
}

export class ApplicationLinkViewModel extends BaseViewModel {
	id: string = "";

	@ApiEnum({
		EnumLinkType,
	})
	declare type: EnumLinkType;

	positionTitle?: string;

	@ApiEnum({
		EnumApplicationStatus,
	})
	status?: EnumApplicationStatus;

	dateApplied?: number;
}

export class ApplicationNestedViewModel extends OmitType(ApplicationViewModel, ["company"]) {}

export class ApplicationListViewModel extends GetResponseModel<ApplicationViewModel>(ApplicationViewModel) {}
