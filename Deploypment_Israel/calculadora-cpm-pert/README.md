# Calculadora CPM y PERT - Sistema de Autenticación Segura

## 📋 Descripción del Proyecto

Esta aplicación web interactiva implementa los métodos CPM (Critical Path Method) y PERT (Program Evaluation and Review Technique) para el análisis de un proyecto de desarrollo de sistema de autenticación segura. La herramienta permite visualizar y analizar la planificación del proyecto, identificar la ruta crítica y evaluar los riesgos asociados con la variabilidad de las actividades.

## 🎯 Objetivos

- **Análisis CPM**: Determinar la ruta crítica y los tiempos de holgura de cada actividad
- **Análisis PERT**: Evaluar la incertidumbre y variabilidad en las duraciones de las actividades
- **Visualización**: Presentar los resultados de manera clara y comprensible
- **Planificación**: Proporcionar insights para la gestión efectiva del proyecto

## 🏗️ Estructura del Proyecto

El proyecto analiza las siguientes actividades:

| Actividad | Descripción | Predecesoras | Optimista (O) | Más Probable (M) | Pesimista (P) |
|-----------|-------------|--------------|---------------|------------------|---------------|
| A | Análisis de requisitos de seguridad | - | 2 | 3 | 5 |
| B | Diseño del flujo de autenticación | A | 2 | 3 | 4 |
| C | Implementación del backend de autenticación | B | 3 | 5 | 8 |
| D | Configuración de la base de datos segura | A | 2 | 3 | 5 |
| E | Integración con proveedor de autenticación | B | 1 | 2 | 4 |
| F | Desarrollo de interfaz de login/registro | B | 2 | 3 | 5 |
| G | Pruebas de seguridad y revisión final | C, D, E, F | 3 | 4 | 6 |

## 📊 Resultados Principales

### Análisis CPM
- **Duración total del proyecto**: 12.33 días
- **Ruta crítica**: A → B → C → G
- **Actividades críticas**: 4 de 7 actividades (57%)
- **Actividades con holgura**: D, E, F

### Análisis PERT
- **Actividad con mayor variabilidad**: C (Implementación del backend)
- **Actividad con menor variabilidad**: B (Diseño del flujo)
- **Nivel de incertidumbre**: Medio a alto en actividades técnicas

## 🔧 Funcionalidades

### 1. Cálculos Automáticos
- **Tiempos CPM**: ES, EF, LS, LF para cada actividad
- **Holguras**: Tiempo disponible sin afectar el proyecto
- **Duración PERT**: Cálculo usando la fórmula (O + 4M + P) / 6
- **Varianza PERT**: Medida de incertidumbre por actividad

### 2. Visualización de Datos
- **Tabla de resultados**: Vista completa de todos los cálculos
- **Identificación visual**: Actividades críticas resaltadas en rojo
- **Métricas del proyecto**: Resumen ejecutivo con indicadores clave
- **Análisis de riesgos**: Evaluación de variabilidad por actividad

### 3. Insights y Recomendaciones
- Identificación de actividades críticas
- Evaluación de riesgos por variabilidad
- Recomendaciones para la gestión del proyecto
- Análisis de oportunidades de paralelización

## 📈 Interpretación de Resultados

### Ruta Crítica (A → B → C → G)
Estas actividades no pueden retrasarse sin afectar la duración total del proyecto:
- **A**: Análisis de requisitos (base fundamental)
- **B**: Diseño del flujo (arquitectura central)
- **C**: Implementación del backend (componente crítico)
- **G**: Pruebas finales (validación integral)

### Actividades con Holgura
- **D**: Configuración de BD (2.67 días de holgura)
- **E**: Integración con proveedor (4.33 días de holgura)
- **F**: Desarrollo de interfaz (2.67 días de holgura)

### Análisis de Riesgos PERT
- **Alta incertidumbre**: Actividad C (σ = 0.83)
- **Media incertidumbre**: Actividades A, D, F
- **Baja incertidumbre**: Actividades B, E, G

## 🎯 Recomendaciones de Gestión

### Enfoque en la Ruta Crítica
1. **Asignar los mejores recursos** a las actividades A, B, C y G
2. **Monitoreo continuo** del progreso de actividades críticas
3. **Planes de contingencia** para actividades con alta variabilidad

### Optimización de Recursos
1. **Paralelizar actividades no críticas** (D, E, F pueden ejecutarse simultáneamente)
2. **Reasignar recursos** de actividades con holgura a actividades críticas si es necesario
3. **Buffer de tiempo** especialmente para la actividad C (mayor variabilidad)

### Gestión de Riesgos
1. **Actividad C**: Considerar descomposición en subtareas más pequeñas
2. **Revisiones frecuentes** durante la implementación del backend
3. **Preparar recursos adicionales** para actividades con alta incertidumbre

## 🛠️ Tecnologías Utilizadas

- **React**: Framework de interfaz de usuario
- **Tailwind CSS**: Estilo y diseño responsivo
- **Lucide React**: Iconografía
- **JavaScript**: Lógica de cálculos CPM y PERT

## 📚 Referencias Metodológicas

### Método CPM
- **ES (Earliest Start)**: Tiempo más temprano para iniciar
- **EF (Earliest Finish)**: ES + Duración de la actividad
- **LF (Latest Finish)**: Tiempo más tardío sin afectar el proyecto
- **LS (Latest Start)**: LF - Duración de la actividad
- **Holgura**: LF - EF

### Método PERT
- **Duración esperada**: (O + 4M + P) / 6
- **Varianza**: ((P - O) / 6)²
- **Desviación estándar**: √Varianza

## 📝 Conclusiones

El análisis CPM y PERT del proyecto de sistema de autenticación segura revela un proyecto con una estructura de dependencias bien definida pero con poco margen de maniobra. La identificación de la ruta crítica (A → B → C → G) y el análisis de variabilidad PERT proporcionan las bases para una gestión efectiva del proyecto, permitiendo enfocar recursos en las actividades más críticas y gestionar proactivamente los riesgos identificados.

La duración estimada de 12.33 días es realista considerando las dependencias entre actividades y la variabilidad inherente en las tareas de desarrollo de software, especialmente en componentes de seguridad que requieren mayor atención al detalle y pruebas exhaustivas.