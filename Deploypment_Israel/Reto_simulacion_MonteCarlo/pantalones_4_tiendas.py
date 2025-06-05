import numpy as np
import matplotlib.pyplot as plt

# Simulaciones
n = 10000

# Simulaciones de precio
precio_A = np.random.normal(40, 5, n)
precio_B = np.random.normal(45, 4, n)
precio_C = np.random.uniform(35, 55, n)
precio_D = np.random.normal(38, 2, n)  # Nueva tienda D

# Transporte
transporte_A = 5
transporte_B = 3
transporte_C = 8
transporte_D = 3  # Nueva tienda D

# Costo total
costo_A = precio_A + transporte_A
costo_B = precio_B + transporte_B
costo_C = precio_C + transporte_C
costo_D = precio_D + transporte_D  # Nueva tienda D

# Disponibilidad (1 = disponible, 0 = no disponible)
disp_A = np.random.binomial(1, 0.95, n)
disp_B = np.random.binomial(1, 0.80, n)
disp_C = np.random.binomial(1, 0.70, n)
disp_D = np.random.binomial(1, 0.45, n)  # Nueva tienda D

# Costo total ajustado por disponibilidad
costo_A_final = np.where(disp_A == 1, costo_A, np.nan)
costo_B_final = np.where(disp_B == 1, costo_B, np.nan)
costo_C_final = np.where(disp_C == 1, costo_C, np.nan)
costo_D_final = np.where(disp_D == 1, costo_D, np.nan)  # Nueva tienda D

# Satisfacción (solo si disponible) - Asumiendo satisfacción para tienda D
satisfaccion_A = np.where(disp_A == 1, np.random.normal(4.5, 0.3, n), np.nan)
satisfaccion_B = np.where(disp_B == 1, np.random.normal(4.0, 0.5, n), np.nan)
satisfaccion_C = np.where(disp_C == 1, np.random.normal(3.8, 0.6, n), np.nan)
satisfaccion_D = np.where(disp_D == 1, np.random.normal(4.2, 0.4, n), np.nan)  # Nueva tienda D

# Resultados
print("="*60)
print("ANÁLISIS DE SIMULACIÓN MONTE CARLO - COMPRA DE PANTALÓN")
print("="*60)

print("\n📊 COSTO PROMEDIO (solo si disponible):")
print(f"Tienda A: ${np.nanmean(costo_A_final):.2f}")
print(f"Tienda B: ${np.nanmean(costo_B_final):.2f}")
print(f"Tienda C: ${np.nanmean(costo_C_final):.2f}")
print(f"Tienda D: ${np.nanmean(costo_D_final):.2f}")

print("\n📦 PROBABILIDAD DE DISPONIBILIDAD:")
print(f"Tienda A: {np.mean(disp_A)*100:.2f}%")
print(f"Tienda B: {np.mean(disp_B)*100:.2f}%")
print(f"Tienda C: {np.mean(disp_C)*100:.2f}%")
print(f"Tienda D: {np.mean(disp_D)*100:.2f}%")

print("\n⭐ SATISFACCIÓN PROMEDIO (si hay disponibilidad):")
print(f"Tienda A: {np.nanmean(satisfaccion_A):.2f}/5")
print(f"Tienda B: {np.nanmean(satisfaccion_B):.2f}/5")
print(f"Tienda C: {np.nanmean(satisfaccion_C):.2f}/5")
print(f"Tienda D: {np.nanmean(satisfaccion_D):.2f}/5")

# Análisis adicional para encontrar la mejor tienda
print("\n" + "="*60)
print("ANÁLISIS COMPARATIVO")
print("="*60)

# Tienda con menor costo promedio
costos_promedio = [np.nanmean(costo_A_final), np.nanmean(costo_B_final), 
                   np.nanmean(costo_C_final), np.nanmean(costo_D_final)]
tiendas = ['A', 'B', 'C', 'D']
tienda_menor_costo = tiendas[np.argmin(costos_promedio)]
print(f"🏆 Tienda con MENOR COSTO promedio: Tienda {tienda_menor_costo}")

# Tienda con mayor disponibilidad
disponibilidades = [np.mean(disp_A), np.mean(disp_B), np.mean(disp_C), np.mean(disp_D)]
tienda_mayor_disponibilidad = tiendas[np.argmax(disponibilidades)]
print(f"🏆 Tienda con MAYOR DISPONIBILIDAD: Tienda {tienda_mayor_disponibilidad}")

