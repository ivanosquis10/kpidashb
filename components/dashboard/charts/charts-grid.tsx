"use client"

import { BarChart } from "./bar-chart"
import { PieChart } from "./pie-chart"
import { AreaChart } from "./area-chart"
import { TaskData } from "@/lib/types"

interface ChartsGridProps {
  taskData: TaskData
}

export function ChartsGrid({ taskData }: ChartsGridProps) {
  const chartData = [
    {
      name: "Por Hacer",
      value: Math.max(
        0,
        taskData.totalTasks -
          taskData.inProgress -
          taskData.blocked -
          taskData.completed
      ),
      color: "#6366f1",
    },
    {
      name: "En Progreso",
      value: taskData.inProgress,
      color: "#f59e0b",
    },
    {
      name: "Bloqueadas",
      value: taskData.blocked,
      color: "#ef4444",
    },
    {
      name: "Completadas",
      value: taskData.completed,
      color: "#10b981",
    },
  ]

  const barChartData = [
    {
      stage: "Por Hacer",
      tasks: Math.max(
        0,
        taskData.totalTasks -
          taskData.inProgress -
          taskData.blocked -
          taskData.completed
      ),
      fill: "#6366f1",
    },
    {
      stage: "En Progreso",
      tasks: taskData.inProgress,
      fill: "#f59e0b",
    },
    {
      stage: "Bloqueadas",
      tasks: taskData.blocked,
      fill: "#ef4444",
    },
    {
      stage: "Completadas",
      tasks: taskData.completed,
      fill: "#10b981",
    },
  ]

  const trendData = [
    {
      day: "Lun",
      completed: Math.max(0, taskData.completed - 3),
      inProgress: Math.max(0, taskData.inProgress - 1),
    },
    {
      day: "Mar",
      completed: Math.max(0, taskData.completed - 2),
      inProgress: Math.max(0, taskData.inProgress - 1),
    },
    {
      day: "Mié",
      completed: Math.max(0, taskData.completed - 1),
      inProgress: taskData.inProgress,
    },
    {
      day: "Jue",
      completed: taskData.completed,
      inProgress: taskData.inProgress,
    },
    {
      day: "Vie",
      completed: taskData.completed + 1,
      inProgress: Math.max(0, taskData.inProgress - 1),
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <BarChart data={barChartData} />
      <PieChart data={chartData} />
      <AreaChart data={trendData} />
    </div>
  )
}
