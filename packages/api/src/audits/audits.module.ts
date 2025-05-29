import { Module } from "@nestjs/common";
import { AuditsController } from "src/audits/audits.controller";
import { AuditsMapper } from "src/audits/audits.mapper";
import { AuditsService } from "src/audits/audits.service";

@Module({
	controllers: [AuditsController],
	providers: [AuditsService, AuditsMapper],
})
export class AuditsModule {
}
