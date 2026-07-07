import { Logger } from "@/core/logger"

const logger = new Logger("ErrorHandler")

export function setupGlobalErrorHandler(): void {
  window.onerror = (message, source, line, col, error) => {
    logger.error("Global error", { message, source, line, col, error })
    return false
  }

  window.onunhandledrejection = (event) => {
    logger.error("Unhandled promise rejection", event.reason)
  }
}

export function safeExecute<T>(fn: () => T, fallback: T, context?: string): T {
  try {
    return fn()
  } catch (err) {
    logger.error(`safeExecute failed${context ? `: ${context}` : ""}`, err)
    return fallback
  }
}

export async function safeExecuteAsync<T>(
  fn: () => Promise<T>,
  fallback: T,
  context?: string,
): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    logger.error(`safeExecuteAsync failed${context ? `: ${context}` : ""}`, err)
    return fallback
  }
}
