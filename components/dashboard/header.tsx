"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, Moon, Sun, Target } from "lucide-react"
import { useTheme } from "next-themes"
import { ModeSwitcher } from "../themes-swticher"

interface HeaderProps {
  onReset: () => void
}

export function Header({ onReset }: HeaderProps) {
  const { setTheme } = useTheme()

  return (
    <div className="">
      <div className="mx-auto px-6 py-6 lg:py-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center rounded-xl  border p-1">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-10 rounded-xl"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h1
                  className={`text-2xl font-bold transition-colors duration-300`}
                >
                  Dashboard de KPIs
                </h1>
                <p className={`text-sm transition-colors duration-300`}>
                  Gestión inteligente de tareas y métricas de rendimiento
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeSwitcher />
            <Button variant="outline" onClick={onReset}>
              <Target className="h-4 w-4" />
              Reiniciar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
