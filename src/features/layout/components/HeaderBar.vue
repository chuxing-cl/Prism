<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const currentTime = ref("")

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString("zh-CN", { hour12: false })
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <header class="dashboard-header">
    <div class="header-left" />
    <h1>智慧零售运营中心</h1>
    <div class="header-right">
      <span class="time-display">{{ currentTime }}</span>
    </div>
  </header>
</template>
