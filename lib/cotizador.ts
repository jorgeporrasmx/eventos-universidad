import { Requerimientos, CostoDesglosadoDepartamento, Cotizacion, Solicitud } from './types'
import { DEPARTAMENTOS, RATIO_COSTO_BENEFICIO_THRESHOLD } from './config/departamentos'

/**
 * Calcula el costo de un departamento basado en sus requerimientos
 */
export function calcularCostoDepartamento(req: Requerimientos): CostoDesglosadoDepartamento {
  const departamento = DEPARTAMENTOS[req.departamentoId]

  // Calcular costo de personal
  const costoPersonal = req.personal.reduce((total, p) => {
    return total + (p.cantidad * p.horas * departamento.tarifaPersonalPorHora)
  }, 0)

  // Calcular costo de equipos
  const costoEquipos = req.equiposNecesarios.reduce((total, equipoId) => {
    const equipo = departamento.equipos.find((e) => e.id === equipoId)
    return total + (equipo?.costo || 0)
  }, 0)

  // Calcular costo de materiales
  const costoMateriales = req.materiales.reduce((total, material) => {
    return total + (material.cantidad * material.costoUnitario)
  }, 0)

  const costoTotal = costoPersonal + costoEquipos + costoMateriales

  // Generar detalles para el desglose
  const detallesPersonal = req.personal.map((p) => ({
    rol: p.rol,
    cantidad: p.cantidad,
    horas: p.horas,
    subtotal: p.cantidad * p.horas * departamento.tarifaPersonalPorHora,
  }))

  const detallesEquipos = req.equiposNecesarios.map((equipoId) => {
    const equipo = departamento.equipos.find((e) => e.id === equipoId)
    return {
      equipo: equipo?.nombre || 'Equipo desconocido',
      costo: equipo?.costo || 0,
    }
  })

  const detallesMateriales = req.materiales.map((m) => ({
    material: m.nombre,
    cantidad: m.cantidad,
    costo: m.cantidad * m.costoUnitario,
  }))

  return {
    departamentoId: req.departamentoId,
    costoPersonal,
    costoEquipos,
    costoMateriales,
    costoTotal,
    detalles: {
      personal: detallesPersonal,
      equipos: detallesEquipos,
      materiales: detallesMateriales,
    },
  }
}

/**
 * Genera una cotización completa para una solicitud
 */
export function generarCotizacion(solicitud: Solicitud): Cotizacion {
  // Calcular costos por departamento
  const costosDesglosados = solicitud.requerimientos.map(calcularCostoDepartamento)

  // Calcular costo total
  const costoTotal = costosDesglosados.reduce((total, desglose) => {
    return total + desglose.costoTotal
  }, 0)

  // Calcular ratio costo-beneficio
  const ratioCostoBeneficio = solicitud.impactoEsperado > 0
    ? costoTotal / solicitud.impactoEsperado
    : Infinity

  // Determinar recomendación
  let recomendacion: 'aprobacion_normal' | 'requiere_aprobacion_especial' | 'no_recomendado'
  let observaciones = ''

  if (ratioCostoBeneficio <= RATIO_COSTO_BENEFICIO_THRESHOLD) {
    recomendacion = 'aprobacion_normal'
    observaciones = 'El análisis costo-beneficio es favorable. Se recomienda aprobar.'
  } else if (ratioCostoBeneficio <= RATIO_COSTO_BENEFICIO_THRESHOLD * 2) {
    recomendacion = 'requiere_aprobacion_especial'
    observaciones = `El ratio costo-beneficio (${ratioCostoBeneficio.toFixed(2)}) excede el umbral recomendado. Se requiere aprobación especial de Dirección General.`
  } else {
    recomendacion = 'no_recomendado'
    observaciones = `El ratio costo-beneficio (${ratioCostoBeneficio.toFixed(2)}) es muy alto. No se recomienda proceder a menos que existan razones estratégicas de peso.`
  }

  return {
    solicitudId: solicitud.id,
    costosDesglosados,
    costoTotal,
    impactoEsperado: solicitud.impactoEsperado,
    ratioCostoBeneficio,
    recomendacion,
    observaciones,
    fechaGeneracion: new Date(),
  }
}

/**
 * Calcula estimado rápido basado en tipo de evento y duración
 */
export function estimarCostoRapido(
  tipoEvento: string,
  duracionHoras: number,
  departamentosInvolucrados: string[]
): number {
  let costoEstimado = 0

  departamentosInvolucrados.forEach((deptId) => {
    const departamento = DEPARTAMENTOS[deptId as keyof typeof DEPARTAMENTOS]
    if (departamento) {
      // Estimado simple: 2 personas promedio * duración * tarifa
      costoEstimado += 2 * duracionHoras * departamento.tarifaPersonalPorHora
      // Más un 30% de equipo y materiales
      costoEstimado += costoEstimado * 0.3
    }
  })

  return Math.round(costoEstimado)
}

/**
 * Valida que todos los requerimientos estén completos
 */
export function validarRequerimientosCompletos(solicitud: Solicitud): boolean {
  if (!solicitud.requerimientos || solicitud.requerimientos.length === 0) {
    return false
  }

  // Verificar que haya requerimientos para todos los departamentos asignados
  const departamentosConRequerimientos = solicitud.requerimientos.map((r) => r.departamentoId)
  const todosDefinidos = solicitud.departamentosAsignados.every((deptId) =>
    departamentosConRequerimientos.includes(deptId)
  )

  if (!todosDefinidos) {
    return false
  }

  // Verificar que todos los requerimientos estén confirmados
  return solicitud.requerimientos.every((r) => r.estado === 'confirmado')
}
