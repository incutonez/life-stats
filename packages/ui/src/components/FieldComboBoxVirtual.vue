<script setup lang="ts" generic="T extends object">
/**
 * TODO: We should refactor this to use common functionality between FieldComboBox and this component
 */
import { computed, type Ref, ref, unref, watch } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import { ComboboxAnchor,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxPortal,
	ComboboxRoot,
	ComboboxTrigger } from "reka-ui";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconExpandAll } from "@/components/Icons.ts";
import type { IFieldComboBoxProps, TComboBoxValue } from "@/types/components.ts";
import { getLabelAlign } from "@/utils/common.ts";

/**
 * Keyboard navigation is a little busted in the virtual scroller
 */
const model = defineModel<TComboBoxValue>();
const { options, displayField, valueField, labelAlign = "left", comboWidth = "w-full", valueOnly = false, required = false, customValue = false } = defineProps<IFieldComboBoxProps<T>>();
const parentRef = ref();
const search = ref("");
const open = ref(false);
// Generic support isn't the greatest in Vue... https://stackoverflow.com/a/78910699/1253609
const filteredOptions = ref([]) as Ref<T[]>;
const scrollItem = ref<HTMLElement>();
/**
 * Reka UI uses TanStack Virtual under the hood but has some issues... they scroll things into view manually through a
 * hook, and then call the virtualizer.scrollToIndex method
 * Source: https://github.com/unovue/reka-ui/blob/902dffe180c796a899b25bc79b5f0f7ee41a9269/packages/core/src/Listbox/ListboxVirtualizer.vue#L114
 */
const virtualizer = useVirtualizer({
	getScrollElement: () => parentRef.value,
	estimateSize: () => 45,
	horizontal: false,
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

function getComboBoxItemValue(record: T | number) {
	record = typeof record === "number" ? filteredOptions.value[record] as T : record;
	if (valueOnly) {
		return record[valueField as keyof T] as TComboBoxValue;
	}
	return record;
}

function getComboBoxItemDisplay(record?: T) {
	if (record === undefined) {
		return "";
	}
	return record[displayField as keyof T] as string;
}

function getOptionDisplayValue(record?: TComboBoxValue) {
	// Search value
	if (typeof record === "string") {
		record = filteredOptions.value.find((option) => option[valueField as keyof T] === record);
	}
	// Index value
	else if (typeof record === "number") {
		record = filteredOptions.value[record];
	}
	return getComboBoxItemDisplay(record as T);
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
	open.value = true;
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
		const found = options.find((option) => getComboBoxItemDisplay(option) === $search);
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

function onPressTab() {
	// When the user presses the tab, let's make sure the list is closed
	open.value = false;
}

function onInputKeyDown() {
	scrollItem.value?.scrollIntoView({
		block: "start",
	});
}

/**
 * Because we're virtually rendering all elements, we need to tap into the highlight event that's emitted from the
 * ComboBox... when that changes, we make sure our item is scrolled into view through the onInputKeyDown handler.  The
 * reason we don't just handle it here is because the user can scroll with their mousewheel, which would mess with what
 * is currently being displayed, so we only do it on keydown.
 */
function onHighlight(payload?: { ref: HTMLElement }) {
	scrollItem.value = payload?.ref;
}

watch(search, ($search) => {
	// No need to filter if we're not showing the list
	if (!open.value) {
		return;
	}
	// We don't want to filter the list if we've selected an item
	if ($search) {
		const regex = new RegExp($search, "ig");
		filteredOptions.value = options.filter((option) => regex.test(getComboBoxItemDisplay(option)));
	}
	else {
		filteredOptions.value = options;
	}
});

watch(() => options, ($options) => {
	filteredOptions.value = $options;
}, {
	immediate: true,
});
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
		orientation="vertical"
		@highlight="onHighlight"
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
				@input="onChangeInput"
				@click="onClickInput"
				@blur="onBlurInput"
				@focus="onFocusInput"
				@keydown.tab="onPressTab"
				@keydown.down.up="onInputKeyDown"
			/>
			<ComboboxTrigger class="cursor-pointer">
				<IconExpandAll class="size-4 text-grass11" />
			</ComboboxTrigger>
		</ComboboxAnchor>
		<ComboboxPortal>
			<ComboboxContent
				position="popper"
				class="z-auto bg-white w-(--reka-combobox-trigger-width) shadow-lg border"
			>
				<div
					ref="parentRef"
					class="max-h-56 overflow-auto"
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
							<ComboboxItem
								v-for="virtualRow in items"
								:key="virtualRow.key as PropertyKey"
								:data-index="virtualRow.index"
								:value="getComboBoxItemValue(virtualRow.index)"
								class="text-sm w-full flex items-center py-2 cursor-pointer relative select-none data-[disabled]:text-gray-200 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-sky-200 aria-[selected=true]:font-semibold aria-[selected=true]:bg-sky-200"
							>
								<span class="px-2">{{ getOptionDisplayValue(virtualRow.index) }}</span>
							</ComboboxItem>
						</div>
					</div>
				</div>
			</ComboboxContent>
		</ComboboxPortal>
	</ComboboxRoot>
</template>
