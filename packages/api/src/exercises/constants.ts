export const EnumActivitySource = {
	Strava: "strava",
} as const;
export type EnumActivitySource = typeof EnumActivitySource[keyof typeof EnumActivitySource];														;

export const EnumAttributeType = {
	String: "string",
	Boolean: "boolean",
	Number: "number",
	Date: "date",
} as const;
export type EnumAttributeType = typeof EnumAttributeType[keyof typeof EnumAttributeType];
