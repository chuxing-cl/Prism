import { ref, onBeforeUnmount, nextTick, watch, type Ref } from "vue"
import * as echarts from "echarts/core"
import { LineChart, BarChart, PieChart } from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([
  LineChart, BarChart, PieChart,
  TitleComponent, TooltipComponent, GridComponent, LegendComponent,
  CanvasRenderer,
])

export function useECharts(domRef: Ref<HTMLElement | null>) {
  const chart = ref<echarts.ECharts | null>(null)
  const initialized = ref(false)

  async function init() {
    if (!domRef.value || initialized.value) return
    await nextTick()
    if (!domRef.value) return

    chart.value = echarts.init(domRef.value, undefined, { renderer: "canvas" })
    initialized.value = true
  }

  function setOption(option: echarts.EChartsOption) {
    if (!chart.value) return
    chart.value.setOption(option, { notMerge: true })
  }

  function resize() {
    chart.value?.resize()
  }

  function dispose() {
    if (chart.value) {
      chart.value.dispose()
      chart.value = null
      initialized.value = false
    }
  }

  onBeforeUnmount(() => dispose())

  return { chart, initialized, init, setOption, resize, dispose }
}
