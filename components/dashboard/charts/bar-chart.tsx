"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { BarChartData } from "@/lib/types"

interface BarChartProps {
  darkMode: boolean
  data: BarChartData[]
}

export function BarChart({ darkMode, data }: BarChartProps) {
  return (
    <Card
      className={`shadow-sm backdrop-blur-sm transition-colors duration-300 ${
        darkMode
          ? "border-slate-700/60 bg-slate-800/60"
          : "border-slate-200/60 bg-white/60"
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
          <RechartsBarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#e2e8f0"}
            />
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
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
