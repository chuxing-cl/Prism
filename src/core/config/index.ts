export interface AppConfig {
  dataSource: "mock" | "api"
  refreshInterval: number // ms
  apiBaseUrl: string
  enableLogging: boolean
  logLevel: "debug" | "info" | "warn" | "error"
}

const config: AppConfig = {
  dataSource: (import.meta.env.VITE_DATA_SOURCE as AppConfig["dataSource"]) || "mock",
  refreshInterval: Number(import.meta.env.VITE_REFRESH_INTERVAL) || 30000,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING !== "false",
  logLevel: (import.meta.env.VITE_LOG_LEVEL as AppConfig["logLevel"]) || "debug",
}

export function getConfig(): AppConfig {
  return config
}
