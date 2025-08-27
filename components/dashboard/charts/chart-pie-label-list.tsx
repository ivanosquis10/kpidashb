"use client"

import { Activity, CircleCheckBig, TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label list for task distribution"

interface TaskData {
  totalTasks: number
  inProgress: number
  blocked: number
  completed: number
}

interface ChartPieLabelListProps {
  taskData: TaskData
}

export function ChartPieLabelList({ taskData }: ChartPieLabelListProps) {
  const allChartData = [
    {
      status: "porHacer",
      value: Math.max(
        0,
        taskData.totalTasks -
          taskData.inProgress -
          taskData.blocked -
          taskData.completed
      ),
      fill: "#6366f1",
    },
    {
      status: "enProgreso",
      value: taskData.inProgress,
      fill: "#f59e0b",
    },
    {
      status: "bloqueadas",
      value: taskData.blocked,
      fill: "#ef4444",
    },
    {
      status: "completadas",
      value: taskData.completed,
      fill: "#10b981",
    },
  ]

  // Filtrar solo las categorías que tienen tareas (valor > 0)
  const chartData = allChartData.filter((item) => item.value > 0)

  // Crear config dinámico basado en las categorías que tienen datos
  const chartConfig = {
    value: {
      label: "Tareas",
    },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.status,
        {
          label:
            item.status === "porHacer"
              ? "Por Hacer"
              : item.status === "enProgreso"
              ? "En Progreso"
              : item.status === "bloqueadas"
              ? "Bloqueadas"
              : item.status === "completadas"
              ? "Completadas"
              : item.status,
          color: item.fill,
        },
      ])
    ),
  } satisfies ChartConfig

  const totalTasks = chartData.reduce((sum, item) => sum + item.value, 0)
  const completionRate =
    totalTasks > 0 ? ((taskData.completed / totalTasks) * 100).toFixed(1) : "0"

  // Verificar si hay datos para mostrar
  const hasData = totalTasks > 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0 flex items-center gap-2">
        <div>
          <CircleCheckBig className="text-emerald-500" />
        </div>
        <div>
          <CardTitle>Proporción de Tareas</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="value" hideLabel />}
              />
              <Pie data={chartData} dataKey="value">
                <LabelList
                  dataKey="status"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[250px] text-center">
            <div className="text-muted-foreground mb-2">
              <svg
                className="w-12 h-12 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-muted-foreground font-medium mb-1">
              No hay datos disponibles
            </p>
            <p className="text-sm text-muted-foreground">
              Agrega tareas para ver la distribución
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {hasData ? (
          <>
            <div className="flex items-center gap-2 leading-none font-medium">
              Tasa de completado: {completionRate}%{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Total de tareas: {totalTasks}
            </div>
          </>
        ) : (
          <div className="text-muted-foreground leading-none">
            Esperando datos de tareas...
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
