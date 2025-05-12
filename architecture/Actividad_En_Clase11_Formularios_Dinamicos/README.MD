# Formularios Dinámicos con Spring Boot, React y Firebase

## Descripción del Proyecto

Este proyecto implementa un sistema de formularios dinámicos que se generan según el tipo de usuario (Admin o Guest) utilizando el patrón de diseño Abstract Factory. El backend está construido con Spring Boot, que proporciona los datos de configuración de formularios almacenados en Firebase, y el frontend está desarrollado con React para mostrar los formularios correspondientes.

## Características Principales

- **Formularios dinámicos**: Diferentes formularios según el rol del usuario
- **Patrón Abstract Factory**: Implementación del patrón de diseño para la creación de formularios
- **Integración con Firebase**: Almacenamiento de configuración de formularios en la nube
- **API REST**: Comunicación entre el frontend y backend mediante endpoints REST
- **Interfaz Reactiva**: Formularios interactivos con validación en tiempo real

## Arquitectura del Sistema

### Patrón de Diseño Abstract Factory

El proyecto utiliza el patrón Abstract Factory para crear diferentes tipos de formularios basados en el rol del usuario:
- `FormularioFactory`: Interfaz abstracta que define el método para crear formularios
- `AdminFormularioFactory`: Implementación concreta para usuarios administradores
- `GuestFormularioFactory`: Implementación concreta para usuarios invitados

### Diagrama de Componentes

```
Frontend (React)  Backend (Spring Boot)  Firebase
   |                           |
   |                           |
  UI                      Abstract Factory
```

## Tecnologías Utilizadas

### Backend
- Java 11
- Spring Boot 2.7.5
- Lombok
- Firebase Admin SDK 9.1.1

### Frontend
- React 18
- Axios
- Bootstrap (para estilos)

### Base de Datos
- Firebase Firestore

## Requisitos Previos

- JDK 11 o superior
- Node.js 14 o superior
- Maven 3.6 o superior
- Cuenta en Firebase
- Git

## Instalación y Configuración

### Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Configura Firestore Database:
   - En el panel izquierdo, selecciona "Firestore Database"
   - Crea una base de datos en modo producción o prueba
3. Crea la colección "formularios" con dos documentos:
   - **Documento para administradores:**
     ```json
     {
       "tipoUsuario": "admin",
       "campos": [
         {
           "id": "admin_nombre",
           "tipo": "text",
           "etiqueta": "Nombre completo del administrador",
           "placeholder": "Ingrese nombre completo",
           "requerido": true,
           "opciones": null
         },
         {
           "id": "admin_departamento",
           "tipo": "select",
           "etiqueta": "Departamento",
           "placeholder": "Seleccione departamento",
           "requerido": true,
           "opciones": ["IT", "RRHH", "Finanzas", "Marketing", "Operaciones"]
         },
         {
           "id": "admin_nivel_acceso",
           "tipo": "radio",
           "etiqueta": "Nivel de acceso",
           "placeholder": "",
           "requerido": true,
           "opciones": ["Básico", "Intermedio", "Avanzado", "Total"]
         }
       ]
     }
     ```
   - **Documento para invitados:**
     ```json
     {
       "tipoUsuario": "guest",
       "campos": [
         {
           "id": "guest_nombre",
           "tipo": "text",
           "etiqueta": "Nombre",
           "placeholder": "Ingrese su nombre",
           "requerido": true,
           "opciones": null
         },
         {
           "id": "guest_email",
           "tipo": "email",
           "etiqueta": "Correo electrónico",
           "placeholder": "ejemplo@correo.com",
           "requerido": true,
           "opciones": null
         },
         {
           "id": "guest_comentario",
           "tipo": "textarea",
           "etiqueta": "Comentario",
           "placeholder": "Deje su comentario aquí",
           "requerido": false,
           "opciones": null
         }
       ]
     }
     ```
