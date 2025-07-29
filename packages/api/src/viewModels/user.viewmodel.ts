import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IUserCreateViewModel = ModelInterface<UserCreateViewModel>;
export type IUserViewModel = ModelInterface<UserViewModel>;

export class UserCreateViewModel extends BaseViewModel {
	declare userId: string;

	declare firstName: string;

	declare lastName?: string;

	declare email: string;

	declare nickname?: string;
}

export class UserSettingsViewModel {
	declare exercises: UserSettingsExerciseViewModel;
}

export class UserSettingsExerciseViewModel {
	declare weight?: number;
}

export class UserViewModel extends UserCreateViewModel {
	declare lastAccessed: number;

	declare settings: UserSettingsViewModel;
}
