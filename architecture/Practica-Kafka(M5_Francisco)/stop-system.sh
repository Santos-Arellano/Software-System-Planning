#!/bin/bash

echo "🛑 Deteniendo Sistema de Mensajería Kafka..."

# Detener procesos de Java (Spring Boot)
echo "🔴 Deteniendo Spring Boot..."
pkill -f "spring-boot:run"
pkill -f "kafka-messaging-system"

# Detener procesos de Node.js (React)
echo "🔴 Deteniendo React..."
pkill -f "react-scripts"
pkill -f "npm start"

# Detener contenedores Docker
echo "🔴 Deteniendo contenedores Docker..."
docker-compose down

# Limpiar procesos zombie si existen
echo "🧹 Limpiando procesos..."
sleep 2

# Verificar que los puertos estén libres
check_port_free() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Puerto $port todavía está en uso por $service - forzando cierre..."
        fuser -k $port/tcp 2>/dev/null
    else
        echo "✅ Puerto $port liberado"
    fi
}

check_port_free 3000 "React"
check_port_free 8081 "Spring Boot"
check_port_free 8080 "Kafka UI"
check_port_free 9092 "Kafka"
check_port_free 2181 "Zookeeper"

# Limpiar logs si se desea
read -p "¿Deseas limpiar los archivos de log? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Limpiando archivos de log..."
    rm -f spring-boot.log react.log
    echo "✅ Logs limpiados"
fi

echo ""
echo "✅ Sistema detenido completamente"
echo "   Para reiniciar, ejecuta: ./start-system.sh"