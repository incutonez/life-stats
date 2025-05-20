<script setup lang="ts" generic="T = unknown">
import { computed } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import { IconLeft, IconRight } from "@/components/Icons.ts";
import { TablePageSizes } from "@/constants.ts";
import type { ITable, TComboBoxValue } from "@/types/components.ts";
import { toNumber } from "@/utils/common.ts";

export interface ITablePaginationProps<TData = unknown> {
	table: ITable<TData>;
}

const { table } = defineProps<ITablePaginationProps<T>>();
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
</script>

<template>
	<article class="flex space-x-4 border p-2">
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
		<section class="flex space-x-4 items-center">
			<BaseButton
				:icon="IconLeft"
				:disabled="!table.getCanPreviousPage()"
				@click="onClickPreviousButton"
			/>
			<span class="text-sm uppercase text-gray-700 font-semibold">{{ toNumber(smallest) }} - {{ toNumber(largest) }} of {{ toNumber(table.getRowCount()) }}</span>
			<BaseButton
				:icon="IconRight"
				:disabled="!table.getCanNextPage()"
				@click="onClickNextButton"
			/>
		</section>
		<section class="flex space-x-2 items-center">
			<span class="text-sm uppercase text-gray-700 font-semibold">Page</span>
			<FieldNumber
				v-model="page"
				required
				select-on-focus
				class="w-12 text-center"
			/>
			<span class="text-sm uppercase text-gray-700 font-semibold">of {{ table.getPageCount() }}</span>
		</section>
	</article>
</template>
