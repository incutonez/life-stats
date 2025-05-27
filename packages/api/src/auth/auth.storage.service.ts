import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { IAuthStorage } from "@/types";

@Injectable()
export class AuthStorageService {
	storage = new AsyncLocalStorage<IAuthStorage>();

	getUserId() {
		return this.storage.getStore()!.user.sub!;
	}
}
