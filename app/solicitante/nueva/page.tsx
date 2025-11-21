'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { TIPOS_EVENTO, DEPARTAMENTOS_SOLICITANTES, DEPARTAMENTOS } from '@/lib/config/departamentos'
import { ArrowLeft, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { TipoEvento, DepartamentoId, TipoImpacto, CategoriaSolicitud } from '@/lib/types'

export default function NuevaSolicitudPage() {
  const router = useRouter()
  const usuarioActual = useStore((state) => state.usuarioActual)
  const agregarSolicitud = useStore((state) => state.agregarSolicitud)

  // Estados del formulario
  const [categoria, setCategoria] = useState<CategoriaSolicitud | ''>('')
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipo, setTipo] = useState<TipoEvento | ''>('')
  const [fechaEvento, setFechaEvento] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [justificacion, setJustificacion] = useState('')
  const [impactoEsperado, setImpactoEsperado] = useState('')
  const [tipoImpacto, setTipoImpacto] = useState<TipoImpacto>('marketing')
  const [departamentosSeleccionados, setDepartamentosSeleccionados] = useState<DepartamentoId[]>([])

  // Campos específicos para EVENTOS
  const [numeroAsistentes, setNumeroAsistentes] = useState('')
  const [duracionEstimadaHoras, setDuracionEstimadaHoras] = useState('')
  const [requerimientosTecnicos, setRequerimientosTecnicos] = useState('')

  // Campos específicos para PRODUCCIÓN AUDIOVISUAL
  const [tipoEntregable, setTipoEntregable] = useState('')
  const [plazoEntrega, setPlazoEntrega] = useState('')
  const [duracionMaterial, setDuracionMaterial] = useState('')
  const [locacionesGrabacion, setLocacionesGrabacion] = useState('')
  const [plataformaSalida, setPlataformaSalida] = useState('')
  const [fechasPublicacion, setFechasPublicacion] = useState('')

  // Estados de validación
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!usuarioActual) {
      router.push('/')
    }
  }, [usuarioActual, router])

  // Resetear tipo cuando cambie la categoría
  useEffect(() => {
    if (categoria) {
      setTipo('')
      // Para producciones audiovisuales, solo seleccionar producción audiovisual
      if (categoria === 'produccion_audiovisual') {
        setDepartamentosSeleccionados(['produccion_audiovisual'])
      } else {
        setDepartamentosSeleccionados([])
      }
    }
  }, [categoria])

  // Sugerir departamentos según el tipo de evento (solo para eventos)
  useEffect(() => {
    if (tipo && categoria === 'evento') {
      const tipoConfig = TIPOS_EVENTO[tipo as TipoEvento]
      if (tipoConfig) {
        setDepartamentosSeleccionados(tipoConfig.departamentosDefault)
      }
    }
  }, [tipo, categoria])

  if (!usuarioActual) return null

  // Filtrar tipos de evento según la categoría seleccionada
  const tiposFiltrados = Object.values(TIPOS_EVENTO).filter(
    (t) => !categoria || t.categoria === categoria
  )

  // Validaciones
  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {}

    if (!categoria) {
      nuevosErrores.categoria = 'Debe seleccionar una categoría'
    }

    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título es obligatorio'
    }

    if (!descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria'
    }

    if (!tipo) {
      nuevosErrores.tipo = 'Debe seleccionar un tipo'
    }

    if (!fechaEvento) {
      nuevosErrores.fechaEvento = 'La fecha es obligatoria'
    }

    if (!justificacion.trim()) {
      nuevosErrores.justificacion = 'La justificación es obligatoria'
    } else if (justificacion.trim().length < 100) {
      nuevosErrores.justificacion = 'La justificación debe tener al menos 100 caracteres'
    }

    if (!impactoEsperado || parseInt(impactoEsperado) <= 0) {
      nuevosErrores.impactoEsperado = 'El impacto esperado debe ser un número mayor a 0'
    }

    // Validaciones específicas para EVENTOS
    if (categoria === 'evento') {
      if (departamentosSeleccionados.length === 0) {
        nuevosErrores.departamentos = 'Debe seleccionar al menos un departamento'
      }
      if (!ubicacion.trim()) {
        nuevosErrores.ubicacion = 'La ubicación es obligatoria para eventos'
      }
      if (!numeroAsistentes || parseInt(numeroAsistentes) <= 0) {
        nuevosErrores.numeroAsistentes = 'El número de asistentes es obligatorio'
      }
    }

    // Validaciones específicas para PRODUCCIÓN AUDIOVISUAL
    if (categoria === 'produccion_audiovisual') {
      if (!tipoEntregable.trim()) {
        nuevosErrores.tipoEntregable = 'El tipo de entregable es obligatorio'
      }
      if (!plazoEntrega) {
        nuevosErrores.plazoEntrega = 'El plazo de entrega es obligatorio'
      }
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setEnviando(true)

    // Generar IDs únicos
    const timestamp = Date.now()
    const solicitudId = `sol-${timestamp}`
    const aprobacionId = `apr-${timestamp}`

    // Crear la solicitud
    const nuevaSolicitud = {
      id: solicitudId,
      titulo,
      descripcion,
      categoria: categoria as CategoriaSolicitud,
      tipo: tipo as TipoEvento,
      estado: 'pendiente_aprobacion_concepto' as const,
      solicitanteId: usuarioActual.id,
      departamentoSolicitante: usuarioActual.departamentoId || 'Sin departamento',
      fechaSolicitud: new Date(),
      fechaEvento: new Date(fechaEvento),
      horaInicio: horaInicio || undefined,
      horaFin: horaFin || undefined,
      justificacionMarketing: justificacion,
      impactoEsperado: parseInt(impactoEsperado),
      tipoImpacto,
      departamentosAsignados: departamentosSeleccionados,
      requerimientos: [],
      aprobaciones: [
        {
          id: aprobacionId,
          solicitudId: solicitudId,
          tipo: 'aprobacion_concepto' as const,
          aprobadorId: 'user-admin',
          aprobadorNombre: 'Administrador',
          estado: 'pendiente' as const,
        },
      ],
      archivosAdjuntos: [],
      ubicacion: categoria === 'evento' ? ubicacion : undefined,
      // Campos específicos para EVENTOS
      numeroAsistentes: categoria === 'evento' && numeroAsistentes ? parseInt(numeroAsistentes) : undefined,
      duracionEstimadaHoras: categoria === 'evento' && duracionEstimadaHoras ? parseFloat(duracionEstimadaHoras) : undefined,
      requerimientosTecnicos: categoria === 'evento' ? requerimientosTecnicos : undefined,
      // Campos específicos para PRODUCCIÓN AUDIOVISUAL
      tipoEntregable: categoria === 'produccion_audiovisual' ? tipoEntregable : undefined,
      plazoEntrega: categoria === 'produccion_audiovisual' && plazoEntrega ? new Date(plazoEntrega) : undefined,
      duracionMaterial: categoria === 'produccion_audiovisual' ? duracionMaterial : undefined,
      locacionesGrabacion: categoria === 'produccion_audiovisual' && locacionesGrabacion
        ? locacionesGrabacion.split(',').map((loc) => loc.trim())
        : undefined,
      plataformaSalida: categoria === 'produccion_audiovisual' ? plataformaSalida : undefined,
      fechasPublicacion: categoria === 'produccion_audiovisual' && fechasPublicacion
        ? fechasPublicacion.split(',').map((fecha) => new Date(fecha.trim()))
        : undefined,
    }

    // Guardar en el store
    agregarSolicitud(nuevaSolicitud)

    // Mostrar confirmación
    alert('¡Solicitud creada exitosamente! Se ha enviado al administrador para su aprobación.')

    // Redirigir al dashboard
    setTimeout(() => {
      router.push('/solicitante')
    }, 500)
  }

  // Toggle departamento
  const toggleDepartamento = (deptId: DepartamentoId) => {
    if (departamentosSeleccionados.includes(deptId)) {
      setDepartamentosSeleccionados(departamentosSeleccionados.filter((d) => d !== deptId))
    } else {
      setDepartamentosSeleccionados([...departamentosSeleccionados, deptId])
    }
  }

  const caracteresRestantes = 100 - justificacion.length
  const caracteresColor = caracteresRestantes > 0 ? 'text-red-500' : 'text-green-600'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/solicitante')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nueva Solicitud</h1>
              <p className="text-gray-600 mt-1">Complete todos los campos obligatorios</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* PASO 1: Selección de Categoría */}
            <Card>
              <CardHeader>
                <CardTitle>Paso 1: ¿Qué deseas solicitar?</CardTitle>
                <CardDescription>Selecciona el tipo de solicitud</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCategoria('evento')}
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      categoria === 'evento'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold">Evento</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Conferencias, ceremonias, talleres, eventos deportivos, presentaciones
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategoria('produccion_audiovisual')}
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      categoria === 'produccion_audiovisual'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold">Producción Audiovisual</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Videos, coberturas, contenido para redes sociales, fotografía
                    </p>
                  </button>
                </div>
                {errores.categoria && (
                  <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errores.categoria}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Mostrar resto del formulario solo si hay categoría seleccionada */}
            {categoria && (
              <>
                {/* Información Básica */}
                <Card>
                  <CardHeader>
                    <CardTitle>Información Básica</CardTitle>
                    <CardDescription>
                      Datos generales de la {categoria === 'evento' ? 'solicitud de evento' : 'producción audiovisual'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Título */}
                    <div>
                      <Label htmlFor="titulo">
                        Título <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder={
                          categoria === 'evento'
                            ? 'Ej: Ceremonia de Graduación 2025'
                            : 'Ej: Video Promocional Nuevo Campus'
                        }
                        className={errores.titulo ? 'border-red-500' : ''}
                      />
                      {errores.titulo && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errores.titulo}
                        </p>
                      )}
                    </div>

                    {/* Descripción */}
                    <div>
                      <Label htmlFor="descripcion">
                        Descripción <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder={
                          categoria === 'evento'
                            ? 'Describe brevemente el evento'
                            : 'Describe el proyecto audiovisual'
                        }
                        rows={3}
                        className={errores.descripcion ? 'border-red-500' : ''}
                      />
                      {errores.descripcion && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errores.descripcion}
                        </p>
                      )}
                    </div>

                    {/* Tipo - Filtrado por categoría */}
                    <div>
                      <Label htmlFor="tipo">
                        Tipo de {categoria === 'evento' ? 'Evento' : 'Producción'}{' '}
                        <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value as TipoEvento)}
                        className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 ${
                          errores.tipo ? 'border-red-500' : 'border-gray-200'
                        }`}
                      >
                        <option value="">Seleccionar tipo...</option>
                        {tiposFiltrados.map((config) => (
                          <option key={config.id} value={config.id}>
                            {config.nombre}
                          </option>
                        ))}
                      </select>
                      {errores.tipo && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errores.tipo}
                        </p>
                      )}
                      {tipo && (
                        <p className="text-xs text-gray-500 mt-1">
                          {TIPOS_EVENTO[tipo as TipoEvento].descripcion}
                        </p>
                      )}
                    </div>

                    {/* Fecha */}
                    <div>
                      <Label htmlFor="fechaEvento">
                        {categoria === 'evento' ? 'Fecha del Evento' : 'Fecha de Inicio de Producción'}{' '}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fechaEvento"
                        type="date"
                        value={fechaEvento}
                        onChange={(e) => setFechaEvento(e.target.value)}
                        className={errores.fechaEvento ? 'border-red-500' : ''}
                      />
                      {errores.fechaEvento && (
                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errores.fechaEvento}
                        </p>
                      )}
                    </div>

                    {/* Horarios - solo para eventos */}
                    {categoria === 'evento' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="horaInicio">Hora de Inicio</Label>
                            <Input
                              id="horaInicio"
                              type="time"
                              value={horaInicio}
                              onChange={(e) => setHoraInicio(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="horaFin">Hora de Fin</Label>
                            <Input
                              id="horaFin"
                              type="time"
                              value={horaFin}
                              onChange={(e) => setHoraFin(e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* ========== CAMPOS ESPECÍFICOS PARA EVENTOS ========== */}
                {categoria === 'evento' && (
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle>Detalles del Evento</CardTitle>
                      <CardDescription>Información específica del evento presencial</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Ubicación */}
                      <div>
                        <Label htmlFor="ubicacion">
                          Ubicación <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="ubicacion"
                          value={ubicacion}
                          onChange={(e) => setUbicacion(e.target.value)}
                          placeholder="Ej: Auditorio Principal, Campus Central"
                          className={errores.ubicacion ? 'border-red-500' : ''}
                        />
                        {errores.ubicacion && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errores.ubicacion}
                          </p>
                        )}
                      </div>

                      {/* Número de Asistentes */}
                      <div>
                        <Label htmlFor="numeroAsistentes">
                          Número Estimado de Asistentes <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="numeroAsistentes"
                          type="number"
                          value={numeroAsistentes}
                          onChange={(e) => setNumeroAsistentes(e.target.value)}
                          placeholder="Ej: 300"
                          min="1"
                          className={errores.numeroAsistentes ? 'border-red-500' : ''}
                        />
                        {errores.numeroAsistentes && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errores.numeroAsistentes}
                          </p>
                        )}
                      </div>

                      {/* Duración Estimada */}
                      <div>
                        <Label htmlFor="duracionEstimadaHoras">Duración Estimada (horas)</Label>
                        <Input
                          id="duracionEstimadaHoras"
                          type="number"
                          step="0.5"
                          value={duracionEstimadaHoras}
                          onChange={(e) => setDuracionEstimadaHoras(e.target.value)}
                          placeholder="Ej: 3.5"
                          min="0.5"
                        />
                      </div>

                      {/* Requerimientos Técnicos */}
                      <div>
                        <Label htmlFor="requerimientosTecnicos">Requerimientos Técnicos</Label>
                        <Textarea
                          id="requerimientosTecnicos"
                          value={requerimientosTecnicos}
                          onChange={(e) => setRequerimientosTecnicos(e.target.value)}
                          placeholder="Ej: Proyector, sistema de sonido, micrófonos, pantallas LED, etc."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* ========== CAMPOS ESPECÍFICOS PARA PRODUCCIÓN AUDIOVISUAL ========== */}
                {categoria === 'produccion_audiovisual' && (
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle>Detalles de Producción Audiovisual</CardTitle>
                      <CardDescription>Información específica del proyecto audiovisual</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Tipo de Entregable */}
                      <div>
                        <Label htmlFor="tipoEntregable">
                          Tipo de Entregable <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="tipoEntregable"
                          value={tipoEntregable}
                          onChange={(e) => setTipoEntregable(e.target.value)}
                          className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm ${
                            errores.tipoEntregable ? 'border-red-500' : 'border-gray-200'
                          }`}
                        >
                          <option value="">Seleccionar...</option>
                          <option value="Video institucional">Video institucional</option>
                          <option value="Video promocional">Video promocional</option>
                          <option value="Fotografía">Fotografía</option>
                          <option value="Streaming">Streaming</option>
                          <option value="Contenido redes sociales">Contenido redes sociales</option>
                          <option value="Cobertura">Cobertura</option>
                          <option value="Otro">Otro</option>
                        </select>
                        {errores.tipoEntregable && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errores.tipoEntregable}
                          </p>
                        )}
                      </div>

                      {/* Plazo de Entrega */}
                      <div>
                        <Label htmlFor="plazoEntrega">
                          Plazo de Entrega <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="plazoEntrega"
                          type="date"
                          value={plazoEntrega}
                          onChange={(e) => setPlazoEntrega(e.target.value)}
                          className={errores.plazoEntrega ? 'border-red-500' : ''}
                        />
                        {errores.plazoEntrega && (
                          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errores.plazoEntrega}
                          </p>
                        )}
                      </div>

                      {/* Duración del Material */}
                      <div>
                        <Label htmlFor="duracionMaterial">Duración del Material Final</Label>
                        <Input
                          id="duracionMaterial"
                          value={duracionMaterial}
                          onChange={(e) => setDuracionMaterial(e.target.value)}
                          placeholder="Ej: 3 minutos, 50 fotos, 1 hora"
                        />
                      </div>

                      {/* Locaciones de Grabación */}
                      <div>
                        <Label htmlFor="locacionesGrabacion">Locaciones de Grabación</Label>
                        <Input
                          id="locacionesGrabacion"
                          value={locacionesGrabacion}
                          onChange={(e) => setLocacionesGrabacion(e.target.value)}
                          placeholder="Separar con comas: Campus Norte, Auditorio, Laboratorios"
                        />
                      </div>

                      {/* Plataforma de Salida */}
                      <div>
                        <Label htmlFor="plataformaSalida">Plataforma de Publicación</Label>
                        <Input
                          id="plataformaSalida"
                          value={plataformaSalida}
                          onChange={(e) => setPlataformaSalida(e.target.value)}
                          placeholder="Ej: Instagram, YouTube, Facebook, Sitio web"
                        />
                      </div>

                      {/* Fechas de Publicación */}
                      <div>
                        <Label htmlFor="fechasPublicacion">Fechas de Publicación (separadas por comas)</Label>
                        <Input
                          id="fechasPublicacion"
                          value={fechasPublicacion}
                          onChange={(e) => setFechasPublicacion(e.target.value)}
                          placeholder="Ej: 2025-03-01, 2025-03-15"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

            {/* Justificación e Impacto */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle>Justificación e Impacto</CardTitle>
                <CardDescription>
                  Explique cómo este evento impactará en marketing o generará ingresos externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Justificación */}
                <div>
                  <Label htmlFor="justificacion">
                    Justificación de Impacto <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="justificacion"
                    value={justificacion}
                    onChange={(e) => setJustificacion(e.target.value)}
                    placeholder="Explique detalladamente cómo este evento beneficiará a la institución en términos de marketing, posicionamiento, captación de alumnos, o generación de ingresos. Debe incluir métricas estimadas (alcance, asistentes, impacto en medios, etc.)"
                    rows={6}
                    className={errores.justificacion ? 'border-red-500' : ''}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errores.justificacion ? (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errores.justificacion}
                      </p>
                    ) : (
                      <p className={`text-sm ${caracteresColor}`}>
                        {caracteresRestantes > 0
                          ? `Faltan ${caracteresRestantes} caracteres (mínimo 100)`
                          : `✓ ${justificacion.length} caracteres`}
                      </p>
                    )}
                    {justificacion.length >= 100 && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>

                {/* Tipo de Impacto */}
                <div>
                  <Label htmlFor="tipoImpacto">
                    Tipo de Impacto <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="tipoImpacto"
                    value={tipoImpacto}
                    onChange={(e) => setTipoImpacto(e.target.value as TipoImpacto)}
                    className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                  >
                    <option value="marketing">Marketing y Posicionamiento</option>
                    <option value="ingresos_externos">Ingresos Externos</option>
                    <option value="ambos">Ambos (Marketing e Ingresos)</option>
                  </select>
                </div>

                {/* Impacto Esperado */}
                <div>
                  <Label htmlFor="impactoEsperado">
                    Impacto Esperado (Valor Numérico) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="impactoEsperado"
                    type="number"
                    value={impactoEsperado}
                    onChange={(e) => setImpactoEsperado(e.target.value)}
                    placeholder="Ej: 5000 (alcance en personas, ingresos estimados, etc.)"
                    className={errores.impactoEsperado ? 'border-red-500' : ''}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Número estimado de personas alcanzadas, ingresos esperados, o métrica relevante
                  </p>
                  {errores.impactoEsperado && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errores.impactoEsperado}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Departamentos Involucrados */}
            {categoria === 'evento' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Departamentos Involucrados</CardTitle>
                  <CardDescription>
                    Seleccione los departamentos necesarios para este evento (sugeridos automáticamente)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.values(DEPARTAMENTOS).map((dept: any) => (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => toggleDepartamento(dept.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          departamentosSeleccionados.includes(dept.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full mb-2"
                          style={{ backgroundColor: dept.color }}
                        />
                        <p className="font-medium text-sm">{dept.nombre}</p>
                        <p className="text-xs text-gray-500">${dept.tarifaPersonalPorHora}/hr</p>
                      </button>
                    ))}
                  </div>
                  {errores.departamentos && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errores.departamentos}
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle>Departamento Asignado</CardTitle>
                  <CardDescription>
                    Las producciones audiovisuales son manejadas exclusivamente por el departamento de Producción Audiovisual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: DEPARTAMENTOS.produccion_audiovisual.color }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {DEPARTAMENTOS.produccion_audiovisual.nombre}
                      </p>
                      <p className="text-sm text-gray-600">
                        {DEPARTAMENTOS.produccion_audiovisual.descripcion}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      ${DEPARTAMENTOS.produccion_audiovisual.tarifaPersonalPorHora}/hr
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
              </>
            )}

            {/* Botones de Acción */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/solicitante')}
                disabled={enviando}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={enviando}>
                {enviando ? 'Enviando...' : 'Crear Solicitud'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
