'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SOLICITUDES_MOCK } from '@/lib/mockData'
import { Plus, Calendar, DollarSign, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { EstadoSolicitud } from '@/lib/types'

const ESTADO_CONFIG: Record<EstadoSolicitud, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info'; icon: any }> = {
  borrador: { label: 'Borrador', variant: 'secondary', icon: Clock },
  pendiente_aprobacion_concepto: { label: 'Pendiente Aprobación', variant: 'warning', icon: AlertCircle },
  concepto_rechazado: { label: 'Rechazado', variant: 'destructive', icon: XCircle },
  en_definicion_requerimientos: { label: 'En Definición', variant: 'info', icon: Clock },
  cotizacion_generada: { label: 'Cotización Lista', variant: 'info', icon: DollarSign },
  pendiente_confirmacion_solicitante: { label: 'Pendiente Confirmación', variant: 'warning', icon: AlertCircle },
  requiere_aprobacion_especial: { label: 'Requiere Aprobación Especial', variant: 'warning', icon: AlertCircle },
  aprobacion_especial_rechazada: { label: 'Aprobación Especial Rechazada', variant: 'destructive', icon: XCircle },
  aprobado: { label: 'Aprobado', variant: 'success', icon: CheckCircle2 },
  en_ejecucion: { label: 'En Ejecución', variant: 'info', icon: Clock },
  completado: { label: 'Completado', variant: 'success', icon: CheckCircle2 },
  cancelado: { label: 'Cancelado', variant: 'destructive', icon: XCircle },
}

export default function SolicitanteDashboard() {
  const router = useRouter()
  const usuarioActual = useStore((state) => state.usuarioActual)
  const solicitudes = useStore((state) => state.solicitudes)
  const agregarSolicitud = useStore((state) => state.agregarSolicitud)

  // Cargar datos mock en el store si está vacío
  useEffect(() => {
    if (solicitudes.length === 0) {
      SOLICITUDES_MOCK.forEach((sol) => agregarSolicitud(sol))
    }
  }, [solicitudes, agregarSolicitud])

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!usuarioActual) {
      router.push('/')
    }
  }, [usuarioActual, router])

  if (!usuarioActual) return null

  const misSolicitudes = solicitudes.filter((s) => s.solicitanteId === usuarioActual.id)

  // Estadísticas rápidas
  const stats = {
    total: misSolicitudes.length,
    pendientes: misSolicitudes.filter((s) =>
      s.estado === 'pendiente_aprobacion_concepto' ||
      s.estado === 'en_definicion_requerimientos' ||
      s.estado === 'pendiente_confirmacion_solicitante'
    ).length,
    aprobadas: misSolicitudes.filter((s) => s.estado === 'aprobado' || s.estado === 'en_ejecucion').length,
    completadas: misSolicitudes.filter((s) => s.estado === 'completado').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mis Solicitudes</h1>
              <p className="text-gray-600 mt-1">{usuarioActual.departamentoId}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                Cambiar Rol
              </Button>
              <Button onClick={() => router.push('/solicitante/nueva')}>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Solicitud
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Solicitudes</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pendientes</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{stats.pendientes}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Aprobadas</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.aprobadas}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completadas</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.completadas}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Solicitudes List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Todas mis solicitudes</h2>

          {misSolicitudes.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  No tienes solicitudes todavía. Crea tu primera solicitud para comenzar.
                </p>
              </CardContent>
            </Card>
          ) : (
            misSolicitudes.map((solicitud) => {
              const estado = ESTADO_CONFIG[solicitud.estado]
              const Icon = estado.icon

              return (
                <Card key={solicitud.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{solicitud.titulo}</CardTitle>
                          <Badge variant={estado.variant}>
                            <Icon className="w-3 h-3 mr-1" />
                            {estado.label}
                          </Badge>
                        </div>
                        <CardDescription>{solicitud.descripcion}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Tipo</p>
                        <p className="font-medium">{solicitud.tipo.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fecha del Evento</p>
                        <p className="font-medium">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          {formatDate(solicitud.fechaEvento)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Departamento</p>
                        <p className="font-medium">{solicitud.departamentoSolicitante}</p>
                      </div>
                      {solicitud.presupuestoTotalEstimado && (
                        <div>
                          <p className="text-gray-500">Presupuesto Estimado</p>
                          <p className="font-medium">
                            {formatCurrency(solicitud.presupuestoTotalEstimado)}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert(`Ver detalles de: ${solicitud.titulo}`)}
                      >
                        Ver Detalles
                      </Button>
                      {solicitud.estado === 'pendiente_confirmacion_solicitante' && (
                        <Button
                          size="sm"
                          onClick={() => alert('Revisar Cotización')}
                        >
                          Revisar Cotización
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
