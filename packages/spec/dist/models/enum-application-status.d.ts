export declare const EnumApplicationStatus: {
    readonly NoStatus: -1;
    readonly CurrentWeek: 0;
    readonly Initial: 1;
    readonly Interviewing: 2;
    readonly InterviewedAndRejected: 3;
    readonly Rejected: 4;
};
export type EnumApplicationStatus = typeof EnumApplicationStatus[keyof typeof EnumApplicationStatus];
