import { Inject, Injectable } from "@nestjs/common";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";
import { AttributesMapper } from "@/exercises/attributes/attributes.mapper";
import { ACTIVITY_ATTRIBUTES_REPOSITORY } from "@/exercises/constants";
import { ActivityAttributesRepository } from "@/exercises/models";
import { ActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";

@Injectable()
export class AttributesService {
	constructor(
		@Inject(ACTIVITY_ATTRIBUTES_REPOSITORY) private readonly repository: ActivityAttributesRepository,
		private readonly mapper: AttributesMapper,
		private readonly attributeTypesService: AttributeTypesService,
	) {	}

	async updateActivityAttributes(viewModels: ActivityAttributeViewModel[], activityId: string) {
		const entities = await this.repository.findAll({
			where: {
				activity_id: activityId,
			},
		});
		for (const viewModel of viewModels) {
			const { id, ...model } = this.mapper.activityAttributeToEntity(viewModel, activityId);
			const attributeType = await this.attributeTypesService.createAttributeType(viewModel.attributeType!);
			model.attribute_type_id = attributeType.id;
			const found = entities.find((attribute) => attribute.id === id);
			if (found) {
				// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
				entities.splice(entities.indexOf(found), 1);
				// We could employ smarts to determine when to update the model, but we'll leave it to the ORM
				await found.update(model);
			}
			// New record
			else {
				await this.repository.create(model);
			}
		}
		await Promise.all(entities.map((entity) => entity.destroy()));
	}
}