4. Genera una clave privada para la API:
   - Ve a Configuración del proyecto > Cuentas de servicio
   - Selecciona "Generar nueva clave privada"
   - Descarga el archivo JSON generado

### Backend (Spring Boot)

1. Clona el repositorio
   ```bash
   git clone https://github.com/tu-usuario/formularios-dinamicos.git
   cd formularios-dinamicos/backend
   ```

2. Coloca el archivo de credenciales de Firebase:
   - Renombra el archivo JSON descargado a `firebase-service-account.json`
   - Guárdalo en `src/main/resources/`

3. Compila e inicia el backend
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

El servidor estará disponible en: http://localhost:8080

### Frontend (React)

1. Navega a la carpeta del frontend
   ```bash
   cd ../frontend
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

3. Configura el proxy al backend (en package.json)
   ```json
   "proxy": "http://localhost:8080"
   ```

4. Inicia la aplicación React
   ```bash
   npm start
   ```

El frontend estará disponible en: http://localhost:3000

## Estructura del Proyecto

```
formularios-dinamicos/
├── backend/
│   ├── src/main/java/com/example/
│   │   ├── FormulariosApplication.java
│   │   ├── controller/
│   │   │   └── FormularioController.java
│   │   ├── model/
│   │   │   ├── Campo.java
│   │   │   └── Formulario.java
│   │   ├── factory/
│   │   │   ├── FormularioFactory.java
│   │   │   ├── AdminFormularioFactory.java
│   │   │   └── GuestFormularioFactory.java
│   │   ├── service/
│   │   │   ├── FormularioService.java
│   │   │   └── FirebaseService.java
│   │   └── config/
│   │       └── FirebaseConfig.java
│   └── src/main/resources/
│       ├── application.properties
│       └── firebase-service-account.json
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── FormularioDinamico.js
        │   ├── CampoFormulario.js
        │   ├── AdminForm.js
        │   └── GuestForm.js
        ├── services/
        │   └── api.js
        ├── App.js
        └── index.js
```

## Uso Básico

1. Inicia ambas aplicaciones (backend y frontend)
2. Abre la aplicación en tu navegador: http://localhost:3000
3. Selecciona el tipo de usuario (Administrador o Invitado)
4. El sistema cargará dinámicamente el formulario correspondiente
5. Completa el formulario y envíalo

## Solución de Problemas Comunes

### Error: Connection Refused

Si encuentras el error `ERR_CONNECTION_REFUSED` al intentar conectarte al backend:

1. Verifica que el servidor Spring Boot esté ejecutándose
   ```bash
   curl http://localhost:8080
   ```
2. Comprueba si el puerto 8080 está siendo utilizado por otro proceso
   ```bash
   netstat -ano | findstr :8080  # Windows
   lsof -i :8080  # Mac/Linux
   ```
3. Si es necesario, cambia el puerto en `application.properties`
   ```properties
   server.port=8081
   ```
   Y actualiza la configuración en el frontend.

### Errores con Lombok

Si los getters y setters no se generan correctamente:

1. Asegúrate de tener las importaciones adecuadas:
   ```java
   import lombok.Data;
   import lombok.NoArgsConstructor;
   import lombok.AllArgsConstructor;
   ```

2. Configura el procesador de anotaciones en el pom.xml:
   ```xml
   
       org.apache.maven.plugins
       maven-compiler-plugin
       
           
               
                   org.projectlombok
                   lombok
                   1.18.36
               
           
       
   
   ```

3. Asegúrate de tener el plugin de Lombok instalado en tu IDE

### Problemas con Firebase

1. Verifica que el archivo de credenciales esté correctamente ubicado
2. Comprueba que la estructura de datos en Firestore coincida con la esperada
3. Asegúrate de tener conexión a internet para acceder a Firebase

## Contribución

Si deseas contribuir al proyecto, puedes:

1. Fork del repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin nueva-funcionalidad`)
5. Crear un nuevo Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

---

Desarrollado para la actividad M5 Design & Architecture por [Santos Arellano]