import { computed, type ModelRef, ref } from "vue";
import type { IChangeEvent, IFieldTextEmit, IFieldTextProps } from "@/types/components.ts";
import { getLabelAlign } from "@/utils/common.ts";

export interface IUseFieldText {
	props: IFieldTextProps;
	model: ModelRef<string>;
	valid: ModelRef<boolean>;
	emit: IFieldTextEmit;
}

export function useFieldText<T extends HTMLInputElement | HTMLTextAreaElement>({ props, model, valid, emit }: IUseFieldText) {
	const inputEl = ref<T>();
	let inputEndTimer: ReturnType<typeof setTimeout>;
	const wrapperClasses = computed(() => {
		return {
			[props.wrapperCls ?? ""]: true,
			[getLabelAlign(props.labelAlign ?? "left")]: true,
		};
	});

	function onUpdateModel(event: Event) {
		const { target } = event as IChangeEvent<T>;
		valid.value = inputEl.value?.checkValidity() ?? false;
		clearTimeout(inputEndTimer);
		if (target.value) {
			inputEndTimer = setTimeout(() => emit("inputEnd", model.value), props.delay ?? 250);
		}
		else {
			emit("inputEnd", "");
		}
	}

	return {
		onUpdateModel,
		wrapperClasses,
		inputEl,
	};
}
