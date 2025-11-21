import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Usuario, Solicitud, Notificacion, Requerimientos, Aprobacion, EstadoSolicitud } from './types'
import { generarCotizacion } from './cotizador'

interface AppStore {
  // Usuario actual
  usuarioActual: Usuario | null
  setUsuarioActual: (usuario: Usuario | null) => void

  // Solicitudes
  solicitudes: Solicitud[]
  agregarSolicitud: (solicitud: Solicitud) => void
  actualizarSolicitud: (id: string, datos: Partial<Solicitud>) => void
  obtenerSolicitud: (id: string) => Solicitud | undefined
  obtenerSolicitudesPorUsuario: (usuarioId: string) => Solicitud[]
  obtenerSolicitudesPendientesAprobacion: () => Solicitud[]
  obtenerSolicitudesPorDepartamento: (departamentoId: string) => Solicitud[]

  // Requerimientos
  agregarRequerimientos: (solicitudId: string, requerimientos: Requerimientos) => void
  actualizarRequerimientos: (solicitudId: string, departamentoId: string, datos: Partial<Requerimientos>) => void

  // Aprobaciones
  agregarAprobacion: (solicitudId: string, aprobacion: Aprobacion) => void
  aprobar: (solicitudId: string, aprobacionId: string, comentarios?: string) => void
  rechazar: (solicitudId: string, aprobacionId: string, comentarios: string) => void

  // Cotizaciones
  generarYGuardarCotizacion: (solicitudId: string) => void

  // Notificaciones
  notificaciones: Notificacion[]
  agregarNotificacion: (notificacion: Notificacion) => void
  marcarNotificacionLeida: (id: string) => void
  obtenerNotificacionesUsuario: (usuarioId: string) => Notificacion[]

  // Utilidades
  limpiarDatos: () => void
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      usuarioActual: null,
      solicitudes: [],
      notificaciones: [],

      // Métodos de usuario
      setUsuarioActual: (usuario) => set({ usuarioActual: usuario }),

      // Métodos de solicitudes
      agregarSolicitud: (solicitud) => set((state) => {
        // Verificar si ya existe una solicitud con el mismo ID
        const existe = state.solicitudes.some((s) => s.id === solicitud.id)
        if (existe) {
          console.warn(`Solicitud con ID ${solicitud.id} ya existe, no se agregará duplicado`)
          return state
        }
        return {
          solicitudes: [...state.solicitudes, solicitud],
        }
      }),

      actualizarSolicitud: (id, datos) => set((state) => ({
        solicitudes: state.solicitudes.map((s) =>
          s.id === id ? { ...s, ...datos } : s
        ),
      })),

      obtenerSolicitud: (id) => {
        return get().solicitudes.find((s) => s.id === id)
      },

      obtenerSolicitudesPorUsuario: (usuarioId) => {
        return get().solicitudes.filter((s) => s.solicitanteId === usuarioId)
      },

      obtenerSolicitudesPendientesAprobacion: () => {
        return get().solicitudes.filter((s) =>
          s.estado === 'pendiente_aprobacion_concepto' ||
          s.estado === 'requiere_aprobacion_especial'
        )
      },

      obtenerSolicitudesPorDepartamento: (departamentoId) => {
        return get().solicitudes.filter((s) =>
          s.departamentosAsignados.includes(departamentoId as any)
        )
      },

      // Métodos de requerimientos
      agregarRequerimientos: (solicitudId, requerimientos) => set((state) => ({
        solicitudes: state.solicitudes.map((s) => {
          if (s.id === solicitudId) {
            const reqExistentes = s.requerimientos.filter(
              (r) => r.departamentoId !== requerimientos.departamentoId
            )
            return {
              ...s,
              requerimientos: [...reqExistentes, requerimientos],
            }
          }
          return s
        }),
      })),

      actualizarRequerimientos: (solicitudId, departamentoId, datos) => set((state) => ({
        solicitudes: state.solicitudes.map((s) => {
          if (s.id === solicitudId) {
            return {
              ...s,
              requerimientos: s.requerimientos.map((r) =>
                r.departamentoId === departamentoId ? { ...r, ...datos } : r
              ),
            }
          }
          return s
        }),
      })),

