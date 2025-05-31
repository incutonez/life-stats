import { SetMetadata } from "@nestjs/common";

export const AUTH_STORAGE = "USER_STORAGE";
export const DataBaseStoragePath = "src/db/data.db";
export const EncryptionAlgorithm = "aes-256-cbc";
export const SEQUELIZE = "SEQUELIZE";
export const CreatedAtField = "created_at";
export const UpdatedAtField = "updated_at";
export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const EnumAuditActionTypes = {
	created: "Created",
	updated: "Updated",
	deleted: "Deleted",
} as const;
export type EnumAuditActionTypes = typeof EnumAuditActionTypes[keyof typeof EnumAuditActionTypes];

export const EnumFeatures = {
	jobs: "Jobs",
	exercises: "Exercises",
} as const;
export type EnumFeatures = typeof EnumFeatures[keyof typeof EnumFeatures];

export const EnumTableNames = {
	Audits: "audits",
	JobApplications: "applications",
	JobCompanies: "companies",
	JobComments: "comments",
};
export type EnumTableNames = typeof EnumTableNames[keyof typeof EnumTableNames];
