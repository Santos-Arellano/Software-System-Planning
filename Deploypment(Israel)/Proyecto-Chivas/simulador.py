import random
import time

class PartidoFutbol:
    def __init__(self):
        self.equipos = ["Chivas", "Atlas"]
        self.marcador = {0: 0, 1: 0}  # 0: Chivas, 1: Atlas
        self.turno = random.choice([0, 1])  # Empieza equipo al azar
        self.eventos = []

    def simular_gol(self, tipo, minuto):
        equipo = self.equipos[self.turno]
        self.marcador[self.turno] += 1
        self.eventos.append(f"Min {minuto+1}: ⚽ {equipo} anota ({tipo})")
        
    def simular_minuto(self, minuto):
        accion = random.randint(1, 350)
        equipo = self.equipos[self.turno]
        
        if accion <= 100:
            self.eventos.append(f"Min {minuto+1}: {equipo} dispara desviado")
        elif accion <= 200:
            self.eventos.append(f"Min {minuto+1}: ¡Gran atajada del portero contra {equipo}!")
        elif accion <= 250:
            self.simular_gol("Cabeza", minuto)
        elif accion <= 300:
            self.simular_gol("Penal", minuto)
        else:
            self.simular_gol("Tiro al arco", minuto)
            
        self.turno = 1 - self.turno  # Cambia turno

def main():
    print("🏟️ BIENVENIDO AL CLÁSICO TAPATÍO 🏟️")
    print("Chivas vs Atlas - Simulación en vivo\n")
    
    partido = PartidoFutbol()
    
    for minuto in range(90):
        partido.simular_minuto(minuto)
        print(partido.eventos[-1])
        time.sleep(0.15)  # Velocidad de simulación
    
    print("\n🔥 RESULTADO FINAL 🔥")
    print(f"Chivas: {partido.marcador[0]}")
    print(f"Atlas: {partido.marcador[1]}")
    print("\n¡CHIVAS SIEMPRE GANA! 🔴⚪" if partido.marcador[0] >= partido.marcador[1] else "¡INCREÍBLE RESULTADO! 🔵⚫")

if __name__ == "__main__":
    main()
