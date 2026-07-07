import type { KpiData } from "@/data/types/dashboard"

export function generateKpiData(): KpiData {
  return {
    todaySales: Math.round(1200000 + Math.random() * 600000),
    todayOrders: Math.round(8000 + Math.random() * 4000),
    avgOrderValue: +(120 + Math.random() * 60).toFixed(2),
    conversionRate: +(2 + Math.random() * 3).toFixed(1),
    salesGrowth: +(5 + Math.random() * 25).toFixed(1),
    ordersGrowth: +(5 + Math.random() * 25).toFixed(1),
  }
}
