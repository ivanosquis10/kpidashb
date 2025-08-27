export interface TaskData {
  totalTasks: number
  inProgress: number
  blocked: number
  completed: number
  sastIteration: string
}

export interface SavedData {
  id: string
  name: string
  data: TaskData
  createdAt: string
  updatedAt: string
}

export interface ChartData {
  name: string
  value: number
  color: string
}

export interface BarChartData {
  stage: string
  tasks: number
  fill: string
}

export interface AreaChartData {
  day: string
  completed: number
  inProgress: number
}
