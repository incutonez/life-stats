import { Inject, Injectable } from "@nestjs/common";
import { Op } from "@sequelize/core";
import { AuditsMapper } from "@/audits/audits.mapper";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumFeatures, SESSION_STORAGE } from "@/constants";
import { AuditModel } from "@/db/models/AuditModel";
import { AuditListViewModel } from "@/viewModels/audit.viewmodel";

@Injectable()
export class AuditsService {
	constructor(private mapper: AuditsMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	async listAudits(features?: EnumFeatures | EnumFeatures[]): Promise<AuditListViewModel> {
		const { count, rows } = await AuditModel.findAndCountAll({
			where: {
				user_id: this.storage.getUserId(),
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
