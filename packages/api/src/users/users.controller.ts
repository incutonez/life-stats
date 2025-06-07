import { Body, Controller, HttpCode, HttpStatus, NotFoundException, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { UseValidationPipe } from "@/constants";
import { UsersService } from "@/users/users.service";
import { UserCreateViewModel, UserViewModel } from "@/viewModels/user.viewmodel";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly service: UsersService) {
	}

	@Post("")
	@HttpCode(HttpStatus.CREATED)
	@UseValidationPipe()
	async createUser(@Body() user: UserCreateViewModel): Promise<void> {
		await this.service.createUser(user);
	}

	@Post("profile")
	@HttpCode(HttpStatus.CREATED)
	@HttpCode(HttpStatus.OK)
	async getUserProfile(@Res({
		passthrough: true,
	}) res: Response): Promise<UserViewModel> {
		const response = await this.service.getUserProfile();
		if (response) {
			if (response.created) {
				res.status(HttpStatus.CREATED);
			}
			else {
				res.status(HttpStatus.OK);
			}
			return response.viewModel;
		}
		throw new NotFoundException("User not found");
	}
}
