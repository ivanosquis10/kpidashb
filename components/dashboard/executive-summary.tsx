"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { TaskData } from "@/lib/types"

interface ExecutiveSummaryProps {
  darkMode: boolean
  taskData: TaskData
}

export function ExecutiveSummary({
  darkMode,
  taskData,
}: ExecutiveSummaryProps) {
  const completionRate =
    taskData.totalTasks > 0
      ? ((taskData.completed / taskData.totalTasks) * 100).toFixed(1)
      : "0"
  const progressRate =
    taskData.totalTasks > 0
      ? ((taskData.inProgress / taskData.totalTasks) * 100).toFixed(1)
      : "0"
  const pendingTasks = Math.max(
    0,
    taskData.totalTasks -
      taskData.inProgress -
      taskData.blocked -
      taskData.completed
  )

  const getProgressStatus = () => {
    const rate = Number.parseFloat(completionRate)
    if (rate >= 80)
      return {
        icon: ArrowUp,
        color: "text-green-600",
        bg: "bg-green-50",
        status: "Excelente",
      }
    if (rate >= 60)
      return {
        icon: ArrowUp,
        color: "text-blue-600",
        bg: "bg-blue-50",
        status: "Bueno",
      }
    if (rate >= 40)
      return {
        icon: Minus,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        status: "Regular",
      }
    return {
      icon: ArrowDown,
      color: "text-red-600",
      bg: "bg-red-50",
      status: "Necesita atención",
    }
  }

  const progressStatus = getProgressStatus()

  return (
    <Card
      className={`shadow-sm transition-colors duration-300 ${
        darkMode
          ? "border-slate-700/60 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"
          : "border-slate-200/60 bg-gradient-to-r from-white via-slate-50 to-white"
      }`}
    >
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle
                className={`text-xl font-semibold transition-colors duration-300 ${
                  darkMode ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Resumen Ejecutivo
              </CardTitle>
              <p
                className={`text-sm mt-1 transition-colors duration-300 ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Análisis inteligente de rendimiento y productividad
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`transition-colors duration-300 ${
              darkMode
                ? "bg-emerald-900/50 text-emerald-300 border-emerald-700"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            <Zap className="h-3 w-3 mr-1" />
            Insights automáticos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`text-center p-8 rounded-2xl border transition-colors duration-300 ${
              darkMode
                ? "bg-gradient-to-br from-slate-800 to-emerald-900/20 border-emerald-800/50"
                : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"
            }`}
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Productividad
            </h3>
            <p
              className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              {completionRate}%
            </p>
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Tareas completadas del total
            </p>
            <Separator className="my-4" />
            <div className="flex items-center justify-center gap-2">
              <progressStatus.icon
                className={`h-4 w-4 ${progressStatus.color}`}
              />
              <span className={`text-sm font-medium ${progressStatus.color}`}>
                {progressStatus.status}
              </span>
            </div>
          </div>

          <div
            className={`text-center p-8 rounded-2xl border transition-colors duration-300 ${
              darkMode
                ? "bg-gradient-to-br from-slate-800 to-amber-900/20 border-amber-800/50"
                : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100"
            }`}
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Carga Activa
            </h3>
            <p
              className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {taskData.inProgress}
            </p>
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Tareas en progreso activo
            </p>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span
                  className={`transition-colors duration-300 ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Capacidad utilizada
                </span>
                <span
                  className={`font-medium transition-colors duration-300 ${
                    darkMode ? "text-amber-400" : "text-amber-600"
                  }`}
                >
                  {progressRate}%
                </span>
              </div>
              <Progress
                value={Number.parseFloat(progressRate)}
                className="h-2"
              />
            </div>
          </div>

          <div
            className={`text-center p-8 rounded-2xl border transition-colors duration-300 ${
              darkMode
                ? "bg-gradient-to-br from-slate-800 to-red-900/20 border-red-800/50"
                : "bg-gradient-to-br from-red-50 to-pink-50 border-red-100"
            }`}
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Impedimentos
            </h3>
            <p
              className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              {taskData.blocked}
            </p>
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Tareas que requieren atención
            </p>
            <Separator className="my-4" />
            {taskData.blocked > 0 ? (
              <div
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  darkMode
                    ? "bg-red-900/50 text-red-300"
                    : "bg-red-100 text-red-800"
                }`}
              >
                🚨 Acción requerida
              </div>
            ) : (
              <div
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  darkMode
                    ? "bg-green-900/50 text-green-300"
                    : "bg-green-100 text-green-800"
                }`}
              >
                ✅ Sin bloqueos
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className={`p-4 rounded-xl border transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Pendientes
              </span>
            </div>
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {pendingTasks}
            </div>
            <div
              className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              {taskData.totalTasks > 0
                ? `${((pendingTasks / taskData.totalTasks) * 100).toFixed(
                    1
                  )}% del total`
                : "0% del total"}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Eficiencia
              </span>
            </div>
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {taskData.totalTasks > 0
                ? Math.round(
                    (taskData.completed /
                      (taskData.completed +
                        taskData.blocked +
                        taskData.inProgress)) *
                      100
                  ) || 0
                : 0}
              %
            </div>
            <div
              className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Ratio de completado
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-teal-500"></div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Velocidad
              </span>
            </div>
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {taskData.inProgress > 0
                ? Math.round((taskData.completed / taskData.inProgress) * 10) /
                  10
                : 0}
              x
            </div>
            <div
              className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Completadas vs activas
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-rose-500"></div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Riesgo
              </span>
            </div>
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {taskData.totalTasks > 0
                ? taskData.blocked > taskData.completed * 0.2
                  ? "Alto"
                  : taskData.blocked > 0
                  ? "Medio"
                  : "Bajo"
                : "N/A"}
            </div>
            <div
              className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Nivel de bloqueos
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
