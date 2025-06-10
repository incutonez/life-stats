<script setup lang="ts" generic="T extends object">
import { computed, ref, unref } from "vue";
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
const { options, displayField, valueField, labelAlign = "left", comboWidth = "w-full", valueOnly = false, required = false, customValue = false } = defineProps<IFieldComboBoxProps<T>>();
const search = ref("");
const open = ref(false);
const wrapperClasses = computed(() => {
	return {
		[getLabelAlign(labelAlign)]: true,
	};
});
const filteredOptions = computed(() => {
	const $search = unref(search);
	const value = getOptionDisplayValue(model.value);
	// We don't want to filter the list if we've selected an item
	if ($search && $search !== value) {
		const regex = new RegExp($search, "ig");
		return options.filter(({ [displayField as keyof T]: value }) => regex.test(String(value)));
	}
	return options;
});

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

function onClickInput() {
	if (open.value) {
		return;
	}
	open.value = true;
}

function onBlurInput() {
	const $search = unref(search);
	if (customValue && $search) {
		if (valueOnly) {
			model.value = $search;
		}
		else {
			model.value = {
				[valueField]: "custom",
				[displayField]: $search,
			};
		}
	}
	// Enforce a selection
	if (required) {
		search.value = getOptionDisplayValue(model.value);
	}
	// Otherwise, if we have no search value, let's remove the selection
	else if (!$search) {
		model.value = undefined;
	}
}
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
				@click="onClickInput"
				@blur="onBlurInput"
			/>
			<ComboboxTrigger class="cursor-pointer">
				<IconExpandAll class="size-4 text-grass11" />
			</ComboboxTrigger>
		</ComboboxAnchor>
		<ComboboxPortal>
			<ComboboxContent
				position="popper"
				class="z-1 bg-white w-(--reka-combobox-trigger-width) shadow-lg border max-h-56 overflow-auto"
			>
				<ComboboxItem
					v-for="item in filteredOptions"
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
