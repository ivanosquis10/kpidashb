"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Target,
  Users,
} from "lucide-react"
import { TaskData } from "@/lib/types"

interface MetricsFormProps {
  darkMode: boolean
  taskData: TaskData
  onInputChange: (field: keyof TaskData, value: string) => void
}

export function MetricsForm({
  darkMode,
  taskData,
  onInputChange,
}: MetricsFormProps) {
  return (
    <Card
      className={`shadow-sm backdrop-blur-sm transition-colors duration-300 ${
        darkMode
          ? "border-slate-700/60 bg-slate-800/60"
          : "border-slate-200/60 bg-white/60"
      }`}
    >
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Target className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <CardTitle
                className={`text-lg font-semibold transition-colors duration-300 ${
                  darkMode ? "text-slate-100" : "text-slate-900"
                }`}
              >
                Configuración de Métricas
              </CardTitle>
              <p
                className={`text-sm mt-1 transition-colors duration-300 ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Ingresa los valores para generar insights automáticos
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`transition-colors duration-300 ${
              darkMode
                ? "bg-slate-700 text-slate-300"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <Users className="h-3 w-3 mr-1" />
            Equipo activo
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="totalTasks"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <Activity className="h-4 w-4 text-slate-500" />
              Total de Tareas
            </Label>
            <Input
              id="totalTasks"
              type="number"
              min="0"
              value={taskData.totalTasks || ""}
              onChange={(e) => onInputChange("totalTasks", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 ${
                darkMode
                  ? "border-slate-600 focus:border-indigo-400 focus:ring-indigo-400/20 bg-slate-800 text-slate-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-white"
              }`}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="inProgress"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <Clock className="h-4 w-4 text-amber-500" />
              Tareas en Progreso
            </Label>
            <Input
              id="inProgress"
              type="number"
              min="0"
              max={taskData.totalTasks}
              value={taskData.inProgress || ""}
              onChange={(e) => onInputChange("inProgress", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 ${
                darkMode
                  ? "border-slate-600 focus:border-amber-400 focus:ring-amber-400/20 bg-slate-800 text-slate-100"
                  : "border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 bg-white"
              }`}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="blocked"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Tareas Bloqueadas
            </Label>
            <Input
              id="blocked"
              type="number"
              min="0"
              max={taskData.totalTasks}
              value={taskData.blocked || ""}
              onChange={(e) => onInputChange("blocked", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 ${
                darkMode
                  ? "border-slate-600 focus:border-red-400 focus:ring-red-400/20 bg-slate-800 text-slate-100"
                  : "border-slate-200 focus:border-red-500 focus:ring-red-500/20 bg-white"
              }`}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="completed"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              Tareas Completadas
            </Label>
            <Input
              id="completed"
              type="number"
              min="0"
              max={taskData.totalTasks}
              value={taskData.completed || ""}
              onChange={(e) => onInputChange("completed", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 ${
                darkMode
                  ? "border-slate-600 focus:border-green-400 focus:ring-green-400/20 bg-slate-800 text-slate-100"
                  : "border-slate-200 focus:border-green-500 focus:ring-green-500/20 bg-white"
              }`}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="sastIteration"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              <Shield className="h-4 w-4 text-purple-500" />
              Iteración SAST
            </Label>
            <Input
              id="sastIteration"
              type="text"
              value={taskData.sastIteration}
              onChange={(e) => onInputChange("sastIteration", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 ${
                darkMode
                  ? "border-slate-600 focus:border-purple-400 focus:ring-purple-400/20 bg-slate-800 text-slate-100"
                  : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 bg-white"
              }`}
              placeholder="ej: 13 Maintainability"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
