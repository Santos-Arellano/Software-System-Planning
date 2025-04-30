import requests
import json

def test_triangle_service():
    print("\n=== Probando servicio de área de triángulo ===")
    url = 'http://localhost:5001/area/triangle'
    data = {'base': 5, 'height': 8}
    
    print(f"Enviando datos: {data}")
    response = requests.post(url, json=data)
    
    print(f"Código de respuesta: {response.status_code}")
    print(f"Respuesta: {json.dumps(response.json(), indent=2)}")

def test_square_service():
    print("\n=== Probando servicio de área de cuadrado ===")
    url = 'http://localhost:5002/area/square'
    data = {'side': 6}
    
    print(f"Enviando datos: {data}")
    response = requests.post(url, json=data)
    
    print(f"Código de respuesta: {response.status_code}")
    print(f"Respuesta: {json.dumps(response.json(), indent=2)}")

def test_circle_service():
    print("\n=== Probando servicio de área de círculo ===")
    url = 'http://localhost:5003/area/circle'
    data = {'radius': 4}
    
    print(f"Enviando datos: {data}")
    response = requests.post(url, json=data)
    
    print(f"Código de respuesta: {response.status_code}")
    print(f"Respuesta: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    test_triangle_service()
    test_square_service()
    test_circle_service()