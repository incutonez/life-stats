import { ApplicationNestedViewModel } from "@/viewModels/application.viewmodel";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export class CompanyViewModel extends BaseViewModel {
    declare id: string;
    declare name: string;
}

export class CompanyFullViewModel extends CompanyViewModel {
    declare applications: ApplicationNestedViewModel[];
}

export class CompanyListViewModel extends GetResponseModel<CompanyViewModel>(CompanyViewModel) {}

export class CompanyFullListViewModel extends GetResponseModel<CompanyFullViewModel>(CompanyFullViewModel) {}
