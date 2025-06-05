# Calculadora de Área de Triángulo con Pytest y GitHub Actions

[![Python Tests](https://github.com/TU_USUARIO/area-triangulo-pytest/workflows/Python%20Tests/badge.svg)](https://github.com/TU_USUARIO/area-triangulo-pytest/actions)

## 📋 Descripción
Este proyecto implementa una calculadora para el área de triángulos con pruebas automatizadas usando pytest y GitHub Actions.

## 🎯 Objetivo Académico
Proyecto desarrollado para el **Caso #100** - Automatización de aplicaciones en Python con GitHub Actions y pytest del Instituto Tecnológico y de Estudios Superiores de Monterrey, Campus Guadalajara.

## 🚀 Funcionalidades
- Cálculo del área de un triángulo usando la fórmula: `(base × altura) / 2`
- Validación de entrada para evitar valores negativos
- Validación para evitar base igual a cero
- Pruebas automatizadas con pytest
- Integración continua con GitHub Actions

## 📁 Estructura del Proyecto
```
area-triangulo-pytest/
├── area_triangulo.py          # Función principal para calcular área
├── test_area_triangulo.py     # Casos de prueba automatizados
├── requirements.txt           # Dependencias del proyecto
├── README.md                  # Este archivo
└── .github/
    └── workflows/
        └── python-tests.yaml  # Configuración de GitHub Actions
```

## 🧪 Casos de Prueba Implementados
1. ✅ **Cálculo correcto**: Base=5, Altura=7 → Área=17.5
2. ✅ **Validación base negativa**: No acepta valores negativos para la base
3. ✅ **Validación altura negativa**: No acepta valores negativos para la altura
4. ✅ **Validación base cero**: No acepta base igual a cero

## 🛠️ Instalación y Uso Local

### Prerrequisitos
- Python 3.11 o superior
- pip (gestor de paquetes de Python)

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/area-triangulo-pytest.git
cd area-triangulo-pytest

# Instalar dependencias
pip install -r requirements.txt
```

### Ejecutar las Pruebas
```bash
# Ejecutar todas las pruebas
pytest

# Ejecutar con información detallada
pytest -v

# Ejecutar con cobertura de código
pytest --cov=area_triangulo
```

## 🔄 Automatización con GitHub Actions
Este proyecto incluye integración continua que:
- Se ejecuta automáticamente en cada `push` o `pull request`
- Prueba el código en Ubuntu con Python 3.11
- Ejecuta todas las pruebas con pytest
- Reporta el estado de las pruebas

## 📊 Uso de la Función
```python
from area_triangulo import calcular_area_triangulo

# Ejemplo de uso correcto
area = calcular_area_triangulo(5, 7)  # Retorna 17.5

# Ejemplos que lanzan excepciones
calcular_area_triangulo(-5, 7)    # ValueError: La base debe ser mayor que cero
calcular_area_triangulo(5, -7)    # ValueError: La altura no puede ser negativa
calcular_area_triangulo(0, 7)     # ValueError: La base debe ser mayor que cero
```

## 🎓 Información Académica
- **Curso**: Desarrollo y Deployment de Aplicaciones
- **Caso**: #100 - Automatización con GitHub Actions y pytest
- **Institución**: Tecnológico de Monterrey, Campus Guadalajara
- **Módulo**: Deployment y Automatización

## 👤 Autor
[Tu Nombre] - [Tu Email/GitHub]

## 📄 Licencia
Este proyecto es de uso académico para el Tecnológico de Monterrey.

---

### Paso 4: Actualizar en GitHub
```bash
# Agregar todos los cambios
git add .

# Hacer commit con la corrección
git commit -m "Fix: Mover archivos a la raíz y agregar README"

# Subir los cambios
git push origin main
```

### Paso 5: Verificar GitHub Actions
1. Ve a tu repositorio en GitHub
2. Espera 1-2 minutos después del push
3. Ve a la pestaña **"Actions"**
4. Deberías ver un workflow ejecutándose o completado
5. Si hay errores, haz clic en el workflow para ver los detalles

## 🔍 Verificación Final
Tu estructura final debe verse así en GitHub:
```
📁 area-triangulo-pytest
├── 📄 README.md
├── 📄 area_triangulo.py
├── 📄 test_area_triangulo.py
├── 📄 requirements.txt
└── 📁 .github
    └── 📁 workflows
        └── 📄 python-tests.yaml
```

## ⚠️ Si Todavía No Funciona
Si después de estos pasos GitHub Actions sigue sin aparecer:

1. **Verifica que el archivo YAML esté bien formateado**
2. **Asegúrate de que el push se haya completado**
3. **Revisa la pestaña Actions después de 2-3 minutos**
4. **Verifica que la rama sea "main" (no "master")**

## 📝 Para tu Entrega
1. **Enlace del repositorio**: `https://github.com/TU_USUARIO/area-triangulo-pytest`
2. **Screenshot**: Captura de pantalla de GitHub Actions mostrando las pruebas pasando
3. **Archivos**: Los 4 archivos principales + README.md