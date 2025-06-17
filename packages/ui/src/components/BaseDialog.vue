<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from "vue";
import BaseButton, { type IBaseButtonProps } from "@/components/BaseButton.vue";
import { IconCancel, IconClose } from "@/components/Icons.ts";

export interface IBaseDialogProps {
	title?: string;
	subtitle?: string;
	bodyClass?: string;
	bodyPadding?: string;
	footerClass?: string;
	closable?: boolean;
	cancelConfig?: IBaseButtonProps;
}

export interface IBaseDialogEmits {
	(event: "close"): void;
	(event: "cancel"): void;
	(event: "open"): void;
}

defineOptions({
	inheritAttrs: false,
});

const { closable = true, bodyPadding = "p-form", title = "", subtitle = "", bodyClass = "", footerClass = "", cancelConfig = {
	text: "Cancel",
	icon: IconCancel,
} } = defineProps<IBaseDialogProps>();
const open = defineModel<boolean>();
const emit = defineEmits<IBaseDialogEmits>();
const rootEl = ref<HTMLDialogElement>();
const slots = useSlots();
const bodyClasses = computed(() => {
	return {
		[bodyPadding]: true,
		[bodyClass]: true,
	};
});

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
			class="z-1 shadow-lg absolute left-0 right-0 top-0 bottom-0 m-auto bg-transparent overflow-hidden"
		>
			<article class="flex h-full">
				<section class="flex-1 flex flex-col">
					<header class="flex items-center justify-between bg-slate-200 p-2 border rounded-t">
						<section class="flex space-x-1">
							<slot name="title">
								<h1
									v-if="!!title"
									class="font-bold"
								>
									{{ title }}
								</h1>
							</slot>
							<slot name="subtitle">
								<h2 class="text-sky-800 font-semibold">
									{{ subtitle }}
								</h2>
							</slot>
						</section>
						<BaseButton
							v-if="closable"
							theme="close"
							:icon="IconClose"
							@click="onClickCancel"
						/>
					</header>
					<section
						class="base-dialog-content"
						:class="bodyClasses"
					>
						<slot name="content" />
					</section>
					<footer
						v-if="!!slots.footer || closable"
						class="flex space-x-2 justify-end border p-2 bg-slate-200"
						:class="footerClass"
					>
						<slot name="footer" />
						<BaseButton
							v-if="closable"
							v-bind="cancelConfig"
							@click="onClickCancel"
						/>
					</footer>
				</section>
			</article>
		</dialog>
	</Teleport>
</template>
