import type { SalesTrendPoint } from "@/data/types/dashboard"
import type { EChartsOption } from "echarts"

export function createSalesTrendOption(data: SalesTrendPoint[]): EChartsOption {
  return {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 29, 50, 0.9)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      textStyle: { color: "#e2e8f0", fontSize: 12 },
    },
    grid: { top: 20, right: 16, bottom: 24, left: 48 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.hour),
      axisLine: { lineStyle: { color: "rgba(148, 163, 184, 0.2)" } },
      axisLabel: { color: "#94a3b8", fontSize: 10, interval: 2 },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "rgba(148, 163, 184, 0.08)" } },
      axisLabel: { color: "#94a3b8", fontSize: 10, formatter: (v: number) => v >= 10000 ? (v / 10000).toFixed(0) + "万" : String(v) },
    },
    series: [
      {
        name: "销售额",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 2, color: "#3b82f6" },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59, 130, 246, 0.4)" },
              { offset: 1, color: "rgba(59, 130, 246, 0.02)" },
            ],
          },
        },
        data: data.map((d) => d.sales),
      },
    ],
  }
}
