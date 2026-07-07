import type { CategoryItem } from "@/data/types/dashboard"

const categories = ["服装", "数码", "家电", "美妆", "食品", "家居"]

export function generateCategoryDistribution(): CategoryItem[] {
  const values = categories.map(() => 300000 + Math.random() * 700000)
  const total = values.reduce((a, b) => a + b, 0)
  return categories.map((name, i) => ({
    name,
    value: Math.round(values[i]),
    percentage: +((values[i] / total) * 100).toFixed(1),
  }))
}
