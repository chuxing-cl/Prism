import type { RegionalStats } from "@/data/types/dashboard"

const regions = ["华北", "华东", "华南", "华中", "西南", "西北"]

export function generateRegionalStats(): RegionalStats[] {
  return regions.map((region) => ({
    region,
    sales: Math.round(800000 + Math.random() * 1200000),
    orders: Math.round(5000 + Math.random() * 8000),
    growth: +(8 + Math.random() * 22).toFixed(1),
  }))
}
