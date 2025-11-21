// ============================================================================
// TIPOS DE USUARIO Y ROLES
// ============================================================================

export type RolUsuario = 'solicitante' | 'admin'

export interface Usuario {
  id: string
  nombre: string
  rol: RolUsuario
  departamentoId?: string
}

// ============================================================================
// DEPARTAMENTOS
// ============================================================================

export type DepartamentoId =
  | 'mantenimiento'
  | 'limpieza'
  | 'supervision_academica'
  | 'operaciones'
  | 'produccion_audiovisual'
  | 'compras'

export interface Equipo {
  id: string
  nombre: string
  costo: number
}

export interface Departamento {
  id: DepartamentoId
  nombre: string
  descripcion: string
  tarifaPersonalPorHora: number
  equipos: Equipo[]
  color: string
}

// ============================================================================
// TIPOS DE EVENTO Y PRODUCCIÓN
// ============================================================================

export type CategoriaSolicitud = 'evento' | 'produccion_audiovisual'

export type TipoEvento =
  | 'conferencia'
  | 'ceremonia'
  | 'taller'
  | 'evento_deportivo'
  | 'presentacion'
  | 'produccion_video'
  | 'cobertura_evento'
  | 'contenido_redes'
  | 'otro'

export interface TipoEventoConfig {
  id: TipoEvento
  nombre: string
  descripcion: string
  categoria: CategoriaSolicitud
  departamentosDefault: DepartamentoId[]
  duracionTipicaHoras: number
  personalTipico: Record<DepartamentoId, number>
  requiereAprobacionEspecial: boolean
}

// ============================================================================
// ESTADOS DE SOLICITUD
// ============================================================================

export type EstadoSolicitud =
  | 'borrador'
  | 'pendiente_aprobacion_concepto'
  | 'concepto_rechazado'
  | 'en_definicion_requerimientos'
  | 'cotizacion_generada'
  | 'pendiente_confirmacion_solicitante'
  | 'requiere_aprobacion_especial'
  | 'aprobacion_especial_rechazada'
  | 'aprobado'
  | 'en_ejecucion'
  | 'completado'
  | 'cancelado'

// ============================================================================
// REQUERIMIENTOS POR DEPARTAMENTO
// ============================================================================

export interface RequerimientoPersonal {
  rol: string
  cantidad: number
  horas: number
}

export interface MaterialNecesario {
  nombre: string
  cantidad: number
  costoUnitario: number
}

export interface Requerimientos {
  solicitudId: string
  departamentoId: DepartamentoId
  estado: 'pendiente' | 'en_definicion' | 'confirmado'
  personal: RequerimientoPersonal[]
  equiposNecesarios: string[] // IDs de equipos
  materiales: MaterialNecesario[]
  observaciones: string
  presupuestoEstimado: number
  costoCalculado?: number
  fechaDefinicion?: Date
}

// ============================================================================
// COTIZACIÓN
// ============================================================================

export interface CostoDesglosadoDepartamento {
  departamentoId: DepartamentoId
  costoPersonal: number
  costoEquipos: number
  costoMateriales: number
  costoTotal: number
  detalles: {
    personal: Array<{ rol: string; cantidad: number; horas: number; subtotal: number }>
    equipos: Array<{ equipo: string; costo: number }>
    materiales: Array<{ material: string; cantidad: number; costo: number }>
  }
}

export interface Cotizacion {
  solicitudId: string
  costosDesglosados: CostoDesglosadoDepartamento[]
  costoTotal: number
  impactoEsperado: number
  ratioCostoBeneficio: number
  recomendacion: 'aprobacion_normal' | 'requiere_aprobacion_especial' | 'no_recomendado'
  observaciones: string
  fechaGeneracion: Date
}

// ============================================================================
// SOLICITUD PRINCIPAL
// ============================================================================

export interface Solicitud {
  id: string
  titulo: string
  descripcion: string
  categoria: CategoriaSolicitud
  tipo: TipoEvento
  estado: EstadoSolicitud

  // Información del solicitante
  solicitanteId: string
  departamentoSolicitante: string

  // Fechas
  fechaSolicitud: Date
  fechaEvento: Date
  horaInicio?: string
  horaFin?: string

  // Justificación (obligatoria)
  justificacionMarketing: string
  impactoEsperado: number // Valor numérico para análisis costo-beneficio
  tipoImpacto: 'marketing' | 'ingresos_externos' | 'ambos'

  // Departamentos involucrados
  departamentosAsignados: DepartamentoId[]

  // Requerimientos y cotización
  requerimientos: Requerimientos[]
  cotizacion?: Cotizacion

  // Aprobaciones
  aprobaciones: Aprobacion[]

  // Archivos adjuntos (simulados)
  archivosAdjuntos: string[]

  // Metadata
  presupuestoTotalEstimado?: number
  ubicacion?: string
  observacionesGenerales?: string

  // ========== CAMPOS ESPECÍFICOS PARA EVENTOS ==========
  numeroAsistentes?: number
  duracionEstimadaHoras?: number
  requerimientosTecnicos?: string

  // ========== CAMPOS ESPECÍFICOS PARA PRODUCCIÓN AUDIOVISUAL ==========
  tipoEntregable?: string // "Video", "Fotos", "Streaming"
  plazoEntrega?: Date
  duracionMaterial?: string // Ej: "3 minutos", "50 fotos"
  locacionesGrabacion?: string[]
  plataformaSalida?: string // Donde se publicará
  fechasPublicacion?: Date[]
}

// ============================================================================
// APROBACIONES
// ============================================================================

export type TipoAprobacion =
  | 'aprobacion_concepto'
  | 'aprobacion_especial'
  | 'confirmacion_solicitante'

export interface Aprobacion {
  id: string
  solicitudId: string
  tipo: TipoAprobacion
  aprobadorId: string
  aprobadorNombre: string
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  comentarios?: string
  fecha?: Date
}

// ============================================================================
// NOTIFICACIONES
// ============================================================================

export type TipoNotificacion =
  | 'solicitud_creada'
  | 'solicitud_aprobada'
  | 'solicitud_rechazada'
  | 'requerimientos_solicitados'
  | 'cotizacion_generada'
  | 'aprobacion_especial_requerida'
  | 'evento_proximo'

export interface Notificacion {
  id: string
  usuarioId: string
  tipo: TipoNotificacion
  titulo: string
  mensaje: string
  solicitudId?: string
  leida: boolean
  fecha: Date
}

// ============================================================================
// DASHBOARD Y MÉTRICAS
// ============================================================================

export interface MetricasDashboard {
  totalSolicitudes: number
  solicitudesPendientes: number
  solicitudesAprobadas: number
  solicitudesRechazadas: number
  solicitudesEnEjecucion: number
  costoTotalEstimado: number
  costoPromedioPorEvento: number
  ratioCostoBeneficioPromedio: number
  departamentoMasActivo: string
  tipoEventoMasFrecuente: string
}
