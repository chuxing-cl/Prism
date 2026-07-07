<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue"
import { useDashboardStore } from "@/features/dashboard/store"
import { useAutoRefresh } from "@/shared/composables"
import AppLayout from "@/features/layout/components/AppLayout.vue"
import LoadingSpinner from "@/shared/components/LoadingSpinner.vue"
import KpiRow from "@/features/dashboard/components/KpiRow.vue"
import ChartGrid from "@/features/dashboard/components/ChartGrid.vue"

const store = useDashboardStore()
const liveActive = ref(false)

const { start: startRealtime, stop: stopRealtime } = useAutoRefresh(() => store.refreshRealtime(), 3000)
const { start: startFullRefresh, stop: stopFullRefresh } = useAutoRefresh(() => store.silentRefresh(), 10000)

onMounted(async () => {
  await store.fetchData()
  liveActive.value = true
  startRealtime()
  startFullRefresh()
})

onBeforeUnmount(() => {
  stopRealtime()
  stopFullRefresh()
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
      <div class="live-indicator" :class="{ active: liveActive }">
        <span class="live-dot" />
        <span class="live-text">实时</span>
      </div>
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

.live-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  margin-right: auto;
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.live-indicator.active {
  opacity: 1;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

.live-text {
  font-size: 11px;
  color: var(--success);
  font-weight: 600;
  letter-spacing: 1px;
}
</style>