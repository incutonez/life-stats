import { Inject, Injectable } from "@nestjs/common";
import { FindOptions } from "@sequelize/core";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { ListAttributeTypesParams } from "@/attributeTypes/types";
import { ATTRIBUTE_TYPES_REPOSITORY, EnumFeatures } from "@/constants";
import { AttributeTypeModel } from "@/db/models/AttributeTypeModel";
import { AttributeTypesRepository } from "@/db/models/system";
import { AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

@Injectable()
export class AttributeTypesService {
	constructor(
		@Inject(ATTRIBUTE_TYPES_REPOSITORY) private readonly repository: AttributeTypesRepository,
		private mapper: AttributeTypesMapper,
	) {	}

	async getAttributeTypes(feature: EnumFeatures, addMeta = false) {
		const findOptions: FindOptions<AttributeTypeModel> = {
			order: [["name", "asc"]],
		};
		if (feature) {
			findOptions.where = {
				feature,
			};
		}
		const entities = await this.repository.findAll(findOptions);
		return entities.map((entity) => this.mapper.entityToViewModel(entity, addMeta));
	}

	async listAttributeTypes({ feature }: ListAttributeTypesParams) {
		const findOptions: FindOptions<AttributeTypeModel> = {
			order: [["name", "asc"]],
			include: [{
				association: "activity_attributes",
				include: [{
					association: "activity",
				}],
			}],
		};
		if (feature) {
			findOptions.where = {
				feature,
			};
		}
		const entities = await this.repository.findAll(findOptions);
		return entities.map((entity) => this.mapper.entityToListViewModel(entity));
	}

	async getAttributeTypeEntity(attributeTypeId: string) {
		return this.repository.findByPk(attributeTypeId, {
			include: [{
				association: "activity_attributes",
				include: [{
					association: "activity",
				}],
			}],
		});
	}

	async getAttributeType(attributeTypeId: string) {
		const entity = await this.getAttributeTypeEntity(attributeTypeId);
		if (entity) {
			return this.mapper.entityToViewModel(entity);
		}
	}

	async updateAttributeType(attributeTypeId: string, viewModel: AttributeTypeViewModel) {
		const entity = await this.getAttributeTypeEntity(attributeTypeId);
		if (entity) {
			await entity.update(this.mapper.attributeTypeToEntity(viewModel));
			return this.getAttributeType(attributeTypeId);
		}
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

	async deleteAttributeType(attributeTypeId: string) {
		return this.repository.destroy({
			where: {
				id: attributeTypeId,
			},
		});
	}
}
