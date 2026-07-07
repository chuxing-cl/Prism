import type { RegionalStats } from "@/data/types/dashboard"
import type { EChartsOption } from "echarts"
import * as echarts from "echarts/core"

// Simplified China region GeoJSON
const chinaRegionsGeoJSON: Record<string, Record<string, unknown>> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "西北" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [73.5, 49.2], [96.0, 49.2], [104.0, 47.0],
          [108.0, 42.5], [111.0, 40.0], [108.0, 37.0],
          [107.0, 36.0], [105.0, 35.0], [107.0, 34.0],
          [104.0, 33.0], [102.0, 30.0], [97.0, 28.0],
          [92.0, 28.0], [85.0, 28.0], [79.0, 30.0],
          [73.5, 32.0], [73.5, 49.2],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "华北" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [108.0, 42.5], [112.0, 44.0], [117.0, 44.5],
          [120.0, 43.0], [124.0, 42.0], [124.0, 40.0],
          [122.0, 38.5], [120.0, 37.5], [119.0, 36.5],
          [117.0, 36.0], [115.0, 36.0], [113.5, 36.0],
          [112.0, 36.0], [112.0, 35.0], [108.0, 35.0],
          [107.0, 36.0], [108.0, 37.0], [111.0, 40.0],
          [108.0, 42.5],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "华东" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [115.0, 36.0], [117.0, 36.0], [119.0, 36.5],
          [122.0, 36.5], [124.0, 35.0], [123.0, 33.0],
          [122.0, 31.0], [122.0, 29.5], [120.0, 28.0],
          [118.0, 27.0], [117.0, 26.0], [115.0, 26.0],
          [116.0, 28.5], [117.0, 30.0], [116.5, 32.0],
          [115.0, 33.0], [113.5, 34.0], [113.5, 36.0],
          [115.0, 36.0],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "华中" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [108.0, 35.0], [112.0, 35.0], [112.0, 36.0],
          [113.5, 36.0], [113.5, 34.0], [115.0, 33.0],
          [116.5, 32.0], [117.0, 30.0], [116.0, 28.5],
          [115.0, 26.0], [113.0, 26.0], [111.5, 27.0],
          [110.0, 28.0], [109.0, 30.0], [107.5, 31.0],
          [107.0, 33.0], [108.0, 35.0],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "西南" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [78.0, 32.0], [92.0, 28.0], [97.0, 28.0],
          [102.0, 30.0], [104.0, 33.0], [107.0, 34.0],
          [107.0, 33.0], [107.5, 31.0], [109.0, 30.0],
          [110.0, 28.0], [111.5, 27.0], [113.0, 26.0],
          [111.5, 24.5], [108.0, 23.0], [106.0, 22.0],
          [104.0, 21.0], [101.0, 21.5], [98.0, 22.0],
          [97.0, 24.0], [91.0, 24.0], [78.0, 28.0],
          [78.0, 32.0],
        ]],
      },
    },
    {
      type: "Feature",
      properties: { name: "华南" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [106.0, 26.0], [115.0, 26.0], [117.0, 26.0],
          [118.0, 27.0], [120.0, 28.0], [120.0, 26.5],
          [118.0, 24.5], [117.0, 23.0], [116.0, 22.0],
          [114.0, 21.0], [112.0, 20.0], [111.0, 19.5],
          [108.5, 19.0], [108.0, 20.5], [108.0, 23.0],
          [106.5, 24.0], [106.0, 26.0],
        ]],
      },
    },
  ],
}

// Register the map
export function registerChinaMap(): void {
  try {
    echarts.registerMap("china-regions", chinaRegionsGeoJSON as GeoJSON)
  } catch {
    // already registered
  }
}

export function createChinaMapOption(data: RegionalStats[]): EChartsOption {
  const regions = new Map(data.map((d) => [d.region, d.sales]))

  return {
    animationDuration: 800,
    animationDurationUpdate: 500,
    animationEasing: "cubicOut",
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(15, 29, 50, 0.9)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      textStyle: { color: "#e2e8f0", fontSize: 12 },
      formatter: (params: Record<string, unknown>) => {
        const name = params.name as string
        const sales = regions.get(name)
        return `<strong>${name}</strong><br/>销售额: ¥${sales ? sales.toLocaleString() : "—"}`
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map((d) => d.sales)),
      left: 8,
      bottom: 8,
      text: ["高", "低"],
      textStyle: { color: "#94a3b8", fontSize: 10 },
      inRange: {
        color: ["rgba(59,130,246,0.15)", "rgba(59,130,246,0.35)", "#3b82f6", "#2563eb", "#1d4ed8"],
      },
      calculable: true,
      itemWidth: 10,
      itemHeight: 80,
    },
    series: [
      {
        type: "map",
        map: "china-regions",
        roam: false,
        selectedMode: false,
        label: {
          show: true,
          color: "#e2e8f0",
          fontSize: 12,
          fontWeight: 600,
        },
        itemStyle: {
          borderColor: "rgba(59, 130, 246, 0.3)",
          borderWidth: 1.5,
          shadowBlur: 8,
          shadowColor: "rgba(59, 130, 246, 0.15)",
          shadowOffsetX: 0,
          shadowOffsetY: 2,
        },
        emphasis: {
          label: { color: "#fff", fontSize: 14 },
          itemStyle: {
            borderColor: "#3b82f6",
            borderWidth: 2,
            shadowBlur: 16,
            shadowColor: "rgba(59, 130, 246, 0.4)",
          },
        },
        data: data.map((d) => ({
          name: d.region,
          value: d.sales,
        })),
      },
    ],
  }
}