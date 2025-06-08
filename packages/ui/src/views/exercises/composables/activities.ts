import { ref, unref } from "vue";
import {
	EnumActivitySource,
	type ExerciseActivityCreateViewModel,
	type ExerciseActivityViewModel, type StravaTokenViewModel,
} from "@incutonez/life-stats-spec";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { AuthAPI, ExercisesAPI } from "@/api.ts";
import { getInvalidateQueryPredicate, useInvalidateQueries } from "@/composables/app.ts";
import {
	ActivitiesAPI,
	QueryKeyActivities,
	QueryKeyExercises,
	QueryListExercisesAudits,
} from "@/views/exercises/constants.ts";

interface IImportMutation {
	file: File;
	source: EnumActivitySource;
}

export const stravaToken = ref<StravaTokenViewModel>();

/**
 * If token is a string, then it's the auth code that we received, and we'll turn it into a proper accessToken when the
 * sync call returns
 */
export function setStravaToken(token: StravaTokenViewModel | string) {
	if (typeof token === "string") {
		token = {
			accessToken: token,
		};
	}
	localStorage.setItem("stravaToken", JSON.stringify(token));
	stravaToken.value = token;
}

export function useListActivities() {
	return useQuery({
		queryKey: [QueryKeyActivities],
		async queryFn() {
			const { data } = await ActivitiesAPI.listActivities();
			return data.data;
		},
	});
}

export function useDeleteActivity() {
	const deletingRecord = ref(false);
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		async mutationFn(record: ExerciseActivityViewModel) {
			return ActivitiesAPI.deleteActivity(record.id);
		},
		async onSuccess() {
			await queryClient.invalidateQueries(getInvalidateQueryPredicate(QueryKeyExercises));
		},
	});

	async function deleteRecord(record?: ExerciseActivityViewModel) {
		if (record) {
			deletingRecord.value = true;
			await deleteMutation.mutateAsync(record);
			deletingRecord.value = false;
		}
	}

	return {
		deletingRecord,
		deleteRecord,
	};
}

export function useImportActivities() {
	const importFile = ref<File>();
	const uploadingFile = ref(false);
	const importMutations = useMutation({
		async mutationFn({ source, file }: IImportMutation) {
			return ActivitiesAPI.importActivities(source, file);
		},
	});

	async function uploadFile(source = EnumActivitySource.Strava) {
		const $importFile = unref(importFile);
		if ($importFile) {
			uploadingFile.value = true;
			const { data } = await importMutations.mutateAsync({
				source,
				file: $importFile,
			});
			uploadingFile.value = false;
			return data;
		}
		return [];
	}

	return {
		uploadingFile,
		uploadFile,
		importFile,
	};
}

export function useUploadActivities() {
	const addedRecords = ref<ExerciseActivityCreateViewModel[]>([]);
	const addingRecords = ref(false);
	const added = ref(false);
	const updateMutation = useMutation({
		async mutationFn(records: ExerciseActivityCreateViewModel[]) {
			addingRecords.value = true;
			await ActivitiesAPI.uploadActivities(records, {
				// Set a 2 minute timeout, just in case it's a very large upload
				timeout: 120000,
			});
			addingRecords.value = false;
		},
	});

	async function createApplications() {
		const records = unref(addedRecords);
		if (records) {
			await updateMutation.mutateAsync(records);
			added.value = true;
		}
	}

	useInvalidateQueries(added, QueryKeyExercises);

	return {
		addedRecords,
		addingRecords,
		createApplications,
	};
}

export function useStravaSync() {
	const syncingRecords = ref(false);
	const syncMutation = useMutation({
		async mutationFn(token: StravaTokenViewModel) {
			syncingRecords.value = true;
			await AuthAPI.syncStravaActivities(token, {
				// Set a 2 minute timeout, just in case it's a very large upload
				timeout: 120000,
			});
			syncingRecords.value = false;
		},
	});

	async function syncStravaActivities(code?: string) {
		let $stravaToken: StravaTokenViewModel | undefined;
		if (code) {
			$stravaToken = {
				accessToken: code,
			};
		}
		else {
			$stravaToken = unref(stravaToken);
		}
		if ($stravaToken) {
			return syncMutation.mutateAsync($stravaToken);
		}
	}

	return {
		syncingRecords,
		syncStravaActivities,
	};
}

export function useListExercisesHistory() {
	return useQuery({
		queryKey: [QueryListExercisesAudits],
		async queryFn() {
			const { data } = await ExercisesAPI.getExercisesHistory();
			return data.data;
		},
	});
}
