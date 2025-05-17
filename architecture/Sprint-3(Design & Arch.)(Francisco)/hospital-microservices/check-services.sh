#!/bin/bash

echo "Verificando el estado de los servicios..."

# Verificar Keycloak
echo -n "Keycloak: "
if curl -s -f http://localhost:8080/realms/master > /dev/null; then
  echo "✓ OK"
  
  # Verificar realm hospital
  echo -n "  Realm hospital: "
  if curl -s -f http://localhost:8080/realms/hospital > /dev/null; then
    echo "✓ OK"
  else
    echo "✗ NO DISPONIBLE"
  fi
  
  # Obtener token de autenticación
  echo -n "  Obteniendo token JWT: "
  TOKEN=$(curl -s -X POST http://localhost:8080/realms/hospital/protocol/openid-connect/token \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "client_id=hospital-client" \
    -d "username=admin" \
    -d "password=admin" \
    -d "grant_type=password")
  
  if echo $TOKEN | grep -q "access_token"; then
    echo "✓ OK"
    ACCESS_TOKEN=$(echo $TOKEN | sed 's/.*"access_token":"\([^"]*\)".*/\1/')
    echo "  Token JWT obtenido correctamente"
  else
    echo "✗ ERROR"
    echo "  Mensaje: $TOKEN"
  fi
else
  echo "✗ NO DISPONIBLE"
fi

# Verificar API Gateway
echo -n "API Gateway: "
if curl -s -f http://localhost:8084/actuator/health > /dev/null; then
  echo "✓ OK"
else
  echo "✗ NO DISPONIBLE"
fi

# Verificar Microservicio de Pacientes
echo -n "Microservicio Pacientes: "
if curl -s -f http://localhost:8081/actuator/health > /dev/null; then
  echo "✓ OK"
else
  echo "✗ NO DISPONIBLE"
fi

# Verificar Microservicio de Citas
echo -n "Microservicio Citas: "
if curl -s -f http://localhost:8082/actuator/health > /dev/null; then
  echo "✓ OK"
else
  echo "✗ NO DISPONIBLE"
fi

# Verificar Microservicio de Alertas
echo -n "Microservicio Alertas: "
if curl -s -f http://localhost:8083/actuator/health > /dev/null; then
  echo "✓ OK"
else
  echo "✗ NO DISPONIBLE"
fi

# Si tenemos un token, probar una llamada autenticada
if [ ! -z "$ACCESS_TOKEN" ]; then
  echo ""
  echo "Probando llamada autenticada al microservicio de pacientes:"
  echo "Authorization: Bearer $ACCESS_TOKEN" | head -c 50
  echo "..."
  RESPONSE=$(curl -s -X GET http://localhost:8081/api/pacientes \
    -H "Authorization: Bearer $ACCESS_TOKEN")
  echo "Respuesta: $RESPONSE"
fi