<script setup lang="ts">
import { computed } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import BaseEChart from "./BaseEChart.vue"
import { createRegionalBarOption } from "@/features/charts/config/regional-bar"

const store = useDashboardStore()
const option = computed(() => createRegionalBarOption(store.regionalStats))
</script>

<template>
  <BaseEChart :option="option" />
</template>
