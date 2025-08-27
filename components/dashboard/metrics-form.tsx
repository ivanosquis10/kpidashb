"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Target,
  Users,
  Save,
  Database,
} from "lucide-react"
import { TaskData } from "@/lib/types"

interface MetricsFormProps {
  taskData: TaskData
  onInputChange: (field: keyof TaskData, value: string) => void
  onSaveData: (name: string) => boolean
  onShowSavedData: () => void
  hasDataToSave: boolean
  savedDataCount: number
}

export function MetricsForm({
  taskData,
  onInputChange,
  onSaveData,
  onShowSavedData,
  hasDataToSave,
  savedDataCount,
}: MetricsFormProps) {
  return (
    <Card
      className={`shadow-sm backdrop-blur-sm transition-colors duration-300`}
    >
      <CardHeader className="pb-6">
        <div className="flex gap-4 md:items-center md:justify-between flex-col md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold transition-colors duration-300">
                Configuración de Métricas
              </CardTitle>
              <p className={`text-sm transition-colors duration-300`}>
                Ingresa los valores para generar insights automáticos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasDataToSave && (
              <Button size="sm" onClick={() => onSaveData("")} className="h-8">
                <Save className="h-3 w-3" />
                Guardar
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onShowSavedData}
              className="h-8"
            >
              <Database className="h-3 w-3 mr-1" />
              Datos Guardados
              {savedDataCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {savedDataCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="totalTasks"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300`}
            >
              <Activity className="h-4 w-4 text-slate-500 dark:text-slate-50" />
              Total de Tareas
            </Label>
            <Input
              id="totalTasks"
              type="number"
              min="0"
              value={taskData.totalTasks || ""}
              onChange={(e) => onInputChange("totalTasks", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 `}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="inProgress"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 `}
            >
              <Clock className="h-4 w-4 text-amber-400" />
              Tareas en Progreso
            </Label>
            <Input
              id="inProgress"
              type="number"
              min="0"
              max={taskData.totalTasks}
              value={taskData.inProgress || ""}
              onChange={(e) => onInputChange("inProgress", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 `}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="blocked"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300`}
            >
              <AlertTriangle className="h-4 w-4 text-red-400" />
              Tareas Bloqueadas
            </Label>
            <Input
              id="blocked"
              type="number"
              min="0"
              max={taskData.totalTasks}
              value={taskData.blocked || ""}
              onChange={(e) => onInputChange("blocked", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300  `}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="completed"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 `}
            >
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Tareas Completadas
            </Label>
            <Input
              id="completed"
              type="number"
              min="0"
              max={taskData.totalTasks}
              value={taskData.completed || ""}
              onChange={(e) => onInputChange("completed", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300 bg-white`}
              placeholder="0"
            />
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="sastIteration"
              className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 `}
            >
              <Shield className="h-4 w-4 text-purple-500" />
              Iteración SAST
            </Label>
            <Input
              id="sastIteration"
              type="text"
              value={taskData.sastIteration}
              onChange={(e) => onInputChange("sastIteration", e.target.value)}
              className={`h-12 text-lg font-medium transition-colors duration-300`}
              placeholder="ej: 13 Maintainability"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
