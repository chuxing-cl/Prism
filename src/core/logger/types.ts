export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  namespace: string
  message: string
  data?: unknown
  error?: unknown
}

export interface Transport {
  log(entry: LogEntry): void
}
