from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
import os
import time

app = FastAPI()

class ResultadoData(BaseModel):
    a: float
    b: float
    c: float
    d: float
    resultado: float

def get_db_connection():
    # Intentar conectar a MySQL con reintento si falla inicialmente
    max_retries = 30
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            connection = mysql.connector.connect(
                host=os.environ.get("DB_HOST", "mysql"),
                user=os.environ.get("DB_USER", "root"),
                password=os.environ.get("DB_PASSWORD", "password"),
                database=os.environ.get("DB_NAME", "ecuaciones")
            )
            return connection
        except mysql.connector.Error as err:
            retry_count += 1
            print(f"Error al conectar a MySQL (intento {retry_count}/{max_retries}): {err}")
            time.sleep(2)  # Esperar 2 segundos antes de reintentar
    
    raise Exception("No se pudo conectar a MySQL después de varios intentos")

# Inicializar la tabla si no existe
def init_db():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Crear tabla si no existe
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS resultados (
                id INT AUTO_INCREMENT PRIMARY KEY,
                a FLOAT NOT NULL,
                b FLOAT NOT NULL,
                c FLOAT NOT NULL,
                d FLOAT NOT NULL,
                resultado FLOAT NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        connection.commit()
        cursor.close()
        connection.close()
        print("Base de datos inicializada correctamente")
        
    except Exception as e:
        print(f"Error al inicializar la base de datos: {e}")

# Inicializar la base de datos al iniciar el servicio
@app.on_event("startup")
async def startup_event():
    # Esperar un poco para asegurar que MySQL esté listo
    time.sleep(5)
    init_db()

@app.post("/guardar")
def guardar_resultado(data: ResultadoData):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Insertar resultado en la base de datos
        query = '''
            INSERT INTO resultados (a, b, c, d, resultado) 
            VALUES (%s, %s, %s, %s, %s)
        '''
        values = (data.a, data.b, data.c, data.d, data.resultado)
        
        cursor.execute(query, values)
        connection.commit()
        
        # Obtener el ID del registro insertado
        registro_id = cursor.lastrowid
        
        cursor.close()
        connection.close()
        
        return {"status": "success", "id": registro_id}
    
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/resultados")
def obtener_resultados():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM resultados ORDER BY fecha DESC LIMIT 100")
        resultados = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return {"resultados": resultados}
    
    except Exception as e:
        return {"status": "error", "message": str(e)}