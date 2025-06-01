export declare const EnumAttributeType: {
    readonly String: "string";
    readonly Boolean: "boolean";
    readonly Number: "number";
    readonly Date: "date";
};
export type EnumAttributeType = typeof EnumAttributeType[keyof typeof EnumAttributeType];
