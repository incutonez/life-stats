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
import {
	ExerciseActivityListViewModel,
	IExerciseActivityCreateViewModel,
	IExerciseActivityViewModel,
} from "@/viewModels/exercises/exercise.activity.viewmodel";

@Injectable()
export class ActivitiesService {
	constructor(private mapper: ActivitiesMapper) {
	}

	async listActivities(): Promise<ExerciseActivityListViewModel> {
		const { rows, count } = await ExerciseActivityModel.findAndCountAll({
			include: [{
				association: "attributes",
				include: [{
					association: "attribute_type",
				}],
			}, {
				association: "activity_type",
			}],
		});
		return {
			total: count,
			data: rows.map((row) => this.mapper.entityToViewModel(row)),
		};
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

	importActivities(file: Express.Multer.File, source: EnumActivitySource) {
		const contents = file.buffer.toString("utf8");
		const results: IExerciseActivityCreateViewModel[] = [];
		if (source === EnumActivitySource.Strava) {
			const { data } = Papa.parse<IUploadStrava>(contents, {
				header: true,
				skipEmptyLines: true,
			});
			for (const item of data) {
				results.push(this.mapper.stravaToViewModel(item));
			}
		}
		return results;
	}

	async uploadActivities(viewModels: IExerciseActivityCreateViewModel[]) {
		const results: IExerciseActivityViewModel[] = [];
		for (const viewModel of viewModels) {
			const model = this.mapper.viewModelToEntity(viewModel);
			const activityType = await this.createActivityType(model.activity_type);
			model.activity_type_id = activityType.id;
			const { id } = await this.createActivity(model);
			for (const attribute of model.attributes) {
				await this.createActivityAttribute(attribute, id);
			}
			const record = await this.getActivity(id);
			if (record) {
				results.push(record);
			}
		}
		return results;
	}
}
