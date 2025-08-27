"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Moon, Sun, Target } from "lucide-react"

interface HeaderProps {
  darkMode: boolean
  onToggleDarkMode: () => void
  onReset: () => void
}

export function Header({ darkMode, onToggleDarkMode, onReset }: HeaderProps) {
  return (
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
                    darkMode
                      ? "from-slate-100 to-slate-300"
                      : "from-slate-900 to-slate-700"
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
                darkMode
                  ? "border-slate-600 bg-slate-800 text-slate-300"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Tiempo real
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleDarkMode}
              className={`gap-2 transition-colors duration-300 ${
                darkMode
                  ? "hover:bg-slate-700 bg-slate-800 border-slate-600 text-slate-300"
                  : "hover:bg-slate-50 bg-transparent border-slate-200"
              }`}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {darkMode ? "Claro" : "Oscuro"}
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
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
  )
}
