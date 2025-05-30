import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompaniesService } from "@/jobs/companies/companies.service";

@ApiTags("companies")
@Controller("companies")
export class CompaniesController {
	constructor(private readonly service: CompaniesService) {
	}

	@Get("")
	async getCompanies() {
		return this.service.getCompanies();
	}

	@Post("list")
	async getCompaniesList() {
		return this.service.getCompaniesList();
	}

	@Delete(":companyId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteCompany(@Param("companyId") companyId: string): Promise<void> {
		await this.service.deleteCompany(companyId);
	}
}
