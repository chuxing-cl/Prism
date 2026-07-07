import type { RealtimeOrder } from "@/data/types/dashboard"

const products = [
  "iPhone 16 Pro", "联想小新 Pro", "戴尔 XPS 15", "华为 MatePad",
  "MacBook Air M4", "索尼 WH-1000XM6", "大疆 Air 4", "Switch 2",
  "戴森 V15", "科沃斯 X5", "小米 15 Ultra", "iPad Air M3",
  "AirPods Pro 3", "三星 Galaxy S25", "佳能 EOS R6", "极米 H6 投影",
]
const regions = ["华北", "华东", "华南", "华中", "西南", "西北"]
const statuses: Array<RealtimeOrder["status"]> = ["pending", "processing", "completed"]

const orderIdCounter = { value: 10000 }

export function generateRealtimeOrders(count = 20): RealtimeOrder[] {
  const orders: RealtimeOrder[] = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const t = new Date(now.getTime() - i * 30000 - Math.random() * 10000)
    orders.push({
      id: `ORD${(orderIdCounter.value + i).toString().padStart(6, "0")}`,
      product: products[Math.floor(Math.random() * products.length)],
      amount: +(50 + Math.random() * 2000).toFixed(2),
      region: regions[Math.floor(Math.random() * regions.length)],
      time: t.toTimeString().slice(0, 8),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    })
  }
  orderIdCounter.value += count
  return orders
}
