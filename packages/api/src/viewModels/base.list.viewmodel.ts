import { ApiProperty } from "@nestjs/swagger";

interface IResponseListEntity<T> {
	data: T[];
	total?: number;
}

export class ApiPaginatedRequest {
	declare start: number;

	declare limit: number;

	declare page: number;
}

export function GetResponseModel<T>(ResourceClass: any) {
	class ResponseListEntity implements IResponseListEntity<T> {
		@ApiProperty({
			type: [ResourceClass],
		})
		declare data: T[];

		total?: number;
	}
	return ResponseListEntity;
}
