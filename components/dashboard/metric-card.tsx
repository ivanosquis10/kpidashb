"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconBg: string
  subtitle?: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  progress?: {
    value: number
    showBar?: boolean
  }
  warning?: string
  className?: string
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  iconBg,
  subtitle,
  badge,
  progress,
  warning,
  className = "",
}: MetricCardProps) {
  return (
    <Card
      className={`shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={`text-sm font-medium transition-colors duration-300`}>
              {title}
            </p>
            <p className={`text-3xl font-bold transition-colors duration-300`}>
              {value}
            </p>
            {subtitle && (
              <p className={`text-sm transition-colors duration-300`}>
                {subtitle}
              </p>
            )}
            {badge && (
              <div className="flex items-center gap-2">
                <Badge
                  variant={badge.variant || "outline"}
                  className={`text-xs transition-colors duration-300 ${
                    badge.className || ""
                  }`}
                >
                  {badge.text}
                </Badge>
              </div>
            )}
          </div>
          <div
            className={`h-14 w-14 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* {progress && (
          <div className="mt-4">
            {progress.showBar && (
              <Progress value={progress.value} className="h-2" />
            )}
          </div>
        )} */}

        {/* {warning && (
          <div
            className={`mt-4 p-2 rounded-lg border transition-colors duration-300 bg-red-50 border-red-100`}
          >
            <p
              className={`text-xs font-medium transition-colors duration-300 text-red-700`}
            >
              ⚠️ {warning}
            </p>
          </div>
        )} */}
      </CardContent>
    </Card>
  )
}
