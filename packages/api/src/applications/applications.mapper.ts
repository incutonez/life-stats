import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { differenceInWeeks } from "date-fns";
import { v4 as getUUID } from "uuid";
import { CommentsMapper } from "@/applications/comments.mapper";
import { IUploadModel } from "@/applications/types";
import { CompaniesMapper } from "@/companies/companies.mapper";
import {
	ApplicationModel,
	IApplicationCreateModel,
	IApplicationUpdateModel,
} from "@/db/models/ApplicationModel";
import { EnumApplicationStatus } from "@/types";
import {
	IApplicationCreateViewModel, IApplicationNestedViewModel,
	IApplicationUpdateViewModel,
	IApplicationViewModel,
} from "@/viewModels/application.viewmodel";

const DomainRegex = /https?:\/\/.*?([^./]+?\.[^.]+?(?:\.\w{2})?)(?:\/|$)/;

@Injectable()
export class ApplicationsMapper implements OnModuleInit {
	declare private companiesMapper: CompaniesMapper;

	constructor(private readonly moduleRef: ModuleRef, private commentsMapper: CommentsMapper) {
	}

	onModuleInit() {
		this.companiesMapper = this.moduleRef.get(CompaniesMapper, {
			strict: false,
		});
	}

	urlToSite(url: string) {
		let site = "";
		if (url.toLowerCase().includes("linkedin")) {
			site = "LinkedIn";
		}
		else if (url.includes("indeed")) {
			site = "Indeed";
		}
		else if (url.includes("reddit")) {
			site = "Reddit";
		}
		else if (url.includes("vuejobs")) {
			site = "VueJobs";
		}
		else {
			site = url.match(DomainRegex)?.[1]?.replace(/\..*/, "") ?? "";
			if (site) {
				site = site[0].toUpperCase() + site.substring(1);
			}
		}
		return site;
	}

	entityToViewModel({ id, updated_at, created_at, company, position_title, date_applied, url, compensation, status, comments }: ApplicationModel): IApplicationViewModel {
		const difference = differenceInWeeks(Date.now(), date_applied);
		if (difference === 0 && status === EnumApplicationStatus.Applied) {
			// Either use the existing order that has been set or default it to be this week
			status = EnumApplicationStatus.CurrentWeek;
		}
		return {
			id,
			url,
			compensation,
			status,
			site: this.urlToSite(url),
			positionTitle: position_title,
			dateCreated: created_at!.getTime(),
			dateUpdated: updated_at!.getTime(),
			dateApplied: date_applied,
			company: this.companiesMapper.entityToViewModel(company),
			comments: comments.map((comment) => this.commentsMapper.entityToViewModel(comment)) ?? [],
		};
	}

	entityNestedToViewModel({ id, updated_at, created_at, position_title, date_applied, url, compensation, status, comments }: ApplicationModel): IApplicationNestedViewModel {
		const difference = differenceInWeeks(Date.now(), date_applied);
		if (difference === 0 && status === EnumApplicationStatus.Applied) {
			// Either use the existing order that has been set or default it to be this week
			status = EnumApplicationStatus.CurrentWeek;
		}
		return {
			id,
			url,
			compensation,
			status,
			site: this.urlToSite(url),
			positionTitle: position_title,
			dateCreated: created_at!.getTime(),
			dateUpdated: updated_at!.getTime(),
			dateApplied: date_applied,
			comments: comments.map((comment) => this.commentsMapper.entityToViewModel(comment)) ?? [],
		};
	}

	csvModelToViewModel({ company, comments, url = "", compensation, positionTitle, status, dateApplied }: IUploadModel): IApplicationCreateViewModel {
		return {
			url,
			compensation,
			positionTitle,
			comments: comments ? comments.split(/\r\n|\n|\r/g).map((comment) => {
				return {
					id: getUUID(),
					comment,
				};
			}) : [],
			dateApplied: new Date(dateApplied).getTime(),
			status: parseInt(status, 10) as EnumApplicationStatus,
			company: {
				id: getUUID(),
				name: company,
			},
		};
	}

	viewModelToEntity({ id, compensation, company, status, url, positionTitle, dateApplied }: IApplicationUpdateViewModel): IApplicationUpdateModel {
		return {
			id,
			compensation,
			status,
			url,
			position_title: positionTitle,
			date_applied: dateApplied,
			company_id: company.id,
		};
	}

	createViewModelToEntity({ compensation, company, status, url, positionTitle, dateApplied }: IApplicationCreateViewModel, useAppliedDate = false): IApplicationCreateModel {
		return {
			compensation,
			status,
			url,
			created_at: useAppliedDate ? new Date(dateApplied) : undefined,
			position_title: positionTitle,
			date_applied: dateApplied,
			company_id: company.id,
		};
	}
}
