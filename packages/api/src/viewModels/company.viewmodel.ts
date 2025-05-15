import { ApplicationViewModel } from "@/viewModels/application.viewmodel";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";

export class CompanyViewModel {
    declare id: string;
    declare name: string;
}

export class CompanyFullViewModel extends CompanyViewModel {
    declare applications: ApplicationViewModel[];
}

export class CompanyListViewModel extends GetResponseModel<CompanyViewModel>(CompanyViewModel) {}

export class CompanyFullListViewModel extends GetResponseModel<CompanyFullViewModel>(CompanyFullViewModel) {}
