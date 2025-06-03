import { onUnmounted, ref, unref } from "vue";
import { EnumActivitySource, type ExerciseActivityCreateViewModel } from "@incutonez/life-stats-spec";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ActivitiesAPI, QueryKeyActivities, QueryKeyExercises } from "@/views/exercises/constants.ts";

interface IImportMutation {
	file: File;
	source: EnumActivitySource;
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
	const queryClient = useQueryClient();
	const addingRecords = ref(false);
	const added = ref(false);
	const updateMutation = useMutation({
		async mutationFn(records: ExerciseActivityCreateViewModel[]) {
			addingRecords.value = true;
			await ActivitiesAPI.uploadActivities(records);
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

	onUnmounted(() => {
		if (added.value) {
			queryClient.invalidateQueries({
				queryKey: [QueryKeyExercises],
			});
		}
	});

	return {
		addedRecords,
		addingRecords,
		createApplications,
	};
}
