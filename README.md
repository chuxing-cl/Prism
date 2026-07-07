# Prism · 棱镜

> 一款开源的数据可视化大屏项目，帮助你从 0 到 1 学会自己动手制作数据大屏。
> 英文名 **Prism**，中文名 **棱镜** —— 寓意透过数据折射出多维度的洞察。

---

## 项目简介

Prism 提供完整的从设计到实现的数据大屏搭建流程，覆盖**数据接入 → 图表绘制 → 布局编排 → 实时更新**等核心环节。所有数据采用 Mock 生成，无需后端服务，开箱即用。

适合前端开发者、数据分析师以及所有对数据可视化感兴趣的学习者。

## 大屏预览

![智慧零售运营中心](https://raw.githubusercontent.com/chuxing-cl/Prism/main/public/dashboard-preview.png)

> 实际效果以本地运行后浏览器展示为准。

## 功能特性

- **智慧零售运营中心** — 完整的零售数据大屏场景，包含 KPI 指标、趋势分析、品类分布、区域对比
- **中国区域销售热力图** — 基于 ECharts Map 的区域着色，销售额越高颜色越亮，带立体悬浮效果
- **全组件实时更新** — KPI 每 10 秒自动刷新，实时订单每 3 秒滚动更新，所有图表带平滑动画过渡
- **Mock 数据驱动** — 内置完整 Mock 数据，页面打开即有真实数据展示
- **数据源一键切换** — Repository 模式，环境变量 `VITE_DATA_SOURCE` 控制 Mock / API 切换，组件零改动
- **模块化架构** — feature-based 目录结构，core / data / features / shared / styles 五层分离
- **深蓝科技风主题** — 暗色渐变背景 + 蓝紫渐变强调色 + 卡片辉光交互

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Vue 3 (Composition API + `<script setup>`) + TypeScript |
| 构建 | Vite 8 |
| 图表 | ECharts 5（LineChart / BarChart / PieChart / MapChart） |
| 状态管理 | Pinia |
| 路由 | Vue Router 4（懒加载） |
| HTTP | Axios（预留 API 切换） |
| Mock | MockJS |
| 测试 | Vitest + jsdom |
| 代码质量 | ESLint + Prettier + Husky + lint-staged + commitlint |

## 项目结构

```
prism/
├── src/
│   ├── core/                    # 框架无关核心层
│   │   ├── config/              # 应用配置（数据源切换、刷新间隔等）
│   │   ├── logger/              # 日志系统（命名空间、分级、可插拔 Transport）
│   │   └── error-handler/       # 全局错误捕获
│   ├── data/                    # 数据访问层
│   │   ├── types/               # 领域类型定义（DashboardData、KpiData 等）
│   │   ├── repository/          # Repository 接口 + Mock 实现 + API 占位
│   │   ├── mock/                # Mock 数据生成器（KPI、趋势、品类、区域、实时订单）
│   │   └── api/                 # Axios 实例 + 拦截器
│   ├── features/                # 业务功能模块
│   │   ├── dashboard/           # 大屏主视图 + Pinia Store + KPI 卡片组件
│   │   ├── charts/              # 图表模块
│   │   │   ├── components/      # BaseEChart（ECharts 通用封装）+ 6 个图表组件
│   │   │   ├── composables/     # useECharts（ECharts 生命周期管理）
│   │   │   └── config/          # ECharts Option 配置工厂（每个图表独立文件）
│   │   └── layout/              # 布局组件（AppLayout、HeaderBar）
│   ├── shared/                  # 跨功能复用
│   │   ├── components/          # LoadingSpinner、DataPanel
│   │   ├── composables/         # useResizeObserver、useAutoRefresh
│   │   └── utils/               # 数字/货币/百分比格式化
│   ├── styles/                  # 样式系统
│   │   ├── variables.css        # CSS 变量（主题色、字体、尺寸）
│   │   ├── reset.css            # CSS Reset
│   │   ├── global.css           # 全局样式入口
│   │   └── dashboard-theme.css  # 大屏专属主题（深蓝科技风）
│   └── router/                  # Vue Router 配置
├── __tests__/                   # 测试文件
├── public/                      # 静态资源
├── .env                         # 环境变量（数据源切换、日志等级等）
├── vite.config.ts               # Vite 配置（路径别名 @/ → src/）
├── tsconfig.app.json            # TypeScript 配置
└── vitest.config.ts             # 测试配置
```

## 快速开始

```bash
# 克隆项目
git clone https://github.com/chuxing-cl/Prism.git
cd Prism

# 安装依赖
npm install

# 启动开发服务器（自动打开浏览器）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 切换数据源

项目默认使用 Mock 数据。如需切换到真实 API：

```bash
# 在 .env 中修改
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://your-api-server.com/api
```

切换后程序不报错（API 不可用时会有错误提示），组件代码零改动。

## 大屏内容

| 区域 | 位置 | 内容 |
|------|------|------|
| 标题栏 | 顶部居中 | "智慧零售运营中心" + 当前时间 |
| KPI 指标 | 顶部 4 列 | 今日销售额 / 订单量 / 客单价 / 转化率（带滚动计数动画） |
| 销售趋势 | 左上 | 24 小时折线图，模拟夜市高峰（10-12 / 14-16 / 19-21 三个波峰） |
| 品类分布 | 右上 | 环形饼图，6 品类（服装/数码/家电/美妆/食品/家居） |
| 中国区域销售热力图 | 中央 | 6 区域多边形地图，销售额越高颜色越亮，带立体阴影效果 |
| 区域销售对比 | 左下 | 柱状图，6 区域（华北/华东/华南/华中/西南/西北） |
| 实时订单监控 | 右下 | 订单滚动列表，3 秒自动刷新，支持状态标签 |
| 实时指示器 | 底部 | 脉冲绿点 + 更新时间戳，直观显示数据实时流动 |

## 实时更新机制

| 更新项 | 间隔 | 方式 |
|--------|------|------|
| 实时订单 | 3 秒 | 仅刷新订单列表，轻量快速 |
| KPI + 全部图表 | 10 秒 | 静默全量刷新，无 loading 闪烁 |
| 动画过渡 | 500ms | ECharts `animationDurationUpdate` 平滑切换 |

## 架构设计

### 数据流

```
DashboardView.vue
  └── onMounted → store.fetchData()
        └── repository.getDashboardData()
              ├── MockDashboardRepo（VITE_DATA_SOURCE=mock）
              └── ApiDashboardRepo（VITE_DATA_SOURCE=api）
        └── store.applyData(data) → 各组件通过 computed 响应式更新
  └── useAutoRefresh → 3s / 10s 定时器
```

### Repository 模式

```typescript
// 定义接口
interface DashboardRepository {
  getDashboardData(): Promise<DashboardData>
  refreshRealtimeOrders(): Promise<DashboardData>
}

// Mock 实现 → 随机生成数据
class MockDashboardRepo implements DashboardRepository { ... }

// API 实现 → 调用后端接口（占位）
class ApiDashboardRepo implements DashboardRepository { ... }

// 工厂函数 — 由环境变量决定注入哪个实现
export function getDashboardRepository(): DashboardRepository { ... }
```

## 开发指南

```bash
# 类型检查
npm run build

# 单元测试
npm run test:unit

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 贡献指南

欢迎任何形式的贡献！提交 Issue、Pull Request 或者参与讨论，都在我们的期待之中。

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feat/amazing-feature`
3. 提交改动: `git commit -m 'feat: add amazing feature'`
4. 推送分支: `git push origin feat/amazing-feature`
5. 提交 Pull Request

## 开源许可

本项目采用 [MIT](./LICENSE) 许可证。