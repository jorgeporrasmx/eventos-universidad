import { Departamento, TipoEventoConfig, DepartamentoId, TipoEvento } from '../types'

export const DEPARTAMENTOS: Record<DepartamentoId, Departamento> = {
  mantenimiento: {
    id: 'mantenimiento',
    nombre: 'Mantenimiento',
    descripcion: 'Instalaciones, reparaciones y montaje de infraestructura',
    tarifaPersonalPorHora: 150,
    equipos: [
      { id: 'herramientas_basicas', nombre: 'Herramientas básicas', costo: 100 },
      { id: 'equipo_especializado', nombre: 'Equipo especializado', costo: 300 },
      { id: 'montaje_escenario', nombre: 'Montaje de escenario', costo: 500 },
      { id: 'instalacion_electrica', nombre: 'Instalación eléctrica temporal', costo: 400 },
    ],
    color: '#F59E0B',
  },

  limpieza: {
    id: 'limpieza',
    nombre: 'Limpieza',
    descripcion: 'Limpieza antes, durante y después del evento',
    tarifaPersonalPorHora: 100,
    equipos: [
      { id: 'equipo_limpieza_basico', nombre: 'Equipo de limpieza básico', costo: 50 },
      { id: 'limpieza_profunda', nombre: 'Limpieza profunda', costo: 150 },
      { id: 'sanitizacion', nombre: 'Sanitización', costo: 200 },
    ],
    color: '#10B981',
  },

  supervision_academica: {
    id: 'supervision_academica',
    nombre: 'Supervisión Académica',
    descripcion: 'Validación de contenido académico y coordinación educativa',
    tarifaPersonalPorHora: 200,
    equipos: [
      { id: 'revision_contenido', nombre: 'Revisión de contenido', costo: 0 },
      { id: 'coordinacion_ponentes', nombre: 'Coordinación de ponentes', costo: 100 },
    ],
    color: '#6366F1',
  },

  operaciones: {
    id: 'operaciones',
    nombre: 'Operaciones',
    descripcion: 'Logística general, coordinación y gestión operativa',
    tarifaPersonalPorHora: 180,
    equipos: [
      { id: 'mobiliario', nombre: 'Mobiliario (sillas, mesas)', costo: 200 },
      { id: 'señaletica', nombre: 'Señalética y dirección', costo: 150 },
      { id: 'seguridad', nombre: 'Seguridad y control de acceso', costo: 300 },
      { id: 'catering_coordinacion', nombre: 'Coordinación de catering', costo: 100 },
    ],
    color: '#8B5CF6',
  },

  produccion_audiovisual: {
    id: 'produccion_audiovisual',
    nombre: 'Producción Audiovisual',
    descripcion: 'Cobertura, grabación, edición y producción de contenido',
    tarifaPersonalPorHora: 300,
    equipos: [
      { id: 'camara_profesional', nombre: 'Cámara profesional', costo: 500 },
      { id: 'audio_sonido', nombre: 'Equipo de audio y sonido', costo: 300 },
      { id: 'iluminacion', nombre: 'Iluminación profesional', costo: 400 },
      { id: 'proyector', nombre: 'Proyector y pantalla', costo: 200 },
      { id: 'streaming', nombre: 'Equipo de streaming', costo: 350 },
      { id: 'edicion', nombre: 'Suite de edición', costo: 200 },
    ],
    color: '#EC4899',
  },

  compras: {
    id: 'compras',
    nombre: 'Compras',
    descripcion: 'Gestión de proveedores, autorizaciones y pagos',
    tarifaPersonalPorHora: 150,
    equipos: [
      { id: 'gestion_proveedores', nombre: 'Gestión de proveedores', costo: 0 },
      { id: 'tramites_pago', nombre: 'Trámites de pago', costo: 50 },
    ],
    color: '#14B8A6',
  },
}

