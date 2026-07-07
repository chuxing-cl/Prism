<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useResizeObserver } from "@/shared/composables"
import { useECharts } from "@/features/charts/composables/useECharts"
import type { EChartsOption } from "echarts"

const props = defineProps<{
  option: EChartsOption
}>()

const chartContainer = ref<HTMLElement | null>(null)
const { init, initialized, setOption, resize } = useECharts(chartContainer)
const { width, height } = useResizeObserver(chartContainer)

onMounted(async () => {
  await init()
  if (initialized.value) {
    setOption(props.option)
  }
})

import { watch } from "vue"

watch(() => props.option, (val) => {
  if (initialized.value) setOption(val)
}, { deep: true })

watch([width, height], () => {
  resize()
})
</script>

<template>
  <div ref="chartContainer" class="echart-container" />
</template>

<style scoped>
.echart-container {
  width: 100%;
  height: 100%;
}
</style>
