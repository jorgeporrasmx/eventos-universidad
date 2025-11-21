'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  FileText,
} from 'lucide-react'

export default function EjemploEventoPage() {
  const router = useRouter()

  const evento = {
    titulo: 'Ceremonia de Graduación 2025',
    fecha: '15 de junio, 2025',
    horario: '10:00 - 13:00',
    ubicacion: 'Auditorio Principal',
    asistentes: 500,
    presupuestoTotal: 45000,
    estado: 'aprobado',
  }

  const departamentos = [
    {
      nombre: 'Operaciones',
      color: '#8B5CF6',
      personal: '3 coordinadores',
      horario: '10:00 - 13:00',
      presupuesto: 8500,
      tareas: ['Control de acceso', 'Coordinación general', 'Atención a invitados'],
      estado: 'confirmado',
    },
    {
      nombre: 'Producción Audiovisual',
      color: '#EC4899',
      personal: '4 técnicos',
      horario: '08:00 - 15:00',
      presupuesto: 15200,
      tareas: ['Grabación multicámara', 'Streaming en vivo', 'Fotografía'],
      estado: 'confirmado',
    },
    {
      nombre: 'Mantenimiento',
      color: '#F59E0B',
      personal: '2 técnicos',
      horario: '08:00 - 15:00',
      presupuesto: 9800,
      tareas: ['Montaje de escenario', 'Instalación eléctrica', 'Desmontaje'],
      estado: 'confirmado',
    },
    {
      nombre: 'Limpieza',
      color: '#10B981',
      personal: '3 personas',
      horario: '08:00 - 15:00',
      presupuesto: 6500,
      tareas: ['Limpieza profunda pre-evento', 'Sanitización', 'Limpieza post-evento'],
      estado: 'confirmado',
    },
    {
      nombre: 'Supervisión Académica',
      color: '#6366F1',
      personal: '1 supervisor',
      horario: '10:00 - 13:00',
      presupuesto: 2000,
      tareas: ['Coordinación de protocolo', 'Validación de procedimientos'],
      estado: 'confirmado',
    },
    {
      nombre: 'Compras',
      color: '#14B8A6',
      personal: '1 coordinador',
      horario: '09:00 - 13:00',
      presupuesto: 3000,
      tareas: ['Gestión de proveedores', 'Trámites y pagos'],
      estado: 'confirmado',
    },
  ]

  const timeline = [
    {
      hora: '08:00 - 10:00',
      fase: 'PREPARACIÓN',
      actividades: [
        { dept: 'Mantenimiento', actividad: 'Montaje de escenario e instalación eléctrica' },
        { dept: 'Limpieza', actividad: 'Limpieza profunda y sanitización' },
        { dept: 'Producción AV', actividad: 'Instalación de cámaras y configuración de audio' },
      ],
    },
    {
      hora: '10:00 - 13:00',
      fase: 'EVENTO EN CURSO',
      actividades: [
        { dept: 'Operaciones', actividad: 'Control de acceso y coordinación general' },
        { dept: 'Producción AV', actividad: 'Grabación multicámara y streaming' },
        { dept: 'Supervisión', actividad: 'Coordinación de protocolo' },
        { dept: 'Compras', actividad: 'Supervisión de proveedores' },
      ],
    },
    {
      hora: '13:00 - 15:00',
      fase: 'DESMONTAJE',
      actividades: [
        { dept: 'Mantenimiento', actividad: 'Desmontaje y retiro de instalaciones' },
        { dept: 'Limpieza', actividad: 'Limpieza post-evento' },
      ],
    },
  ]

  const requerimientos = [
    {
      categoria: 'Audiovisual',
      items: [
        '3 Cámaras profesionales',
        'Sistema de audio completo',
        'Iluminación LED profesional',
        'Equipo de streaming',
        'Proyector y pantalla',
      ],
    },
    {
      categoria: 'Infraestructura',
      items: [
        'Escenario (12m × 8m)',
        'Instalación eléctrica temporal',
        'Sistema de iluminación del escenario',
      ],
    },
    {
      categoria: 'Mobiliario',
      items: ['500 Sillas', '20 Mesas', 'Podio con micrófono'],
    },
    {
      categoria: 'Señalización',
      items: ['Señalética direccional', 'Control de acceso', 'Identificación de zonas'],
    },
  ]

  const checklist = [
    { item: 'Confirmar personal de todos los departamentos', completado: true },
    { item: 'Verificar disponibilidad de equipos', completado: true },
    { item: 'Confirmar proveedores externos', completado: true },
    { item: 'Revisar plan de contingencia', completado: false },
    { item: 'Reunión de coordinación final', completado: false },
    { item: 'Walkthrough del espacio', completado: false },
    { item: 'Pruebas de equipos críticos', completado: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/')} className="bg-white text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Badge className="bg-green-500 text-white">APROBADO - LISTO PARA EJECUTAR</Badge>
          </div>
          <h1 className="text-4xl font-bold mb-2">{evento.titulo}</h1>
          <p className="text-blue-100 text-lg">Vista Operativa Completa del Evento</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información General */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-semibold">{evento.fecha}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Horario</p>
                  <p className="font-semibold">{evento.horario}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-semibold">{evento.ubicacion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Asistentes</p>
                  <p className="font-semibold">{evento.asistentes} personas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline del Evento */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Timeline del Evento</CardTitle>
            <CardDescription>Cronograma detallado por fase y departamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timeline.map((fase, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold">{fase.hora}</h3>
                    <Badge variant="secondary">{fase.fase}</Badge>
                  </div>
                  <div className="space-y-2">
                    {fase.actividades.map((act, actIdx) => (
                      <div key={actIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-gray-900">{act.dept}:</strong>{' '}
                          <span className="text-gray-600">{act.actividad}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Departamentos Involucrados */}
          <Card>
            <CardHeader>
              <CardTitle>Departamentos Involucrados</CardTitle>
              <CardDescription>Personal, horarios y presupuesto por departamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departamentos.map((dept, idx) => (
                  <div key={idx} className="border-l-4 p-4 rounded-r-lg bg-gray-50" style={{ borderColor: dept.color }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{dept.nombre}</h4>
                        <p className="text-sm text-gray-500">{dept.personal}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {dept.estado === 'confirmado' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        Confirmado
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1 mb-2">
                      <p className="text-gray-600">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {dept.horario}
                      </p>
                      <p className="text-gray-600">
                        <DollarSign className="h-3 w-3 inline mr-1" />
                        ${dept.presupuesto.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {dept.tareas.map((tarea, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-1">
                          <span>•</span>
                          <span>{tarea}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Presupuesto Detallado */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Presupuesto Total</CardTitle>
                <CardDescription>Desglose por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {departamentos.map((dept, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                        <span className="text-sm text-gray-700">{dept.nombre}</span>
                      </div>
                      <span className="font-semibold">${dept.presupuesto.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-gray-300 pt-3">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>TOTAL</span>
                    <span className="text-blue-600">${evento.presupuestoTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checklist Pre-Evento */}
            <Card>
              <CardHeader>
                <CardTitle>Checklist de Preparación</CardTitle>
                <CardDescription>
                  {checklist.filter((c) => c.completado).length} de {checklist.length} completados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {item.completado ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded flex-shrink-0" />
                      )}
                      <span className={item.completado ? 'text-gray-500 line-through' : 'text-gray-900'}>
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Requerimientos Técnicos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Requerimientos Técnicos Consolidados</CardTitle>
            <CardDescription>Equipamiento confirmado y reservado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {requerimientos.map((cat, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {cat.categoria}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contactos de Emergencia */}
        <Card>
          <CardHeader>
            <CardTitle>Contactos de Coordinación</CardTitle>
            <CardDescription>Responsables por departamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { dept: 'Operaciones', nombre: 'Juan Pérez', ext: '1234' },
                { dept: 'Producción AV', nombre: 'María García', ext: '5678' },
                { dept: 'Mantenimiento', nombre: 'Carlos López', ext: '9012' },
                { dept: 'Limpieza', nombre: 'Ana Martínez', ext: '3456' },
                { dept: 'Supervisión', nombre: 'Dr. Roberto Sánchez', ext: '7890' },
                { dept: 'Compras', nombre: 'Laura Hernández', ext: '2345' },
              ].map((contact, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{contact.dept}</p>
                  <p className="text-sm text-gray-600">{contact.nombre}</p>
                  <p className="text-xs text-gray-500">Ext. {contact.ext}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerta Importante */}
        <Card className="mt-8 border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Recordatorio Importante</h4>
                <p className="text-sm text-yellow-800">
                  Reunión de coordinación final: <strong>12 de junio a las 15:00</strong> con todos los departamentos
                  involucrados. Asistencia obligatoria.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
