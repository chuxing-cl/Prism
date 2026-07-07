import type { CategoryItem } from "@/data/types/dashboard"
import type { EChartsOption } from "echarts"

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444"]

export function createCategoryPieOption(data: CategoryItem[]): EChartsOption {
  return {
    animationDuration: 800,
    animationDurationUpdate: 500,
    animationEasing: "cubicOut",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(15, 29, 50, 0.9)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      textStyle: { color: "#e2e8f0", fontSize: 12 },
      formatter: (params: Record<string, unknown>) => `${params.name}<br/>销售额: ¥${Number(params.value).toLocaleString()} (${params.percent}%)`,
    },
    legend: {
      orient: "vertical",
      right: 8,
      top: "center",
      textStyle: { color: "#94a3b8", fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["40%", "50%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(10, 22, 40, 0.8)",
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 13, fontWeight: "bold", color: "#e2e8f0" },
          itemStyle: { shadowBlur: 10, shadowColor: "rgba(59, 130, 246, 0.3)" },
        },
        data: data.map((d, i) => ({
          value: d.value,
          name: d.name,
          itemStyle: { color: COLORS[i % COLORS.length] },
        })),
      },
    ],
  }
}