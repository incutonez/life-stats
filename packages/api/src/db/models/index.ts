import { ApplicationModel } from "@/db/models/ApplicationModel";
import { AuditModel } from "@/db/models/AuditModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";

export const AuditedModels = [ApplicationModel, CommentModel, CompanyModel];
export const NonAuditedModels = [AuditModel];
