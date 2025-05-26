# Actividades 6, 7 y 8 de Playwright

Este repositorio contiene las soluciones para las actividades 6, 7 y 8 del curso de Calidad de Software. Las actividades consisten en pruebas automatizadas usando Playwright para validar el comportamiento de tres páginas web: `login.html`, `dynamic-form.html` y `counter.html`.

## Estructura del Proyecto

- **/auto-retrying/counter.html**: Página web para la Actividad 8, que implementa un contador con un retraso simulado.
- **/dynamic-form/dynamic-form.html**: Página web para la Actividad 7, que implementa un formulario dinámico con un flujo interactivo.
- **/test-isolation/login.html**: Página web para la Actividad 6, que simula un sistema de login con almacenamiento en localStorage.
- **/tests/**: Carpeta que contiene los archivos de pruebas de Playwright:
  - `activity6.spec.ts`: Pruebas para `login.html`, verificando el login y el estado inicial.
  - `activity7.spec.ts`: Pruebas para `dynamic-form.html`, validando el flujo completo del formulario.
  - `activity8.spec.ts`: Pruebas para `counter.html`, verificando la funcionalidad del contador.
- **/node_modules/**: Dependencias de Node.js (no incluidas en el repositorio, ver `.gitignore`).
- **/playwright-report/**: Reportes generados por Playwright (no incluidos en el repositorio).
- **package.json**: Configuración del proyecto y dependencias.
- **.gitignore**: Archivo que especifica qué archivos/directorios ignorar en Git.

## Requisitos

- **Node.js**: Versión 14 o superior.
- **Playwright**: Instalado como dependencia (`@playwright/test`).
- Navegadores soportados por Playwright (Chromium, Firefox, WebKit), instalados automáticamente con `npx playwright install`.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/santosa/Software-System-Planning.git
   cd Software-System-Planning/Software_QualityPepe/Playwright6-8
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala los navegadores de Playwright:
   ```bash
   npx playwright install
   ```

## Ejecución de las Pruebas

1. Asegúrate de que los archivos HTML (counter.html, dynamic-form.html, login.html) estén en las carpetas correspondientes.

2. Ejecuta todas las pruebas:
   ```bash
   npx playwright test
   ```

3. Para ejecutar una actividad específica, usa:
   ```bash
   npx playwright test tests/activity6.spec.ts
   npx playwright test tests/activity7.spec.ts
   npx playwright test tests/activity8.spec.ts
   ```

4. Para ver un reporte detallado de las pruebas:
   ```bash
   npx playwright show-report
   ```

## Detalles de las Actividades

### Actividad 6 (activity6.spec.ts):
- Prueba 1: Inicia sesión haciendo clic en el botón "Login" y verifica que el texto sea "Logged in as admin". Luego, comprueba que localStorage contenga el usuario "admin".
- Prueba 2: Verifica que el estado inicial sea "Not logged in" al cargar la página.

### Actividad 7 (activity7.spec.ts):
Valida el flujo completo del formulario dinámico en dynamic-form.html usando locadores con auto-espera (sin waitForTimeout). Incluye iniciar el formulario, ingresar un nombre, activar el botón "Next", mostrar el cargador y seleccionar una opción.

### Actividad 8 (activity8.spec.ts):
Verifica la funcionalidad del contador en counter.html, esperando que el estado inicial sea "Ready", el contador comience en 0 y se incremente correctamente al hacer clic en el botón "Count".

## Notas

- Los tests usan rutas absolutas para cargar los archivos HTML (file://). Asegúrate de que las rutas en los archivos .spec.ts coincidan con la ubicación de los archivos HTML en tu sistema.
- Los tests cumplen con los requisitos de no usar waitForTimeout, utilizando locadores con auto-espera como getByRole, getByPlaceholder y getByTestId.
