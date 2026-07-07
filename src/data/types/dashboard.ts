export interface KpiData {
  todaySales: number
  todayOrders: number
  avgOrderValue: number
  conversionRate: number
  salesGrowth: number
  ordersGrowth: number
}

export interface SalesTrendPoint {
  hour: string
  sales: number
  orders: number
}

export interface CategoryItem {
  name: string
  value: number
  percentage: number
}

export interface RegionalStats {
  region: string
  sales: number
  orders: number
  growth: number
}

export interface RealtimeOrder {
  id: string
  product: string
  amount: number
  region: string
  time: string
  status: "pending" | "processing" | "completed"
}

export interface DashboardData {
  kpi: KpiData
  salesTrend: SalesTrendPoint[]
  categoryDistribution: CategoryItem[]
  regionalStats: RegionalStats[]
  realtimeOrders: RealtimeOrder[]
  lastUpdated: string
}
