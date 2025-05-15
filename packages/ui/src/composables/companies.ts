import { ref, toRaw, unref, watch } from "vue";
import type { CompanyFullViewModel } from "@incutonez/job-applications-openapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { CompaniesAPI } from "@/api.ts";
import { setCompanyFullRecords, setCompanyRecords } from "@/stores/companies.ts";
import { useAppDispatch } from "@/stores/main.ts";

export function useGetCompanies() {
	const dispatch = useAppDispatch();
	const query = useQuery({
		queryKey: ["companies"],
		async queryFn() {
			const { data } = await CompaniesAPI.getCompanies();
			return data.data.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
		},
	});

	watch(query.data, ($data = []) => dispatch(setCompanyRecords(toRaw($data))));

	return query;
}

export function useGetCompaniesList() {
	const dispatch = useAppDispatch();
	const query = useQuery({
		queryKey: ["companiesList"],
		async queryFn() {
			const { data } = await CompaniesAPI.getCompaniesList();
			return data.data.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));
		},
	});

	watch(query.data, ($data = []) => dispatch(setCompanyFullRecords(toRaw($data))));

	return query;
}

export function useDeleteCompany() {
	const deletingCompany = ref(false);
	const selectedCompany = ref<CompanyFullViewModel>();
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		async mutationFn(companyId: string) {
			return CompaniesAPI.deleteCompany(companyId);
		},
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: ["companiesList"],
			});
		},
	});

	async function deleteCompany() {
		const $selectedCompany = unref(selectedCompany);
		if ($selectedCompany) {
			return deleteMutation.mutate($selectedCompany.id);
		}
	}

	return {
		selectedCompany,
		deletingCompany,
		deleteCompany,
	};
}
