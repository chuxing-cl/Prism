import { defineStore } from "pinia"
import { ref } from "vue"
import type { DashboardData } from "@/data/types/dashboard"
import { getDashboardRepository } from "@/data/repository"
import { Logger } from "@/core/logger"

const logger = new Logger("DashboardStore")

export const useDashboardStore = defineStore("dashboard", () => {
  const kpi = ref<DashboardData["kpi"] | null>(null)
  const salesTrend = ref<DashboardData["salesTrend"]>([])
  const categoryDistribution = ref<DashboardData["categoryDistribution"]>([])
  const regionalStats = ref<DashboardData["regionalStats"]>([])
  const realtimeOrders = ref<DashboardData["realtimeOrders"]>([])
  const lastUpdated = ref("")
  const loading = ref(false)
  const error = ref<string | null>(null)

  const repo = getDashboardRepository()

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const data = await repo.getDashboardData()
      applyData(data)
      logger.info("Dashboard data loaded", { source: "fetch" })
    } catch (err) {
      error.value = "数据加载失败"
      logger.error("Failed to load dashboard data", err)
    } finally {
      loading.value = false
    }
  }

  async function refreshRealtime() {
    try {
      const data = await repo.refreshRealtimeOrders()
      realtimeOrders.value = data.realtimeOrders
      lastUpdated.value = data.lastUpdated
    } catch (err) {
      logger.error("Failed to refresh realtime orders", err)
    }
  }

  function applyData(data: DashboardData) {
    kpi.value = data.kpi
    salesTrend.value = data.salesTrend
    categoryDistribution.value = data.categoryDistribution
    regionalStats.value = data.regionalStats
    realtimeOrders.value = data.realtimeOrders
    lastUpdated.value = data.lastUpdated
  }

  return {
    kpi, salesTrend, categoryDistribution, regionalStats, realtimeOrders,
    lastUpdated, loading, error,
    fetchData, refreshRealtime,
  }
})
