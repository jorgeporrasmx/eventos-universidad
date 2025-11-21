# Gestión de Eventos y Producción Audiovisual

Sistema de coordinación de eventos y producciones audiovisuales con cotización automática y flujo de aprobaciones.

## 🎯 Características Principales

### Flujo del Sistema

1. **Solicitud** - Crear solicitud de evento o producción audiovisual
2. **Justificación Obligatoria** - Demostrar impacto en marketing o ingresos externos
3. **Revisión y Aprobación** - El administrador revisa y aprueba/rechaza
4. **Cotización Automática** - El sistema calcula costos basándose en:
   - Personal necesario (horas × tarifa/hora)
   - Equipamiento requerido
   - Materiales consumibles
5. **Análisis Costo-Beneficio** - Compara costo total vs impacto esperado
6. **Ejecución** - Evento aprobado entra a calendario

### 2 Roles del Sistema

#### 1. Solicitante
- Crear solicitudes de eventos y producciones
- Dashboard con todas sus solicitudes
- Ver estados y comentarios
- Seguimiento de aprobaciones

#### 2. Administrador
- Vista global de todas las solicitudes
- Aprobar o rechazar solicitudes
- Dashboard con métricas del sistema
- Estadísticas financieras
- Calendario de eventos

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS v4
- **Componentes UI**: Radix UI
- **State Management**: Zustand
- **Persistencia**: localStorage
- **Iconos**: Lucide React

### Estructura del Proyecto

```
eventos-universidad/
├── app/
│   ├── page.tsx           # Selector de rol
│   ├── layout.tsx         # Layout principal
│   ├── solicitante/       # Vista solicitante
│   └── admin/             # Vista admin
├── components/ui/         # Componentes UI
├── lib/
│   ├── types.ts          # Definiciones TypeScript
│   ├── utils.ts          # Utilidades
│   ├── store.ts          # Zustand store
│   ├── cotizador.ts      # Engine de cotización
│   ├── mockData.ts       # Datos de prueba
│   └── config/
│       └── departamentos.ts   # Config de departamentos
```

## 📊 Modelo de Datos

### Departamentos del Sistema

1. **Mantenimiento** ($150/hora) - Instalaciones y montaje
2. **Limpieza** ($100/hora) - Limpieza del evento
3. **Supervisión Académica** ($200/hora) - Validación de contenido
4. **Operaciones** ($180/hora) - Logística general
5. **Producción Audiovisual** ($300/hora) - Cobertura y producción
6. **Compras** ($150/hora) - Gestión de proveedores y pagos

### Estados de Solicitud

- `pendiente_aprobacion_concepto` - Esperando aprobación
- `aprobado` - Aprobado y listo para ejecutar
- `concepto_rechazado` - Rechazado por el administrador
- `en_ejecucion` - Evento en progreso
- `completado` - Finalizado
- `cancelado` - Cancelado

## 💰 Sistema de Cotización

### Cálculo Automático

```
Costo por Departamento =
  (Personal: horas × tarifa/hora) +
  (Equipos: cantidad × tarifa/uso) +
  (Materiales: items × precio)

Costo Total = Σ(costos de departamentos)
```

### Análisis Costo-Beneficio

```
Ratio = Costo Total / Impacto Esperado

Si Ratio > 2.0 → Requiere análisis adicional
Si Ratio ≤ 2.0 → Aprobación recomendada
```

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sistema estará disponible en: `http://localhost:3000`

### Usuarios de Prueba

El sistema incluye 2 usuarios:

1. **Solicitante** (Departamento: Marketing)
2. **Administrador** (Vista global)

### Datos de Prueba

5 solicitudes de ejemplo:

1. **Ceremonia de Graduación 2025** - Aprobado ($45,000)
2. **Video Promocional Nuevo Campus** - En definición ($12,000)
3. **Conferencia Internacional de Tecnología** - Pendiente aprobación
4. **Taller de Innovación** - Rechazado
5. **Open Day - Jornada de Puertas Abiertas** - Completado ($8,500)

## 🔄 Flujo de Uso

1. Selecciona un rol (Solicitante o Administrador)
2. **Como Solicitante:**
   - Ver todas tus solicitudes
   - Ver estados y comentarios
   - Crear nueva solicitud (próximamente)
3. **Como Administrador:**
   - Ver solicitudes pendientes de aprobación
   - Leer justificación de impacto
   - Aprobar o rechazar con comentarios
   - Ver métricas financieras
   - Ver calendario de eventos próximos

## 🎨 Personalización

### Modificar Tarifas

Editar `lib/config/departamentos.ts`:

```typescript
mantenimiento: {
  tarifaPersonalPorHora: 150, // Modificar aquí
  equipos: [/* ... */]
}
```

### Cambiar Umbral Costo-Beneficio

Editar `lib/config/departamentos.ts`:

```typescript
export const RATIO_COSTO_BENEFICIO_THRESHOLD = 2.0
```

## 💡 Ventajas del Sistema

1. **Centralización** - Toda la información en un solo lugar
2. **Transparencia** - Todos ven el estado y avances
3. **Justificación Obligatoria** - Análisis de impacto en cada solicitud
4. **Cotización Automática** - Cálculo sin intervención manual
5. **Trazabilidad** - Historial completo de decisiones

## 🛠️ Comandos

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Producción
npm start

# Linting
npm run lint
```

## 📝 Notas

- Los datos se almacenan en localStorage
- Los cálculos son automáticos basados en tarifas configurables
- El sistema es un prototipo funcional

## 📄 Licencia

Proyecto de demostración para fines educativos.
