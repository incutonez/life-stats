import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { CompanyModel } from "@/db/models/CompanyModel";
import { ApplicationsMapper } from "@/jobs/applications/applications.mapper";
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
		return {
			id: entity.id,
			name: entity.name,
			userId: entity.user_id,
			dateCreated: entity.created_at!.getTime(),
			dateUpdated: entity.updated_at!.getTime(),
		};
	}

	entityFullToViewModel(entity: CompanyModel) {
		const record = this.entityToViewModel(entity) as CompanyFullViewModel;
		record.applications = entity.applications?.map((application) => this.applicationsMapper.entityNestedToViewModel(application)) ?? [];
		return record;
	}
}
