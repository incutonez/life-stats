import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { differenceInWeeks, endOfDay, isSunday, nextSunday } from "date-fns";
import { v4 as getUUID } from "uuid";
import { CommentsMapper } from "@/applications/comments.mapper";
import { IUploadModel } from "@/applications/types";
import { AuthStorageService } from "@/auth/auth.storage.service";
import { CompaniesMapper } from "@/companies/companies.mapper";
import { AUTH_STORAGE } from "@/constants";
import { ApplicationModel, IApplicationCreateModel, IApplicationUpdateModel } from "@/db/models/ApplicationModel";
import { EnumApplicationStatus } from "@/types";
import {
	IApplicationCreateViewModel,
	IApplicationNestedViewModel,
	IApplicationUpdateViewModel,
	IApplicationViewModel,
} from "@/viewModels/application.viewmodel";

const DomainRegex = /https?:\/\/.*?([^./]+?\.[^.]+?(?:\.\w{2})?)(?:\/|$)/;

function getStatusFromApplied(status: EnumApplicationStatus, dateApplied: number) {
	let endOfWeekDate = endOfDay(Date.now());
	// We use Sunday as the end of the week, and that's the range we want to use for our difference check
	if (!isSunday(endOfWeekDate)) {
		endOfWeekDate = nextSunday(endOfWeekDate);
	}
	const difference = differenceInWeeks(endOfWeekDate, dateApplied);
	if (difference === 0 && status === EnumApplicationStatus.Applied) {
		// Either use the existing order that has been set or default it to be this week
		status = EnumApplicationStatus.CurrentWeek;
	}
	return status;
}

@Injectable()
export class ApplicationsMapper implements OnModuleInit {
	declare private companiesMapper: CompaniesMapper;

	constructor(private readonly moduleRef: ModuleRef, private commentsMapper: CommentsMapper, @Inject(AUTH_STORAGE) private authStorageService: AuthStorageService) {
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

	/**
	 * There are times (like when we do GET applicationId), where we want to use the actual status and not the altered one
	 * we use in the list, which is why we have the rawStatus param
	 */
	entityToViewModel({ id, updated_at, created_at, user_id, company, position_title, date_applied, url, compensation, status, comments }: ApplicationModel, rawStatus = false): IApplicationViewModel {
		return {
			id,
			url,
			compensation,
			status: rawStatus ? status : getStatusFromApplied(status, date_applied),
			userId: user_id,
			site: this.urlToSite(url),
			positionTitle: position_title,
			dateCreated: created_at!.getTime(),
			dateUpdated: updated_at!.getTime(),
			dateApplied: date_applied,
			company: this.companiesMapper.entityToViewModel(company),
			comments: comments.map((comment) => this.commentsMapper.entityToViewModel(comment)) ?? [],
		};
	}

	entityNestedToViewModel({ id, updated_at, user_id, created_at, position_title, date_applied, url, compensation, status, comments }: ApplicationModel): IApplicationNestedViewModel {
		return {
			id,
			url,
			compensation,
			status: getStatusFromApplied(status, date_applied),
			userId: user_id,
			site: this.urlToSite(url),
			positionTitle: position_title,
			dateCreated: created_at!.getTime(),
			dateUpdated: updated_at!.getTime(),
			dateApplied: date_applied,
			comments: comments.map((comment) => this.commentsMapper.entityToViewModel(comment)) ?? [],
		};
	}

	csvModelToViewModel({ company, comments, url = "", compensation, positionTitle, status, dateApplied }: IUploadModel): IApplicationCreateViewModel {
		const userId = this.authStorageService.getUserId();
		return {
			url,
			compensation,
			positionTitle,
			userId,
			comments: comments ? comments.split(/\r\n|\n|\r/g).map((comment) => {
				return {
					userId,
					comment,
					id: getUUID(),
					applicationId: "",
				};
			}) : [],
			dateApplied: new Date(dateApplied).getTime(),
			status: parseInt(status, 10) as EnumApplicationStatus,
			company: {
				userId,
				id: getUUID(),
				name: company,
			},
		};
	}

	viewModelToEntity({ id, compensation, userId, company, status, url, positionTitle, dateApplied }: IApplicationUpdateViewModel): IApplicationUpdateModel {
		return {
			id,
			compensation,
			status,
			url,
			user_id: userId ?? this.authStorageService.getUserId(),
			position_title: positionTitle,
			date_applied: dateApplied,
			company_id: company.id,
			updated_at: new Date(),
		};
	}

	createViewModelToEntity({ compensation, company, status, url, positionTitle, dateApplied }: IApplicationCreateViewModel, useAppliedDate = false): IApplicationCreateModel {
		return {
			compensation,
			status,
			url,
			user_id: this.authStorageService.getUserId(),
			created_at: useAppliedDate ? new Date(dateApplied) : undefined,
			position_title: positionTitle,
			date_applied: dateApplied,
			company_id: company.id,
		};
	}
}
