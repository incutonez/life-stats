<script setup lang="ts">
import { ref } from "vue";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import { IconArrowRight } from "@/components/Icons.ts";
import type { IBaseTabsProps } from "@/types/components.ts";

const props = defineProps<IBaseTabsProps>();
const activeTab = ref(getDefaultSelectedTab());

function getDefaultSelectedTab() {
	const [firstTab] = props.tabs;
	return firstTab?.value ?? firstTab?.title;
}
</script>

<template>
	<TabsRoot
		v-model="activeTab"
		as="article"
		class="base-tabs"
		:default-value="getDefaultSelectedTab()"
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
			class="flex-1 border overflow-auto"
			:class="tab.contentClasses"
			:value="tab.value ?? tab.title"
		>
			<slot :name="tab.title" />
		</TabsContent>
	</TabsRoot>
</template>
