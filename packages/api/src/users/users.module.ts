import { Module } from "@nestjs/common";
import { UsersController } from "@/users/users.controller";
import { UsersMapper } from "@/users/users.mapper";
import { UsersService } from "@/users/users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersMapper],
})
export class UsersModule {
}
