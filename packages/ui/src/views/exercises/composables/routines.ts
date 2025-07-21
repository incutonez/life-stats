import { ref } from "vue";
import { RoutinesApi, type RoutineViewModel } from "@incutonez/life-stats-spec";
import { useMutation } from "@tanstack/vue-query";
import { apiConfig } from "@/api.ts";

const RoutinesAPI = new RoutinesApi(apiConfig);

export function useCreateRoutine() {
	const creatingRoutine = ref(false);
	const createMutation = useMutation({
		async mutationFn(viewModel: RoutineViewModel) {
			return RoutinesAPI.createRoutine(viewModel);
		},
	});

	async function createRoutine(viewModel: RoutineViewModel) {
		creatingRoutine.value = true;
		await createMutation.mutateAsync(viewModel);
		creatingRoutine.value = false;
	}

	return {
		creatingRoutine,
		createRoutine,
	};
}
