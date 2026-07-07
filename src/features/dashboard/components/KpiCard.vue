<script setup lang="ts">
import { ref, onMounted, watch } from "vue"

const props = defineProps<{
  label: string
  value: number
  growth: number
  format: "currency" | "number" | "percent"
  suffix?: string
}>()

const displayValue = ref(0)
const animated = ref(false)

function animateValue() {
  animated.value = true
  const start = 0
  const end = props.value
  const duration = 1000
  const startTime = performance.now()

  function tick(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(start + (end - start) * eased)
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

onMounted(animateValue)

watch(() => props.value, animateValue)

function formatted(v: number): string {
  switch (props.format) {
    case "currency":
      return v >= 10000 ? (v / 10000).toFixed(v >= 100000 ? 0 : 1) + "万" : v.toLocaleString()
    case "number":
      return v >= 10000 ? (v / 10000).toFixed(1) + "万" : v.toLocaleString()
    case "percent":
      return v.toFixed(1) + "%"
    default:
      return v.toLocaleString()
  }
}
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-label">{{ label }}</div>
    <div class="kpi-value">
      {{ formatted(displayValue) }}<span v-if="suffix" style="font-size:0.6em;color:var(--text-secondary);margin-left:2px">{{ suffix }}</span>
    </div>
    <div class="kpi-footer">
      <span class="kpi-growth" :class="growth >= 0 ? 'positive' : 'negative'">
        {{ growth >= 0 ? '+' : '' }}{{ growth.toFixed(1) }}%
      </span>
      <span style="color:var(--text-muted);font-size:12px">较昨日</span>
    </div>
  </div>
</template>
