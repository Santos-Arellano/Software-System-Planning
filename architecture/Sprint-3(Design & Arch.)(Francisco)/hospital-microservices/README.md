# Sistema Hospitalario Microservicios

## Arquitectura
Este sistema implementa una arquitectura de microservicios con:
- API Gateway (Puerto 8084)
- Servicio de Pacientes (Puerto 8081)
- Servicio de Citas (Puerto 8082)
- Servicio de Alertas (Puerto 8083)

## Seguridad
- Autenticación mediante Keycloak (Puerto 8080)
- JWT para la comunicación entre servicios
- Roles implementados: ROLE_ADMIN, ROLE_DOCTOR, ROLE_PACIENTE

## Tecnologías Utilizadas
- Spring Boot para los microservicios
- Kafka para comunicación asíncrona entre servicios
- PostgreSQL como base de datos
- Keycloak para gestión de identidad y acceso
- Docker y Docker Compose para contenerización

## Configuración
1. Iniciar servicios:
```bash
docker-compose up -d
```

2. Verificar el estado de los servicios:
```bash
./check-services.sh
```

### 1. Configuración de Keycloak

1. **Acceder a Keycloak**:
   - Asegúrate de que los servicios estén corriendo
   - Abre tu navegador y accede a: http://localhost:8080
   - Credenciales iniciales:
     * Usuario: admin
     * Contraseña: admin

2. **Crear Realm "hospital"**:
   - Click en "Create Realm" (botón superior izquierdo)
   - Nombre: hospital
   - Enabled: ON
   - Click en "Create"

3. **Configurar Cliente**:
   - Ve a "Clients" → "Create client"
   - Client ID: gateway-service
   - Client Protocol: openid-connect
   - Click "Next"
   - Client authentication: ON
   - Authorization: ON
   - Click "Save"
   - En la pestaña Settings:
     * Access Type: confidential
     * Valid Redirect URIs: http://localhost:*/*
     * Web Origins: +

4. **Crear Roles**:
   - Ve a "Roles" → "Create role"
   - Crea los siguientes roles:
     * ROLE_ADMIN
     * ROLE_DOCTOR
     * ROLE_PACIENTE

5. **Crear Usuario Admin**:
   - Ve a "Users" → "Add user"
   - Username: admin
   - Email: admin@hospital.com
   - First Name: Admin
   - Last Name: Hospital
   - Click "Save"
   - En la pestaña Credentials:
     * Set Password: admin123
     * Temporary: OFF
   - En Role Mappings:
     * Añade ROLE_ADMIN

### 2. Pruebas de JWT

1. **Obtener Token**:
```bash
curl -X POST http://localhost:8080/realms/hospital/protocol/openid-connect/token \
  -d "client_id=gateway-service" \
  -d "client_secret=TU_CLIENT_SECRET" \
  -d "grant_type=password" \
  -d "username=admin" \
  -d "password=admin123"
```
Nota: Reemplaza TU_CLIENT_SECRET con el secreto que encuentras en la pestaña Credentials del cliente gateway-service.

2. **Probar Endpoints Protegidos**:
```bash
curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8081/api/pacientes
```

```bash
curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8082/api/citas
```

```bash
curl -H "Authorization: Bearer TU_TOKEN" http://localhost:8083/api/alertas
```

## Estructura del Proyecto
- **api-gateway**: Punto de entrada único para todos los microservicios
- **microservice-pacientes**: Gestión de pacientes (interno, seguro)
- **microservice-citas**: Agendamiento de citas (uso público limitado)
- **microservice-alertas**: Sistema de alertas médicas (reactivo a eventos)
- **keycloak**: Servidor de autenticación y autorización

## Diagrama de Despliegue


## Guía para Completar la Actividad

### 1. Preparación del Entorno
1. Clona este repositorio
2. Asegúrate de tener Docker y Docker Compose instalados
3. Ejecuta `docker-compose up -d` para iniciar todos los servicios
4. Verifica que todos los servicios estén funcionando con `./check-services.sh`

### 2. Configuración de Keycloak
Sigue los pasos detallados en la sección "Configuración de Keycloak" de este README.

### 3. Pruebas de Integración
1. Obtén un token JWT siguiendo las instrucciones de la sección "Pruebas de JWT"
2. Prueba los endpoints de cada microservicio usando el token obtenido
3. Verifica la comunicación entre microservicios a través de Kafka

### 4. Preparación del Video (3-5 minutos)
Prepara un video corto mostrando:
- Inicio de servicios con Docker Compose
- Configuración de Keycloak
- Obtención de un token JWT
- Acceso a endpoints protegidos
- Comunicación entre servicios
- Generación de alertas

### 5. Documentación (PDF)
Prepara un documento PDF con:
- Portada
- Diagrama de despliegue UML
- Explicación técnica de las decisiones tomadas
- Evidencias de pruebas con JWT
- Capturas de pantalla relevantes
- Conclusiones

Puntos clave a documentar:
- Flujo de autenticación
- Comunicación entre servicios
- Manejo de eventos con Kafka
- Estrategias de seguridad implementadas

### 6. Entregables Finales
- Código fuente en repositorio GitHub
- Documento PDF con la documentación completa
- Video de demostración (3-5 minutos)

## Notas Importantes
- Asegúrate de que todos los servicios estén correctamente configurados antes de realizar las pruebas
- Documenta cualquier problema encontrado y su solución
- Incluye capturas de pantalla de las pruebas exitosas en la documentación
- El video debe mostrar claramente el flujo completo del sistema

        






