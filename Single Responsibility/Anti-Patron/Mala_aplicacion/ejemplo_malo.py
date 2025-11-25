"""Ejemplo MALO (Anti-Patrón) que VIOLA el Principio de Responsabilidad Única.

La clase OmniChef concentra múltiples responsabilidades:
- Preparar postres
- Tomar reservas
- Actualizar el menú
- Lavar platos

Analogía: Un chef que hace TODO; cualquier cambio en reservas, limpieza o menú
lo obliga a modificarse, generando alta fragilidad.
"""

class OmniChef:
    """VIOLA SRP: múltiples razones de cambio en una sola clase."""

    def bake_dessert(self) -> None:
        print("[OmniChef] Preparando postre...")

    def take_reservation(self, nombre: str) -> None:
        print(f"[OmniChef] Tomando reserva de {nombre}...")

    def update_menu(self, nuevo_postre: str) -> None:
        print(f"[OmniChef] Añadiendo {nuevo_postre} al menú...")

    def wash_dishes(self) -> None:
        print("[OmniChef] Lavando platos...")

    def full_shift(self) -> None:
        """Ejecuta todas las tareas del turno, mostrando el acoplamiento."""
        self.bake_dessert()
        self.take_reservation("Carlos")
        self.update_menu("Mousse de chocolate")
        self.wash_dishes()


def main() -> None:
    print("=== Escenario MALO (Anti-Patrón SRP) ===")
    chef = OmniChef()
    chef.full_shift()
    print("\nObserva: Un solo cambio en menú/reservas/limpieza impacta esta clase.")


if __name__ == "__main__":
    main()
