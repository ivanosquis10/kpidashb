"use client"

import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react"
import { MetricCard } from "./metric-card"
import { TaskData } from "@/lib/types"

interface MetricsGridProps {
  taskData: TaskData
}

export function MetricsGrid({ taskData }: MetricsGridProps) {
  const completionRate =
    taskData.totalTasks > 0
      ? ((taskData.completed / taskData.totalTasks) * 100).toFixed(1)
      : "0"
  const progressRate =
    taskData.totalTasks > 0
      ? ((taskData.inProgress / taskData.totalTasks) * 100).toFixed(1)
      : "0"
  const blockedRate =
    taskData.totalTasks > 0
      ? ((taskData.blocked / taskData.totalTasks) * 100).toFixed(1)
      : "0"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <MetricCard
        title="Total de Tareas"
        value={taskData.totalTasks}
        icon={Activity}
        iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
        // subtitle="Base del proyecto"
        badge={{
          text: "Base del proyecto",
          variant: "outline",
          className:
            "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300",
        }}
      />

      <MetricCard
        title="En Progreso"
        value={taskData.inProgress}
        icon={Clock}
        iconBg="bg-gradient-to-br from-amber-500 to-orange-600"
        badge={{
          text: `${progressRate}% del total`,
          className:
            "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 border border-amber-200",
        }}
        progress={{ value: Number.parseFloat(progressRate), showBar: true }}
        className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-amber-900/20"
      />

      <MetricCard
        title="Bloqueadas"
        value={taskData.blocked}
        icon={AlertTriangle}
        iconBg="bg-gradient-to-br from-red-500 to-pink-600"
        badge={{
          text: `${blockedRate}% requiere atención`,
          className:
            "bg-red-200 text-red-800 dark:text-red-300 border border-red-300",
        }}
        warning={
          taskData.blocked > 0 ? "Requiere intervención inmediata" : undefined
        }
        className="bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20"
      />

      <MetricCard
        title="Completadas"
        value={taskData.completed}
        icon={CheckCircle}
        iconBg="bg-gradient-to-br from-green-500 to-emerald-600"
        badge={{
          text: `${completionRate}% completado`,
          className:
            "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border border-emerald-200",
        }}
        progress={{ value: Number.parseFloat(completionRate), showBar: true }}
        className="bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-900/20"
      />

      <MetricCard
        title="Iteración SAST"
        value={taskData.sastIteration || "N/A"}
        icon={Shield}
        iconBg="bg-gradient-to-br from-purple-500 to-indigo-600"
        badge={{
          text: "Análisis de seguridad",
          variant: "outline",
          className:
            "bg-purple-100 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-300",
        }}
        className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20"
      />
    </div>
  )
}