# Tienda con mayor satisfacción
satisfacciones = [np.nanmean(satisfaccion_A), np.nanmean(satisfaccion_B), 
                  np.nanmean(satisfaccion_C), np.nanmean(satisfaccion_D)]
tienda_mayor_satisfaccion = tiendas[np.argmax(satisfacciones)]
print(f"🏆 Tienda con MAYOR SATISFACCIÓN: Tienda {tienda_mayor_satisfaccion}")

# Gráficos
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 12))

# Gráfico 1: Distribución de costos totales
ax1.hist(costo_A_final, bins=50, alpha=0.6, label='Tienda A', color='blue')
ax1.hist(costo_B_final, bins=50, alpha=0.6, label='Tienda B', color='green')
ax1.hist(costo_C_final, bins=50, alpha=0.6, label='Tienda C', color='red')
ax1.hist(costo_D_final, bins=50, alpha=0.6, label='Tienda D', color='orange')
ax1.set_title("Distribución de Costos Totales\n(solo si hay disponibilidad)")
ax1.set_xlabel("Costo Total ($)")
ax1.set_ylabel("Frecuencia")
ax1.legend()
ax1.grid(True, alpha=0.3)

# Gráfico 2: Comparación de costos promedio
ax2.bar(tiendas, costos_promedio, color=['blue', 'green', 'red', 'orange'], alpha=0.7)
ax2.set_title("Costo Promedio por Tienda")
ax2.set_xlabel("Tienda")
ax2.set_ylabel("Costo Promedio ($)")
ax2.grid(True, alpha=0.3)
for i, v in enumerate(costos_promedio):
    ax2.text(i, v + 0.5, f'${v:.2f}', ha='center', va='bottom')

# Gráfico 3: Comparación de disponibilidad
disponibilidades_pct = [d*100 for d in disponibilidades]
ax3.bar(tiendas, disponibilidades_pct, color=['blue', 'green', 'red', 'orange'], alpha=0.7)
ax3.set_title("Probabilidad de Disponibilidad por Tienda")
ax3.set_xlabel("Tienda")
ax3.set_ylabel("Disponibilidad (%)")
ax3.grid(True, alpha=0.3)
for i, v in enumerate(disponibilidades_pct):
    ax3.text(i, v + 1, f'{v:.1f}%', ha='center', va='bottom')

# Gráfico 4: Comparación de satisfacción
ax4.bar(tiendas, satisfacciones, color=['blue', 'green', 'red', 'orange'], alpha=0.7)
ax4.set_title("Satisfacción Promedio por Tienda")
ax4.set_xlabel("Tienda")
ax4.set_ylabel("Satisfacción (1-5)")
ax4.set_ylim(0, 5)
ax4.grid(True, alpha=0.3)
for i, v in enumerate(satisfacciones):
    ax4.text(i, v + 0.05, f'{v:.2f}', ha='center', va='bottom')

plt.tight_layout()
plt.show()

# Análisis de escenarios de compra exitosa
print("\n" + "="*60)
print("ANÁLISIS DE COMPRA EXITOSA")
print("="*60)

# Calcular cuántas veces cada tienda tiene el menor costo cuando está disponible
mejor_opcion = []
for i in range(n):
    costos_disponibles = []
    tiendas_disponibles = []
    
    if disp_A[i] == 1:
        costos_disponibles.append(costo_A_final[i])
        tiendas_disponibles.append('A')
    if disp_B[i] == 1:
        costos_disponibles.append(costo_B_final[i])
        tiendas_disponibles.append('B')
    if disp_C[i] == 1:
        costos_disponibles.append(costo_C_final[i])
        tiendas_disponibles.append('C')
    if disp_D[i] == 1:
        costos_disponibles.append(costo_D_final[i])
        tiendas_disponibles.append('D')
    
    if costos_disponibles:  # Si hay al menos una tienda disponible
        mejor_tienda = tiendas_disponibles[np.argmin(costos_disponibles)]
        mejor_opcion.append(mejor_tienda)

if mejor_opcion:
    from collections import Counter
    contador_mejor = Counter(mejor_opcion)
    print("\n🎯 FRECUENCIA DE MEJOR OPCIÓN (menor costo cuando disponible):")
    for tienda, freq in contador_mejor.most_common():
        porcentaje = (freq / len(mejor_opcion)) * 100
        print(f"Tienda {tienda}: {freq} veces ({porcentaje:.1f}%)")

print(f"\n📈 Total de simulaciones: {n:,}")
print(f"📊 Simulaciones con al menos una tienda disponible: {len(mejor_opcion):,}")