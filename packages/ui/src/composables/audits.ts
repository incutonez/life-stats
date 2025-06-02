import { useQuery } from "@tanstack/vue-query";
import { ExercisesAPI, JobsAPI } from "@/api.ts";
import { QueryListExercisesAudits, QueryListJobAudits } from "@/constants.ts";

export function useListJobsHistory() {
	return useQuery({
		queryKey: [QueryListJobAudits],
		async queryFn() {
			const { data } = await JobsAPI.getJobsHistory();
			return data.data;
		},
	});
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
