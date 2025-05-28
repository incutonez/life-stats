import { Global, Module } from "@nestjs/common";
import { SEQUELIZE } from "@/constants";
import { sequelize } from "@/db/config";
import { AuditedModels, NonAuditedModels } from "@/db/models";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { AuditModel } from "@/db/models/AuditModel";

@Global()
@Module({
	providers: [{
		provide: SEQUELIZE,
		useFactory: async () => {
			sequelize.addModels(AuditedModels);
			// Added separately, as we don't want to add triggers for this
			sequelize.addModels(NonAuditedModels);
			await sequelize.sync();
			ApplicationModel.addHook("afterCreate", async (model: ApplicationModel) => {
				await AuditModel.create({
					user_id: model.user_id,
					action: "insert",
					payload: JSON.stringify(model.getPlain()),
				});
			});
			ApplicationModel.addHook("afterUpdate", async (model: ApplicationModel) => {
				await AuditModel.create({
					user_id: model.user_id,
					action: "update",
					payload: JSON.stringify(model.getPlain()),
				});
			});
			return sequelize;
		},
	}],
	exports: [SEQUELIZE],
})
export class DatabaseModule {

}
