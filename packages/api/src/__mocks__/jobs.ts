import { faker } from "@faker-js/faker";
import { expect } from "vitest";
import { TestUser } from "@/__mocks__/users";
import { EnumApplicationStatus, EnumLocationTypes } from "@/jobs/constants";
import { urlToSite } from "@/jobs/utils";
import {
	ApplicationNestedViewModel,
	IApplicationCreateViewModel,
	IApplicationViewModel,
} from "@/jobs/viewModels/application.viewmodel";
import { CompanyFullViewModel } from "@/jobs/viewModels/company.viewmodel";
import { ModelInterface } from "@/types";

export function mockApplicationCreate(): IApplicationViewModel {
	const url = faker.internet.url();
	return {
		url,
		status: EnumApplicationStatus.Applied,
		locationType: EnumLocationTypes.Remote,
		compensation: `${faker.finance.amount({
			symbol: "$",
		})}`,
		positionTitle: faker.person.jobTitle(),
		company: {
			name: faker.company.name(),
			userId: TestUser.user_id,
		},
		comments: [{
			comment: faker.lorem.paragraphs(),
			userId: TestUser.user_id,
		}, {
			comment: faker.lorem.paragraphs(),
			userId: TestUser.user_id,
		}],
		links: [],
		userId: TestUser.user_id,
		dateApplied: faker.date.soon().getTime(),
	};
}

export function mockApplicationExpected(viewModel: IApplicationCreateViewModel): IApplicationViewModel {
	const expected = structuredClone(viewModel) as IApplicationViewModel;
	expected.site = urlToSite(viewModel.url);
	expected.id = expect.any(String);
	expected.dateCreated = expect.any(Number);
	expected.dateUpdated = expect.any(Number);
	expected.company.id = expect.any(String);
	expected.company.dateCreated = expect.any(Number);
	expected.company.dateUpdated = expect.any(Number);
	expected.status = expect.any(Number);
	sortApplicationComments([expected]);
	expected.comments.forEach((record) => {
		record.id = expect.any(String);
		record.applicationId = expected.id;
		record.dateCreated = expect.any(Number);
		record.dateUpdated = expect.any(Number);
	});
	expected.links?.forEach((record) => {
		record.positionTitle = expect.any(String);
		record.dateApplied = expect.any(Number);
		record.status = expect.any(Number);
	});
	return expected;
}

export function mockCompanyListExpected(viewModels: IApplicationViewModel[]): ModelInterface<CompanyFullViewModel>[] {
	return viewModels.map((viewModel) => {
		const { company, ...application } = mockApplicationExpected(viewModel);
		delete application.links;
		application.status = EnumApplicationStatus.CurrentWeek;
		return {
			...company,
			applications: [application],
		};
	});
}

export function sortApplicationComments(viewModels: IApplicationViewModel[] | ApplicationNestedViewModel[]) {
	viewModels.forEach((viewModel) => viewModel.comments.sort((lhs, rhs) => lhs.comment.localeCompare(rhs.comment)));
}
