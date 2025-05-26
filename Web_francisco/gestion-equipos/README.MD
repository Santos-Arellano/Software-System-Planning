# Gestión de Equipos

Sistema de gestión de equipos y trabajadores desarrollado con **Spring Boot**, **GraphQL**, y **H2 Database**. Permite crear, actualizar, eliminar y consultar equipos de trabajo y sus trabajadores asociados mediante una API GraphQL.

## Tabla de Contenidos
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Uso de la API GraphQL](#uso-de-la-api-graphql)
  - [Consultas](#consultas)
  - [Mutaciones](#mutaciones)
  - [Ejemplos](#ejemplos)
- [Base de Datos](#base-de-datos)
- [Notas](#notas)
- [Solución de Problemas](#solución-de-problemas)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Descripción
La aplicación permite gestionar equipos de trabajo y sus trabajadores. Cada equipo tiene un nombre, proyecto, líder, fecha de creación, descripción y una lista de trabajadores. Los trabajadores están asociados a un equipo y tienen nombre, apellido, rol, y correo electrónico. La API GraphQL soporta operaciones CRUD para ambos recursos.

## Tecnologías
- **Spring Boot**: Framework para aplicaciones Java.
- **GraphQL**: API para consultas flexibles.
- **Spring Data JPA**: Persistencia con Hibernate.
- **H2 Database**: Base de datos en memoria para desarrollo.
- **Maven**: Gestión de dependencias y compilación.
- **Java 17**: Lenguaje de programación.

## Requisitos Previos
- **Java 17** (JDK instalado).
- **Maven** (versión 3.8+ recomendada).
- **Git** (para clonar el repositorio).
- Conexión a internet para descargar dependencias.

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Software-System-Planning/Web_francisco.git
   cd Web_francisco/gestion-equipos
   ```

2. Verifica que `pom.xml` incluye las dependencias necesarias:
   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-graphql</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-data-jpa</artifactId>
       </dependency>
       <dependency>
           <groupId>com.h2database</groupId>
           <artifactId>h2</artifactId>
           <scope>runtime</scope>
       </dependency>
       <!-- Otras dependencias -->
   </dependencies>
   ```

3. Asegúrate de tener Java 17 configurado:
   ```bash
   java -version
   ```

## Ejecución
1. Compila y empaqueta la aplicación:
   ```bash
   mvn clean package
   ```

2. Ejecuta la aplicación:
   ```bash
   mvn spring-boot:run
   ```

3. Accede a la API GraphQL en:
   ```
   http://localhost:8080/graphql
   ```

4. (Opcional) Accede a la consola H2 para inspeccionar la base de datos:
   ```
   http://localhost:8080/h2-console
   ```
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **Usuario**: `sa`
   - **Contraseña**: (vacía)

## Uso de la API GraphQL
La API GraphQL está definida en `src/main/resources/graphql/schema.graphqls`. Usa herramientas como **curl**, **Postman**, o **GraphiQL** para interactuar con la API.

### Consultas
- **Listar todos los equipos**:
  ```graphql
  query {
    equipos {
      id
      nombre
      proyecto
      lider
      fechaCreacion
      descripcion
      trabajadores {
        id
        nombre
        apellido
        email
        rol
      }
    }
  }
  ```

- **Obtener un equipo por ID**:
  ```graphql
  query {
    equipo(id: "1") {
      id
      nombre
      proyecto
      lider
      fechaCreacion
      descripcion
      trabajadores {
        id
        nombre
        apellido
        email
        rol
      }
    }
  }
  ```

- **Listar todos los trabajadores**:
  ```graphql
  query {
    trabajadores {
      id
      nombre
      apellido
      email
      rol
      equipo {
        id
        nombre
      }
    }
  }
  ```

- **Obtener un trabajador por ID**:
  ```graphql
  query {
    trabajador(id: "1") {
      id
      nombre
      apellido
      email
      rol
      equipo {
        id
        nombre
      }
    }
  }
  ```

- **Listar trabajadores por equipo**:
  ```graphql
  query {
    trabajadoresPorEquipo(equipoId: "1") {
      id
      nombre
      apellido
      email
      rol
    }
  }
  ```

### Mutaciones
- **Crear un equipo**:
  ```graphql
  mutation {
    crearEquipo(input: {
      nombre: "Equipo QA"
      proyecto: "Testing Automatizado"
      lider: "Laura García"
      fechaCreacion: "2024-05-25"
      descripcion: "Equipo de calidad"
    }) {
      id
      nombre
      proyecto
      lider
      fechaCreacion
      descripcion
    }
  }
  ```

- **Actualizar un equipo**:
  ```graphql
  mutation {
    actualizarEquipo(id: "1", input: {
      nombre: "Equipo QA Actualizado"
      proyecto: "Testing Automatizado"
      lider: "Laura García"
      fechaCreacion: "2024-05-25"
      descripcion: "Equipo de calidad mejorado"
    }) {
      id
      nombre
      proyecto
      lider
      fechaCreacion
      descripcion
    }
  }
  ```

- **Eliminar un equipo**:
  ```graphql
  mutation {
    eliminarEquipo(id: "1")
  }
  ```

- **Crear un trabajador**:
  ```graphql
  mutation {
    crearTrabajador(input: {
      nombre: "Sofía"
      apellido: "Martínez"
      email: "sofia.martinez@example.com"
      rol: "Desarrollador"
      equipoId: "1"
    }) {
      id
      nombre
      apellido
      email
      rol
    }
  }
  ```

- **Actualizar un trabajador**:
  ```graphql
  mutation {
    actualizarTrabajador(id: "1", input: {
      nombre: "Sofía"
      apellido: "Martínez"
      email: "sofia.martinez@example.com"
      rol: "Desarrollador Senior"
      equipoId: "1"
    }) {
      id
      nombre
      apellido
      email
      rol
    }
  }
  ```

- **Eliminar un trabajador**:
  ```graphql
  mutation {
    eliminarTrabajador(id: "1")
  }
  ```

### Ejemplos
Usa `curl` para probar la API. Ejemplo para listar equipos:

```bash
curl -X POST http://localhost:8080/graphql \
-H "Content-Type: application/json" \
-d '{"query":"query { equipos { id nombre proyecto lider fechaCreacion descripcion trabajadores { id nombre apellido email rol } } }"}'
```

Ejemplo para crear un equipo:

```bash
curl -X POST http://localhost:8080/graphql \
-H "Content-Type: application/json" \
-d '{"query":"mutation { crearEquipo(input: { nombre: \"Equipo QA\", proyecto: \"Testing Automatizado\", lider: \"Laura García\", fechaCreacion: \"2024-05-25\", descripcion: \"Equipo de calidad\" }) { id nombre proyecto lider fechaCreacion descripcion } }"}'
```

## Base de Datos
- **H2 Database**: Base de datos en memoria, reiniciada en cada ejecución (`spring.jpa.hibernate.ddl-auto=create-drop`).
- **Tablas**:
  - `EQUIPOS_TRABAJO`: Almacena equipos (id, nombre, proyecto, lider, fecha_creacion, descripcion).
  - `TRABAJADORES`: Almacena trabajadores (id, nombre, apellido, rol, email, equipo_id).
- **Datos Iniciales**: La clase `DataLoader` inserta dos equipos y tres trabajadores al iniciar la aplicación.

Consulta la base de datos en la consola H2:

```sql
SELECT * FROM EQUIPOS_TRABAJO;
SELECT * FROM TRABAJADORES;
```

## Notas
- **Resolución de `LazyInitializationException`**: Se corrigió usando `fetch = FetchType.EAGER` con `@Fetch(FetchMode.JOIN)` en `EquipoDeTrabajo.trabajadores` y consultas `LEFT JOIN FETCH` en `EquipoDeTrabajoRepository` (`findAllWithTrabajadores` y `findByIdWithTrabajadores`).
- **Resolución de Errores de Compilación**: Se agregó la clase `ResourceNotFoundException` en `com.ejemplo.gestionequipos.exception` para corregir referencias faltantes en `QueryResolver`.
- **Configuración**: `spring.jpa.open-in-view=false` asegura que no haya sesiones abiertas fuera de las transacciones, mejorando el manejo de sesiones Hibernate.
- **Datos Iniciales**: La aplicación carga datos de ejemplo al iniciar (ver `DataLoader.java`).

## Solución de Problemas
- **Error: `LazyInitializationException`**:
  - Verifica que `EquipoDeTrabajo` usa `fetch = FetchType.EAGER` y `@Fetch(FetchMode.JOIN)`.
  - Asegúrate de que `EquipoDeTrabajoService` usa `findAllWithTrabajadores` y `findByIdWithTrabajadores`.
  - Habilita logging de SQL:
    ```bash
    mvn spring-boot:run -Dspring-boot.run.arguments=--logging.level.org.hibernate.SQL=DEBUG,--logging.level.org.hibernate.orm.jdbc.bind=TRACE
    ```

- **Error: Compilation Failure**:
  - Confirma que `ResourceNotFoundException.java` existe en `src/main/java/com/ejemplo/gestionequipos/exception`.
  - Limpia y recompila:
    ```bash
    mvn clean package
    ```

- **Error: No Data in Queries**:
  - Verifica la base de datos en `http://localhost:8080/h2-console`.
  - Asegúrate de que `DataLoader` se ejecuta correctamente (comprueba logs).

- **Error: GraphQL Query Fails**:
  - Valida la sintaxis en `schema.graphqls`.
  - Usa herramientas como GraphiQL (`http://localhost:8080/graphiql`) para depurar.

## Contribuir
1. Haz un fork del repositorio.
2. Crea una rama para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Sube los cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un Pull Request en GitHub.

## Licencia
Este proyecto está bajo la [Licencia MIT](LICENSE). Consulta el archivo `LICENSE` para más detalles.