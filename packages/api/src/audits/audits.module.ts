import { Module } from "@nestjs/common";
import { AuditsController } from "@/audits/audits.controller";
import { AuditsMapper } from "@/audits/audits.mapper";
import { AuditsService } from "@/audits/audits.service";

@Module({
	controllers: [AuditsController],
	providers: [AuditsService, AuditsMapper],
	exports: [AuditsService, AuditsMapper],
})
export class AuditsModule {
}
