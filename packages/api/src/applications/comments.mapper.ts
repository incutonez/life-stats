import { Inject, Injectable } from "@nestjs/common";
import { AuthStorageService } from "@/auth/auth.storage.service";
import { AUTH_STORAGE } from "@/constants";
import { ICommentCreateModel, ICommentModel } from "@/db/models/CommentModel";
import { ICommentViewModel } from "@/viewModels/comment.viewmodel";

@Injectable()
export class CommentsMapper {
	constructor(@Inject(AUTH_STORAGE) private authStorageService: AuthStorageService) {}

	entityToViewModel({ application_id, user_id, comment, id, created_at, updated_at }: ICommentModel): ICommentViewModel {
		return {
			id,
			comment,
			userId: user_id,
			applicationId: application_id,
			dateCreated: created_at?.getTime(),
			dateUpdated: updated_at?.getTime(),
		};
	}

	createViewModelToEntity({ applicationId, comment }: ICommentViewModel): ICommentCreateModel {
		return {
			comment: comment.trim(),
			application_id: applicationId,
			user_id: this.authStorageService.getUserId(),
		};
	}
}
