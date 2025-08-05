import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IUserCreateViewModel = ModelInterface<UserCreateViewModel>;
export type IUserViewModel = ModelInterface<UserViewModel>;

export class UserCreateViewModel extends BaseViewModel {
	declare userId: string;

	firstName: string;

	lastName?: string;

	email: string;

	nickname?: string;
}

export class UserSettingsViewModel {
	exercises: UserSettingsExerciseViewModel;
}

export class UserSettingsExerciseViewModel {
	weight?: number;
}

export class UserViewModel extends UserCreateViewModel {
	lastAccessed: number;

	settings: UserSettingsViewModel;
}
