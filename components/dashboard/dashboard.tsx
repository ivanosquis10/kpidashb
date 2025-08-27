"use client"

import { useState } from "react"
import { Header } from "./header"
import { MetricsForm } from "./metrics-form"
import { MetricsGrid } from "./metrics-grid"
import { ChartsGrid } from "./charts/charts-grid"
import { ExecutiveSummary } from "./executive-summary"
import { SaveDataModal } from "./save-data-modal"
import { SavedDataList } from "./saved-data-list"
import { TaskData } from "@/lib/types"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"

export function Dashboard() {
  const [taskData, setTaskData] = useState<TaskData>({
    totalTasks: 0,
    inProgress: 0,
    blocked: 0,
    completed: 0,
    sastIteration: "",
  })

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [isSavedDataListOpen, setIsSavedDataListOpen] = useState(false)

  const { savedDataList, saveData, deleteData, hasDataToSave } =
    useLocalStorage()

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

  const handleSaveData = (name: string) => {
    if (!name.trim()) {
      setIsSaveModalOpen(true)
      return false
    }
    return saveData(taskData, name)
  }

  const handleLoadData = (data: TaskData) => {
    setTaskData(data)
  }

  const handleDeleteData = (id: string) => {
    return deleteData(id)
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header onReset={handleReset} />

      <div className="mx-auto px-6 py-6 space-y-8">
        <MetricsForm
          taskData={taskData}
          onInputChange={handleInputChange}
          onSaveData={handleSaveData}
          onShowSavedData={() => setIsSavedDataListOpen(true)}
          hasDataToSave={hasDataToSave(taskData)}
          savedDataCount={savedDataList.length}
        />

        <MetricsGrid taskData={taskData} />

        <ChartsGrid taskData={taskData} />

        <ExecutiveSummary taskData={taskData} />
      </div>

      {/* Modales */}
      <SaveDataModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveData}
        taskData={taskData}
      />

      <SavedDataList
        isOpen={isSavedDataListOpen}
        onClose={() => setIsSavedDataListOpen(false)}
        savedDataList={savedDataList}
        onLoadData={handleLoadData}
        onDeleteData={handleDeleteData}
      />
    </div>
  )
}
