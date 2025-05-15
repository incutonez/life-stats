import { ModelInterface } from "@/types";

export type ICommentViewModel = ModelInterface<CommentViewModel>;

export class CommentViewModel {
    declare id: string;
    declare comment: string;
    declare applicationId?: string;
}
