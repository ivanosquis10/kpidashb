"use client"

import { useState } from "react"
import { Header } from "./header"
import { MetricsForm } from "./metrics-form"
import { MetricsGrid } from "./metrics-grid"
import { ChartsGrid } from "./charts/charts-grid"
import { ExecutiveSummary } from "./executive-summary"
import { TaskData } from "@/lib/types"

export function Dashboard() {
  const [taskData, setTaskData] = useState<TaskData>({
    totalTasks: 0,
    inProgress: 0,
    blocked: 0,
    completed: 0,
    sastIteration: "",
  })

  const handleInputChange = (field: keyof TaskData, value: string) => {
    if (field === "sastIteration") {
      setTaskData((prev) => ({
        ...prev,
        [field]: value,
      }))
    } else {
      const numValue = Number.parseInt(value) || 0
      setTaskData((prev) => ({
        ...prev,
        [field]: numValue,
      }))
    }
  }

  const handleReset = () => {
    setTaskData({
      totalTasks: 0,
      inProgress: 0,
      blocked: 0,
      completed: 0,
      sastIteration: "",
    })
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header onReset={handleReset} />

      <div className="mx-auto px-6 py-6 space-y-8">
        <MetricsForm taskData={taskData} onInputChange={handleInputChange} />

        <MetricsGrid taskData={taskData} />

        <ChartsGrid taskData={taskData} />

        <ExecutiveSummary taskData={taskData} />
      </div>
    </div>
  )
}
