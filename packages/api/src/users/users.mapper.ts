import { Injectable } from "@nestjs/common";
import { IUserCreateModel, IUserModel } from "@/db/models/UserModel";
import { addMetaInfo } from "@/utils";
import { IUserCreateViewModel, IUserViewModel } from "@/viewModels/user.viewmodel";

@Injectable()
export class UsersMapper {
	entityToViewModel({ id, user_id, email, first_name, last_name, nickname, created_at, updated_at, last_accessed, settings }: IUserModel): IUserViewModel {
		return addMetaInfo({
			id,
			email,
			nickname,
			settings,
			firstName: first_name,
			lastName: last_name,
			lastAccessed: last_accessed.getTime(),
		}, user_id, created_at, updated_at);
	}

	viewModelCreateToEntity({ userId, firstName, lastName, nickname, email }: IUserCreateViewModel): IUserCreateModel {
		return {
			nickname,
			email,
			settings: {},
			user_id: userId,
			first_name: firstName,
			last_name: lastName,
			last_accessed: new Date(),
		};
	}
}
