export declare const EnumApplicationStatus: {
    readonly Applied: -1;
    readonly CurrentWeek: 0;
    readonly Initial: 1;
    readonly Interviewing: 2;
    readonly InterviewedAndRejected: 3;
    readonly Rejected: 4;
    readonly Declined: 5;
    readonly Accepted: 6;
};
export type EnumApplicationStatus = typeof EnumApplicationStatus[keyof typeof EnumApplicationStatus];
