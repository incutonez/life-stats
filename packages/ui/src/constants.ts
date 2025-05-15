import { EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import { enumToOptions } from "@/utils/common.ts";

export const LocalTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const ApplicationStatusOptions = enumToOptions(EnumApplicationStatus);
