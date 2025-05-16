import { computed, inject, type InjectionKey, onUnmounted, provide, type Ref, ref, toRaw, unref, watch } from "vue";
import { type ApplicationViewModel, EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import clone from "just-clone";
import { ApplicationsAPI } from "@/api.ts";
import { RouteCreate } from "@/router.ts";
import { setApplicationRecords } from "@/stores/applications.ts";
import { useAppDispatch } from "@/stores/main.ts";

interface IImportMutation {
	addHeaders: boolean;
	file: File;
}

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

export function useImportApplications() {
	const importFile = ref<File>();
	const uploadingFile = ref(false);
	const importMutations = useMutation({
		async mutationFn({ addHeaders, file }: IImportMutation) {
			return ApplicationsAPI.uploadApplications(addHeaders, file);
		},
	});

	async function uploadApplications(addHeaders = true) {
		const $importFile = unref(importFile);
		if ($importFile) {
			uploadingFile.value = true;
			const { data } = await importMutations.mutateAsync({
				addHeaders,
				file: $importFile,
			});
			uploadingFile.value = false;
			return data;
		}
		return [];
	}

	return {
		uploadingFile,
		uploadApplications,
		importFile,
	};
}

export function useDeleteApplication() {
	const deletingApplication = ref(false);
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		async mutationFn(record: ApplicationViewModel) {
			return ApplicationsAPI.deleteApplication(record.id);
		},
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: ["applications"],
			});
			await queryClient.invalidateQueries({
				queryKey: ["companiesList"],
			});
		},
	});

	async function deleteApplication(record?: ApplicationViewModel) {
		if (record) {
			deletingApplication.value = true;
			await deleteMutation.mutateAsync(record);
			deletingApplication.value = false;
		}
	}

	return {
		deleteApplication,
		deletingApplication,
	};
}

export function useBulkApplications() {
	const addedApplications = ref<ApplicationViewModel[]>([]);
	const queryClient = useQueryClient();
	const addingApplications = ref(false);
	const added = ref(false);
	const bulkMutation = useMutation({
		async mutationFn(records: ApplicationViewModel[]) {
			addingApplications.value = true;
			await ApplicationsAPI.createApplications(records);
			addingApplications.value = false;
		},
	});

	async function createApplications() {
		const records = unref(addedApplications);
		if (records) {
			await bulkMutation.mutateAsync(records);
			added.value = true;
		}
	}

	onUnmounted(() => {
		if (added.value) {
			queryClient.invalidateQueries();
		}
	});

	return {
		addedApplications,
		addingApplications,
		createApplications,
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
	const savingApplication = ref(false);
	const viewRecord = ref<ApplicationViewModel>();
	const pastedRecord = injectPastedApplication();
	const queryClient = useQueryClient();
	const updated = ref(false);
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
					status: EnumApplicationStatus.Applied,
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
	});

	async function save() {
		savingApplication.value = true;
		await updateMutation.mutateAsync(viewRecord.value);
		updated.value = true;
		savingApplication.value = false;
	}

	const provider = {
		viewRecord,
		query,
		pastedRecord,
		save,
		isEdit,
		savingApplication,
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

	onUnmounted(async () => {
		/* Instead of doing this in the onSuccess of the mutation, we opt for it here because we don't want to reload our
		 * current record if we're closing the dialog... it's potentially a wasted call */
		if (updated.value) {
			await queryClient.invalidateQueries();
		}
	});

	provide(ApplicationViewRecordKey, provider);

	return provider;
}

export function injectApplicationRecord() {
	return inject(ApplicationViewRecordKey) as TApplicationViewRecord;
}
