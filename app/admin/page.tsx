'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SOLICITUDES_MOCK } from '@/lib/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const usuarioActual = useStore((state) => state.usuarioActual)
  const solicitudes = useStore((state) => state.solicitudes)
  const agregarSolicitud = useStore((state) => state.agregarSolicitud)
  const aprobar = useStore((state) => state.aprobar)
  const rechazar = useStore((state) => state.rechazar)

  // Cargar datos mock
  useEffect(() => {
    if (solicitudes.length === 0) {
      SOLICITUDES_MOCK.forEach((sol) => agregarSolicitud(sol))
    }
  }, [])

  useEffect(() => {
    if (!usuarioActual) {
      router.push('/')
    }
  }, [usuarioActual, router])

  if (!usuarioActual) return null

  // Solicitudes pendientes de aprobación
  const solicitudesPendientes = solicitudes.filter(
    (s) => s.estado === 'pendiente_aprobacion_concepto' || s.estado === 'requiere_aprobacion_especial'
  )

  const handleAprobar = (solicitudId: string, aprobacionId: string) => {
    aprobar(solicitudId, aprobacionId, 'Aprobado')
    alert('Solicitud aprobada correctamente')
  }

  const handleRechazar = (solicitudId: string, aprobacionId: string) => {
    const comentarios = prompt('Ingresa el motivo del rechazo:')
    if (comentarios) {
      rechazar(solicitudId, aprobacionId, comentarios)
      alert('Solicitud rechazada')
    }
  }

  // Calcular métricas
  const metricas = {
    total: solicitudes.length,
    pendientes: solicitudes.filter(
      (s) =>
        s.estado === 'pendiente_aprobacion_concepto' ||
        s.estado === 'en_definicion_requerimientos' ||
        s.estado === 'pendiente_confirmacion_solicitante'
    ).length,
    aprobadas: solicitudes.filter(
      (s) => s.estado === 'aprobado' || s.estado === 'en_ejecucion'
    ).length,
    completadas: solicitudes.filter((s) => s.estado === 'completado').length,
    rechazadas: solicitudes.filter(
      (s) => s.estado === 'concepto_rechazado' || s.estado === 'cancelado'
    ).length,
    costoTotal: solicitudes
      .filter((s) => s.presupuestoTotalEstimado)
      .reduce((sum, s) => sum + (s.presupuestoTotalEstimado || 0), 0),
    costoPromedio:
      solicitudes.filter((s) => s.presupuestoTotalEstimado).length > 0
        ? solicitudes
            .filter((s) => s.presupuestoTotalEstimado)
            .reduce((sum, s) => sum + (s.presupuestoTotalEstimado || 0), 0) /
          solicitudes.filter((s) => s.presupuestoTotalEstimado).length
        : 0,
  }

  // Solicitudes recientes
  const solicitudesRecientes = [...solicitudes]
    .sort((a, b) => {
      const dateA = typeof a.fechaSolicitud === 'string' ? new Date(a.fechaSolicitud) : a.fechaSolicitud
      const dateB = typeof b.fechaSolicitud === 'string' ? new Date(b.fechaSolicitud) : b.fechaSolicitud
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)

  // Próximos eventos
  const proximosEventos = [...solicitudes]
    .filter((s) => {
      const fechaEvento = typeof s.fechaEvento === 'string' ? new Date(s.fechaEvento) : s.fechaEvento
      return fechaEvento >= new Date() && (s.estado === 'aprobado' || s.estado === 'en_ejecucion')
    })
    .sort((a, b) => {
      const dateA = typeof a.fechaEvento === 'string' ? new Date(a.fechaEvento) : a.fechaEvento
      const dateB = typeof b.fechaEvento === 'string' ? new Date(b.fechaEvento) : b.fechaEvento
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            </div>
            <Button variant="outline" onClick={() => router.push('/')}>
              Cambiar Rol
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Solicitudes Pendientes de Aprobación */}
        {solicitudesPendientes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pendientes de Aprobación ({solicitudesPendientes.length})
            </h2>
            <div className="space-y-4">
              {solicitudesPendientes.map((solicitud) => {
                const aprobacionPendiente = solicitud.aprobaciones.find(
                  (a) => a.estado === 'pendiente'
                )

                return (
                  <Card key={solicitud.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{solicitud.titulo}</CardTitle>
                            {solicitud.estado === 'requiere_aprobacion_especial' && (
                              <Badge variant="warning">Requiere Aprobación Especial</Badge>
                            )}
                          </div>
                          <CardDescription>{solicitud.descripcion}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Información básica */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Tipo de Evento</p>
                            <p className="font-medium capitalize">{solicitud.tipo.replace('_', ' ')}</p>
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
                        </div>

                        {/* Justificación */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Justificación de Impacto ({solicitud.tipoImpacto}):
                          </p>
                          <p className="text-sm text-gray-700">{solicitud.justificacionMarketing}</p>
                          <div className="mt-2">
                            <Badge variant="info">
                              <DollarSign className="w-3 h-3 mr-1" />
                              Impacto esperado: {solicitud.impactoEsperado.toLocaleString()}
                            </Badge>
                          </div>
                        </div>

                        {/* Acciones */}
                        {aprobacionPendiente && (
                          <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                              variant="destructive"
                              onClick={() => handleRechazar(solicitud.id, aprobacionPendiente.id)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Rechazar
                            </Button>
                            <Button
                              onClick={() => handleAprobar(solicitud.id, aprobacionPendiente.id)}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Aprobar
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Métricas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Total Solicitudes
              </CardDescription>
              <CardTitle className="text-3xl">{metricas.total}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                En Proceso
              </CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{metricas.pendientes}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Aprobadas
              </CardDescription>
              <CardTitle className="text-3xl text-green-600">{metricas.aprobadas}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Rechazadas
              </CardDescription>
              <CardTitle className="text-3xl text-red-600">{metricas.rechazadas}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Métricas Financieras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Presupuesto Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(metricas.costoTotal)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Suma de todos los eventos con presupuesto estimado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Costo Promedio por Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(metricas.costoPromedio)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Promedio calculado sobre eventos con presupuesto
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dos columnas: Solicitudes Recientes y Próximos Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solicitudes Recientes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitudes Recientes</h2>
            <div className="space-y-3">
              {solicitudesRecientes.map((solicitud) => (
                <Card key={solicitud.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{solicitud.titulo}</h3>
                        <p className="text-sm text-gray-500">
                          {solicitud.departamentoSolicitante}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {solicitud.tipo.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Solicitado: {formatDate(solicitud.fechaSolicitud)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Próximos Eventos */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
            {proximosEventos.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">
                    No hay eventos próximos aprobados.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {proximosEventos.map((solicitud) => (
                  <Card key={solicitud.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{solicitud.titulo}</h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(solicitud.fechaEvento)}
                          </p>
                        </div>
                        <Badge variant="success">
                          {solicitud.estado === 'en_ejecucion' ? 'En Ejecución' : 'Aprobado'}
                        </Badge>
                      </div>
                      {solicitud.presupuestoTotalEstimado && (
                        <div className="mt-2 text-sm text-gray-700">
                          <DollarSign className="inline w-4 h-4" />
                          {formatCurrency(solicitud.presupuestoTotalEstimado)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
