import { Injectable } from "@nestjs/common";
import { AuditsMapper } from "src/audits/audits.mapper";
import { AuditModel } from "@/db/models/AuditModel";

@Injectable()
export class AuditsService {
	constructor(private mapper: AuditsMapper) {
	}

	async listAudits() {
		const { count, rows } = await AuditModel.findAndCountAll();

		return {
			total: count,
			data: rows.map((row) => this.mapper.entityToViewModel(row)),
		};
	}
}
