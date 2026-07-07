import type { DashboardRepository } from "@/data/repository/DashboardRepository"
import type { DashboardData } from "@/data/types/dashboard"
import { generateDashboardData, refreshRealtimeOrders as refreshMockOrders } from "@/data/mock"
import { Logger } from "@/core/logger"

const logger = new Logger("MockDashboardRepo")

export class MockDashboardRepo implements DashboardRepository {
  async getDashboardData(): Promise<DashboardData> {
    logger.debug("Generating mock dashboard data")
    await this.simulateNetwork()
    return generateDashboardData()
  }

  async refreshRealtimeOrders(): Promise<DashboardData> {
    logger.debug("Refreshing realtime orders (mock)")
    return refreshMockOrders()
  }

  private simulateNetwork(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))
  }
}
