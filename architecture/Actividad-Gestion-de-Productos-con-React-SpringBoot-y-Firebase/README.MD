# Gestión de Productos

Una aplicación full-stack para gestionar productos, desarrollada con React, Spring Boot y Firebase.

## Descripción

Esta aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una lista de productos. Cada producto tiene tres atributos: nombre, stock y precio. La aplicación cuenta con un frontend desarrollado en React y un backend en Spring Boot que se conecta a Firebase para el almacenamiento de datos.

## Características

- Listado de productos en una tabla
- Agregar nuevos productos mediante un modal
- Editar productos existentes
- Eliminar productos
- Navegación entre páginas con React Router

## Tecnologías utilizadas

### Frontend
- React.js
- React Bootstrap para componentes de UI
- React Router para navegación
- Axios para peticiones HTTP

### Backend
- Spring Boot
- Spring Web para servicios REST
- Lombok para reducir el código boilerplate
- Firebase Admin SDK para la conexión con Firebase

### Base de datos
- Firebase (Firestore)

## Estructura del proyecto

### Frontend
```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductModal.jsx
│   │   └── ProductTable.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── ProductsPage.jsx
│   ├── services/
│   │   └── ProductService.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── package.json
└── firebase.config.js
```

### Backend
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/example/gestionproductos/
│   │   │   ├── controller/
│   │   │   │   └── ProductoController.java
│   │   │   ├── model/
│   │   │   │   └── Producto.java
│   │   │   ├── service/
│   │   │   │   ├── ProductoService.java
│   │   │   │   └── ProductoServiceImpl.java
│   │   │   ├── config/
│   │   │   │   ├── FirebaseConfig.java
│   │   │   │   └── WebConfig.java
│   │   │   └── GestionProductosApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── firebase-config.json
│   └── test/java/com/example/gestionproductos/
│       └── GestionProductosApplicationTests.java
└── pom.xml
```

## Requisitos previos

Para ejecutar este proyecto necesitas tener instalado:

- Java JDK 17 o superior
- Maven
- Node.js y npm
- Una cuenta en Firebase

## Configuración

### Configuración de Firebase

1. Crea un nuevo proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activa Firestore Database en tu proyecto
3. Ve a la configuración del proyecto y selecciona "Cuentas de servicio"
4. Genera una nueva clave privada (se descargará un archivo JSON)
5. Reemplaza el contenido del archivo `backend/src/main/resources/firebase-config.json` con el contenido del archivo JSON descargado
6. En el frontend, configura el archivo `firebase.config.js` con los datos de tu proyecto de Firebase:

```javascript
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-messenger-id",
  appId: "tu-app-id",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com"
};

export default firebaseConfig;
```

## Instalación y ejecución

### Backend

1. Navega a la carpeta `backend`
2. Ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   mvn clean install
   ```
3. Inicia el servidor:
   ```bash
   mvn spring-boot:run
   ```
   El servidor se iniciará en el puerto 8080.

### Frontend

1. Navega a la carpeta `frontend`
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```
   La aplicación se iniciará en el puerto 3000.

4. Abre tu navegador y accede a `http://localhost:3000`

## Endpoints de la API

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/productos | Obtener todos los productos |
| GET | /api/productos/{id} | Obtener un producto por ID |
| POST | /api/productos | Crear un nuevo producto |
| PUT | /api/productos/{id} | Actualizar un producto existente |
| DELETE | /api/productos/{id} | Eliminar un producto |

## Estructura de datos

Cada producto tiene la siguiente estructura:

```json
{
  "id": "string",
  "nombre": "string",
  "stock": number,
  "precio": number
}
```

## Capturas de pantalla

(Incluir capturas de pantalla de la aplicación cuando esté disponible)

## Próximas mejoras

- Implementar autenticación de usuarios
- Agregar filtros y búsqueda en la tabla de productos
- Implementar paginación para grandes volúmenes de datos
- Mejorar el diseño responsive
- Agregar categorías para los productos

## Contribuir

Si deseas contribuir a este proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

