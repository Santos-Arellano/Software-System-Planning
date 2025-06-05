# 🎯 Simulación Monte Carlo: Compra de Pantalón en Nueva York

## 📋 Descripción del Proyecto

Este proyecto implementa una simulación Monte Carlo para analizar la decisión de compra de un pantalón en cuatro tiendas diferentes de Nueva York. La simulación considera múltiples variables aleatorias como precio, disponibilidad, costo de transporte y satisfacción del cliente.

## 🎯 Objetivo

Determinar cuál tienda ofrece la mejor opción de compra considerando:
- Costo total (precio + transporte)
- Probabilidad de disponibilidad
- Nivel de satisfacción esperado

## 🏪 Tiendas Analizadas

### Tienda A
- **Precio**: Distribución Normal(40, 5)
- **Transporte**: $5 (fijo)
- **Disponibilidad**: 95%
- **Satisfacción**: Normal(4.5, 0.3)

### Tienda B
- **Precio**: Distribución Normal(45, 4)
- **Transporte**: $3 (fijo)
- **Disponibilidad**: 80%
- **Satisfacción**: Normal(4.0, 0.5)

### Tienda C
- **Precio**: Distribución Uniforme(35, 55)
- **Transporte**: $8 (fijo)
- **Disponibilidad**: 70%
- **Satisfacción**: Normal(3.8, 0.6)

### Tienda D (Nueva)
- **Precio**: Distribución Normal(38, 2)
- **Transporte**: $3 (fijo)
- **Disponibilidad**: 45%
- **Satisfacción**: Normal(4.2, 0.4)

## 🔧 Tecnologías Utilizadas

- **Python 3.x**
- **NumPy**: Para generación de números aleatorios y cálculos estadísticos
- **Matplotlib**: Para visualización de datos
- **Simulación Monte Carlo**: 10,000 iteraciones

## 📊 Metodología

1. **Generación de Variables Aleatorias**: Se generan 10,000 muestras para cada variable (precio, disponibilidad, satisfacción)
2. **Cálculo de Costos**: Se suma el precio simulado más el costo de transporte fijo
3. **Ajuste por Disponibilidad**: Solo se consideran los costos cuando el producto está disponible
4. **Análisis Estadístico**: Se calculan promedios, frecuencias y probabilidades
5. **Visualización**: Se generan gráficas comparativas para facilitar la interpretación

## 🎯 Resultados Principales

### Análisis de Costos
Los resultados de la simulación muestran los costos promedio cuando el producto está disponible en cada tienda:

![Resultados del Terminal](evidencias(capturas)/terminal.png)

### Visualizaciones
Las gráficas muestran la distribución de costos, comparaciones de disponibilidad y satisfacción:

![Gráficas de Análisis](evidencias(capturas)/graficas.png)

## 📈 Análisis de Resultados

### Conclusiones Clave:
1. **Menor Costo**: La tienda con el menor costo promedio
2. **Mayor Disponibilidad**: La tienda A tiene la mayor probabilidad de tener el producto
3. **Mejor Satisfacción**: Evaluación del nivel de satisfacción esperado
4. **Mejor Opción General**: Análisis integral considerando todos los factores

### Recomendación:
Basado en la simulación Monte Carlo con 10,000 iteraciones, se recomienda considerar múltiples factores:
- Si priorizas **disponibilidad**: Tienda A (95%)
- Si priorizas **costo bajo**: Evaluar tienda con menor costo promedio
- Si priorizas **balance**: Considerar tienda con mejor relación costo-disponibilidad-satisfacción

## 🚀 Cómo Ejecutar

### Prerrequisitos:
```bash
pip install numpy matplotlib
```

### Ejecución:
```bash
python pantalones_4_tiendas.py
```

## 📁 Estructura del Proyecto

```
Reto_simulacion_MonteCarlo/
├── pantalones_4_tiendas.py          # Código principal
├── evidencias(capturas)/
│   ├── terminal.png                 # Captura de resultados
│   └── graficas.png                 # Captura de gráficas
├── Elpi.py                         # Estimación de Pi (referencia)
└── README.md                       # Este archivo
```

## 🔍 Detalles Técnicos

### Variables Implementadas:
- **Precio**: Distribuciones Normal y Uniforme según cada tienda
- **Transporte**: Costos fijos por tienda
- **Disponibilidad**: Distribución Binomial (Bernoulli)
- **Satisfacción**: Distribución Normal con diferentes parámetros

### Métricas Calculadas:
- Costo promedio (cuando disponible)
- Probabilidad de disponibilidad
- Satisfacción promedio
- Frecuencia de mejor opción por escenario

## 📊 Interpretación de Gráficas

1. **Distribución de Costos**: Histograma superpuesto mostrando la variabilidad de costos
2. **Costos Promedio**: Comparación directa entre tiendas
3. **Disponibilidad**: Probabilidades de encontrar el producto
4. **Satisfacción**: Niveles esperados de satisfacción del cliente

## 🎓 Contexto Académico

Este proyecto forma parte del curso de **Administración de Proyectos**, específicamente del tema de **Simulación Monte Carlo**. Demuestra la aplicación práctica de métodos cuantitativos para la toma de decisiones bajo incertidumbre.

### Competencias Desarrolladas:
- Implementación de simulaciones Monte Carlo
- Análisis estadístico de variables aleatorias
- Visualización de datos
- Toma de decisiones basada en evidencia cuantitativa

## 👨‍💻 Autor

**Santos Alejandro Arellano Olarte**  
Curso: Administración de Proyectos  
Fecha: Junio 2025

## 📝 Notas Adicionales

- La simulación utiliza 10,000 iteraciones para garantizar precisión estadística
- Los resultados pueden variar ligeramente en cada ejecución debido a la naturaleza aleatoria
- El código incluye manejo de valores NaN para casos donde no hay disponibilidad
- Se implementan múltiples visualizaciones para facilitar la interpretación de resultados

---

*Este README documenta la implementación completa de la Simulación Monte Carlo para el análisis de decisión de compra, cumpliendo con los requerimientos del reto académico.*