import { Injectable } from "@nestjs/common";
import { CompaniesMapper } from "src/companies/companies.mapper";
import { CompanyModel } from "@/db/models/CompanyModel";
import { CompanyFullListViewModel, CompanyListViewModel } from "@/viewModels/company.viewmodel";

@Injectable()
export class CompaniesService {
	constructor(private mapper: CompaniesMapper) {
	}

	async getCompanies(): Promise<CompanyListViewModel> {
		const { rows, count } = await CompanyModel.findAndCountAll();
		return {
			total: count,
			data: rows.map((company) => this.mapper.entityToViewModel(company)),
		};
	}

	async getCompaniesList(): Promise<CompanyFullListViewModel> {
		const { rows, count } = await CompanyModel.findAndCountAll({
			include: [{
				all: true,
				nested: true,
			}],
		});
		return {
			total: count,
			data: rows.map((company) => this.mapper.entityFullToViewModel(company)),
		};
	}

	async createCompany(name: string) {
		name = name.trim();
		const [response] = await CompanyModel.findOrCreate({
			raw: true,
			where: {
				name,
			},
			defaults: {
				name,
			},
		});
		return this.mapper.entityToViewModel(response);
	}

	async deleteCompany(id: string) {
		return CompanyModel.destroy({
			where: {
				id,
			},
		});
	}
}
