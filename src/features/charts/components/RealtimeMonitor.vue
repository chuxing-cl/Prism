<script setup lang="ts">
import { useDashboardStore } from "@/features/dashboard/store"

const store = useDashboardStore()

function statusLabel(s: string): string {
  switch (s) {
    case "pending": return "待处理"
    case "processing": return "处理中"
    case "completed": return "已完成"
    default: return s
  }
}
</script>

<template>
  <div class="realtime-panel">
    <div class="order-list">
      <div v-for="order in store.realtimeOrders" :key="order.id" class="order-item">
        <span class="order-id">{{ order.id }}</span>
        <span class="order-product">{{ order.product }}</span>
        <span class="order-amount">¥{{ order.amount.toFixed(2) }}</span>
        <span class="order-region">{{ order.region }}</span>
        <span class="order-status" :class="order.status">{{ statusLabel(order.status) }}</span>
      </div>
    </div>
  </div>
</template>