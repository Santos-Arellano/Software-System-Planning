# Sistema Hospitalario Basado en Microservicios
## Sprint 5 - Diseño y Arquitectura

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Kafka](https://img.shields.io/badge/Apache%20Kafka-3.0-blue.svg)](https://kafka.apache.org/)
[![Keycloak](https://img.shields.io/badge/Keycloak-22.0-red.svg)](https://www.keycloak.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://docs.docker.com/compose/)

Sistema hospitalario distribuido implementado con arquitectura de microservicios, comunicación asíncrona mediante Apache Kafka, seguridad OAuth2/JWT y visualización UML.

![Diagrama de Arquitectura](/Users/santosa/Documents/GitHub/Software-System-Planning/architecture/Sprint-3(Design & Arch.)(Francisco)/hospital-microservices/Evidencia_video/Diagrama.png)
## 📋 Tabla de Contenidos

#Link del video : https://youtu.be/qXft_czbriA
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Microservicios](#microservicios)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Sistema](#ejecución-del-sistema)
- [Configuración de Seguridad](#configuración-de-seguridad)
- [Pruebas del Sistema](#pruebas-del-sistema)
- [Comunicación con Kafka](#comunicación-con-kafka)
- [Documentación API](#documentación-api)
- [Diagrama UML de Despliegue](#diagrama-uml-de-despliegue)
- [Entregables](#entregables)
- [Troubleshooting](#troubleshooting)

## 🏗️ Arquitectura del Sistema

El sistema implementa una arquitectura de microservicios distribuida con los siguientes componentes:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Gateway   │    │    Keycloak      │    │     Kafka       │
│   Puerto 8084   │    │   Puerto 8080    │    │   Puerto 9092   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
    ┌─────────────────────────────┼─────────────────────────────┐
    │                             │                             │
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ Pacientes   │          │    Citas    │           │   Alertas   │
│Puerto 8081  │          │Puerto 8082  │           │Puerto 8083  │
└─────────────┘          └─────────────┘           └─────────────┘
    │                         │                         │
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│PostgreSQL   │          │PostgreSQL   │           │PostgreSQL   │
│DB Pacientes │          │  DB Citas   │           │ DB Alertas  │
└─────────────┘          └─────────────┘           └─────────────┘
```

## 🔧 Microservicios

### 1. Microservicio de Gestión de Pacientes (Puerto 8081)
- **Función**: Gestión CRUD de pacientes (interno, seguro)
- **Roles permitidos**: `ROLE_ADMIN`
- **Base de datos**: PostgreSQL (hospital_pacientes)
- **Kafka**: Publica eventos en `pacientes-topic`

### 2. Microservicio de Agendamiento de Citas (Puerto 8082)
- **Función**: Gestión de citas médicas (uso público limitado)
- **Roles permitidos**: `ROLE_ADMIN`, `ROLE_DOCTOR`, `ROLE_PACIENTE`
- **Base de datos**: PostgreSQL (hospital_citas)
- **Kafka**: Publica eventos en `citas-topic`

### 3. Microservicio de Alertas Médicas (Puerto 8083)
- **Función**: Sistema reactivo de alertas (reactivo a eventos)
- **Roles permitidos**: Todos los usuarios autenticados
- **Base de datos**: PostgreSQL (hospital_alertas)
- **Kafka**: Consume eventos de `pacientes-topic` y `citas-topic`

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Spring Boot | 3.1+ | Framework principal de microservicios |
| Spring Security | 6.1+ | Integración con OAuth2/JWT |
| Spring Data JPA | 3.1+ | Persistencia de datos |
| Apache Kafka | 3.0+ | Comunicación asíncrona |
| Keycloak | 22.0+ | Servidor de autenticación OAuth2 |
| PostgreSQL | 15+ | Base de datos |
| Docker Compose | 3.8+ | Orquestación de contenedores |
| Maven | 3.9+ | Gestión de dependencias |

## 📋 Requisitos Previos

- **Java 17** o superior
- **Maven 3.9+**
- **Docker** y **Docker Compose**
- **Git**
- Al menos **8GB de RAM** disponible
- Puertos disponibles: 8080-8084, 9092, 5432

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/sistema-hospitalario-microservicios.git
cd sistema-hospitalario-microservicios
```

### 2. Configurar Variables de Entorno
```bash
cp .env.example .env
# Editar .env con tus configuraciones específicas
```

### 3. Iniciar Servicios de Infraestructura
```bash
# Iniciar PostgreSQL, Kafka y Keycloak
docker-compose up -d postgresql kafka keycloak

# Verificar que los servicios estén listos
./scripts/check-services.sh
```

### 4. Construir Microservicios
```bash
# Construir todos los microservicios
mvn clean install

# O construir individualmente
cd microservice-pacientes && mvn clean install && cd ..
cd microservice-citas && mvn clean install && cd ..
cd microservice-alertas && mvn clean install && cd ..
cd api-gateway && mvn clean install && cd ..
```

## ▶️ Ejecución del Sistema

### Opción 1: Usando Docker Compose (Recomendado)
```bash
# Iniciar todo el sistema
docker-compose up -d

# Ver logs
docker-compose logs -f

# Verificar estado
./scripts/health-check.sh
```

### Opción 2: Ejecución Local
```bash
# Terminal 1 - API Gateway
cd api-gateway
mvn spring-boot:run

# Terminal 2 - Microservicio Pacientes
cd microservice-pacientes
mvn spring-boot:run

# Terminal 3 - Microservicio Citas
cd microservice-citas
mvn spring-boot:run

# Terminal 4 - Microservicio Alertas
cd microservice-alertas
mvn spring-boot:run
```

## 🔐 Configuración de Seguridad

### 1. Configuración de Keycloak

1. **Acceder a Keycloak Admin Console**:
   ```
   URL: http://localhost:8080
   Usuario: admin
   Contraseña: admin
   ```

2. **Crear Realm "hospital"**:
   ```bash
   # Usando la interfaz web o CLI
   curl -X POST http://localhost:8080/admin/realms \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"realm":"hospital","enabled":true}'
   ```

3. **Configurar Cliente**:
   - Client ID: `gateway-service`
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`
   - Valid Redirect URIs: `http://localhost:*/*`

4. **Crear Roles del Sistema**:
   ```
   - ROLE_ADMIN: Acceso completo al sistema
   - ROLE_DOCTOR: Gestión de citas y consulta de pacientes
   - ROLE_PACIENTE: Consulta y gestión de sus propias citas
   ```

5. **Crear Usuarios de Prueba**:
   ```bash
   # Admin
   Usuario: admin
   Contraseña: admin123
   Roles: ROLE_ADMIN
   
   # Doctor
   Usuario: doctor
   Contraseña: doctor123
   Roles: ROLE_DOCTOR
   
   # Paciente
   Usuario: paciente
   Contraseña: paciente123
   Roles: ROLE_PACIENTE
   ```

### 2. Configuración JWT

Cada microservicio valida JWT tokens automáticamente. La configuración se encuentra en:
```yaml
# application.yml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/hospital
```

## 🧪 Pruebas del Sistema

### 1. Obtener Token JWT

```bash
# Para Admin
curl -X POST "http://localhost:8080/realms/hospital/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=gateway-service" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "grant_type=password" \
  -d "username=admin" \
  -d "password=admin123"

# Guardar el access_token de la respuesta
export ADMIN_TOKEN="eyJhbGciOiJSUzI1NiIs..."
```

### 2. Probar Microservicio de Pacientes

```bash
# Crear paciente (solo ADMIN)
curl -X POST "http://localhost:8081/api/pacientes" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellido": "Pérez García",
    "dni": "12345678A",
    "email": "juan.perez@email.com",
    "telefono": "+34 600 123 456",
    "fechaNacimiento": "1990-05-15"
  }'

# Listar pacientes
curl -X GET "http://localhost:8081/api/pacientes" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Obtener paciente por ID
curl -X GET "http://localhost:8081/api/pacientes/1" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### 3. Probar Microservicio de Citas

```bash
# Crear cita
curl -X POST "http://localhost:8082/api/citas" \
  -H "Authorization: Bearer $DOCTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pacienteId": 1,
    "medicoId": 1,
    "fechaHora": "2024-06-15T10:30:00",
    "motivo": "Consulta general",
    "estado": "PROGRAMADA"
  }'

# Listar citas
curl -X GET "http://localhost:8082/api/citas" \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
```

### 4. Probar Microservicio de Alertas

```bash
# Listar alertas generadas
curl -X GET "http://localhost:8083/api/alertas" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Crear alerta manual
curl -X POST "http://localhost:8083/api/alertas" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "EMERGENCIA",
    "mensaje": "Paciente requiere atención inmediata",
    "pacienteId": 1,
    "prioridad": "ALTA"
  }'
```

### 5. Probar API Gateway

```bash
# Todas las peticiones a través del gateway
curl -X GET "http://localhost:8084/pacientes/api/pacientes" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

curl -X GET "http://localhost:8084/citas/api/citas" \
  -H "Authorization: Bearer $DOCTOR_TOKEN"

curl -X GET "http://localhost:8084/alertas/api/alertas" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## 📨 Comunicación con Kafka

### Topics Configurados

| Topic | Productor | Consumidor | Propósito |
|-------|-----------|------------|-----------|
| `pacientes-topic` | Pacientes Service | Alertas Service | Eventos de pacientes |
| `citas-topic` | Citas Service | Alertas Service | Eventos de citas |
| `alertas-topic` | Alertas Service | - | Notificaciones de alertas |

### Verificar Mensajes Kafka

```bash
# Listar topics
docker exec -it kafka kafka-topics.sh --list --bootstrap-server localhost:9092

# Consumir mensajes de un topic
docker exec -it kafka kafka-console-consumer.sh \
  --topic pacientes-topic \
  --from-beginning \
  --bootstrap-server localhost:9092

# Producir mensaje de prueba
docker exec -it kafka kafka-console-producer.sh \
  --topic pacientes-topic \
  --bootstrap-server localhost:9092
```

### Estructura de Mensajes

```json
// Evento de Paciente
{
  "eventType": "PACIENTE_CREADO",
  "timestamp": "2024-06-15T10:30:00Z",
  "paciente": {
    "id": 1,
    "nombre": "Juan Carlos",
    "apellido": "Pérez García",
    "dni": "12345678A"
  }
}

// Evento de Cita
{
  "eventType": "CITA_PROGRAMADA",
  "timestamp": "2024-06-15T10:30:00Z",
  "cita": {
    "id": 1,
    "pacienteId": 1,
    "medicoId": 1,
    "fechaHora": "2024-06-15T10:30:00",
    "estado": "PROGRAMADA"
  }
}
```

## 📚 Documentación API

### Endpoints Principales

#### Microservicio Pacientes (`/api/pacientes`)
| Método | Endpoint | Rol Requerido | Descripción |
|--------|----------|---------------|-------------|
| GET | `/api/pacientes` | ADMIN | Listar todos los pacientes |
| GET | `/api/pacientes/{id}` | ADMIN | Obtener paciente por ID |
| POST | `/api/pacientes` | ADMIN | Crear nuevo paciente |
| PUT | `/api/pacientes/{id}` | ADMIN | Actualizar paciente |
| DELETE | `/api/pacientes/{id}` | ADMIN | Eliminar paciente |

#### Microservicio Citas (`/api/citas`)
| Método | Endpoint | Rol Requerido | Descripción |
|--------|----------|---------------|-------------|
| GET | `/api/citas` | ADMIN, DOCTOR, PACIENTE | Listar citas |
| GET | `/api/citas/{id}` | ADMIN, DOCTOR, PACIENTE | Obtener cita por ID |
| POST | `/api/citas` | ADMIN, DOCTOR | Crear nueva cita |
| PUT | `/api/citas/{id}` | ADMIN, DOCTOR | Actualizar cita |
| DELETE | `/api/citas/{id}` | ADMIN | Cancelar cita |

#### Microservicio Alertas (`/api/alertas`)
| Método | Endpoint | Rol Requerido | Descripción |
|--------|----------|---------------|-------------|
| GET | `/api/alertas` | Todos | Listar alertas |
| GET | `/api/alertas/{id}` | Todos | Obtener alerta por ID |
| POST | `/api/alertas` | ADMIN, DOCTOR | Crear alerta manual |
| PUT | `/api/alertas/{id}/estado` | ADMIN, DOCTOR | Actualizar estado |

## 🏗️ Diagrama UML de Despliegue

```
<<deployment diagram>>

┌─────────────────────────────────────────────────────────────────┐
│                          Servidor Principal                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │API Gateway  │    │  Keycloak   │    │   Kafka     │         │
│  │:8084        │    │  :8080      │    │  :9092      │         │
│  │             │    │             │    │             │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                   │                   │              │
│         │                   │                   │              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │Pacientes    │    │   Citas     │    │  Alertas    │         │
│  │Service      │    │  Service    │    │  Service    │         │
│  │:8081        │    │  :8082      │    │  :8083      │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                   │                   │              │
├─────────────────────────────────────────────────────────────────┤
│                     Capa de Datos                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │PostgreSQL   │    │PostgreSQL   │    │PostgreSQL   │         │
│  │DB Pacientes │    │  DB Citas   │    │ DB Alertas  │         │
│  │:5432        │    │  :5433      │    │  :5434      │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
└─────────────────────────────────────────────────────────────────┘

<<protocols>>
- HTTP/HTTPS: Comunicación cliente-servidor
- TCP/IP: Comunicación de red
- OAuth2/JWT: Autenticación y autorización
- Kafka Protocol: Mensajería asíncrona
- JDBC: Conexión a base de datos
```

## 📦 Entregables

### 1. Código Fuente
- ✅ Repositorio GitHub con código completo
- ✅ Dockerfile para cada microservicio
- ✅ Docker Compose para orquestación
- ✅ Scripts de configuración y verificación

### 2. Documento PDF
Debe incluir:
- ✅ Portada con información del proyecto
- ✅ Diagrama UML de despliegue
- ✅ Explicación técnica de decisiones arquitectónicas
- ✅ Evidencias de pruebas JWT y Kafka
- ✅ Capturas de pantalla de funcionamiento
- ✅ Análisis de seguridad implementada
- ✅ Conclusiones y lecciones aprendidas

### 3. Video Demostración (3-5 minutos)
Contenido requerido:
- ✅ Inicio del sistema con Docker Compose
- ✅ Configuración de Keycloak
- ✅ Obtención y uso de tokens JWT
- ✅ Creación de pacientes, citas y alertas
- ✅ Verificación de comunicación Kafka
- ✅ Demostración de roles y permisos

## 🔧 Troubleshooting

### Problemas Comunes

#### 1. Servicios no inician correctamente
```bash
# Verificar logs
docker-compose logs -f [servicio]

# Reiniciar servicios
docker-compose restart

# Limpiar y reiniciar
docker-compose down
docker-compose up -d
```

#### 2. Error de conexión a Keycloak
```bash
# Verificar que Keycloak esté listo
curl http://localhost:8080/realms/hospital

# Esperar a que el servicio esté completamente iniciado
./scripts/wait-for-keycloak.sh
```

#### 3. Problemas con Kafka
```bash
# Verificar temas de Kafka
docker exec kafka kafka-topics.sh --list --bootstrap-server localhost:9092

# Recrear temas si es necesario
./scripts/recreate-kafka-topics.sh
```

#### 4. Error de JWT token
```bash
# Verificar configuración del realm
curl http://localhost:8080/realms/hospital/.well-known/openid_configuration

# Verificar que el token no haya expirado
# Los tokens JWT tienen un tiempo de vida limitado
```

### Scripts Útiles

```bash
# Verificar estado de todos los servicios
./scripts/health-check.sh

# Configurar Keycloak automáticamente
./scripts/setup-keycloak.sh

# Cargar datos de prueba
./scripts/load-test-data.sh

# Limpiar y resetear el sistema
./scripts/reset-system.sh
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.


---

**Nota**: Este proyecto fue desarrollado como parte del Sprint 5 de la materia Diseño y Arquitectura. Para cualquier duda o sugerencia, por favor crear un issue en el repositorio.