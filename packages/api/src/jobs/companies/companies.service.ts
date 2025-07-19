import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { CompaniesMapper } from "@/jobs/companies/companies.mapper";
import { COMPANIES_REPOSITORY } from "@/jobs/constants";
import { type CompaniesRepository } from "@/jobs/models";
import { CompanyFullListViewModel, CompanyListViewModel } from "@/jobs/viewModels/company.viewmodel";

@Injectable()
export class CompaniesService {
	constructor(@Inject(COMPANIES_REPOSITORY) private readonly repository: CompaniesRepository, private readonly mapper: CompaniesMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	async getCompanies(): Promise<CompanyListViewModel> {
		const { rows, count } = await this.repository.findAndCountAll({
			where: {
				user_id: this.storage.getUserId(),
			},
		});
		return {
			total: count,
			data: rows.map((company) => this.mapper.entityToViewModel(company)),
		};
	}

	async getCompaniesList(): Promise<CompanyFullListViewModel> {
		const { rows, count } = await this.repository.findAndCountAll({
			distinct: true,
			include: [{
				association: "applications",
				include: ["comments"],
			}],
			where: {
				user_id: this.storage.getUserId(),
			},
		});
		return {
			total: count,
			data: rows.map((company) => this.mapper.entityFullToViewModel(company)),
		};
	}

	async createCompany(name: string) {
		name = name.trim();
		const [response] = await this.repository.findOrCreate({
			where: {
				name,
			},
			defaults: {
				name,
				user_id: this.storage.getUserId(),
			},
		});
		return this.mapper.entityToViewModel(response);
	}

	async deleteCompany(id: string) {
		return this.repository.destroy({
			where: {
				id,
			},
		});
	}
}
