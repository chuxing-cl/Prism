import type { DashboardData } from "@/data/types/dashboard"
import { generateKpiData } from "@/data/mock/charts/kpi-cards"
import { generateSalesTrend } from "@/data/mock/charts/sales-trend"
import { generateCategoryDistribution } from "@/data/mock/charts/category-distribution"
import { generateRegionalStats } from "@/data/mock/charts/regional-stats"
import { generateRealtimeOrders } from "@/data/mock/charts/realtime-monitor"

let cachedData: DashboardData | null = null

export function generateDashboardData(): DashboardData {
  cachedData = {
    kpi: generateKpiData(),
    salesTrend: generateSalesTrend(),
    categoryDistribution: generateCategoryDistribution(),
    regionalStats: generateRegionalStats(),
    realtimeOrders: generateRealtimeOrders(20),
    lastUpdated: new Date().toISOString(),
  }
  return cachedData
}

export function refreshRealtimeOrders(): DashboardData {
  if (!cachedData) return generateDashboardData()
  const newOrder = generateRealtimeOrders(1)[0]
  cachedData.realtimeOrders = [newOrder, ...cachedData.realtimeOrders.slice(0, 19)]
  cachedData.lastUpdated = new Date().toISOString()
  return cachedData
}
