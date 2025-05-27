import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type ICommentViewModel = ModelInterface<CommentViewModel>;

export class CommentViewModel extends BaseViewModel {
    declare id: string;
    declare userId: string;
    declare comment: string;
    declare applicationId?: string;
}
