import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ApplicationsMapper } from "@/applications/applications.mapper";
import { CompanyModel } from "@/db/models/CompanyModel";
import { CompanyFullViewModel, CompanyViewModel } from "@/viewModels/company.viewmodel";

@Injectable()
export class CompaniesMapper implements OnModuleInit {
	declare private applicationsMapper: ApplicationsMapper;

	constructor(private readonly moduleRef: ModuleRef) {
	}

	onModuleInit() {
		this.applicationsMapper = this.moduleRef.get(ApplicationsMapper, {
			strict: false,
		});
	}

	entityToViewModel(entity: CompanyModel): CompanyViewModel {
		return entity;
	}

	entityFullToViewModel(entity: CompanyModel): CompanyFullViewModel {
		return {
			id: entity.id,
			name: entity.name,
			applications: entity.applications?.map((application) => this.applicationsMapper.entityToViewModel(application)) ?? [],
		};
	}
}
