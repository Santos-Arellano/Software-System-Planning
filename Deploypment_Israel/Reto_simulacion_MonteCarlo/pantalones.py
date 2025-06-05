"/Users/santosa/Documents/GitHub/Software-System-Planning/Deploypment_Israel/Reto_simulacion_MonteCarlo/Elpi.py"
import numpy as np
import matplotlib.pyplot as plt

# Simulaciones
n = 10000

# Simulaciones de precio
precio_A = np.random.normal(40, 5, n)
precio_B = np.random.normal(45, 4, n)
precio_C = np.random.uniform(35, 55, n)

# Transporte
transporte_A = 5
transporte_B = 3
transporte_C = 8

# Costo total
costo_A = precio_A + transporte_A
costo_B = precio_B + transporte_B
costo_C = precio_C + transporte_C

# Disponibilidad (1 = disponible, 0 = no disponible)
disp_A = np.random.binomial(1, 0.95, n)
disp_B = np.random.binomial(1, 0.80, n)
disp_C = np.random.binomial(1, 0.70, n)

# Costo total ajustado por disponibilidad
costo_A_final = np.where(disp_A == 1, costo_A, np.nan)
costo_B_final = np.where(disp_B == 1, costo_B, np.nan)
costo_C_final = np.where(disp_C == 1, costo_C, np.nan)

# Satisfacción (solo si disponible)
satisfaccion_A = np.where(disp_A == 1, np.random.normal(4.5, 0.3, n), np.nan)
satisfaccion_B = np.where(disp_B == 1, np.random.normal(4.0, 0.5, n), np.nan)
satisfaccion_C = np.where(disp_C == 1, np.random.normal(3.8, 0.6, n), np.nan)

# Resultados
print("Costo promedio (solo si disponible):")
print(f"Tienda A: ${np.nanmean(costo_A_final):.2f}")
print(f"Tienda B: ${np.nanmean(costo_B_final):.2f}")
print(f"Tienda C: ${np.nanmean(costo_C_final):.2f}")

print("\nProbabilidad de disponibilidad:")
print(f"Tienda A: {np.mean(disp_A)*100:.2f}%")
print(f"Tienda B: {np.mean(disp_B)*100:.2f}%")
print(f"Tienda C: {np.mean(disp_C)*100:.2f}%")

print("\nSatisfacción promedio (si hay disponibilidad):")
print(f"Tienda A: {np.nanmean(satisfaccion_A):.2f}/5")
print(f"Tienda B: {np.nanmean(satisfaccion_B):.2f}/5")
print(f"Tienda C: {np.nanmean(satisfaccion_C):.2f}/5")

# Gráfico comparativo de costos
plt.figure(figsize=(10, 6))
plt.hist(costo_A_final, bins=50, alpha=0.5, label='Tienda A')
plt.hist(costo_B_final, bins=50, alpha=0.5, label='Tienda B')
plt.hist(costo_C_final, bins=50, alpha=0.5, label='Tienda C')
plt.title("Distribución de Costos Totales (solo si hay disponibilidad)")
plt.xlabel("Costo Total ($)")
plt.ylabel("Frecuencia")
plt.legend()
plt.show()
