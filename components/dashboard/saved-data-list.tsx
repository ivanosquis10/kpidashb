"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import {
  Database,
  Loader2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Shield,
} from "lucide-react"
import { SavedData, TaskData } from "@/lib/types"

interface SavedDataListProps {
  isOpen: boolean
  onClose: () => void
  savedDataList: SavedData[]
  onLoadData: (data: TaskData) => void
  onDeleteData: (id: string) => boolean
}

export function SavedDataList({
  isOpen,
  onClose,
  savedDataList,
  onLoadData,
  onDeleteData,
}: SavedDataListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleLoadData = async (savedData: SavedData) => {
    setLoadingId(savedData.id)
    try {
      // Simular un pequeño delay para mejor UX
      await new Promise((resolve) => setTimeout(resolve, 300))
      onLoadData(savedData.data)
      onClose()
    } finally {
      setLoadingId(null)
    }
  }

  const handleDeleteData = async (id: string) => {
    setDeletingId(id)
    try {
      const success = onDeleteData(id)
      if (!success) {
        console.error("Error al eliminar datos")
      }
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDataSummary = (data: TaskData) => {
    const total = data.totalTasks
    const completed = data.completed
    const inProgress = data.inProgress
    const blocked = data.blocked

    return {
      total,
      completed,
      inProgress,
      blocked,
      hasSast: data.sastIteration.trim() !== "",
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="top">
      <DrawerContent className="w-[100vw]">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <DrawerTitle className="text-left">Datos Guardados</DrawerTitle>
              <DrawerDescription>
                {savedDataList.length} configuración
                {savedDataList.length !== 1 ? "es" : ""} disponible
                {savedDataList.length !== 1 ? "s" : ""}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="p-0 flex-1 overflow-hidden">
          {savedDataList.length === 0 ? (
            <div className="p-8 text-center">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                No hay datos guardados
              </h3>
              <p className="text-sm text-muted-foreground">
                Guarda una configuración para verla aquí
              </p>
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto">
              {savedDataList.map((savedData, index) => {
                const summary = getDataSummary(savedData.data)
                const isLast = index === savedDataList.length - 1

                return (
                  <div key={savedData.id}>
                    <div className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg mb-1">
                            {savedData.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(savedData.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(savedData.updatedAt)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleLoadData(savedData)}
                            disabled={loadingId === savedData.id}
                            className="h-8"
                          >
                            {loadingId === savedData.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <CheckCircle className="h-3 w-3" />
                            )}
                            {loadingId === savedData.id
                              ? "Cargando..."
                              : "Cargar"}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteData(savedData.id)}
                            disabled={deletingId === savedData.id}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            {deletingId === savedData.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Resumen de métricas */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                          <Activity className="h-3 w-3 text-blue-500" />
                          <span>Total:</span>
                          <Badge variant="secondary">{summary.total}</Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                          <Clock className="h-3 w-3 text-amber-500" />
                          <span>Progreso:</span>
                          <Badge variant="secondary">
                            {summary.inProgress}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                          <span>Bloqueadas:</span>
                          <Badge variant="secondary">{summary.blocked}</Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Completadas:</span>
                          <Badge variant="secondary">{summary.completed}</Badge>
                        </div>
                      </div>

                      {/* Información adicional */}
                      <div className="flex items-center gap-2">
                        {summary.hasSast && (
                          <div className="flex items-center gap-1 text-xs">
                            <Shield className="h-3 w-3 text-purple-500" />
                            <span className="text-muted-foreground">SAST:</span>
                            <Badge variant="outline" className="text-xs">
                              {savedData.data.sastIteration}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isLast && <Separator />}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
