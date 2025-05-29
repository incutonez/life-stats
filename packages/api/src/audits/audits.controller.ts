import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuditsService } from "src/audits/audits.service";
import { AuditListViewModel } from "@/viewModels/audit.viewmodel";

@ApiTags("audits")
@Controller("audits")
export class AuditsController {
	constructor(private readonly service: AuditsService) {
	}

	@Post("list")
	async listAudits(): Promise<AuditListViewModel> {
		return this.service.listAudits();
	}
}
