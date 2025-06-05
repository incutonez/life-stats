<script setup lang="ts" generic="T = unknown">
import { computed } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import { IconLeft, IconRight } from "@/components/Icons.ts";
import { TablePageSizes } from "@/constants.ts";
import type { ITable, TComboBoxValue, TInputValue } from "@/types/components.ts";
import { toNumber } from "@/utils/common.ts";

export interface ITablePaginationProps<TData = unknown> {
	table: ITable<TData>;
	showSearch?: boolean;
}

const { table, showSearch = true } = defineProps<ITablePaginationProps<T>>();
const search = defineModel<string>("search");
const smallest = computed(() => {
	const { pagination } = table.getState();
	return pagination.pageSize * pagination.pageIndex + 1;
});
const largest = computed(() => {
	const { pagination } = table.getState();
	return pagination.pageSize + smallest.value - 1;
});
const page = computed({
	get() {
		// Let's not display 0 as a valid page... increment by 1
		return table.getState().pagination.pageIndex + 1;
	},
	set(value) {
		// Don't forget to decrement by 1, as we're incrementing by 1 above
		table.setPageIndex(value - 1);
	},
});

function onUpdatePageSize(value?: TComboBoxValue) {
	if (value) {
		table.setPageSize(value as number);
	}
}

function onClickPreviousButton() {
	table.previousPage();
}

function onClickNextButton() {
	table.nextPage();
}

function onInputEnd(value: TInputValue = "") {
	search.value = value as string;
}
</script>

<template>
	<article class="flex border-x p-2">
		<section class="flex space-x-4">
			<FieldText
				v-if="showSearch"
				:model-value="search"
				label="Search"
				placeholder="Search..."
				@input-end="onInputEnd"
			/>
			<slot name="after-search" />
		</section>
		<section class="flex-1 flex space-x-4 justify-end">
			<section class="flex space-x-2 items-center">
				<span class="text-sm uppercase text-gray-700 font-semibold">{{ toNumber(smallest) }} - {{ toNumber(largest) }} of {{ toNumber(table.getRowCount()) }}</span>
			</section>

			<section class="flex space-x-2 items-center">
				<BaseButton
					:icon="IconLeft"
					:disabled="!table.getCanPreviousPage()"
					@click="onClickPreviousButton"
				/>
				<span class="text-sm uppercase text-gray-700 font-semibold">Page</span>
				<FieldNumber
					v-model="page"
					required
					select-on-focus
					class="w-12 text-center"
				/>
				<span class="text-sm uppercase text-gray-700 font-semibold">of {{ table.getPageCount() }}</span>
				<BaseButton
					:icon="IconRight"
					:disabled="!table.getCanNextPage()"
					@click="onClickNextButton"
				/>
			</section>
			<FieldComboBox
				:model-value="table.getState().pagination.pageSize"
				label="Page Size"
				value-field="id"
				display-field="display"
				combo-width="w-16"
				value-only
				:options="TablePageSizes"
				@update:model-value="onUpdatePageSize"
			/>
		</section>
	</article>
</template>
