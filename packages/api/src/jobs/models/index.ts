import { Provider } from "@nestjs/common";
import { APPLICATIONS_REPOSITORY, COMPANIES_REPOSITORY } from "@/jobs/constants";
import { ApplicationLinkedModel } from "@/jobs/models/ApplicationLinkedModel";
import { ApplicationModel } from "@/jobs/models/ApplicationModel";
import { CommentModel } from "@/jobs/models/CommentModel";
import { CompanyModel } from "@/jobs/models/CompanyModel";

export const JobModels = [ApplicationModel, CommentModel, CompanyModel, ApplicationLinkedModel];

export const ApplicationsRepository: Provider = {
	provide: APPLICATIONS_REPOSITORY,
	useValue: ApplicationModel,
};

export const CompaniesRepository: Provider = {
	provide: COMPANIES_REPOSITORY,
	useValue: CompanyModel,
};

export type ApplicationsRepository = typeof ApplicationModel;

export type CompaniesRepository = typeof CompanyModel;
