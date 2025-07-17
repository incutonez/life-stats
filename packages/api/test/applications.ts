import { vi } from "vitest";
import { APPLICATIONS_REPOSITORY, EnumApplicationStatus, EnumLocationTypes } from "@/jobs/constants";
import { IApplicationModel } from "@/jobs/models/ApplicationModel";
import { ICompanyModel } from "@/jobs/models/CompanyModel";
import { ApplicationViewModel } from "@/jobs/viewModels/application.viewmodel";
import { CompanyViewModel } from "@/jobs/viewModels/company.viewmodel";
import { DefaultCreatedAt, DefaultUpdatedAt } from "./shared";
import { TestUsers } from "./users";

export const TestCompanies: ICompanyModel[] = [{
	id: "8af24365-0149-4ca0-9358-388cac8509ec",
	name: "Test Company 1",
	user_id: TestUsers[0].user_id,
	created_at: DefaultCreatedAt,
	updated_at: DefaultUpdatedAt,
}];

export const TestCompaniesViewModels: CompanyViewModel[] = [{
	id: "8af24365-0149-4ca0-9358-388cac8509ec",
	name: "Test Company 1",
	userId: TestUsers[0].user_id,
	dateCreated: DefaultCreatedAt.getTime(),
	dateUpdated: DefaultUpdatedAt.getTime(),
}];

export const TestApplications: IApplicationModel[] = [{
	id: "6fae8d19-fe5c-4ed8-9010-2a86328e97f3",
	position_title: "Front-end Developer",
	date_applied: 1746676800000,
	url: "www.linkedin.com",
	compensation: "$100K",
	status: EnumApplicationStatus.Applied,
	location_type: EnumLocationTypes.Remote,
	company_id: TestCompanies[0].id,
	company: TestCompanies[0],
	comments: [],
	user_id: TestUsers[0].user_id,
	created_at: DefaultCreatedAt,
	updated_at: DefaultUpdatedAt,
}];

export const TestApplicationsViewModels: ApplicationViewModel[] = [{
	id: "6fae8d19-fe5c-4ed8-9010-2a86328e97f3",
	url: "www.linkedin.com",
	site: "LinkedIn",
	status: EnumApplicationStatus.Applied,
	locationType: EnumLocationTypes.Remote,
	compensation: "$100K",
	positionTitle: "Front-end Developer",
	company: TestCompaniesViewModels[0],
	comments: [],
	links: [],
	userId: TestUsers[0].user_id,
	dateApplied: 1746676800000,
	dateCreated: DefaultCreatedAt.getTime(),
	dateUpdated: DefaultUpdatedAt.getTime(),
}];

export const TestApplicationsRepository = {
	provide: APPLICATIONS_REPOSITORY,
	useValue: {
		findAndCountAll: vi.fn(() => {
			return {
				rows: TestApplications,
				count: TestApplications.length,
			};
		}),
	},
};
