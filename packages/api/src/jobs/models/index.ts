import { APPLICATIONS_REPOSITORY } from "@/jobs/constants";
import { ApplicationLinkedModel } from "@/jobs/models/ApplicationLinkedModel";
import { ApplicationModel } from "@/jobs/models/ApplicationModel";
import { CommentModel } from "@/jobs/models/CommentModel";
import { CompanyModel } from "@/jobs/models/CompanyModel";

export const JobModels = [ApplicationModel, CommentModel, CompanyModel, ApplicationLinkedModel];

export const applicationsProvider = {
	provide: APPLICATIONS_REPOSITORY,
	useValue: ApplicationModel,
};

export type ApplicationProvider = typeof ApplicationModel;
