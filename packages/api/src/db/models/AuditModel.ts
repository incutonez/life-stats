import { Column, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "@/db/decorators";

@Table({
	tableName: "audits",
	createdAt: "created_at",
	updatedAt: false,
})
export class AuditModel extends Model {
	@PrimaryKeyGuid()
	declare id: string;

	@Column
	declare user_id: string;

	@Column
	declare action: "insert" | "update" | "delete";

	@Column
	declare payload: string;

	@Column
	declare created_at: Date;
}
