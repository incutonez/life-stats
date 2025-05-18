<script setup lang="ts">
import { computed } from "vue";
import type { IBaseButtonProps } from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import { IconCheck, IconDown, IconRight } from "@/components/Icons.ts";
import { injectGlobalError } from "@/composables/app.ts";

const cancelConfig: IBaseButtonProps = {
	text: "Acknowledge",
	icon: IconCheck,
	theme: "info",
};
const { showErrorDetails, showErrorDialog, errorMsg, errorMsgStack, errorTitle, resetError } = injectGlobalError();
const errorDetailsCls = computed(() => {
	return {
		"border-gray-500 flex-1": showErrorDetails.value,
		"border-transparent": !showErrorDetails.value,
	};
});

function onToggleErrorDetails() {
	showErrorDetails.value = !showErrorDetails.value;
}

function onClickClose() {
	resetError();
}
</script>

<template>
	<BaseDialog
		v-model="showErrorDialog"
		:title="errorTitle"
		class="size-1/2"
		body-class="flex flex-col space-y-2"
		:cancel-config="cancelConfig"
		@close="onClickClose"
	>
		<template #content>
			<FieldDisplay
				v-if="!!errorMsg"
				label="Message"
				:value="errorMsg"
			/>
			<fieldset
				:class="errorDetailsCls"
				class="border"
			>
				<legend
					class="text-sm uppercase font-semibold text-gray-700 cursor-pointer flex items-center"
					@click="onToggleErrorDetails"
				>
					<Component
						:is="showErrorDetails ? IconDown : IconRight"
						class="size-5 fill-gray-700"
					/>
					<span>Error Details</span>
				</legend>
				<pre
					v-if="showErrorDetails"
					class="whitespace-break-spaces px-2 py-1"
				>{{ errorMsgStack }}</pre>
			</fieldset>
		</template>
	</BaseDialog>
</template>
