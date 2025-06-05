"/Users/santosa/Documents/GitHub/Software-System-Planning/Deploypment_Israel/Reto_simulacion_MonteCarlo/Elpi.py"
import random
import matplotlib.pyplot as plt

# Número de puntos aleatorios a generar
num_puntos = 1000000

# Contadores y listas para graficar
puntos_dentro = 0
x_dentro, y_dentro = [], []
x_fuera, y_fuera = [], []

for _ in range(num_puntos):
    x = random.uniform(-1, 1)
    y = random.uniform(-1, 1)
    distancia = x**2 + y**2

    if distancia <= 1:
        puntos_dentro += 1
        x_dentro.append(x)
        y_dentro.append(y)
    else:
        x_fuera.append(x)
        y_fuera.append(y)

# Cálculo de pi
pi_estimado = 4 * (puntos_dentro / num_puntos)
print(f"Estimación de π con {num_puntos} puntos: {pi_estimado}")

# Gráfica
plt.figure(figsize=(6,6))
plt.scatter(x_dentro, y_dentro, color='blue', s=1, label='Dentro del círculo')
plt.scatter(x_fuera, y_fuera, color='red', s=1, label='Fuera del círculo')
plt.title("Estimación de π usando el método Montecarlo")
plt.xlabel("x")
plt.ylabel("y")
plt.axis("equal")
plt.legend()
plt.grid(True)
plt.show()
