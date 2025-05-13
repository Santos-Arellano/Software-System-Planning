from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class Input(BaseModel):
    a: float
    b: float
    c: float
    d: float

@app.post("/resolver")
def resolver(valores: Input):
    # Llamar a los microservicios suma y resta
    suma_resp = requests.post("http://suma:8000/sumar", json={"a": valores.a, "b": valores.b})
    resta_resp = requests.post("http://resta:8000/restar", json={"c": valores.c, "d": valores.d})
    
    suma = suma_resp.json()["resultado"]
    resta = resta_resp.json()["resultado"]
    
    # Calcular el resultado final
    resultado = suma * resta
    
    # Guardar el resultado en la base de datos
    try:
        db_resp = requests.post("http://db_service:8000/guardar", json={
            "a": valores.a,
            "b": valores.b,
            "c": valores.c,
            "d": valores.d,
            "resultado": resultado
        })
        db_status = db_resp.json()
    except Exception as e:
        db_status = {"status": "error", "message": f"Error al guardar en la base de datos: {str(e)}"}
    
    # Devolver el resultado con información adicional
    return {
        "operacion": f"({valores.a} + {valores.b}) × ({valores.c} - {valores.d})",
        "suma": suma,
        "resta": resta,
        "resultado": resultado,
        "almacenamiento": db_status
    }

@app.get("/historial")
def historial():
    try:
        # Obtener historial de resultados
        historial_resp = requests.get("http://db_service:8000/resultados")
        return historial_resp.json()
    except Exception as e:
        return {"status": "error", "message": f"Error al obtener historial: {str(e)}"}