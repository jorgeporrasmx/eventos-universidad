'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPage() {
  const router = useRouter()

  useEffect(() => {
    // Limpiar localStorage
    localStorage.removeItem('eventos-universidad-storage')

    // Mostrar mensaje
    alert('✓ Datos limpiados correctamente. Redirigiendo...')

    // Redirigir a la página principal
    setTimeout(() => {
      router.push('/')
    }, 500)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Limpiando datos...
        </h1>
        <p className="text-gray-600">
          Eliminando datos antiguos del navegador
        </p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
