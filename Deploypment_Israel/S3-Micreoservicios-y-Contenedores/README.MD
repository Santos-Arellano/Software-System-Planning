# Microservicios para Cálculo de Áreas Geométricas

Este proyecto implementa tres microservicios en contenedores Docker para calcular áreas de figuras geométricas:
- Triángulo
- Cuadrado  
- Círculo

## Estructura de Archivos

```
.
├── triangle_service.py         # Microservicio para calcular área de triángulo
├── square_service.py           # Microservicio para calcular área de cuadrado
├── circle_service.py           # Microservicio para calcular área de círculo
├── requirements.txt            # Dependencias de Python
├── Dockerfile.triangle         # Dockerfile para el servicio de triángulo
├── Dockerfile.square           # Dockerfile para el servicio de cuadrado
├── Dockerfile.circle           # Dockerfile para el servicio de círculo
├── docker-compose.yml          # Configuración para orquestar los servicios
└── test_services.py            # Script para probar los servicios
```

## Requisitos

- Docker
- Docker Compose
- Python 3.x (para pruebas locales)

## Instrucciones de Uso

### 1. Preparación del Entorno

Asegúrate de que los archivos Dockerfile tengan los nombres correctos:

```bash
mv Dockerfile.triangle Dockerfile.triangle
mv Dockerfile.square Dockerfile.square
mv Dockerfile.circle Dockerfile.circle
```

### 2. Construir y Ejecutar los Servicios

```bash
docker-compose up --build
```

Este comando construirá las imágenes y ejecutará los tres servicios en segundo plano.

### 3. Probar los Servicios

Una vez que los servicios estén en ejecución, puedes probarlos con el script `test_services.py`:

```bash
python test_services.py
```

También puedes probar los servicios manualmente usando curl o Postman:

#### Triángulo
```bash
curl -X POST http://localhost:5001/area/triangle \
  -H "Content-Type: application/json" \
  -d '{"base": 5, "height": 8}'
```

#### Cuadrado
```bash
curl -X POST http://localhost:5002/area/square \
  -H "Content-Type: application/json" \
  -d '{"side": 6}'
```

#### Círculo
```bash
curl -X POST http://localhost:5003/area/circle \
  -H "Content-Type: application/json" \
  -d '{"radius": 4}'
```

### 4. Detener los Servicios

```bash
docker-compose down
```

## API Reference

### Servicio de Triángulo (Puerto 5001)

**POST /area/triangle**
- Recibe: `{"base": <número>, "height": <número>}`
- Devuelve: `{"shape": "triangle", "base": <número>, "height": <número>, "area": <número>}`

### Servicio de Cuadrado (Puerto 5002)

**POST /area/square**
- Recibe: `{"side": <número>}`
- Devuelve: `{"shape": "square", "side": <número>, "area": <número>}`

### Servicio de Círculo (Puerto 5003)

**POST /area/circle**
- Recibe: `{"radius": <número>}`
- Devuelve: `{"shape": "circle", "radius": <número>, "area": <número>}`

## Capturas de Pantalla

Para completar la entrega, ejecuta los servicios y captura las evidencias de su funcionamiento.