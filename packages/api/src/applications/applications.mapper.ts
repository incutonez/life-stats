import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { differenceInWeeks } from "date-fns";
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
	IApplicationCreateViewModel,
	IApplicationUpdateViewModel,
	IApplicationViewModel,
} from "@/viewModels/application.viewmodel";
import { ICommentViewModel } from "@/viewModels/comment.viewmodel";

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

	entityToViewModel({ id, company, position_title, date_applied, url, compensation, order, comments }: ApplicationModel): IApplicationViewModel {
		const difference = differenceInWeeks(Date.now(), date_applied);
		if (difference === 0 && order === EnumApplicationStatus.NoStatus) {
			// Either use the existing order that has been set or default it to be this week
			order = EnumApplicationStatus.CurrentWeek;
		}
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
		return {
			id,
			url,
			compensation,
			order,
			site,
			positionTitle: position_title,
			dateApplied: date_applied,
			company: this.companiesMapper.entityToViewModel(company),
			comments: comments.map((comment) => this.commentsMapper.entityToViewModel(comment)) ?? [],
		};
	}

	csvModelToViewModel({ Company, CompanyName = "", Comments, Link, Pay, Role, Order, "Date Applied": dateApplied }: IUploadModel): IApplicationCreateViewModel {
		const comments: ICommentViewModel[] = Comments ? Comments.split(/\r\n/g).map((comment) => {
			return {
				id: "",
				comment,
			};
		}) : [];
		return {
			comments,
			dateApplied: new Date(dateApplied).getTime(),
			url: Link,
			compensation: Pay,
			order: parseInt(Order, 10) as EnumApplicationStatus,
			positionTitle: Role,
			company: {
				id: Company,
				name: CompanyName,
			},
		};
	}

	viewModelToEntity({ id, compensation, company, order, url, positionTitle, dateApplied }: IApplicationUpdateViewModel): IApplicationUpdateModel {
		return {
			id,
			compensation,
			order,
			url,
			position_title: positionTitle,
			date_applied: dateApplied,
			company_id: company.id,
		};
	}

	createViewModelToEntity({ compensation, company, order, url, positionTitle, dateApplied }: IApplicationCreateViewModel): IApplicationCreateModel {
		return {
			compensation,
			order,
			url,
			position_title: positionTitle,
			date_applied: dateApplied,
			company_id: company.id,
		};
	}
}
