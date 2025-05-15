import { computed, inject, type InjectionKey, provide, type Ref, ref, toRaw, unref, watch } from "vue";
import { type ApplicationViewModel, EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import clone from "just-clone";
import { ApplicationsAPI } from "@/api.ts";
import { RouteCreate } from "@/router.ts";
import { setApplicationRecords } from "@/stores/applications.ts";
import { useAppDispatch } from "@/stores/main.ts";

type TApplicationViewRecord = ReturnType<typeof provideApplicationRecord>;
const ApplicationViewRecordKey: InjectionKey<TApplicationViewRecord> = Symbol("applicationViewRecord");

type TPastedApplicationRecord = ReturnType<typeof providePastedApplication>;
const PastedApplicationRecordKey: InjectionKey<TPastedApplicationRecord> = Symbol("pastedApplicationRecord");

export function useGetApplications() {
	const dispatch = useAppDispatch();
	const query = useQuery({
		queryKey: ["applications"],
		async queryFn() {
			const { data } = await ApplicationsAPI.listApplications({
				start: 0,
				limit: 20,
				page: 0,
			});
			return data;
		},
	});

	watch(query.data, ($data) => dispatch(setApplicationRecords(toRaw($data?.data))));

	return query;
}

export function useDeleteApplication() {
	const deletingApplication = ref(false);
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		async mutationFn(record: ApplicationViewModel) {
			deletingApplication.value = true;
			await ApplicationsAPI.deleteApplication(record.id);
			deletingApplication.value = false;
		},
		async onSuccess() {
			await queryClient.invalidateQueries();
		},
	});

	async function deleteApplication(record?: ApplicationViewModel) {
		if (record) {
			return deleteMutation.mutate(record);
		}
	}

	return {
		deleteApplication,
		deletingApplication,
	};
}

export function providePastedApplication() {
	const pastedRecord = ref<ApplicationViewModel>();

	provide(PastedApplicationRecordKey, pastedRecord);

	return pastedRecord;
}

export function injectPastedApplication() {
	return inject(PastedApplicationRecordKey, ref()) as TPastedApplicationRecord;
}

export function provideApplicationRecord(applicationId: Ref<string>) {
	const viewRecord = ref<ApplicationViewModel>();
	const pastedRecord = injectPastedApplication();
	const queryClient = useQueryClient();
	const isEdit = computed(() => !!viewRecord.value?.id);
	const query = useQuery({
		queryKey: ["application", applicationId],
		async queryFn() {
			const $applicationId = unref(applicationId);
			if ($applicationId === RouteCreate) {
				return {
					id: "",
					positionTitle: "",
					dateApplied: Date.now(),
					url: "",
					site: "",
					compensation: "",
					order: EnumApplicationStatus.NoStatus,
					company: {
						id: "",
						name: "",
					},
					comments: [],
				};
			}
			const { data } = await ApplicationsAPI.getApplication($applicationId);
			return data;
		},
	});
	const updateMutation = useMutation({
		async mutationFn(record?: ApplicationViewModel) {
			if (record?.id) {
				return ApplicationsAPI.updateApplication(record.id, record);
			}
			else if (record) {
				return ApplicationsAPI.createApplication(record);
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries();
		},
	});

	async function save() {
		return updateMutation.mutate(viewRecord.value);
	}

	const provider = {
		viewRecord,
		query,
		pastedRecord,
		save,
		isEdit,
	};

	/**
	 * In order to keep our data in the cache untainted, we clone it, so we can modify it as we please, and if the user
	 * clicks the cancel button, then that object is essentially reset, and the changes aren't persisted
	 */
	watch(query.data, ($data) => {
		const $pastedRecord = unref(pastedRecord);
		if ($pastedRecord) {
			viewRecord.value = $pastedRecord;
		}
		else if ($data) {
			viewRecord.value = clone(toRaw($data));
		}
		else {
			viewRecord.value = undefined;
		}
	}, {
		immediate: true,
	});

	provide(ApplicationViewRecordKey, provider);

	return provider;
}

export function injectApplicationRecord() {
	return inject(ApplicationViewRecordKey) as TApplicationViewRecord;
}
