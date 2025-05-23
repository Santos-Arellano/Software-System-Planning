#!/bin/bash

echo "🚀 Iniciando Sistema de Mensajería Kafka..."

# Función para verificar si un puerto está ocupado
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Puerto $port ya está en uso por $service"
        return 1
    fi
    return 0
}

# Verificar puertos necesarios
echo "🔍 Verificando puertos disponibles..."
check_port 2181 "Zookeeper" || exit 1
check_port 9092 "Kafka" || exit 1
check_port 8080 "Kafka UI" || exit 1
check_port 8081 "Spring Boot" || exit 1
check_port 3000 "React" || exit 1

# Paso 1: Iniciar Docker Compose
echo "📦 Iniciando contenedores Docker (Zookeeper, Kafka, Kafka UI)..."
docker-compose up -d

# Esperar a que Kafka esté listo
echo "⏳ Esperando a que Kafka esté listo..."
sleep 30

# Paso 2: Crear tópicos
echo "📝 Creando tópicos con 2 particiones cada uno..."
docker exec kafka kafka-topics --create --topic topico1 --bootstrap-server localhost:9092 --partitions 2 --replication-factor 1 2>/dev/null || echo "Tópico topico1 ya existe"
docker exec kafka kafka-topics --create --topic topico2 --bootstrap-server localhost:9092 --partitions 2 --replication-factor 1 2>/dev/null || echo "Tópico topico2 ya existe"
docker exec kafka kafka-topics --create --topic topico3 --bootstrap-server localhost:9092 --partitions 2 --replication-factor 1 2>/dev/null || echo "Tópico topico3 ya existe"

# Verificar tópicos creados
echo "✅ Verificando tópicos creados:"
docker exec kafka kafka-topics --list --bootstrap-server localhost:9092

# Paso 3: Compilar y ejecutar Spring Boot
echo "🏗️  Compilando aplicación Spring Boot..."
if [ -d "kafka-messaging-system" ]; then
    cd kafka-messaging-system
    ./mvnw clean package -DskipTests
    echo "🚀 Iniciando aplicación Spring Boot..."
    nohup ./mvnw spring-boot:run > ../spring-boot.log 2>&1 &
    cd ..
else
    echo "❌ Directorio 'kafka-messaging-system' no encontrado"
    exit 1
fi

# Esperar a que Spring Boot esté listo
echo "⏳ Esperando a que Spring Boot esté listo..."
sleep 15

# Verificar que Spring Boot esté funcionando
if curl -f http://localhost:8081/api/messages/health > /dev/null 2>&1; then
    echo "✅ Spring Boot aplicación iniciada correctamente"
else
    echo "❌ Error al iniciar Spring Boot"
    exit 1
fi

# Paso 4: Iniciar aplicación React
echo "⚛️  Iniciando aplicación React..."
if [ -d "kafka-react-client" ]; then
    cd kafka-react-client
    npm install
    nohup npm start > ../react.log 2>&1 &
    cd ..
else
    echo "❌ Directorio 'kafka-react-client' no encontrado"
    exit 1
fi

echo ""
echo "🎉 ¡Sistema iniciado correctamente!"
echo ""
echo "📋 URLs disponibles:"
echo "   🌐 React App:      http://localhost:3000"
echo "   🔧 Spring Boot:    http://localhost:8081"
echo "   📊 Kafka UI:       http://localhost:8080"
echo "   🔍 Health Check:   http://localhost:8081/api/messages/health"
echo ""
echo "📁 Logs disponibles:"
echo "   📝 Spring Boot:    spring-boot.log"
echo "   📝 React:          react.log"
echo "   📝 Docker:         docker-compose logs"
echo ""
echo "🛑 Para detener el sistema, ejecuta: ./stop-system.sh"