import { Injectable } from "@nestjs/common";
import Papa from "papaparse";
import {
	ExerciseActivityAttributeModel,
	IExerciseActivityAttributeCreate,
} from "@/db/models/ExerciseActivityAttributeModel";
import {
	ExerciseActivityModel,
	IExerciseActivityCreate,
} from "@/db/models/ExerciseActivityModel";
import {
	ExerciseActivityTypesModel,
	IExerciseActivityTypeCreate,
} from "@/db/models/ExerciseActivityTypesModel";
import { ExerciseAttributeTypesModel, IExerciseAttributeTypeCreate } from "@/db/models/ExerciseAttributeTypesModel";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { EnumActivitySource } from "@/exercises/constants";
import { IUploadStrava } from "@/exercises/types";
import { IExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";

@Injectable()
export class ActivitiesService {
	constructor(private mapper: ActivitiesMapper) {
	}

	async createActivityType({ name, user_id }: IExerciseActivityTypeCreate) {
		const [entity] = await ExerciseActivityTypesModel.findOrCreate({
			where: {
				name,
			},
			defaults: {
				name,
				user_id,
			},
		});
		return entity;
	}

	async createAttributeType({ name, type, user_id }: IExerciseAttributeTypeCreate) {
		const [entity] = await ExerciseAttributeTypesModel.findOrCreate({
			where: {
				name,
			},
			defaults: {
				name,
				type,
				user_id,
			},
		});
		return entity;
	}

	async createActivityAttribute(model: IExerciseActivityAttributeCreate, activityId: string) {
		const attributeType = await this.createAttributeType(model.attribute_type);
		model.attribute_type_id = attributeType.id;
		model.activity_id = activityId;
		return ExerciseActivityAttributeModel.create(model);
	}

	async createActivity(model: IExerciseActivityCreate) {
		return ExerciseActivityModel.create(model);
	}

	async getActivity(id: string) {
		const entity = await ExerciseActivityModel.findByPk(id, {
			include: [{
				all: true,
				nested: true,
			}],
		});
		if (entity) {
			return this.mapper.entityToViewModel(entity);
		}
	}

	async uploadActivities(file: Express.Multer.File, source: EnumActivitySource) {
		const contents = file.buffer.toString("utf8");
		const results: IExerciseActivityViewModel[] = [];
		if (source === EnumActivitySource.Strava) {
			const { data } = Papa.parse<IUploadStrava>(contents, {
				header: true,
				skipEmptyLines: true,
			});
			for (const item of data) {
				const model = this.mapper.stravaToEntity(item);
				const activityType = await this.createActivityType(model.activity_type);
				model.activity_type_id = activityType.id;
				const { id } = await this.createActivity(model);
				for (const attribute of model.attributes) {
					await this.createActivityAttribute(attribute, id);
				}
				const viewModel = await this.getActivity(id);
				if (viewModel) {
					results.push(viewModel);
				}
			}
		}
		return results;
	}
}
