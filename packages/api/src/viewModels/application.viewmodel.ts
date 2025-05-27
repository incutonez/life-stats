import { ApiProperty, OmitType } from "@nestjs/swagger";
import { GetResponseModel } from "src/viewModels/base.list.viewmodel";
import { EnumApplicationStatus, ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { CommentViewModel } from "@/viewModels/comment.viewmodel";
import { CompanyViewModel } from "@/viewModels/company.viewmodel";

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
		declare userId: string;
    declare positionTitle: string;
    declare dateApplied: number;
    declare url: string;
    declare site: string;
    declare compensation: string;
    @ApiProperty({
    	enum: EnumApplicationStatus,
    	enumName: "EnumApplicationStatus",
    	/**
         * It's good to note that we convert this to x-enum-varnames in the spec dir before generating the resulting
         * generated and dist dirs... this is because the OpenAPI TypeScript generator uses x-enum-varnames, and we
         * can't specify this here
         */
    	"x-enumNames": Object.keys(EnumApplicationStatus),
    })
    declare status: EnumApplicationStatus;
    declare company: CompanyViewModel;
    declare comments: CommentViewModel[];
}

export class ApplicationNestedViewModel extends OmitType(ApplicationViewModel, ["company"]) {}

export class ApplicationListViewModel extends GetResponseModel<ApplicationViewModel>(ApplicationViewModel) {}
