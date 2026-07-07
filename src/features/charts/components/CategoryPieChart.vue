<script setup lang="ts">
import { computed } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import BaseEChart from "./BaseEChart.vue"
import { createCategoryPieOption } from "@/features/charts/config/category-pie"

const store = useDashboardStore()
const option = computed(() => createCategoryPieOption(store.categoryDistribution))
</script>

<template>
  <BaseEChart :option="option" />
</template>
