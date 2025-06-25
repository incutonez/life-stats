import {
	inject,
	type InjectionKey,
	type MaybeRef,
	onErrorCaptured,
	onUnmounted,
	provide,
	ref,
	unref,
	watch, watchEffect,
} from "vue";
import type { AppMetaViewModel, UserViewModel } from "@incutonez/life-stats-spec";
import { type Query, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { apiConfig, AppAPI, AttributeTypesAPI, UsersAPI } from "@/api.ts";
import { QueryGetAttributeTypes, QueryKeyAppMeta, QueryKeyUser } from "@/constants.ts";

export type TUseGlobalError = ReturnType<typeof useGlobalError>;

export const InjectionGlobalError: InjectionKey<TUseGlobalError> = Symbol("globalError");

export type TUseUserProfile = ReturnType<typeof useUserProfile>;

export const InjectionUserProfile: InjectionKey<TUseUserProfile> = Symbol("userProfile");

export type TUseAppMeta = ReturnType<typeof useAppMeta>;

export const InjectionAppMeta: InjectionKey<TUseAppMeta> = Symbol("appMeta");

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

	provide(InjectionGlobalError, provider);

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
	return inject(InjectionGlobalError) as TUseGlobalError;
}

export function useAppMeta() {
	const enabled = ref(false);
	const appMeta = ref<AppMetaViewModel>();
	const query = useQuery({
		enabled,
		queryKey: [QueryKeyAppMeta],
		async queryFn() {
			const { data } = await AppAPI.getInfo();
			appMeta.value = data;
			return data;
		},
	});
	const provider = {
		appMeta,
		query,
	};

	provide(InjectionAppMeta, provider);

	/* We don't simply use isAuthenticated because that changes too quickly, before we've actually set the authorization
	 * header.  So instead, we check to see when this is set, so we can enable loading the user profile */
	watchEffect(() => enabled.value = !!apiConfig.baseOptions.headers.authorization);

	return provider;
}

export function injectAppMeta() {
	return inject(InjectionAppMeta) as TUseAppMeta;
}

export function useUserProfile() {
	const updatingSettings = ref(false);
	const userProfile = ref<UserViewModel>();
	const enabled = ref(false);
	const query = useQuery({
		enabled,
		queryKey: [QueryKeyUser],
		async queryFn() {
			const { data } = await UsersAPI.getUserProfile();
			userProfile.value = data;
			return data;
		},
	});
	const mutationSettings = useMutation({
		async mutationFn() {
			const $userProfile = unref(userProfile);
			if ($userProfile) {
				updatingSettings.value = true;
				const { data } = await UsersAPI.updateUserSettings($userProfile.id, $userProfile.settings);
				$userProfile.settings = data;
				updatingSettings.value = false;
			}
		},
	});

	async function updateSettings() {
		return mutationSettings.mutateAsync();
	}

	const provider = {
		userProfile,
		query,
		updatingSettings,
		updateSettings,
	};

	provide(InjectionUserProfile, provider);

	/* We don't simply use isAuthenticated because that changes too quickly, before we've actually set the authorization
	 * header.  So instead, we check to see when this is set, so we can enable loading the user profile */
	watchEffect(() => enabled.value = !!apiConfig.baseOptions.headers.authorization);

	return provider;
}

export function injectUserProfile() {
	return inject(InjectionUserProfile) as TUseUserProfile;
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

export function useGetAttributeTypes() {
	return useQuery({
		queryKey: [QueryGetAttributeTypes],
		async queryFn() {
			const { data } = await AttributeTypesAPI.getAttributeTypes();
			return data.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
		},
	});
}
