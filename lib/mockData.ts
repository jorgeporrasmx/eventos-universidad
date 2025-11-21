import type { Usuario, Solicitud } from './types'

// Usuarios de prueba
export const USUARIOS_MOCK: Usuario[] = [
  {
    id: 'user-1',
    nombre: 'Solicitante',
    rol: 'solicitante',
    departamentoId: 'Marketing',
  },
  {
    id: 'user-admin',
    nombre: 'Administrador',
    rol: 'admin',
  },
]

// Solicitudes de ejemplo en diferentes estados
export const SOLICITUDES_MOCK: Solicitud[] = [
  {
    id: 'sol-1',
    titulo: 'Ceremonia de Graduación 2025',
    descripcion: 'Ceremonia de graduación para la generación 2021-2025 de Ingeniería',
    categoria: 'evento',
    tipo: 'ceremonia',
    estado: 'aprobado',
    solicitanteId: 'user-1',
    departamentoSolicitante: 'Marketing',
    fechaSolicitud: new Date('2025-01-15'),
    fechaEvento: new Date('2025-06-15'),
    horaInicio: '10:00',
    horaFin: '13:00',
    justificacionMarketing:
      'La ceremonia de graduación es un evento clave para la imagen institucional. Genera contenido para redes sociales, atrae a futuros estudiantes y fortalece la relación con familias y egresados. Se espera cobertura en medios locales y un alcance de más de 50,000 personas en redes sociales.',
    impactoEsperado: 15000,
    tipoImpacto: 'marketing',
    departamentosAsignados: [
      'operaciones',
      'produccion_audiovisual',
      'mantenimiento',
      'limpieza',
      'compras',
    ],
    requerimientos: [],
    aprobaciones: [
      {
        id: 'apr-1',
        solicitudId: 'sol-1',
        tipo: 'aprobacion_concepto',
        aprobadorId: 'user-admin',
        aprobadorNombre: 'Administrador',
        estado: 'aprobado',
        comentarios: 'Aprobado. Evento prioritario.',
        fecha: new Date('2025-01-16'),
      },
    ],
    archivosAdjuntos: [],
    ubicacion: 'Auditorio Principal',
    presupuestoTotalEstimado: 45000,
  },

  {
    id: 'sol-2',
    titulo: 'Video Promocional - Carreras de Cine y Animación',
    descripcion: 'Producción de video promocional mostrando las instalaciones, equipamiento y proyectos destacados de las carreras de Cine, Videojuegos y Animación',
    categoria: 'produccion_audiovisual',
    tipo: 'produccion_video',
    estado: 'en_definicion_requerimientos',
    solicitanteId: 'user-1',
    departamentoSolicitante: 'Marketing',
    fechaSolicitud: new Date('2025-01-18'),
    fechaEvento: new Date('2025-03-01'),
    justificacionMarketing:
      'Video estratégico para captación de estudiantes interesados en carreras creativas. Mostrará estudios de grabación, equipos de motion capture, salas de edición y portfolios de estudiantes. Se publicará en YouTube, Instagram y TikTok. Alcance esperado: 150,000 visualizaciones en 3 meses, incremento del 25% en solicitudes de admisión para estas carreras.',
    impactoEsperado: 10000,
    tipoImpacto: 'ingresos_externos',
    departamentosAsignados: ['produccion_audiovisual'],
    requerimientos: [],
    aprobaciones: [
      {
        id: 'apr-2',
        solicitudId: 'sol-2',
        tipo: 'aprobacion_concepto',
        aprobadorId: 'user-admin',
        aprobadorNombre: 'Administrador',
        estado: 'aprobado',
        comentarios: 'Excelente iniciativa. Proceder con la cotización.',
        fecha: new Date('2025-01-19'),
      },
    ],
    archivosAdjuntos: [],
    presupuestoTotalEstimado: 12000,
    tipoEntregable: 'Video promocional',
    plazoEntrega: new Date('2025-03-15'),
    duracionMaterial: '3-4 minutos',
    locacionesGrabacion: ['Estudio de Cine', 'Sala de Motion Capture', 'Laboratorio de Animación', 'Estudio de Grabación de Audio'],
    plataformaSalida: 'YouTube, Instagram, TikTok, Sitio web institucional',
    fechasPublicacion: [new Date('2025-03-20'), new Date('2025-04-01')],
  },

  {
    id: 'sol-3',
    titulo: 'Conferencia Internacional de Tecnología',
    descripcion: 'Conferencia con ponentes internacionales sobre IA y Blockchain',
    categoria: 'evento',
    tipo: 'conferencia',
    estado: 'pendiente_aprobacion_concepto',
    solicitanteId: 'user-1',
    departamentoSolicitante: 'Ingeniería',
    fechaSolicitud: new Date('2025-01-20'),
    fechaEvento: new Date('2025-04-10'),
    horaInicio: '09:00',
    horaFin: '18:00',
    justificacionMarketing:
      'La conferencia posicionará a la institución como líder en tecnología. Atraerá a 500 asistentes presenciales y 2,000 online. Generará convenios con empresas tecnológicas que pueden traducirse en becas y empleos para estudiantes. ROI estimado en nuevas alianzas: $200,000 MXN anuales.',
    impactoEsperado: 12000,
    tipoImpacto: 'ambos',
    departamentosAsignados: [
      'operaciones',
      'produccion_audiovisual',
      'limpieza',
      'supervision_academica',
    ],
    requerimientos: [],
    aprobaciones: [
      {
        id: 'apr-3',
        solicitudId: 'sol-3',
        tipo: 'aprobacion_concepto',
        aprobadorId: 'user-admin',
        aprobadorNombre: 'Administrador',
        estado: 'pendiente',
      },
    ],
    archivosAdjuntos: [],
    ubicacion: 'Edificio de Tecnología - Auditorio B',
  },

  {
    id: 'sol-4',
    titulo: 'Taller de Innovación para Estudiantes',
    descripcion: 'Taller práctico de 2 días sobre metodologías ágiles',
    categoria: 'evento',
    tipo: 'taller',
    estado: 'concepto_rechazado',
    solicitanteId: 'user-1',
    departamentoSolicitante: 'Desarrollo',
    fechaSolicitud: new Date('2025-01-10'),
    fechaEvento: new Date('2025-02-20'),
    horaInicio: '14:00',
    horaFin: '18:00',
    justificacionMarketing:
      'Taller para mejorar habilidades de estudiantes en metodologías ágiles.',
    impactoEsperado: 50,
    tipoImpacto: 'marketing',
    departamentosAsignados: ['operaciones', 'limpieza'],
    requerimientos: [],
    aprobaciones: [
      {
        id: 'apr-4',
        solicitudId: 'sol-4',
        tipo: 'aprobacion_concepto',
        aprobadorId: 'user-admin',
        aprobadorNombre: 'Administrador',
        estado: 'rechazado',
        comentarios:
          'La justificación de impacto en marketing/ingresos es insuficiente. Por favor reformular con métricas más concretas.',
        fecha: new Date('2025-01-12'),
      },
    ],
    archivosAdjuntos: [],
  },

  {
    id: 'sol-5',
    titulo: 'Open Day - Jornada de Puertas Abiertas',
    descripcion: 'Evento de puertas abiertas para futuros estudiantes y sus familias',
    categoria: 'evento',
    tipo: 'presentacion',
    estado: 'completado',
    solicitanteId: 'user-1',
    departamentoSolicitante: 'Comunicación',
    fechaSolicitud: new Date('2024-11-01'),
    fechaEvento: new Date('2024-12-10'),
    horaInicio: '09:00',
    horaFin: '14:00',
    justificacionMarketing:
      'Open Day es fundamental para captación de nuevos estudiantes. Permite a familias conocer instalaciones, profesores y programas académicos. Históricamente aumenta inscripciones en 20%. Incluye recorridos, charlas informativas y actividades interactivas. Alcance: 300 familias presenciales + streaming para 500 personas.',
    impactoEsperado: 5000,
    tipoImpacto: 'ingresos_externos',
    departamentosAsignados: ['produccion_audiovisual', 'operaciones', 'limpieza'],
    requerimientos: [],
    aprobaciones: [
      {
        id: 'apr-5',
        solicitudId: 'sol-5',
        tipo: 'aprobacion_concepto',
        aprobadorId: 'user-admin',
        aprobadorNombre: 'Administrador',
        estado: 'aprobado',
        fecha: new Date('2024-11-02'),
      },
    ],
    archivosAdjuntos: [],
    ubicacion: 'Campus Principal',
    presupuestoTotalEstimado: 8500,
  },
]

// Función para obtener usuario por ID
export function obtenerUsuarioPorId(id: string): Usuario | undefined {
  return USUARIOS_MOCK.find((u) => u.id === id)
}

// Función para obtener solicitudes por rol y usuario
export function obtenerSolicitudesParaUsuario(usuario: Usuario): Solicitud[] {
  switch (usuario.rol) {
    case 'solicitante':
      return SOLICITUDES_MOCK.filter((s) => s.solicitanteId === usuario.id)

    case 'admin':
      return SOLICITUDES_MOCK

    default:
      return []
  }
}
