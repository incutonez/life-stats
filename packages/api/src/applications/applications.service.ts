import { Injectable } from "@nestjs/common";
import Papa from "papaparse";
import { ApplicationsMapper } from "src/applications/applications.mapper";
import { CommentsMapper } from "@/applications/comments.mapper";
import { IUploadModel } from "@/applications/types";
import { CompaniesService } from "@/companies/companies.service";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { CommentModel } from "@/db/models/CommentModel";
import {
	ApplicationListViewModel, IApplicationBulkViewModel,
	IApplicationCreateViewModel, IApplicationUpdateViewModel,
	IApplicationViewModel,
} from "@/viewModels/application.viewmodel";
import { ApiPaginatedRequest } from "@/viewModels/base.list.viewmodel";
import { ICommentViewModel } from "@/viewModels/comment.viewmodel";

@Injectable()
export class ApplicationsService {
	constructor(private mapper: ApplicationsMapper, private commentsMapper: CommentsMapper, private companiesService: CompaniesService) {
	}

	async listApplications(_params: ApiPaginatedRequest): Promise<ApplicationListViewModel> {
		const { rows, count } = await ApplicationModel.findAndCountAll({
			include: [{
				all: true,
				nested: true,
			}],
		});
		return {
			data: rows.map((record) => this.mapper.entityToViewModel(record)),
			total: count,
		};
	}

	async getApplicationRaw(id: string) {
		return ApplicationModel.findByPk(id, {
			include: [{
				all: true,
				nested: true,
			}],
		});
	}

	async getApplication(id: string) {
		const entity = await this.getApplicationRaw(id);
		if (entity) {
			return this.mapper.entityToViewModel(entity);
		}
	}

	async deleteApplication(id: string) {
		return ApplicationModel.destroy({
			where: {
				id,
			},
		});
	}

	async createApplication(model: IApplicationCreateViewModel) {
		model.company = await this.companiesService.createCompany(model.company.name);
		const entity = await ApplicationModel.create(this.mapper.createViewModelToEntity(model), {
			raw: true,
		});
		const { id } = entity;
		await Promise.all(model.comments.map((comment) => {
			comment.applicationId = id;
			return this.createApplicationComment(comment);
		}));
		return this.getApplication(id);
	}

	async createApplications(models: IApplicationCreateViewModel[]) {
		const results: IApplicationBulkViewModel = {
			successful: 0,
			errors: [],
		};
		for (const model of models) {
			try {
				await this.createApplication(model);
				results.successful++;
			}
			catch (ex) {
				results.errors.push(ex as string);
			}
		}
		return results;
	}

	async updateApplication(model: IApplicationUpdateViewModel) {
		model.company = await this.companiesService.createCompany(model.company.name);
		const record = await this.getApplicationRaw(model.id);
		if (record) {
			await record.update(this.mapper.viewModelToEntity(model));
			for (const modelComment of model.comments) {
				const { id } = modelComment;
				const found = record.comments.find((comment) => comment.id === id);
				if (found) {
					// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
					record.comments.splice(record.comments.indexOf(found), 1);
					if (found.comment !== modelComment.comment) {
						await found.update(modelComment);
					}
				}
				// New comment
				else {
					modelComment.applicationId = model.id;
					await this.createApplicationComment(modelComment);
				}
			}
			await Promise.all(record.comments.map((comment) => comment.destroy()));
			return this.getApplication(model.id);
		}
	}

	async createApplicationComment(model: ICommentViewModel) {
		const entity = await CommentModel.create(this.commentsMapper.createViewModelToEntity(model), {
			raw: true,
		});
		return this.commentsMapper.entityToViewModel(entity);
	}

	async uploadApplications(file: Express.Multer.File) {
		const results: IApplicationViewModel[] = [];
		const data = Papa.parse<IUploadModel>(file.buffer.toString("utf8"), {
			header: true,
			transform(value, column) {
				if (column === "Order") {
					return value ? parseInt(value, 10) : -1;
				}
				else if (column === "Date Applied") {
					return new Date(value).getTime();
				}
				return value;
			},
		});
		for (const record of data.data) {
			if (record.Company) {
				const company = await this.companiesService.createCompany(record.Company);
				// Replace company name with its DB ID
				record.Company = company.id;
				record.CompanyName = company.name;
				const response = await this.createApplication(this.mapper.csvModelToViewModel(record));
				if (response) {
					results.push(response);
				}
			}
		}
		return results;
	}
}
