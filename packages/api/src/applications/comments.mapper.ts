import { Injectable } from "@nestjs/common";
import { ICommentCreateModel, ICommentModel } from "@/db/models/CommentModel";
import { ICommentViewModel } from "@/viewModels/comment.viewmodel";

@Injectable()
export class CommentsMapper {
	entityToViewModel({ application_id, comment, id }: ICommentModel): ICommentViewModel {
		return {
			id,
			comment,
			applicationId: application_id,
		};
	}

	createViewModelToEntity({ applicationId, comment }: ICommentViewModel): ICommentCreateModel {
		return {
			comment: comment.trim(),
			application_id: applicationId,
		};
	}
}
