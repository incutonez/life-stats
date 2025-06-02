import { useQuery } from "@tanstack/vue-query";
import { JobsAPI } from "@/api.ts";
import { QueryListJobAudits } from "@/constants.ts";

export function useJobAuditsList() {
	return useQuery({
		queryKey: [QueryListJobAudits],
		async queryFn() {
			const { data } = await JobsAPI.getJobsHistory();
			return data.data;
		},
	});
}
