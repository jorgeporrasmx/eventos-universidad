# Sistema de Gestión de Eventos y Producción Audiovisual

## 🎯 Resumen Ejecutivo

Sistema integral para coordinar, aprobar y ejecutar eventos institucionales y producciones audiovisuales con control presupuestario automático y justificación de impacto obligatoria.

## 📋 Logros Principales del Sistema

### 1. **Centralización y Control**
- ✅ **Un solo punto de entrada** para todas las solicitudes de eventos y producciones
- ✅ **Visibilidad completa** del pipeline de eventos para administradores
- ✅ **Historial centralizado** de todas las solicitudes y sus estados
- ✅ **Trazabilidad total** de decisiones y aprobaciones

### 2. **Justificación Obligatoria**
- ✅ **Análisis de impacto requerido** para cada solicitud
- ✅ **Métricas cuantificables**: alcance, asistentes, ingresos esperados
- ✅ **Clasificación de impacto**: Marketing, Ingresos Externos, o Ambos
- ✅ **Mínimo 100 caracteres** de justificación detallada

### 3. **Cotización Automática**
- ✅ **Cálculo automático** basado en:
  - Personal necesario (horas × tarifa/hora por departamento)
  - Equipamiento requerido
  - Materiales consumibles
- ✅ **Presupuesto transparente** antes de aprobar
- ✅ **Análisis costo-beneficio** automático
- ✅ **6 departamentos con tarifas predefinidas**:
  - Mantenimiento: $150/hora
  - Limpieza: $100/hora
  - Supervisión Académica: $200/hora
  - Operaciones: $180/hora
  - Producción Audiovisual: $300/hora
  - Compras: $150/hora

### 4. **Dos Flujos Diferenciados**

#### **EVENTOS** (Presenciales)
- Ubicación física obligatoria
- Número de asistentes
- Horarios de inicio/fin
- Duración estimada
- Requerimientos técnicos
- **Múltiples departamentos** pueden participar

#### **PRODUCCIÓN AUDIOVISUAL**
- Tipo de entregable (Video, Fotos, Streaming, etc.)
- Plazo de entrega
- Duración del material
- Locaciones de grabación
- Plataforma de publicación
- Fechas de publicación
- **Solo Producción Audiovisual** participa

### 5. **Análisis Costo-Beneficio Automático**
```
Ratio = Costo Total / Impacto Esperado

Si Ratio > 2.0 → Requiere aprobación especial
Si Ratio ≤ 2.0 → Aprobación recomendada
```

### 6. **Estados del Sistema**
El sistema rastrea cada solicitud a través de 12 estados diferentes:
1. Borrador
2. Pendiente Aprobación Concepto
3. Concepto Rechazado
4. En Definición Requerimientos
5. Cotización Generada
6. Pendiente Confirmación Solicitante
7. Requiere Aprobación Especial
8. Aprobación Especial Rechazada
9. Aprobado
10. En Ejecución
11. Completado
12. Cancelado

## 🔄 Flujo del Sistema Completo

### Fase 1: Solicitud
```
SOLICITANTE crea solicitud
├── Selecciona: Evento o Producción Audiovisual
├── Completa información básica
├── Justifica impacto (obligatorio, mín. 100 caracteres)
├── Define impacto esperado (número)
└── Selecciona departamentos (automático para producciones)
```

### Fase 2: Aprobación Inicial
```
ADMINISTRADOR revisa solicitud
├── Lee justificación de impacto
├── Evalúa viabilidad
├── Aprueba o Rechaza con comentarios
└── Si aprueba → Pasa a Definición de Requerimientos
```

### Fase 3: Definición de Requerimientos
```
DEPARTAMENTOS ASIGNADOS definen necesidades
├── Personal requerido (rol, cantidad, horas)
├── Equipos necesarios (de catálogo predefinido)
├── Materiales consumibles
└── Observaciones especiales
```

### Fase 4: Cotización Automática
```
SISTEMA calcula costos
├── Costo personal = Σ(horas × tarifa/hora por departamento)
├── Costo equipos = Σ(equipos × tarifa/uso)
├── Costo materiales = Σ(materiales × precio)
├── Costo Total = Suma de todos los costos
├── Ratio Costo-Beneficio = Costo Total / Impacto Esperado
└── Genera recomendación de aprobación
```

### Fase 5: Confirmación y Aprobación Final
```
SI Ratio ≤ 2.0:
  └── SOLICITANTE confirma cotización → Evento APROBADO

SI Ratio > 2.0:
  ├── Requiere APROBACIÓN ESPECIAL
  └── Autoridad superior revisa y decide
```

### Fase 6: Ejecución (PRÓXIMAMENTE - Ver FLUJO-APROBACION.md)
```
EVENTO APROBADO
├── Se envía a cada DEPARTAMENTO para aceptación
├── Cada departamento bloquea fechas en su calendario
├── Sistema coordina horarios y recursos
└── Se genera vista operativa completa del evento
```

## 💡 Beneficios Clave

### Para la Institución:
1. **Control presupuestario** antes de comprometer recursos
2. **Justificación documentada** de cada evento
3. **Transparencia total** en costos y decisiones
4. **Priorización basada en impacto** medible

### Para Solicitantes:
1. **Proceso claro y predecible**
2. **Visibilidad del estado** en tiempo real
3. **Retroalimentación inmediata** sobre viabilidad
4. **Cotización automática** sin esperas

### Para Departamentos:
1. **Planificación anticipada** de recursos
2. **Bloqueo de calendarios** coordinado
3. **Claridad en requerimientos** desde el inicio
4. **Evita sobrecarga** de trabajo

### Para Administradores:
1. **Vista global** de todos los eventos
2. **Métricas consolidadas** de presupuestos
3. **Identificación rápida** de eventos que requieren atención
4. **Reportes automáticos** de costos e impactos

## 📊 Métricas del Sistema

El sistema proporciona dashboards con:
- Total de solicitudes por estado
- Presupuesto total estimado
- Costo promedio por evento
- Ratio costo-beneficio promedio
- Departamento más activo
- Tipo de evento más frecuente
- Próximos eventos en calendario

## 🔐 Seguridad y Validación

- ✅ Todos los campos obligatorios validados
- ✅ Justificación mínima de 100 caracteres
- ✅ Impacto esperado debe ser > 0
- ✅ Al menos 1 departamento requerido (eventos)
- ✅ Fechas validadas
- ✅ Prevención de duplicados por ID único
- ✅ Persistencia en localStorage (demo)

## 🚀 Tecnología

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS v4
- **State Management**: Zustand con persistencia
- **UI Components**: Radix UI
- **Validación**: Validación en tiempo real
- **Motor de Cotización**: Cálculos automáticos basados en configuración

## 📈 Próximos Pasos

Ver `FLUJO-APROBACION.md` para detalles sobre:
- Aceptación departamental
- Bloqueo de calendarios
- Vista operativa de eventos aprobados
- Coordinación de horarios por departamento
