export interface ChartOption {
  title?: string
  animation?: boolean
  theme?: "dark" | "light"
}

export interface ChartSeries {
  name: string
  type: "line" | "bar" | "pie"
  data: unknown[]
  color?: string
}

export interface ChartDimensions {
  width?: number
  height?: number
}
