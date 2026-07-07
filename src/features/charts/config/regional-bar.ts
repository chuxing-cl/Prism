import type { RegionalStats } from "@/data/types/dashboard"
import type { EChartsOption } from "echarts"

export function createRegionalBarOption(data: RegionalStats[]): EChartsOption {
  const maxData = Math.max(...data.map((d) => d.sales / 10000))
  return {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 29, 50, 0.9)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      textStyle: { color: "#e2e8f0", fontSize: 12 },
    },
    grid: { top: 16, right: 12, bottom: 24, left: 44 },
    xAxis: {
      type: "category",
      data: data.map((d) => d.region),
      axisLine: { lineStyle: { color: "rgba(148, 163, 184, 0.2)" } },
      axisLabel: { color: "#94a3b8", fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      max: maxData * 1.2,
      splitLine: { lineStyle: { color: "rgba(148, 163, 184, 0.08)" } },
      axisLabel: {
        color: "#94a3b8",
        fontSize: 10,
        formatter: (v: number) => (v ? v.toFixed(1) + "万" : "0"),
      },
    },
    series: [
      {
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "#3b82f6" },
              { offset: 1, color: "rgba(59, 130, 246, 0.3)" },
            ],
          },
        },
        emphasis: {
          itemStyle: {
            color: {
              type: "linear", x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: "#8b5cf6" },
                { offset: 1, color: "rgba(139, 92, 246, 0.4)" },
              ],
            },
          },
        },
        data: data.map((d) => +(d.sales / 10000).toFixed(1)),
      },
    ],
  }
}