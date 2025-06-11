<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { type DateValue, fromAbsolute } from "@internationalized/date";
import {
	DatePickerArrow,
	DatePickerCalendar,
	DatePickerCell,
	DatePickerCellTrigger,
	DatePickerContent,
	DatePickerField,
	DatePickerGrid,
	DatePickerGridBody,
	DatePickerGridHead,
	DatePickerGridRow,
	DatePickerHeadCell,
	DatePickerHeader,
	DatePickerHeading,
	DatePickerInput,
	DatePickerNext,
	DatePickerPrev,
	DatePickerRoot,
	DatePickerTrigger,
} from "reka-ui";
import FieldLabel from "@/components/FieldLabel.vue";
import { IconCalendar, IconLeft, IconRight } from "@/components/Icons.ts";
import { LocalTimeZone } from "@/constants.ts";
import type { TLabelAlign } from "@/types/components.ts";
import { getLabelAlign } from "@/utils/common.ts";

export interface IFieldDateProps {
	label?: string;
	labelAlign?: TLabelAlign;
	required?: boolean;
	format?: "number" | "date";
}

const { label = undefined, labelAlign = "left", format = "number" } = defineProps<IFieldDateProps>();
const model = defineModel<string | Date | number | undefined>();
const open = ref(false);
const internalModel = ref<DateValue | null>();
const wrapperClasses = computed(() => {
	return {
		[getLabelAlign(labelAlign)]: true,
	};
});

function onClickItem() {
	open.value = false;
}

watch([model, () => format], ([$model, $format]) => {
	if ($format === "number" && typeof $model === "number") {
		internalModel.value = fromAbsolute($model, LocalTimeZone);
	}
}, {
	immediate: true,
});

watch([internalModel, () => format], ([$internalModel, $format]) => {
	let value: Date | number | undefined = $internalModel?.toDate(LocalTimeZone);
	if ($format === "number") {
		value = value?.getTime();
	}
	model.value = value;
});
</script>

<template>
	<article :class="wrapperClasses">
		<FieldLabel :text="label" />
		<DatePickerRoot
			v-model="internalModel"
			v-model:open="open"
			weekday-format="short"
			granularity="day"
			:required="required"
		>
			<DatePickerField
				v-slot="{ segments }"
				class="field-date-picker"
			>
				<div class="flex items-center w-22">
					<!-- Literal in the context below means the forward slash -->
					<template
						v-for="item in segments"
						:key="item.part"
					>
						<DatePickerInput
							v-if="item.part === 'literal'"
							:part="item.part"
						>
							{{ item.value }}
						</DatePickerInput>
						<DatePickerInput
							v-else
							:part="item.part"
							class="rounded p-0.5 focus:outline-none focus:underline"
						>
							{{ item.value.padStart(2, "0") }}
						</DatePickerInput>
					</template>
				</div>
				<DatePickerTrigger class="rounded p-1 cursor-pointer hover:fill-sky-700">
					<IconCalendar class="size-4" />
				</DatePickerTrigger>
			</DatePickerField>
			<DatePickerContent
				:side-offset="4"
				class="z-1 rounded-xl bg-white border shadow-sm will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
			>
				<DatePickerArrow class="fill-white stroke-gray-300" />
				<DatePickerCalendar
					v-slot="{ weekDays, grid }"
					class="p-4"
				>
					<DatePickerHeader class="flex items-center justify-between">
						<DatePickerPrev class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black">
							<IconLeft class="size-6" />
						</DatePickerPrev>
						<DatePickerHeading class="text-black font-medium" />
						<DatePickerNext class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black">
							<IconRight class="size-6" />
						</DatePickerNext>
					</DatePickerHeader>
					<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
						<DatePickerGrid
							v-for="month in grid"
							:key="month.value.toString()"
							class="w-full border-collapse select-none space-y-1"
						>
							<DatePickerGridHead>
								<DatePickerGridRow class="mb-1 flex w-full justify-between">
									<DatePickerHeadCell
										v-for="day in weekDays"
										:key="day"
										class="w-8 rounded-md text-xs text-green8"
									>
										{{ day }}
									</DatePickerHeadCell>
								</DatePickerGridRow>
							</DatePickerGridHead>
							<DatePickerGridBody>
								<DatePickerGridRow
									v-for="(weekDates, index) in month.rows"
									:key="`weekDate-${index}`"
									class="flex w-full"
								>
									<DatePickerCell
										v-for="weekDate in weekDates"
										:key="weekDate.toString()"
										:date="weekDate"
									>
										<DatePickerCellTrigger
											:day="weekDate"
											:month="month.value"
											class="relative cursor-pointer hover:bg-sky-200 flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-transparent text-sm font-normal text-black size-8 outline-none focus:shadow-black hover:border-gray-500 data-[selected]:bg-sky-700 data-[selected]:font-medium data-[outside-view]:text-black/30 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through data-[today]:border data-[today]:border-black data-[selected]:before:bg-white"
											@click="onClickItem"
										/>
									</DatePickerCell>
								</DatePickerGridRow>
							</DatePickerGridBody>
						</DatePickerGrid>
					</div>
				</DatePickerCalendar>
			</DatePickerContent>
		</DatePickerRoot>
	</article>
</template>
