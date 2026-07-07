import type { DashboardData } from "@/data/types/dashboard"

export interface DashboardRepository {
  getDashboardData(): Promise<DashboardData>
  refreshRealtimeOrders(): Promise<DashboardData>
}
