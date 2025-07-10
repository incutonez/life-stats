<script setup lang="ts" generic="T extends object">
/**
 * TODO: We should refactor this to use common functionality between FieldComboBoxVirtual and this component
 */
import { computed, ref, unref, watch } from "vue";
import {
	ComboboxAnchor,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxPortal,
	ComboboxRoot,
	ComboboxTrigger,
} from "reka-ui";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconExpandAll } from "@/components/Icons.ts";
import type { IFieldComboBoxProps, TComboBoxValue } from "@/types/components.ts";
import { getLabelAlign, isObject } from "@/utils/common.ts";

const model = defineModel<TComboBoxValue>();
const { options, displayField, valueField, labelAlign = "left", comboWidth = "w-full", valueOnly = false, required = false, customValue = false, readOnly = false, autoFocus = false } = defineProps<IFieldComboBoxProps<T>>();
const search = ref("");
const open = ref(false);
const wrapperClasses = computed(() => {
	return {
		[getLabelAlign(labelAlign)]: true,
	};
});
const filteredOptions = ref<T[]>([]);

function getComboBoxItemValue(record: T) {
	if (valueOnly) {
		return record[valueField as keyof T] as TComboBoxValue;
	}
	return record;
}

function getOptionDisplayValue(record?: TComboBoxValue) {
	let value;
	if (isObject(record)) {
		value = (record as T)[displayField as keyof T] as string;
	}
	else if (record !== undefined && record !== null) {
		value = options.find((option) => option[valueField as keyof T] === record)?.[displayField as keyof T] as string;
	}
	return value ?? "";
}

function getInputDisplay(record: TComboBoxValue) {
	return getOptionDisplayValue(record);
}

function onFocusInput() {
	// Clear the filteredOptions whenever we gain focus, this is so the list will show all options until the search changes
	filteredOptions.value = options;
}

function onClickInput() {
	if (open.value) {
		return;
	}
	// Open the list when the user clicks in the input
	open.value = true;
}

function onPressTab() {
	// When the user presses the tab, let's make sure the list is closed
	open.value = false;
}

function onBlurInput() {
	// If the options are showing, then we don't want to trigger this handler
	if (open.value) {
		return;
	}
	// Enforce a selection
	if (!customValue) {
		search.value = getOptionDisplayValue(model.value);
	}
}

function onChangeInput() {
	const $search = unref(search);
	if ($search) {
		const found = options.find((option) => option[displayField as keyof T] === $search);
		if (found) {
			model.value = getComboBoxItemValue(found);
		}
		else if (customValue) {
			model.value = {
				[displayField]: $search,
			};
		}
	}
	// Otherwise, if we have no search value, let's remove the selection
	else {
		model.value = getComboBoxItemValue({
			[valueField]: "",
			[displayField]: "",
		} as T);
	}
}

function onMouseDownOut() {
	open.value = false;
}

watch(search, ($search) => {
	// No need to filter if we're not showing the list
	if (!open.value) {
		return;
	}
	// We don't want to filter the list if we've selected an item
	if ($search) {
		const regex = new RegExp($search, "ig");
		filteredOptions.value = options.filter(({ [displayField as keyof T]: value }) => regex.test(String(value)));
	}
	else {
		filteredOptions.value = options;
	}
});

watch(() => options, ($options) => filteredOptions.value = $options);
</script>

<template>
	<ComboboxRoot
		v-model="model"
		v-model:open="open"
		as="article"
		:class="wrapperClasses"
		:ignore-filter="true"
		:required="required"
		:reset-search-term-on-blur="!customValue"
		:disabled="readOnly"
	>
		<FieldLabel :text="label" />
		<ComboboxAnchor
			as="section"
			class="field-combo-box max-w-full"
			:class="comboWidth"
		>
			<ComboboxInput
				v-model="search"
				class="field-text-input w-full min-w-0"
				placeholder="Placeholder..."
				:display-value="getInputDisplay"
				:required="required"
				:aria-readonly="readOnly"
				:auto-focus="autoFocus"
				@input="onChangeInput"
				@click="onClickInput"
				@blur="onBlurInput"
				@focus="onFocusInput"
				@keydown.tab="onPressTab"
			/>
			<ComboboxTrigger
				v-if="!readOnly"
				class="cursor-pointer"
			>
				<IconExpandAll class="size-4 text-grass11" />
			</ComboboxTrigger>
		</ComboboxAnchor>
		<ComboboxPortal>
			<ComboboxContent
				position="popper"
				class="z-auto bg-white w-(--reka-combobox-trigger-width) shadow-lg border max-h-56 overflow-auto"
				@pointer-down-outside="onMouseDownOut"
			>
				<ComboboxItem
					v-for="item in (filteredOptions as T[])"
					:key="item[valueField as keyof T] as PropertyKey"
					:value="getComboBoxItemValue(item)"
					class="text-sm w-full flex items-center py-2 cursor-pointer relative select-none data-[disabled]:text-gray-200 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-sky-200 aria-[selected=true]:font-semibold aria-[selected=true]:bg-sky-200"
				>
					<span class="px-2">{{ item[displayField as keyof T] }}</span>
				</ComboboxItem>
			</ComboboxContent>
		</ComboboxPortal>
	</ComboboxRoot>
</template>
