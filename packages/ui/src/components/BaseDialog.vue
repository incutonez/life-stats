<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { IconCancel, IconClose } from "@/components/Icons.ts";

export interface IBaseDialogProps {
	title?: string;
	bodyClass?: string;
	footerClass?: string;
	closable?: boolean;
}

export interface IBaseDialogEmits {
	(event: "close"): void;
	(event: "cancel"): void;
	(event: "open"): void;
}

defineOptions({
	inheritAttrs: false,
});

const { closable = true, title = "", bodyClass = "", footerClass = "" } = defineProps<IBaseDialogProps>();
const open = defineModel<boolean>();
const emit = defineEmits<IBaseDialogEmits>();
const rootEl = ref<HTMLDialogElement>();

function onClickCancel() {
	open.value = false;
	emit("cancel");
}

function show() {
	emit("open");
	open.value = true;
	rootEl.value?.show();
}

function close() {
	emit("close");
	open.value = false;
	rootEl.value?.close();
}

function toggle($open = open.value) {
	if ($open) {
		show();
	}
	else {
		close();
	}
}

watch(open, ($open) => toggle($open));

onMounted(() => {
	// Default is that the dialog is not open, so only trigger if we start open
	if (open.value) {
		toggle();
	}
});

defineExpose({
	toggle,
});
</script>

<template>
	<Teleport to="body">
		<dialog
			v-bind="$attrs"
			ref="rootEl"
			class="shadow-md border rounded border-gray-300 absolute left-0 right-0 top-0 bottom-0 m-auto bg-white overflow-hidden"
		>
			<article class="flex flex-col h-full">
				<header class="flex items-center justify-between border-b border-slate-400 bg-slate-200 p-2">
					<slot name="title">
						<h1
							v-if="!!title"
							class="font-bold"
						>
							{{ title }}
						</h1>
					</slot>
					<BaseButton
						v-if="closable"
						theme="close"
						:icon="IconClose"
						@click="onClickCancel"
					/>
				</header>
				<section
					class="flex-1 overflow-auto p-2"
					:class="bodyClass"
				>
					<slot name="content" />
				</section>
				<footer
					class="flex space-x-2 justify-end border-t border-slate-400 p-2"
					:class="footerClass"
				>
					<slot name="footer" />
					<BaseButton
						v-if="closable"
						text="Cancel"
						:icon="IconCancel"
						@click="onClickCancel"
					/>
				</footer>
			</article>
		</dialog>
	</Teleport>
</template>
