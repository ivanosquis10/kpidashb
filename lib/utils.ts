import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TaskData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateMetrics(taskData: TaskData) {
  const completionRate = taskData.totalTasks > 0 ? ((taskData.completed / taskData.totalTasks) * 100).toFixed(1) : "0"
  const progressRate = taskData.totalTasks > 0 ? ((taskData.inProgress / taskData.totalTasks) * 100).toFixed(1) : "0"
  const blockedRate = taskData.totalTasks > 0 ? ((taskData.blocked / taskData.totalTasks) * 100).toFixed(1) : "0"
  const pendingTasks = Math.max(0, taskData.totalTasks - taskData.inProgress - taskData.blocked - taskData.completed)

  return {
    completionRate,
    progressRate,
    blockedRate,
    pendingTasks,
  }
}

export function getProgressStatus(completionRate: string) {
  const rate = Number.parseFloat(completionRate)
  if (rate >= 80) return { status: "Excelente", color: "text-green-600", bg: "bg-green-50" }
  if (rate >= 60) return { status: "Bueno", color: "text-blue-600", bg: "bg-blue-50" }
  if (rate >= 40) return { status: "Regular", color: "text-yellow-600", bg: "bg-yellow-50" }
  return { status: "Necesita atención", color: "text-red-600", bg: "bg-red-50" }
}
