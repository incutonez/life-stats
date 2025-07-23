import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionsService } from "@/exercises/actions/actions.service";
import { ROUTINES_REPOSITORY } from "@/exercises/constants";
import { RoutinesRepository } from "@/exercises/models";
import { RoutinesMapper } from "@/exercises/routines/routines.mapper";
import { RoutineListViewModel, RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";

@Injectable()
export class RoutinesService {
	constructor(@Inject(ROUTINES_REPOSITORY) private readonly repository: RoutinesRepository, private readonly mapper: RoutinesMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService, private readonly actionsService: ActionsService) {}

	async getRoutines(): Promise<RoutineListViewModel> {
		const { rows, count } = await this.repository.findAndCountAll({
			distinct: true,
			where: {
				user_id: this.storage.getUserId(),
			},
			include: [{
				association: "actions",
				include: [{
					association: "action_type",
				}],
			}],
		});

		return {
			total: count,
			data: rows.map((row) => this.mapper.routineToViewModel(row, true)),
		};
	}

	async getRoutineEntity(id: string) {
		return this.repository.findByPk(id, {
			include: [{
				all: true,
				nested: true,
			}],
			order: [["actions", "order", "asc"]],
		});
	}

	async getRoutine(id: string) {
		const entity = await this.getRoutineEntity(id);
		if (entity) {
			return this.mapper.routineToViewModel(entity);
		}
	}

	async createRoutine(viewModel: RoutineViewModel) {
		const entity = await this.repository.create(this.mapper.routineToEntity(viewModel));
		if (entity) {
			await this.actionsService.updateRoutineActions(viewModel.actions, entity.id);
			return this.getRoutine(entity.id);
		}
	}

	async updateRoutine(routineId: string, viewModel: RoutineViewModel) {
		await this.actionsService.updateRoutineActions(viewModel.actions, routineId);
		await this.repository.update(this.mapper.routineToEntity(viewModel), {
			where: {
				id: routineId,
			},
		});
		return this.getRoutine(routineId);
	}

	async deleteRoutine(routineId: string) {
		const entity = await this.getRoutineEntity(routineId);
		if (entity) {
			return entity.destroy();
		}
	}
}
