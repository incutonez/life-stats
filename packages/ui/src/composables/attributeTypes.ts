import { type MaybeRef, ref, toRaw, unref, watch } from "vue";
import {
	type AttributeTypeListViewModel,
	AttributeTypesApi, type AttributeTypeViewModel,
	EnumFeatures,
} from "@incutonez/life-stats-spec";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { apiConfig } from "@/api.ts";
import { getInvalidateQueryPredicate } from "@/composables/app.ts";
import { QueryGetAttributeTypes } from "@/constants.ts";

const api = new AttributeTypesApi(apiConfig);

export function useListAttributeTypes(feature: MaybeRef<EnumFeatures>) {
	const attributeTypeRecords = ref<AttributeTypeListViewModel[]>([]);
	const query = useQuery({
		queryKey: [QueryGetAttributeTypes, feature],
		async queryFn() {
			const { data } = await api.listAttributeTypes({
				feature: unref(feature),
			});
			return data;
		},
	});

	watch(query.data, ($data = []) => {
		attributeTypeRecords.value = toRaw($data);
	}, {
		immediate: true,
	});

	return {
		attributeTypeRecords,
	};
}

export function useGetExerciseAttributeTypes() {
	return useQuery({
		queryKey: [QueryGetAttributeTypes],
		async queryFn() {
			const { data } = await api.getAttributeTypes(EnumFeatures.exercises);
			return data;
		},
	});
}

export function useDeleteAttributeType() {
	const queryClient = useQueryClient();
	const deletingAttributeType = ref(false);
	const deleteMutation = useMutation({
		async mutationFn(attributeTypeId: string) {
			const { data } = await api.deleteAttributeType(attributeTypeId);
			return data;
		},
		async onSuccess() {
			await queryClient.invalidateQueries(getInvalidateQueryPredicate(QueryGetAttributeTypes));
		},
	});

	async function deleteAttributeType(attributeTypeId?: string) {
		if (attributeTypeId) {
			deletingAttributeType.value = true;
			await deleteMutation.mutateAsync(attributeTypeId);
			deletingAttributeType.value = false;
		}
	}

	return {
		deletingAttributeType,
		deleteAttributeType,
	};
}

export function useGetAttributeType(attributeTypeId: MaybeRef<string>) {
	const attributeTypeRecord = ref<AttributeTypeViewModel>();
	const query = useQuery({
		queryKey: [QueryGetAttributeTypes, attributeTypeId],
		async queryFn() {
			const $attributeTypeId = unref(attributeTypeId);
			if ($attributeTypeId) {
				const { data } = await api.getAttributeType($attributeTypeId);
				return data;
			}
		},
	});

	async function reloadAttributeType() {
		return query.refetch();
	}

	watch(query.data, ($data) => {
		attributeTypeRecord.value = toRaw($data);
	}, {
		immediate: true,
	});

	return {
		attributeTypeRecord,
		reloadAttributeType,
	};
}
