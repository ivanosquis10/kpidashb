import { useState, useEffect, useCallback } from 'react'
import { TaskData } from '@/lib/types'

export interface SavedData {
  id: string
  name: string
  data: TaskData
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'kpi-dashboard-data'

export function useLocalStorage() {
  const [savedDataList, setSavedDataList] = useState<SavedData[]>([])

  // Cargar datos guardados al inicializar
  useEffect(() => {
    loadSavedData()
  }, [])

  // Cargar todos los datos guardados
  const loadSavedData = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored) as SavedData[]
        setSavedDataList(data.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ))
      }
    } catch (error) {
      console.error('Error al cargar datos del localStorage:', error)
    }
  }, [])

  // Guardar nuevos datos
  const saveData = useCallback((data: TaskData, name: string): boolean => {
    try {
      const newSavedData: SavedData = {
        id: crypto.randomUUID(),
        name,
        data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedList = [newSavedData, ...savedDataList]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
      setSavedDataList(updatedList)
      return true
    } catch (error) {
      console.error('Error al guardar datos:', error)
      return false
    }
  }, [savedDataList])

  // Actualizar datos existentes
  const updateData = useCallback((id: string, data: TaskData, name: string): boolean => {
    try {
      const updatedList = savedDataList.map(item => 
        item.id === id 
          ? { ...item, data, name, updatedAt: new Date().toISOString() }
          : item
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
      setSavedDataList(updatedList)
      return true
    } catch (error) {
      console.error('Error al actualizar datos:', error)
      return false
    }
  }, [savedDataList])

  // Eliminar datos
  const deleteData = useCallback((id: string): boolean => {
    try {
      const updatedList = savedDataList.filter(item => item.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
      setSavedDataList(updatedList)
      return true
    } catch (error) {
      console.error('Error al eliminar datos:', error)
      return false
    }
  }, [savedDataList])

  // Obtener datos específicos por ID
  const getDataById = useCallback((id: string): SavedData | null => {
    return savedDataList.find(item => item.id === id) || null
  }, [savedDataList])

  // Verificar si hay datos para guardar
  const hasDataToSave = useCallback((currentData: TaskData): boolean => {
    return currentData.totalTasks > 0 || 
           currentData.inProgress > 0 || 
           currentData.blocked > 0 || 
           currentData.completed > 0 || 
           currentData.sastIteration.trim() !== ''
  }, [])

  return {
    savedDataList,
    saveData,
    updateData,
    deleteData,
    getDataById,
    hasDataToSave,
    loadSavedData,
  }
}
