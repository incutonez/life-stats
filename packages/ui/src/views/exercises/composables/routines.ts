import { type MaybeRef, ref, toRaw, unref, watch } from "vue";
import { RoutinesApi, type RoutineViewModel } from "@incutonez/life-stats-spec";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import clone from "just-clone";
import { apiConfig } from "@/api.ts";
import { getInvalidateQueryPredicate, useInvalidateQueries } from "@/composables/app.ts";
import { RouteCreate } from "@/constants.ts";
import { QueryGetRoutines, QueryRoutines } from "@/views/exercises/constants.ts";

const RoutinesAPI = new RoutinesApi(apiConfig);

export function defaultRoutine(): RoutineViewModel {
	return {
		name: "",
		actions: [],
	};
}

export function useGetRoutines() {
	return useQuery({
		queryKey: [QueryGetRoutines],
		async queryFn() {
			const { data } = await RoutinesAPI.getRoutines();
			return data.data;
		},
	});
}

export function useGetRoutine(routineId: MaybeRef<string>) {
	const routineRecord = ref<RoutineViewModel>();
	const query = useQuery({
		queryKey: [QueryGetRoutines, routineId],
		async queryFn() {
			const $routineId = unref(routineId);
			if ($routineId === RouteCreate) {
				return defaultRoutine();
			}
			const { data } = await RoutinesAPI.getRoutine($routineId);
			return data;
		},
	});

	watch(query.data, ($data) => {
		if ($data) {
			routineRecord.value = clone(toRaw($data));
		}
	}, {
		immediate: true,
	});

	return {
		routineRecord,
		query,
	};
}

export function useDeleteRoutine() {
	const queryClient = useQueryClient();
	const deletingRoutine = ref(false);
	const deleteMutation = useMutation({
		async mutationFn(routineId: string) {
			return RoutinesAPI.deleteRoutine(routineId);
		},
		async onSuccess() {
			await queryClient.invalidateQueries(getInvalidateQueryPredicate(QueryRoutines));
		},
	});

	async function deleteRoutine(routineId: string) {
		deletingRoutine.value = true;
		await deleteMutation.mutateAsync(routineId);
		deletingRoutine.value = false;
	}

	return {
		deletingRoutine,
		deleteRoutine,
	};
}

export function useSaveRoutine() {
	const shouldInvalidate = ref(false);
	const savingRoutine = ref(false);
	const saveMutation = useMutation({
		async mutationFn(viewModel: RoutineViewModel) {
			if (viewModel.id) {
				return RoutinesAPI.updateRoutine(viewModel.id, viewModel);
			}
			return RoutinesAPI.createRoutine(viewModel);
		},
	});

	async function saveRoutine(viewModel: RoutineViewModel) {
		savingRoutine.value = true;
		await saveMutation.mutateAsync(viewModel);
		shouldInvalidate.value = true;
		savingRoutine.value = false;
	}

	useInvalidateQueries(shouldInvalidate, QueryRoutines);

	return {
		savingRoutine,
		saveRoutine,
	};
}
