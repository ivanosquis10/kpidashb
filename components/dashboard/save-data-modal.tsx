"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Save, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { TaskData } from "@/lib/types"

interface SaveDataModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => boolean
  taskData: TaskData
}

export function SaveDataModal({
  isOpen,
  onClose,
  onSave,
  taskData,
}: SaveDataModalProps) {
  const [name, setName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  )

  const handleSave = async () => {
    if (!name.trim()) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      const success = onSave(name.trim())
      if (success) {
        setSaveStatus("success")
        setName("")
        setTimeout(() => {
          onClose()
          setSaveStatus("idle")
        }, 1500)
      } else {
        setSaveStatus("error")
      }
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSaving) {
      handleSave()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Save className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Guardar Configuración</DialogTitle>
              <DialogDescription>
                Guarda los datos actuales para uso futuro
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de datos */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Resumen de datos a guardar:
            </Label>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Total:</span>
                <Badge variant="secondary">{taskData.totalTasks}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>En progreso:</span>
                <Badge variant="secondary">{taskData.inProgress}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Bloqueadas:</span>
                <Badge variant="secondary">{taskData.blocked}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Completadas:</span>
                <Badge variant="secondary">{taskData.completed}</Badge>
              </div>
            </div>
            {taskData.sastIteration && (
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span>SAST:</span>
                <Badge variant="outline">{taskData.sastIteration}</Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* Formulario de guardado */}
          <div className="space-y-3">
            <Label htmlFor="save-name" className="text-sm font-medium">
              Nombre de la configuración *
            </Label>
            <Input
              id="save-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ej: Sprint 13 - Semana 1"
              disabled={isSaving}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Usa un nombre descriptivo para identificar fácilmente esta
              configuración
            </p>
          </div>

          {/* Estado de guardado */}
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">
                ¡Configuración guardada exitosamente!
              </span>
            </div>
          )}

          {saveStatus === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">
                Error al guardar. Intenta nuevamente.
              </span>
            </div>
          )}

          {/* Botones */}
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!name.trim() || isSaving}>
              {isSaving ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
