<script setup lang="ts">
import ChartCard from "@/features/charts/components/ChartCard.vue"
import SalesTrendChart from "@/features/charts/components/SalesTrendChart.vue"
import CategoryPieChart from "@/features/charts/components/CategoryPieChart.vue"
import RegionalBarChart from "@/features/charts/components/RegionalBarChart.vue"
import RealtimeMonitor from "@/features/charts/components/RealtimeMonitor.vue"
import ChinaMap from "@/features/charts/components/ChinaMap.vue"
</script>

<template>
  <div class="chart-grid-map">
    <ChartCard title="销售趋势（24h）" class="sales-trend-card">
      <SalesTrendChart />
    </ChartCard>
    <ChartCard title="品类分布" class="category-pie-card">
      <CategoryPieChart />
    </ChartCard>
    <ChartCard title="中国区域销售热力图" class="map-card">
      <ChinaMap />
    </ChartCard>
    <ChartCard title="区域销售对比" class="regional-bar-card">
      <RegionalBarChart />
    </ChartCard>
    <ChartCard title="实时订单" class="realtime-card">
      <RealtimeMonitor />
    </ChartCard>
  </div>
</template>