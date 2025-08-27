"use client"

import { useState } from "react"
import { Header } from "./header"
import { MetricsForm } from "./metrics-form"
import { MetricsGrid } from "./metrics-grid"
import { ChartsGrid } from "./charts/charts-grid"
import { ExecutiveSummary } from "./executive-summary"
import { TaskData } from "@/lib/types"

export function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
      }`}
    >
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onReset={handleReset}
      />

      <div className="mx-auto px-6 py-8 space-y-8">
        <MetricsForm
          darkMode={darkMode}
          taskData={taskData}
          onInputChange={handleInputChange}
        />

        <MetricsGrid darkMode={darkMode} taskData={taskData} />

        <ChartsGrid darkMode={darkMode} taskData={taskData} />

        <ExecutiveSummary darkMode={darkMode} taskData={taskData} />
      </div>
    </div>
  )
}
