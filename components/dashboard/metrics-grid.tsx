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
  darkMode: boolean
  taskData: TaskData
}

export function MetricsGrid({ darkMode, taskData }: MetricsGridProps) {
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
        darkMode={darkMode}
        title="Total de Tareas"
        value={taskData.totalTasks}
        icon={Activity}
        iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
        subtitle="Base del proyecto"
        badge={{
          text: "Base del proyecto",
          variant: "outline",
          className: darkMode
            ? "bg-slate-700 border-slate-600 text-slate-300"
            : "bg-slate-100 border-slate-200 text-slate-700",
        }}
      />

      <MetricCard
        darkMode={darkMode}
        title="En Progreso"
        value={taskData.inProgress}
        icon={Clock}
        iconBg="bg-gradient-to-br from-amber-500 to-orange-600"
        badge={{
          text: `${progressRate}% del total`,
          className: darkMode
            ? "bg-amber-900/50 text-amber-300"
            : "bg-amber-100 text-amber-800",
        }}
        progress={{ value: Number.parseFloat(progressRate), showBar: true }}
        className={
          darkMode
            ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-amber-900/20"
            : "border-slate-200/60 bg-gradient-to-br from-white to-amber-50"
        }
      />

      <MetricCard
        darkMode={darkMode}
        title="Bloqueadas"
        value={taskData.blocked}
        icon={AlertTriangle}
        iconBg="bg-gradient-to-br from-red-500 to-pink-600"
        badge={{
          text: `${blockedRate}% requiere atención`,
          variant: "destructive",
        }}
        warning={
          taskData.blocked > 0 ? "Requiere intervención inmediata" : undefined
        }
        className={
          darkMode
            ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-red-900/20"
            : "border-slate-200/60 bg-gradient-to-br from-white to-red-50"
        }
      />

      <MetricCard
        darkMode={darkMode}
        title="Completadas"
        value={taskData.completed}
        icon={CheckCircle}
        iconBg="bg-gradient-to-br from-green-500 to-emerald-600"
        badge={{
          text: `${completionRate}% completado`,
          className: darkMode
            ? "bg-green-900/50 text-green-300"
            : "bg-green-100 text-green-800",
        }}
        progress={{ value: Number.parseFloat(completionRate), showBar: true }}
        className={
          darkMode
            ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-green-900/20"
            : "border-slate-200/60 bg-gradient-to-br from-white to-green-50"
        }
      />

      <MetricCard
        darkMode={darkMode}
        title="Iteración SAST"
        value={taskData.sastIteration || "N/A"}
        icon={Shield}
        iconBg="bg-gradient-to-br from-purple-500 to-indigo-600"
        badge={{
          text: "Análisis de seguridad",
          variant: "outline",
          className: darkMode
            ? "bg-purple-900/50 border-purple-700 text-purple-300"
            : "bg-purple-100 border-purple-200 text-purple-800",
        }}
        className={
          darkMode
            ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-purple-900/20"
            : "border-slate-200/60 bg-gradient-to-br from-white to-purple-50"
        }
      />
    </div>
  )
}
