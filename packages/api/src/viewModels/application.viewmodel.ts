import { OmitType } from "@nestjs/swagger";
import { EnumApplicationStatus, ModelInterface } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { CommentViewModel } from "@/viewModels/comment.viewmodel";
import { CompanyViewModel } from "@/viewModels/company.viewmodel";
import { ApiEnum } from "@/viewModels/decorators";

export type IApplicationViewModel = ModelInterface<ApplicationViewModel>;

export type IApplicationUpdateViewModel = Omit<IApplicationViewModel, "site">;

export type IApplicationCreateViewModel = Omit<IApplicationViewModel, "id" | "site">;

export type IApplicationBulkViewModel = ModelInterface<ApplicationBulkViewModel>;

export type IApplicationNestedViewModel = Omit<IApplicationViewModel, "company">;

export class ApplicationBulkViewModel {
	declare successful: number;

	declare errors: string[];
}

export class ApplicationViewModel extends BaseViewModel {
	declare id: string;

	declare positionTitle: string;

	declare dateApplied: number;

	declare url: string;

	declare site: string;

	declare compensation: string;

	@ApiEnum({
		EnumApplicationStatus,
	})
	declare status: EnumApplicationStatus;

	declare company: CompanyViewModel;

	declare comments: CommentViewModel[];
}

export class ApplicationNestedViewModel extends OmitType(ApplicationViewModel, ["company"]) {}

export class ApplicationListViewModel extends GetResponseModel<ApplicationViewModel>(ApplicationViewModel) {}
