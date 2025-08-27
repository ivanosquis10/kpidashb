"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartIcon } from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartData } from "@/lib/types"

interface PieChartProps {
  data: ChartData[]
}

export function PieChart({ data }: PieChartProps) {
  return (
    <Card
      className={`shadow-sm backdrop-blur-sm transition-colors duration-300`}
    >
      <CardHeader className="pb-4">
        <CardTitle
          className={`flex items-center gap-2 text-lg font-semibold transition-colors duration-300`}
        >
          <PieChartIcon className="h-5 w-5 text-purple-600" />
          Proporción de Tareas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${((percent || 0) * 100).toFixed(0)}%`
              }
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="#ffffff"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: `1px solid #e2e8f0`,
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                color: "#1f2937",
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
