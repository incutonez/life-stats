import { Injectable } from "@nestjs/common";
import { ICommentCreateModel, ICommentModel } from "@/db/models/CommentModel";
import { ICommentViewModel } from "@/viewModels/comment.viewmodel";

@Injectable()
export class CommentsMapper {
	entityToViewModel({ application_id, comment, id, created_at, updated_at }: ICommentModel): ICommentViewModel {
		return {
			id,
			comment,
			applicationId: application_id,
			dateCreated: created_at?.getTime(),
			dateUpdated: updated_at?.getTime(),
		};
	}

	createViewModelToEntity({ applicationId, comment }: ICommentViewModel): ICommentCreateModel {
		return {
			comment: comment.trim(),
			application_id: applicationId,
		};
	}
}
