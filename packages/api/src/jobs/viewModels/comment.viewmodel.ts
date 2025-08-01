﻿import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type ICommentViewModel = ModelInterface<CommentViewModel>;

export type ICommentCreateViewModel = ModelInterface<CommentViewModel>;

export class CommentViewModel extends BaseViewModel {
	declare comment: string;

	applicationId?: string;
}
