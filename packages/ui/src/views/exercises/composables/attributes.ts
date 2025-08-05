import { ref } from "vue";
import { AttributesApi } from "@incutonez/life-stats-spec";
import { useMutation } from "@tanstack/vue-query";
import { apiConfig } from "@/api.ts";

const API = new AttributesApi(apiConfig);

export function useDeleteAttribute() {
	const deletingAttribute = ref(false);
	const deleteMutation = useMutation({
		async mutationFn(attributeId: string) {
			return API.deleteAttribute(attributeId);
		},
	});

	async function deleteAttribute(attributeId?: string) {
		if (attributeId) {
			deletingAttribute.value = true;
			await deleteMutation.mutateAsync(attributeId);
			deletingAttribute.value = false;
		}
	}

	return {
		deleteAttribute,
		deletingAttribute,
	};
}
