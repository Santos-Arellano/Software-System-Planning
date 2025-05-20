"/Users/santosa/Documents/GitHub/Software-System-Planning/Deploypment_Israel/ecuacion-microservicios-mysql/suma/suma.py"
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Input(BaseModel):
    a: float
    b: float

@app.post("/sumar")
def sumar(valores: Input):
    resultado = valores.a + valores.b
    return {"resultado": resultado}