      // Métodos de aprobaciones
      agregarAprobacion: (solicitudId, aprobacion) => set((state) => ({
        solicitudes: state.solicitudes.map((s) => {
          if (s.id === solicitudId) {
            return {
              ...s,
              aprobaciones: [...s.aprobaciones, aprobacion],
            }
          }
          return s
        }),
      })),

      aprobar: (solicitudId, aprobacionId, comentarios) => set((state) => ({
        solicitudes: state.solicitudes.map((s) => {
          if (s.id === solicitudId) {
            const aprobacionesActualizadas = s.aprobaciones.map((a) =>
              a.id === aprobacionId
                ? { ...a, estado: 'aprobado' as const, comentarios, fecha: new Date() }
                : a
            )

            // Determinar nuevo estado de la solicitud
            let nuevoEstado = s.estado
            const aprobacion = aprobacionesActualizadas.find((a) => a.id === aprobacionId)

            if (aprobacion?.tipo === 'aprobacion_concepto') {
              nuevoEstado = 'en_definicion_requerimientos'
            } else if (aprobacion?.tipo === 'aprobacion_especial') {
              nuevoEstado = 'aprobado'
            } else if (aprobacion?.tipo === 'confirmacion_solicitante') {
              nuevoEstado = 'aprobado'
            }

            return {
              ...s,
              aprobaciones: aprobacionesActualizadas,
              estado: nuevoEstado,
            }
          }
          return s
        }),
      })),

      rechazar: (solicitudId, aprobacionId, comentarios) => set((state) => ({
        solicitudes: state.solicitudes.map((s) => {
          if (s.id === solicitudId) {
            const aprobacionesActualizadas = s.aprobaciones.map((a) =>
              a.id === aprobacionId
                ? { ...a, estado: 'rechazado' as const, comentarios, fecha: new Date() }
                : a
            )

            // Determinar nuevo estado de la solicitud
            let nuevoEstado = s.estado
            const aprobacion = aprobacionesActualizadas.find((a) => a.id === aprobacionId)

            if (aprobacion?.tipo === 'aprobacion_concepto') {
              nuevoEstado = 'concepto_rechazado'
            } else if (aprobacion?.tipo === 'aprobacion_especial') {
              nuevoEstado = 'aprobacion_especial_rechazada'
            }

            return {
              ...s,
              aprobaciones: aprobacionesActualizadas,
              estado: nuevoEstado,
            }
          }
          return s
        }),
      })),

      // Métodos de cotización
      generarYGuardarCotizacion: (solicitudId) => set((state) => {
        const solicitud = state.solicitudes.find((s) => s.id === solicitudId)
        if (!solicitud) return state

        const cotizacion = generarCotizacion(solicitud)

        return {
          solicitudes: state.solicitudes.map((s) => {
            if (s.id === solicitudId) {
              let nuevoEstado: EstadoSolicitud = 'cotizacion_generada'

              // Si requiere aprobación especial, cambiar estado
              if (cotizacion.recomendacion === 'requiere_aprobacion_especial') {
                nuevoEstado = 'pendiente_confirmacion_solicitante'
              } else if (cotizacion.recomendacion === 'aprobacion_normal') {
                nuevoEstado = 'pendiente_confirmacion_solicitante'
              }

              return {
                ...s,
                cotizacion,
                estado: nuevoEstado,
                presupuestoTotalEstimado: cotizacion.costoTotal,
              }
            }
            return s
          }),
        }
      }),

      // Métodos de notificaciones
      agregarNotificacion: (notificacion) => set((state) => ({
        notificaciones: [...state.notificaciones, notificacion],
      })),

      marcarNotificacionLeida: (id) => set((state) => ({
        notificaciones: state.notificaciones.map((n) =>
          n.id === id ? { ...n, leida: true } : n
        ),
      })),

      obtenerNotificacionesUsuario: (usuarioId) => {
        return get().notificaciones.filter((n) => n.usuarioId === usuarioId)
      },

      // Utilidades
      limpiarDatos: () => set({
        usuarioActual: null,
        solicitudes: [],
        notificaciones: [],
      }),
    }),
    {
      name: 'eventos-universidad-storage',
    }
  )
)
