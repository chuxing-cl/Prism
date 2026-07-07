<script setup lang="ts">
import { computed } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import BaseEChart from "./BaseEChart.vue"
import { createSalesTrendOption } from "@/features/charts/config/sales-trend"

const store = useDashboardStore()
const option = computed(() => createSalesTrendOption(store.salesTrend))
</script>

<template>
  <BaseEChart :option="option" />
</template>
