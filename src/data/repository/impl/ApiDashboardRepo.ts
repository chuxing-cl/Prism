import type { DashboardRepository } from "@/data/repository/DashboardRepository"
import type { DashboardData } from "@/data/types/dashboard"
import { apiClient } from "@/data/api"
import { Logger } from "@/core/logger"

const logger = new Logger("ApiDashboardRepo")

export class ApiDashboardRepo implements DashboardRepository {
  async getDashboardData(): Promise<DashboardData> {
    logger.info("Fetching dashboard data from API")
    const { data } = await apiClient.get<DashboardData>("/dashboard")
    return data
  }

  async refreshRealtimeOrders(): Promise<DashboardData> {
    logger.info("Refreshing realtime orders from API")
    const { data } = await apiClient.get<DashboardData>("/dashboard/realtime")
    return data
  }
}
