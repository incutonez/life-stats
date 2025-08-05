import { ApiProperty } from "@nestjs/swagger";

interface IResponseListEntity<T> {
	data: T[];
	total?: number;
}

export class ApiPaginatedRequest {
	start: number;

	limit: number;

	page: number;
}

export function GetResponseModel<T>(ResourceClass: any) {
	class ResponseListEntity implements IResponseListEntity<T> {
		@ApiProperty({
			type: [ResourceClass],
		})
		data: T[];

		total?: number;
	}
	return ResponseListEntity;
}
