import { useQuery } from "@tanstack/vue-query";
import { AuditsAPI } from "@/api.ts";
import { QueryListAudits } from "@/constants.ts";

export function useAuditsList() {
	return useQuery({
		queryKey: [QueryListAudits],
		async queryFn() {
			const { data } = await AuditsAPI.listAudits();
			return data.data;
		},
	});
}
