import { Injectable } from "@nestjs/common";
import { WhereOptions } from "@sequelize/core";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { AttributeTypeModel } from "@/db/models/AttributeTypeModel";
import { AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

@Injectable()
export class AttributeTypesService {
	constructor(private mapper: AttributeTypesMapper) {
	}

	async getAttributeTypes(addMeta = false) {
		const entities = await AttributeTypeModel.findAll();
		return entities.map((entity) => this.mapper.entityToViewModel(entity, addMeta));
	}

	async createAttributeType(viewModel: AttributeTypeViewModel) {
		const model = this.mapper.viewModelToEntity(viewModel);
		const where: WhereOptions<AttributeTypeModel> = {
			name: model.name,
		};
		if (model.feature) {
			where.feature = model.feature;
		}
		const [entity] = await AttributeTypeModel.findOrCreate({
			where,
			defaults: model,
		});
		return entity;
	}
}
