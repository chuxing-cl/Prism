<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import { useAutoRefresh } from "@/shared/composables"
import { getConfig } from "@/core/config"
import AppLayout from "@/features/layout/components/AppLayout.vue"
import LoadingSpinner from "@/shared/components/LoadingSpinner.vue"
import KpiRow from "@/features/dashboard/components/KpiRow.vue"
import ChartGrid from "@/features/dashboard/components/ChartGrid.vue"

const store = useDashboardStore()
const { start, stop } = useAutoRefresh(() => store.refreshRealtime(), 3000)

onMounted(async () => {
  await store.fetchData()
  start()
})

onBeforeUnmount(() => {
  stop()
})

function handleRefresh() {
  store.fetchData()
}
</script>

<template>
  <AppLayout>
    <LoadingSpinner :visible="store.loading" />
    <KpiRow v-if="store.kpi" />
    <ChartGrid v-if="store.salesTrend.length > 0" />

    <div v-if="store.error" class="error-message">
      {{ store.error }}
    </div>

    <div class="refresh-bar">
      <button class="refresh-btn" @click="handleRefresh" :disabled="store.loading">
        刷新数据
      </button>
      <span v-if="store.lastUpdated" class="time-display" style="font-size:12px">
        更新于 {{ new Date(store.lastUpdated).toLocaleTimeString("zh-CN") }}
      </span>
    </div>
  </AppLayout>
</template>

<style scoped>
.error-message {
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 4px;
  color: var(--danger);
  font-size: 13px;
  text-align: center;
}

.refresh-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}
</style>
