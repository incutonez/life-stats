import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { UserModel } from "@/db/models/UserModel";
import { UsersMapper } from "@/users/users.mapper";
import { UserCreateViewModel, UserSettingsViewModel } from "@/viewModels/user.viewmodel";

@Injectable()
export class UsersService {
	constructor(private mapper: UsersMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	async createUser(viewModel: UserCreateViewModel) {
		const [entity, created] = await UserModel.findOrCreate({
			where: {
				user_id: viewModel.userId,
			},
			defaults: this.mapper.viewModelCreateToEntity(viewModel),
		});
		return {
			entity,
			created,
		};
	}

	async getUserSettings(userId: string) {
		const entity = await UserModel.findByPk(userId);
		if (entity) {
			return this.mapper.entityToViewModel(entity).settings;
		}
	}

	async getUserProfile() {
		const user = this.storage.getUser();
		const { entity, created } = await this.createUser({
			userId: user.sub!,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			nickname: user.nickname,
		});
		if (entity) {
			if (!created) {
				// We want to preserve the last_accessed date for this request
				const { last_accessed } = entity;
				await entity.update({
					last_accessed: new Date(),
				}, {
					// Don't trigger changing updatedAt
					silent: true,
				});
				entity.last_accessed = last_accessed;
			}
			return {
				created,
				viewModel: this.mapper.entityToViewModel(entity),
			};
		}
	}

	async updateUserSettings(userId: string, settings: UserSettingsViewModel) {
		const entity = await UserModel.findByPk(userId);
		if (entity) {
			entity.settings = settings;
			await entity.save();
			return entity.settings;
		}
	}
}
