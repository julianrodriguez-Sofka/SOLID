"""Ejemplo CORRECTO del Principio de Responsabilidad Única (SRP).

Analogía del chef: cada clase es un "especialista" en un área del restaurante.
- DessertChef: sólo repostería.
- ReservationManager: sólo reservas.
- DishWasher: sólo limpieza de platos.
- MenuManager: sólo gestión de la carta.

Cada clase tiene UNA razón para cambiar (p.ej. ajustes en postres afectan sólo a DessertChef).
"""

class DessertChef:
    """Responsabilidad única: preparar postres."""
    def bake_dessert(self) -> None:
        print("[DessertChef] Preparando postre del día...")


class ReservationManager:
    """Responsabilidad única: gestionar reservas."""
    def take_reservation(self, nombre: str) -> None:
        print(f"[ReservationManager] Reserva registrada para {nombre}.")


class DishWasher:
    """Responsabilidad única: lavar platos."""
    def wash(self) -> None:
        print("[DishWasher] Lavando lote de platos...")


class MenuManager:
    """Responsabilidad única: actualizar la carta."""
    def update_menu(self, nuevo_postre: str) -> None:
        print(f"[MenuManager] Añadiendo postre al menú: {nuevo_postre}")


class RestaurantOrchestrator:
    """Coordina las operaciones del restaurante SIN asumir sus responsabilidades.

    Esta clase NO viola SRP porque su única responsabilidad es orquestar
    la colaboración entre especialistas.
    """
    def __init__(self, dessert: DessertChef, reservations: ReservationManager,
                 washer: DishWasher, menu: MenuManager) -> None:
        self._dessert = dessert
        self._reservations = reservations
        self._washer = washer
        self._menu = menu

    def run_shift(self) -> None:
        """Simula operaciones del turno dividiendo responsabilidades."""
        self._dessert.bake_dessert()          # Repostería
        self._reservations.take_reservation("Laura")  # Reservas
        self._menu.update_menu("Tarta de limón")      # Carta
        self._washer.wash()                   # Limpieza


def main() -> None:
    orchestrator = RestaurantOrchestrator(
        DessertChef(), ReservationManager(), DishWasher(), MenuManager()
    )
    print("=== Escenario CORRECTO (SRP aplicado) ===")
    orchestrator.run_shift()
    print("\nCada clase tiene una sola razón para cambiar.")


if __name__ == "__main__":
    main()
