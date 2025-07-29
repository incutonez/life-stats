import { Inject, Injectable } from "@nestjs/common";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { ATTRIBUTE_TYPES_REPOSITORY } from "@/constants";
import { AttributeTypesRepository } from "@/db/models";
import { AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

@Injectable()
export class AttributeTypesService {
	constructor(
		@Inject(ATTRIBUTE_TYPES_REPOSITORY) private readonly repository: AttributeTypesRepository,
		private mapper: AttributeTypesMapper,
	) {
	}

	async getAttributeTypes(addMeta = false) {
		const entities = await this.repository.findAll();
		return entities.map((entity) => this.mapper.entityToViewModel(entity, addMeta));
	}

	async createAttributeType(viewModel: AttributeTypeViewModel) {
		const { name, feature, user_id } = this.mapper.attributeTypeToEntity(viewModel);
		const [entity] = await this.repository.findOrCreate({
			where: {
				name,
				feature,
			},
			defaults: {
				name,
				feature,
				user_id,
			},
		});
		return entity;
	}
}
