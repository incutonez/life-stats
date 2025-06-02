import { Injectable } from "@nestjs/common";
import { Op } from "@sequelize/core";
import { AuditsMapper } from "@/audits/audits.mapper";
import { EnumFeatures } from "@/constants";
import { AuditModel } from "@/db/models/AuditModel";
import { AuditListViewModel } from "@/viewModels/audit.viewmodel";

@Injectable()
export class AuditsService {
	constructor(private mapper: AuditsMapper) {
	}

	async listAudits(features?: EnumFeatures | EnumFeatures[]): Promise<AuditListViewModel> {
		const { count, rows } = await AuditModel.findAndCountAll({
			where: {
				feature: {
					[Op.in]: Array.isArray(features) ? features : [features],
				},
			},
		});

		return {
			total: count,
			data: rows.map((row) => this.mapper.entityToViewModel(row)),
		};
	}
}
