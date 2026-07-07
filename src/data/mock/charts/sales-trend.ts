import type { SalesTrendPoint } from "@/data/types/dashboard"

export function generateSalesTrend(): SalesTrendPoint[] {
  const points: SalesTrendPoint[] = []
  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, "0") + ":00"
    let baseSales = 40000 + Math.random() * 20000
    if (h >= 10 && h <= 12) baseSales *= 1.6
    if (h >= 14 && h <= 16) baseSales *= 1.4
    if (h >= 19 && h <= 21) baseSales *= 2.0
    if (h >= 1 && h <= 5) baseSales *= 0.3
    points.push({
      hour,
      sales: Math.round(baseSales),
      orders: Math.round(baseSales / (120 + Math.random() * 60)),
    })
  }
  return points
}
