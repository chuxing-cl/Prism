import { LogLevel, type LogEntry, type Transport } from "./types"

export class ConsoleTransport implements Transport {
  private getLevelLabel(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG: return "DEBUG"
      case LogLevel.INFO: return "INFO"
      case LogLevel.WARN: return "WARN"
      case LogLevel.ERROR: return "ERROR"
    }
  }

  log(entry: LogEntry): void {
    const label = this.getLevelLabel(entry.level)
    const prefix = `[${entry.timestamp}] [${label}] [${entry.namespace}]`

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.data ?? "")
        break
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.data ?? "")
        break
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.data ?? "")
        break
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.error ?? "")
        break
    }
  }
}
