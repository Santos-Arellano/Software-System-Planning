# Bot con Historial

Este proyecto implementa un bot simple que almacena preguntas de usuarios en un historial persistente usando Docker y volúmenes.

## Requisitos previos

- Docker
- Docker Compose

## Instrucciones de uso

### Método 1: Usando docker-compose

1. Construir la imagen:
```bash
docker-compose build
```

2. Ejecutar el bot con una pregunta:
```bash
docker-compose run --rm bot <usuario> <pregunta>
```

Ejemplo:
```bash
docker-compose run --rm bot Juan "¿Cómo estás hoy?"
```

### Método 2: Usando el script de shell

1. Construir la imagen:
```bash
docker build -t bot-app .
```

2. Dar permisos de ejecución al script:
```bash
chmod +x run_bot.sh
```

3. Ejecutar el bot:
```bash
./run_bot.sh <usuario> <pregunta>
```

Ejemplo:
```bash
./run_bot.sh María "¿Cuál es la capital de Francia?"
```

## Verificar el historial

Para ver el contenido del historial almacenado en el volumen:

```bash
docker run --rm -v bot_history:/app/history alpine cat /app/history/questions_history.txt
```

## Estructura del proyecto

- `app.py`: Aplicación Python que recibe un usuario y una pregunta
- `Dockerfile`: Instrucciones para construir la imagen Docker
- `docker-compose.yml`: Configuración de Docker Compose
- `run_bot.sh`: Script de shell para ejecutar fácilmente el bot