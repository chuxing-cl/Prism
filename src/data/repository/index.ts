import type { DashboardRepository } from "./DashboardRepository"
import { MockDashboardRepo } from "./impl/MockDashboardRepo"
import { ApiDashboardRepo } from "./impl/ApiDashboardRepo"
import { getConfig } from "@/core/config"
import { Logger } from "@/core/logger"

const logger = new Logger("RepoFactory")

let repoInstance: DashboardRepository | null = null

export function getDashboardRepository(): DashboardRepository {
  if (repoInstance) return repoInstance

  const source = getConfig().dataSource
  logger.info(`Creating repository for data source: ${source}`)

  switch (source) {
    case "api":
      repoInstance = new ApiDashboardRepo()
      break
    case "mock":
    default:
      repoInstance = new MockDashboardRepo()
      break
  }

  return repoInstance
}
