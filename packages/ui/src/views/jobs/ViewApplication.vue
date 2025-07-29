<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseTabs from "@/components/BaseTabs.vue";
import { IconDelete, IconSave } from "@/components/Icons.ts";
import type { IBaseTab } from "@/types/components.ts";
import TabComments from "@/views/jobs/applications/TabComments.vue";
import TabDetails from "@/views/jobs/applications/TabDetails.vue";
import TabLinks from "@/views/jobs/applications/TabLinks.vue";
import { provideApplicationRecord, useDeleteApplication } from "@/views/jobs/composables/applications.ts";
import { useGetCompanies } from "@/views/jobs/composables/companies.ts";
import { useJobRoutes } from "@/views/jobs/composables/routes.ts";
import ViewApplicationLinks from "@/views/jobs/ViewApplicationLinks.vue";
import DeleteDialog from "@/views/shared/DeleteDialog.vue";

export interface IViewApplicationProps {
	applicationId: string;
	suppressRouting?: boolean;
}

const props = defineProps<IViewApplicationProps>();
const open = ref(true);
const showApplicationLinksDialog = ref(false);
const applicationId = computed(() => props.applicationId);
const { data: companies } = useGetCompanies();
const { viewRecord, save, pastedRecord, isEdit, savingApplication } = provideApplicationRecord(applicationId);
const showDelete = ref(false);
const { deleteApplication, deletingApplication } = useDeleteApplication();
const title = computed(() => isEdit.value ? "Edit Application:" : "Create Application");
const subtitle = computed(() => {
	let title = "";
	const $viewRecord = unref(viewRecord);
	if (isEdit.value && $viewRecord) {
		title = `${$viewRecord.company.name} - ${$viewRecord.positionTitle}`;
	}
	return title;
});
const { viewApplicationParent } = useJobRoutes();
const tabs = reactive<IBaseTab[]>([{
	title: "Details",
	contentClasses: "flex flex-col items-start gap-2 p-2 border-0",
}, {
	title: "Comments",
	contentClasses: "flex flex-col gap-2 pt-2 border-0",
}, {
	title: "Links",
	contentClasses: "flex flex-col gap-2 pt-2 border-0",
}]);

function onCloseView() {
	pastedRecord.value = undefined;
	if (props.suppressRouting) {
		return;
	}
	viewApplicationParent();
}

async function onClickSave() {
	await save();
	open.value = false;
}

function onClickDeleteButton() {
	showDelete.value = true;
}

async function onClickDelete() {
	await deleteApplication(viewRecord.value);
	open.value = false;
}

/**
 * The pasted record is raw text that was transformed, and because we have a stubbed company with only the name, we have
 * to attempt to get the company from our current list by name (instead of by ID).
 */
function setPastedCompany() {
	const $companies = unref(companies);
	const $pastedRecord = unref(pastedRecord);
	if ($pastedRecord && $companies?.length) {
		const pastedRecordCompany = $pastedRecord.company;
		const found = $companies.find((company) => company.name === pastedRecordCompany.name);
		if (found) {
			$pastedRecord.company = found;
		}
	}
}

onMounted(() => setPastedCompany());

watch(companies, () => setPastedCompany(), {
	immediate: true,
});
</script>

<template>
	<BaseDialog
		v-if="viewRecord"
		v-model="open"
		:title="title"
		:subtitle="subtitle"
		class="size-9/10"
		body-padding=""
		@close="onCloseView"
	>
		<template #content>
			<BaseTabs
				:tabs="tabs"
				orientation="vertical"
			>
				<template #Details>
					<TabDetails />
				</template>
				<template #Comments>
					<TabComments />
				</template>
				<template #Links>
					<TabLinks />
				</template>
			</BaseTabs>
			<DeleteDialog
				v-model="showDelete"
				entity-name="this application"
				:loading="deletingApplication"
				@delete="onClickDelete"
			/>
			<ViewApplicationLinks
				v-model="showApplicationLinksDialog"
				:filter-id="viewRecord.id"
				:initial-ids="viewRecord.links?.map(({ id }) => id!)"
			/>
		</template>
		<template #footer>
			<BaseButton
				v-if="isEdit"
				text="Delete"
				:icon="IconDelete"
				theme="danger"
				:loading="deletingApplication"
				@click="onClickDeleteButton"
			/>
			<BaseButton
				text="Save"
				:icon="IconSave"
				theme="info"
				:loading="savingApplication"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>
