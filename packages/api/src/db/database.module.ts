import { Global, Module } from "@nestjs/common";
import { SEQUELIZE } from "@/constants";
import { sequelize } from "@/db/config";
import { addAuditing } from "@/db/models";

@Global()
@Module({
	providers: [{
		provide: SEQUELIZE,
		useFactory: async () => {
			await sequelize.sync();
			addAuditing();
			return sequelize;
		},
	}],
	exports: [SEQUELIZE],
})
export class DatabaseModule {}