export const TIPOS_EVENTO: Record<TipoEvento, TipoEventoConfig> = {
  conferencia: {
    id: 'conferencia',
    nombre: 'Conferencia',
    descripcion: 'Evento académico o profesional con ponentes',
    categoria: 'evento',
    departamentosDefault: ['operaciones', 'produccion_audiovisual', 'limpieza', 'supervision_academica'],
    duracionTipicaHoras: 4,
    personalTipico: {
      operaciones: 2,
      produccion_audiovisual: 3,
      limpieza: 2,
      supervision_academica: 1,
      mantenimiento: 1,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },

  ceremonia: {
    id: 'ceremonia',
    nombre: 'Ceremonia',
    descripcion: 'Graduaciones, inauguraciones, eventos protocolarios',
    categoria: 'evento',
    departamentosDefault: ['operaciones', 'produccion_audiovisual', 'mantenimiento', 'limpieza', 'supervision_academica'],
    duracionTipicaHoras: 3,
    personalTipico: {
      operaciones: 3,
      produccion_audiovisual: 4,
      mantenimiento: 2,
      limpieza: 3,
      supervision_academica: 1,
      compras: 1,
    },
    requiereAprobacionEspecial: true,
  },

  taller: {
    id: 'taller',
    nombre: 'Taller',
    descripcion: 'Actividad práctica educativa',
    categoria: 'evento',
    departamentosDefault: ['operaciones', 'limpieza', 'supervision_academica'],
    duracionTipicaHoras: 2,
    personalTipico: {
      operaciones: 1,
      limpieza: 1,
      supervision_academica: 1,
      mantenimiento: 0,
      produccion_audiovisual: 0,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },

  evento_deportivo: {
    id: 'evento_deportivo',
    nombre: 'Evento Deportivo',
    descripcion: 'Competencias, torneos y actividades deportivas',
    categoria: 'evento',
    departamentosDefault: ['operaciones', 'mantenimiento', 'limpieza', 'produccion_audiovisual'],
    duracionTipicaHoras: 6,
    personalTipico: {
      operaciones: 3,
      mantenimiento: 2,
      limpieza: 2,
      produccion_audiovisual: 2,
      supervision_academica: 0,
      compras: 1,
    },
    requiereAprobacionEspecial: false,
  },

  presentacion: {
    id: 'presentacion',
    nombre: 'Presentación',
    descripcion: 'Presentación de proyectos, productos o servicios',
    categoria: 'evento',
    departamentosDefault: ['operaciones', 'produccion_audiovisual', 'limpieza'],
    duracionTipicaHoras: 2,
    personalTipico: {
      operaciones: 2,
      produccion_audiovisual: 2,
      limpieza: 1,
      mantenimiento: 1,
      supervision_academica: 0,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },

  produccion_video: {
    id: 'produccion_video',
    nombre: 'Producción de Video',
    descripcion: 'Video institucional, promocional o educativo',
    categoria: 'produccion_audiovisual',
    departamentosDefault: ['produccion_audiovisual', 'supervision_academica'],
    duracionTipicaHoras: 8,
    personalTipico: {
      produccion_audiovisual: 3,
      supervision_academica: 1,
      operaciones: 0,
      mantenimiento: 0,
      limpieza: 0,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },

  cobertura_evento: {
    id: 'cobertura_evento',
    nombre: 'Cobertura de Evento',
    descripcion: 'Grabación y documentación de evento existente',
    categoria: 'produccion_audiovisual',
    departamentosDefault: ['produccion_audiovisual'],
    duracionTipicaHoras: 4,
    personalTipico: {
      produccion_audiovisual: 2,
      operaciones: 0,
      mantenimiento: 0,
      limpieza: 0,
      supervision_academica: 0,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },

  contenido_redes: {
    id: 'contenido_redes',
    nombre: 'Contenido para Redes Sociales',
    descripcion: 'Contenido corto para plataformas digitales',
    categoria: 'produccion_audiovisual',
    departamentosDefault: ['produccion_audiovisual'],
    duracionTipicaHoras: 2,
    personalTipico: {
      produccion_audiovisual: 2,
      operaciones: 0,
      mantenimiento: 0,
      limpieza: 0,
      supervision_academica: 0,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },

  otro: {
    id: 'otro',
    nombre: 'Otro',
    descripcion: 'Evento o producción personalizada',
    categoria: 'evento',
    departamentosDefault: ['operaciones'],
    duracionTipicaHoras: 3,
    personalTipico: {
      operaciones: 1,
      produccion_audiovisual: 0,
      mantenimiento: 0,
      limpieza: 0,
      supervision_academica: 0,
      compras: 0,
    },
    requiereAprobacionEspecial: false,
  },
}

// Threshold para aprobación especial
export const RATIO_COSTO_BENEFICIO_THRESHOLD = 2.0

// Departamentos disponibles para solicitar
export const DEPARTAMENTOS_SOLICITANTES = [
  'Ingeniería',
  'Ciencias',
  'Humanidades',
  'Administración',
  'Medicina',
  'Derecho',
  'Marketing',
  'Comunicación',
  'Desarrollo',
  'Rectoría',
  'Dirección Académica',
]
