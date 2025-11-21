/**
 * Helper para trabajar con localStorage de forma type-safe
 */

const STORAGE_KEYS = {
  USUARIO_ACTUAL: 'usuario_actual',
  ULTIMA_SESION: 'ultima_sesion',
} as const

export function guardarEnStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return

  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
  } catch (error) {
    console.error('Error guardando en localStorage:', error)
  }
}

export function leerDeStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) return null
    return JSON.parse(serialized) as T
  } catch (error) {
    console.error('Error leyendo de localStorage:', error)
    return null
  }
}

export function eliminarDeStorage(key: string): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error eliminando de localStorage:', error)
  }
}

export function limpiarStorage(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error limpiando localStorage:', error)
  }
}

export { STORAGE_KEYS }
