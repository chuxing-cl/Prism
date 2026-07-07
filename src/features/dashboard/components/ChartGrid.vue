<script setup lang="ts">
import ChartCard from "@/features/charts/components/ChartCard.vue"
import SalesTrendChart from "@/features/charts/components/SalesTrendChart.vue"
import CategoryPieChart from "@/features/charts/components/CategoryPieChart.vue"
import RegionalBarChart from "@/features/charts/components/RegionalBarChart.vue"
import RealtimeMonitor from "@/features/charts/components/RealtimeMonitor.vue"
</script>

<template>
  <div class="chart-grid">
    <ChartCard title="销售趋势（24h）">
      <SalesTrendChart />
    </ChartCard>
    <ChartCard title="品类分布">
      <CategoryPieChart />
    </ChartCard>
    <ChartCard title="区域销售对比">
      <RegionalBarChart />
    </ChartCard>
    <ChartCard title="实时订单">
      <RealtimeMonitor />
    </ChartCard>
  </div>
</template>
