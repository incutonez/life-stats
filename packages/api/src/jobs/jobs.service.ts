import { Injectable } from "@nestjs/common";
import { AuditsService } from "@/audits/audits.service";
import { EnumFeatures } from "@/constants";

@Injectable()
export class JobsService {
	constructor(private readonly auditsService: AuditsService) {
	}

	async getHistory() {
		return this.auditsService.listAudits(EnumFeatures.jobs);
	}
}
