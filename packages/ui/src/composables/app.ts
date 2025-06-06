﻿import {
	inject,
	type InjectionKey,
	type MaybeRef,
	onErrorCaptured,
	onUnmounted,
	provide,
	ref,
	unref,
	watch,
} from "vue";
import { type Query, useQueryClient } from "@tanstack/vue-query";

export type TUseGlobalError = ReturnType<typeof useGlobalError>;

export const GlobalErrorKey: InjectionKey<TUseGlobalError> = Symbol("globalError");

// This only gets called from App.vue, and then any component can inject it with the function below
export function useGlobalError() {
	const errorMsg = ref("");
	const errorMsgStack = ref("");
	const errorTitle = ref("Error");
	const showErrorDetails = ref(false);
	const showErrorDialog = ref(false);

	function resetError() {
		errorMsg.value = "";
		errorMsgStack.value = "";
		errorTitle.value = "Error";
		showErrorDetails.value = false;
	}

	const provider = {
		errorMsg,
		errorTitle,
		errorMsgStack,
		showErrorDialog,
		showErrorDetails,
		resetError,
	};

	provide(GlobalErrorKey, provider);

	watch(errorMsgStack, ($errorMsgStack) => showErrorDialog.value = !!$errorMsgStack);

	/**
	 * Non-Vue related errors, like global document listeners
	 */
	window.onerror = (msg) => {
		// If errorMsgStack was set outside of this, then we defer to that
		if (errorMsgStack.value) {
			return true;
		}
		if (msg instanceof Event) {
			msg = msg.type;
		}
		errorMsgStack.value = msg;
		return true;
	};

	/**
	 * Global Vue error capturing
	 * Source: https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured
	 */
	onErrorCaptured((err) => {
		errorMsgStack.value = err.toString();
		return false;
	});

	return provider;
}

export function injectGlobalError() {
	return inject(GlobalErrorKey) as TUseGlobalError;
}

export function getInvalidateQueryPredicate(queryKey: string) {
	return {
		predicate(query: Query) {
			const [parentKey] = query.queryKey;
			if (typeof parentKey === "string") {
				return parentKey.startsWith(queryKey);
			}
			return parentKey === queryKey;
		},
	};
}

/**
 * This will invalidate queries that start with the queryKey passed in.  Useful for things like updating an entity that
 * affects basically the entire feature's entities.
 */
export function useInvalidateQueries(shouldInvalidate: MaybeRef<boolean>, queryKey: string) {
	const queryClient = useQueryClient();

	onUnmounted(async () => {
		if (unref(shouldInvalidate)) {
			await queryClient.invalidateQueries(getInvalidateQueryPredicate(queryKey));
		}
	});
}
