import { LogLevel, type LogEntry, type Transport } from "./types"
import { ConsoleTransport } from "./transports"

const transports: Transport[] = [new ConsoleTransport()]

export function addTransport(t: Transport): void {
  transports.push(t)
}

export class Logger {
  private namespace: string
  private enabled: boolean

  constructor(namespace: string, enabled = true) {
    this.namespace = namespace
    this.enabled = enabled
  }

  private log(level: LogLevel, message: string, data?: unknown, error?: unknown): void {
    if (!this.enabled) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      namespace: this.namespace,
      message,
      data,
      error,
    }

    for (const t of transports) {
      t.log(entry)
    }
  }

  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data)
  }

  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data)
  }

  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data)
  }

  error(message: string, error?: unknown): void {
    this.log(LogLevel.ERROR, message, undefined, error)
  }
}
