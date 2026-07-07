<script setup lang="ts">
import { computed } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import KpiCard from "./KpiCard.vue"

const store = useDashboardStore()

const kpiList = computed(() => {
  if (!store.kpi) return []
  return [
    { label: "今日销售额", value: store.kpi.todaySales, growth: store.kpi.salesGrowth, format: "currency" as const, suffix: "元" },
    { label: "今日订单量", value: store.kpi.todayOrders, growth: store.kpi.ordersGrowth, format: "number" as const, suffix: "单" },
    { label: "平均客单价", value: store.kpi.avgOrderValue, growth: store.kpi.salesGrowth, format: "currency" as const, suffix: "元" },
    { label: "转化率", value: store.kpi.conversionRate, growth: store.kpi.ordersGrowth, format: "percent" as const, suffix: "" },
  ]
})
</script>

<template>
  <div class="kpi-row">
    <KpiCard v-for="kpi in kpiList" :key="kpi.label" v-bind="kpi" />
  </div>
</template>
