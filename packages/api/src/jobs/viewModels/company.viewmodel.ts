import { ApplicationNestedViewModel } from "@/jobs/viewModels/application.viewmodel";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export class CompanyViewModel extends BaseViewModel {
	name: string;
}

export class CompanyFullViewModel extends CompanyViewModel {
	applications: ApplicationNestedViewModel[];
}

export class CompanyListViewModel extends GetResponseModel<CompanyViewModel>(CompanyViewModel) {}

export class CompanyFullListViewModel extends GetResponseModel<CompanyFullViewModel>(CompanyFullViewModel) {}
