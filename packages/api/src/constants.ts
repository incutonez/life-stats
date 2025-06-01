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
	ExerciseActivities: "exerciseActivities",
	ExerciseActivityTypes: "exerciseActivityTypes",
	ExerciseActivityAttributes: "exerciseActivityAttributes",
	ExerciseAttributeTypes: "exerciseAttributeTypes",
	JobApplications: "applications",
	JobCompanies: "companies",
	JobComments: "comments",
	UnitTypes: "unitTypes",
};
export type EnumTableNames = typeof EnumTableNames[keyof typeof EnumTableNames];

export const EnumUnitTypes = {
	None: 0,
	Inches: 1,
	Feet: 2,
	Miles: 3,
	Centimeters: 4,
	Meters: 5,
	Kilometers: 6,
	Milliseconds: 7,
	Seconds: 8,
	Minutes: 9,
	Hours: 10,
	MetersPerSecond: 11,
	KilometersPerHour: 12,
	MilesPerHour: 13,
} as const;
export type EnumUnitTypes = typeof EnumUnitTypes[keyof typeof EnumUnitTypes];
