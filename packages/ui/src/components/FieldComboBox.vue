<script setup lang="ts" generic="T extends object">
import { computed, ref, unref } from "vue";
import { useVirtualizer, type VirtualItem } from "@tanstack/vue-virtual";
import {
	type AcceptableValue, ComboboxAnchor,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxPortal,
	ComboboxRoot,
	ComboboxTrigger,
} from "reka-ui";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconExpandAll } from "@/components/Icons.ts";
import type { IFieldComboBoxProps } from "@/types/components.ts";
import { getLabelAlign, isObject } from "@/utils/common.ts";

const model = defineModel<AcceptableValue>();
const { options, displayField, valueField, labelAlign = "left", comboWidth = "w-full", valueOnly = false, required = false, customValue = false } = defineProps<IFieldComboBoxProps<T>>();
const parentRef = ref();
const search = ref("");
const open = ref(false);
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
const virtualizer = useVirtualizer({
	getScrollElement: () => parentRef.value,
	estimateSize: () => 45,
	get count() {
		return filteredOptions.value.length;
	},
});
const items = computed(() => virtualizer.value.getVirtualItems());
const wrapperClasses = computed(() => {
	return {
		[getLabelAlign(labelAlign)]: true,
	};
});

function measureElement(el: Element) {
	if (!el) {
		return;
	}

	virtualizer.value.measureElement(el);

	return undefined;
}

function getComboBoxItemValue(row: VirtualItem) {
	const record = filteredOptions.value[row.index];
	if (valueOnly) {
		return record[valueField as keyof T] as AcceptableValue;
	}
	return record;
}

function getOptionDisplayValue(record?: AcceptableValue) {
	let value;
	if (isObject(record)) {
		value = (record as T)[displayField as keyof T] as string;
	}
	else if (record !== undefined && record !== null) {
		value = options.find((option) => option[valueField as keyof T] === record)?.[displayField as keyof T] as string;
	}
	return value ?? "";
}

function getInputDisplay(record: AcceptableValue) {
	return getOptionDisplayValue(record);
}

function onClickInput() {
	if (open.value) {
		return;
	}
	open.value = true;
}

function onBlurInput() {
	if (customValue) {
		const $search = unref(search);
		if ($search) {
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
		else {
			search.value = getOptionDisplayValue(model.value);
		}
	}
	// Enforce a selection
	else if (required) {
		search.value = getOptionDisplayValue(model.value);
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
				class="z-1 bg-white w-(--reka-combobox-trigger-width) shadow-lg border"
			>
				<div
					ref="parentRef"
					class="h-56 overflow-auto"
				>
					<div
						class="w-full relative overflow-auto"
						:style="{
							height: `${virtualizer.getTotalSize()}px`,
						}"
					>
						<div
							class="absolute top-0 left-0 w-full"
							:style="{
								transform: `translateY(${items[0]?.start ?? 0}px)`,
							}"
						>
							<div
								v-for="virtualRow in items"
								:key="virtualRow.key as PropertyKey"
								:ref="measureElement"
								:data-index="virtualRow.index"
							>
								<ComboboxItem
									:value="getComboBoxItemValue(virtualRow)"
									class="text-sm w-full flex items-center py-2 cursor-pointer relative select-none data-[disabled]:text-gray-200 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-sky-200 aria-[selected=true]:font-semibold aria-[selected=true]:bg-sky-200"
								>
									<span class="px-2">{{ filteredOptions[virtualRow.index][displayField as keyof T] }}</span>
								</ComboboxItem>
							</div>
						</div>
					</div>
				</div>
			</ComboboxContent>
		</ComboboxPortal>
	</ComboboxRoot>
</template>
