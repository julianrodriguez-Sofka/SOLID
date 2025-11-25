"""Ejemplo SIN PATRÓN (falta de aplicación del SRP).

Código procedural mezclando responsabilidades en funciones sueltas y en un
"script" lineal. No hay encapsulación ni clases con una única razón de cambio.

Problemas:
- Dificultad para testear aisladamente.
- Cambios en reservas o menú obligan a revisar todo el flujo.
- Difícil reutilización y evolución.
"""

# No existe una clase para cada responsabilidad; todo son funciones globales.

def preparar_postre():  # Repostería mezclada con el resto
    print("[Procedural] Preparando postre del día...")

def tomar_reserva(nombre: str):  # Reservas
    print(f"[Procedural] Registrando reserva para {nombre}...")

def actualizar_menu(postre: str):  # Carta
    print(f"[Procedural] Actualizando menú con postre: {postre}")

def lavar_platos():  # Limpieza
    print("[Procedural] Lavando lote de platos...")

def turno_completo():
    """Función orquestadora que mezcla responsabilidades sin separar capas."""
    preparar_postre()
    tomar_reserva("María")
    actualizar_menu("Brownie vegano")
    lavar_platos()

def main():
    print("=== Escenario SIN PATRÓN (procedural) ===")
    turno_completo()
    print("\nNo hay clases ni separación lógica: difícil aplicar SRP.")

if __name__ == "__main__":
    main()
