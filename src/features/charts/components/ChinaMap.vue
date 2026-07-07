<script setup lang="ts">
import { computed } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import BaseEChart from "./BaseEChart.vue"
import { registerChinaMap, createChinaMapOption } from "@/features/charts/config/china-map"

// Register map immediately during setup, before child components mount
registerChinaMap()

const store = useDashboardStore()
const option = computed(() => createChinaMapOption(store.regionalStats))
</script>

<template>
  <BaseEChart :option="option" />
</template>