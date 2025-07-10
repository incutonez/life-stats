<script setup lang="ts">
import { watch } from "vue";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import { IconArrowRight } from "@/components/Icons.ts";
import type { IBaseTabsProps } from "@/types/components.ts";

const props = defineProps<IBaseTabsProps>();
const activeTab = defineModel<string | number>();

// Set default tab for the 1st time
watch(() => props.tabs, ([firstTab]) => {
	activeTab.value = firstTab?.value ?? firstTab?.title;
}, {
	immediate: true,
	// Only want this to happen the 1st time
	once: true,
});
</script>

<template>
	<TabsRoot
		v-model="activeTab"
		as="article"
		class="base-tabs"
		:orientation="orientation"
	>
		<TabsList
			as="section"
			class="base-tabs-list"
		>
			<TabsTrigger
				v-for="{ title, value = title } in tabs"
				:key="value"
				:value="value"
				class="base-tab"
			>
				<span class="px-4">{{ title }}</span>
				<IconArrowRight
					v-if="orientation === 'vertical'"
					:class="activeTab === value ? 'visible' : 'invisible'"
					class="tab-trigger-arrow"
				/>
			</TabsTrigger>
		</TabsList>
		<TabsContent
			v-for="tab in tabs"
			:key="`content-${tab.value ?? tab.title}`"
			as="article"
			class="flex-1 overflow-auto"
			:class="tab.contentClasses"
			:value="tab.value ?? tab.title"
		>
			<slot :name="tab.title" />
		</TabsContent>
	</TabsRoot>
</template>
