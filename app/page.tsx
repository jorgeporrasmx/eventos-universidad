'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { USUARIOS_MOCK } from '@/lib/mockData'
import { useStore } from '@/lib/store'
import { User, Settings } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const setUsuarioActual = useStore((state) => state.setUsuarioActual)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roleInfo = {
    solicitante: {
      title: 'Solicitante',
      description: 'Crear y gestionar solicitudes de eventos y producciones',
      icon: User,
      color: 'bg-blue-500',
      user: USUARIOS_MOCK.find((u) => u.rol === 'solicitante')!,
      route: '/solicitante',
    },
    admin: {
      title: 'Administrador',
      description: 'Vista global, aprobaciones y gestión completa del sistema',
      icon: Settings,
      color: 'bg-orange-500',
      user: USUARIOS_MOCK.find((u) => u.rol === 'admin')!,
      route: '/admin',
    },
  }

  const handleSelectRole = (role: keyof typeof roleInfo) => {
    const info = roleInfo[role]
    setSelectedRole(role)
    setUsuarioActual(info.user)

    // Redirigir al dashboard correspondiente
    setTimeout(() => {
      router.push(info.route)
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Gestión de Eventos y Producción Audiovisual
          </h1>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {Object.entries(roleInfo).map(([role, info]) => {
            const Icon = info.icon
            const isSelected = selectedRole === role

            return (
              <Card
                key={role}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-gray-900 shadow-xl' : ''
                }`}
                onClick={() => handleSelectRole(role as keyof typeof roleInfo)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${info.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.user.departamentoId && (
                      <p className="text-sm text-gray-600">
                        {info.user.departamentoId}
                      </p>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {isSelected ? 'Cargando...' : 'Acceder'}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700">
                <strong>Flujo del Sistema:</strong>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Solicitud → Revisión y Aprobación por Admin → Evento Aprobado → Ejecución
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
