"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Activity,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  Zap,
  AlertTriangle,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Moon,
  Sun,
  Shield,
} from "lucide-react"

interface TaskData {
  totalTasks: number
  inProgress: number
  blocked: number
  completed: number
  sastIteration: string
}

export default function KPIDashboard() {
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

  const chartData = [
    {
      name: "Por Hacer",
      value: Math.max(0, taskData.totalTasks - taskData.inProgress - taskData.blocked - taskData.completed),
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
      tasks: Math.max(0, taskData.totalTasks - taskData.inProgress - taskData.blocked - taskData.completed),
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
    { day: "Lun", completed: Math.max(0, taskData.completed - 3), inProgress: Math.max(0, taskData.inProgress - 1) },
    { day: "Mar", completed: Math.max(0, taskData.completed - 2), inProgress: Math.max(0, taskData.inProgress - 1) },
    { day: "Mié", completed: Math.max(0, taskData.completed - 1), inProgress: taskData.inProgress },
    { day: "Jue", completed: taskData.completed, inProgress: taskData.inProgress },
    { day: "Vie", completed: taskData.completed + 1, inProgress: Math.max(0, taskData.inProgress - 1) },
  ]

  const completionRate = taskData.totalTasks > 0 ? ((taskData.completed / taskData.totalTasks) * 100).toFixed(1) : "0"
  const progressRate = taskData.totalTasks > 0 ? ((taskData.inProgress / taskData.totalTasks) * 100).toFixed(1) : "0"
  const blockedRate = taskData.totalTasks > 0 ? ((taskData.blocked / taskData.totalTasks) * 100).toFixed(1) : "0"
  const pendingTasks = Math.max(0, taskData.totalTasks - taskData.inProgress - taskData.blocked - taskData.completed)

  const handleReset = () => {
    setTaskData({
      totalTasks: 0,
      inProgress: 0,
      blocked: 0,
      completed: 0,
      sastIteration: "",
    })
  }

  const getProgressStatus = () => {
    const rate = Number.parseFloat(completionRate)
    if (rate >= 80) return { icon: ArrowUp, color: "text-green-600", bg: "bg-green-50", status: "Excelente" }
    if (rate >= 60) return { icon: ArrowUp, color: "text-blue-600", bg: "bg-blue-50", status: "Bueno" }
    if (rate >= 40) return { icon: Minus, color: "text-yellow-600", bg: "bg-yellow-50", status: "Regular" }
    return { icon: ArrowDown, color: "text-red-600", bg: "bg-red-50", status: "Necesita atención" }
  }

  const progressStatus = getProgressStatus()

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
      }`}
    >
      <div
        className={`border-b backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 transition-colors duration-300 ${
          darkMode
            ? "border-slate-700/60 bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/80"
            : "border-slate-200/60 bg-white/80"
        }`}
      >
        <div className="mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1
                    className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
                      darkMode ? "from-slate-100 to-slate-300" : "from-slate-900 to-slate-700"
                    }`}
                  >
                    Dashboard de KPIs
                  </h1>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Gestión inteligente de tareas y métricas de rendimiento
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={`px-3 py-1 transition-colors duration-300 ${
                  darkMode ? "border-slate-600 bg-slate-800 text-slate-300" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <Calendar className="h-3 w-3 mr-1" />
                Tiempo real
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className={`gap-2 transition-colors duration-300 ${
                  darkMode
                    ? "hover:bg-slate-700 bg-slate-800 border-slate-600 text-slate-300"
                    : "hover:bg-slate-50 bg-transparent border-slate-200"
                }`}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {darkMode ? "Claro" : "Oscuro"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className={`gap-2 transition-colors duration-300 ${
                  darkMode
                    ? "hover:bg-slate-700 bg-slate-800 border-slate-600 text-slate-300"
                    : "hover:bg-slate-50 bg-transparent border-slate-200"
                }`}
              >
                <Target className="h-4 w-4" />
                Reiniciar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-8 space-y-8">
        <Card
          className={`shadow-sm backdrop-blur-sm transition-colors duration-300 ${
            darkMode ? "border-slate-700/60 bg-slate-800/60" : "border-slate-200/60 bg-white/60"
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
                  darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-700"
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
                  onChange={(e) => handleInputChange("totalTasks", e.target.value)}
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
                  onChange={(e) => handleInputChange("inProgress", e.target.value)}
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
                  onChange={(e) => handleInputChange("blocked", e.target.value)}
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
                  onChange={(e) => handleInputChange("completed", e.target.value)}
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
                  onChange={(e) => handleInputChange("sastIteration", e.target.value)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card
            className={`shadow-sm hover:shadow-md transition-all duration-300 group ${
              darkMode
                ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-slate-900"
                : "border-slate-200/60 bg-gradient-to-br from-white to-slate-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Total de Tareas
                  </p>
                  <p
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      darkMode ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {taskData.totalTasks}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs transition-colors duration-300 ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-slate-300"
                          : "bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      Base del proyecto
                    </Badge>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`shadow-sm hover:shadow-md transition-all duration-300 group ${
              darkMode
                ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-amber-900/20"
                : "border-slate-200/60 bg-gradient-to-br from-white to-amber-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    En Progreso
                  </p>
                  <p
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      darkMode ? "text-amber-400" : "text-amber-700"
                    }`}
                  >
                    {taskData.inProgress}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs hover:bg-amber-100 transition-colors duration-300 ${
                        darkMode ? "bg-amber-900/50 text-amber-300" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {progressRate}% del total
                    </Badge>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={Number.parseFloat(progressRate)} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`shadow-sm hover:shadow-md transition-all duration-300 group ${
              darkMode
                ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-red-900/20"
                : "border-slate-200/60 bg-gradient-to-br from-white to-red-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Bloqueadas
                  </p>
                  <p
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      darkMode ? "text-red-400" : "text-red-700"
                    }`}
                  >
                    {taskData.blocked}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      {blockedRate}% requiere atención
                    </Badge>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="h-7 w-7 text-white" />
                </div>
              </div>
              {taskData.blocked > 0 && (
                <div
                  className={`mt-4 p-2 rounded-lg border transition-colors duration-300 ${
                    darkMode ? "bg-red-900/30 border-red-800/50" : "bg-red-50 border-red-100"
                  }`}
                >
                  <p
                    className={`text-xs font-medium transition-colors duration-300 ${
                      darkMode ? "text-red-300" : "text-red-700"
                    }`}
                  >
                    ⚠️ Requiere intervención inmediata
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card
            className={`shadow-sm hover:shadow-md transition-all duration-300 group ${
              darkMode
                ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-green-900/20"
                : "border-slate-200/60 bg-gradient-to-br from-white to-green-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Completadas
                  </p>
                  <p
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      darkMode ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    {taskData.completed}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs hover:bg-green-100 transition-colors duration-300 ${
                        darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {completionRate}% completado
                    </Badge>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={Number.parseFloat(completionRate)} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`shadow-sm hover:shadow-md transition-all duration-300 group ${
              darkMode
                ? "border-slate-700/60 bg-gradient-to-br from-slate-800 to-purple-900/20"
                : "border-slate-200/60 bg-gradient-to-br from-white to-purple-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Iteración SAST
                  </p>
                  <p
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      darkMode ? "text-purple-400" : "text-purple-700"
                    }`}
                  >
                    {taskData.sastIteration || "N/A"}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs transition-colors duration-300 ${
                        darkMode
                          ? "bg-purple-900/50 border-purple-700 text-purple-300"
                          : "bg-purple-100 border-purple-200 text-purple-800"
                      }`}
                    >
                      Análisis de seguridad
                    </Badge>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card
            className={`shadow-sm backdrop-blur-sm transition-colors duration-300 ${
              darkMode ? "border-slate-700/60 bg-slate-800/60" : "border-slate-200/60 bg-white/60"
            }`}
          >
            <CardHeader className="pb-4">
              <CardTitle
                className={`flex items-center gap-2 text-lg font-semibold transition-colors duration-300 ${
                  darkMode ? "text-slate-100" : "text-slate-900"
                }`}
              >
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Distribución por Estado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e2e8f0"} />
                  <XAxis
                    dataKey="stage"
                    tick={{ fontSize: 12, fill: darkMode ? "#9ca3af" : "#64748b" }}
                    axisLine={{ stroke: darkMode ? "#374151" : "#e2e8f0" }}
                    tickLine={{ stroke: darkMode ? "#374151" : "#e2e8f0" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: darkMode ? "#9ca3af" : "#64748b" }}
                    axisLine={{ stroke: darkMode ? "#374151" : "#e2e8f0" }}
                    tickLine={{ stroke: darkMode ? "#374151" : "#e2e8f0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "white",
                      border: `1px solid ${darkMode ? "#374151" : "#e2e8f0"}`,
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      color: darkMode ? "#f3f4f6" : "#1f2937",
                    }}
                  />
                  <Bar dataKey="tasks" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card
            className={`shadow-sm backdrop-blur-sm transition-colors duration-300 ${
              darkMode ? "border-slate-700/60 bg-slate-800/60" : "border-slate-200/60 bg-white/60"
            }`}
          >
            <CardHeader className="pb-4">
              <CardTitle
                className={`flex items-center gap-2 text-lg font-semibold transition-colors duration-300 ${
                  darkMode ? "text-slate-100" : "text-slate-900"
                }`}
              >
                <PieChartIcon className="h-5 w-5 text-purple-600" />
                Proporción de Tareas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    strokeWidth={2}
                    stroke={darkMode ? "#1f2937" : "#ffffff"}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "white",
                      border: `1px solid ${darkMode ? "#374151" : "#e2e8f0"}`,
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      color: darkMode ? "#f3f4f6" : "#1f2937",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card
            className={`shadow-sm backdrop-blur-sm transition-colors duration-300 ${
              darkMode ? "border-slate-700/60 bg-slate-800/60" : "border-slate-200/60 bg-white/60"
            }`}
          >
            <CardHeader className="pb-4">
              <CardTitle
                className={`flex items-center gap-2 text-lg font-semibold transition-colors duration-300 ${
                  darkMode ? "text-slate-100" : "text-slate-900"
                }`}
              >
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Tendencia Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e2e8f0"} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: darkMode ? "#9ca3af" : "#64748b" }}
                    axisLine={{ stroke: darkMode ? "#374151" : "#e2e8f0" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: darkMode ? "#9ca3af" : "#64748b" }}
                    axisLine={{ stroke: darkMode ? "#374151" : "#e2e8f0" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "white",
                      border: `1px solid ${darkMode ? "#374151" : "#e2e8f0"}`,
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      color: darkMode ? "#f3f4f6" : "#1f2937",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="inProgress"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

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
                  className={`text-sm transition-colors duration-300 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Tareas completadas del total
                </p>
                <Separator className="my-4" />
                <div className="flex items-center justify-center gap-2">
                  <progressStatus.icon className={`h-4 w-4 ${progressStatus.color}`} />
                  <span className={`text-sm font-medium ${progressStatus.color}`}>{progressStatus.status}</span>
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
                  className={`text-sm transition-colors duration-300 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Tareas en progreso activo
                </p>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span
                      className={`transition-colors duration-300 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
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
                  <Progress value={Number.parseFloat(progressRate)} className="h-2" />
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
                  className={`text-sm transition-colors duration-300 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Tareas que requieren atención
                </p>
                <Separator className="my-4" />
                {taskData.blocked > 0 ? (
                  <div
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-800"
                    }`}
                  >
                    🚨 Acción requerida
                  </div>
                ) : (
                  <div
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800"
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
                  darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
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
                    ? `${((pendingTasks / taskData.totalTasks) * 100).toFixed(1)}% del total`
                    : "0% del total"}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-colors duration-300 ${
                  darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
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
                        (taskData.completed / (taskData.completed + taskData.blocked + taskData.inProgress)) * 100,
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
                  darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
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
                  {taskData.inProgress > 0 ? Math.round((taskData.completed / taskData.inProgress) * 10) / 10 : 0}x
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
                  darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
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
      </div>
    </div>
  )
}
