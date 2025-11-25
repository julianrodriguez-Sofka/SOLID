"""
Escenario 1 – DIP aplicado correctamente:
la clase de alto nivel (`OrderManager`) recibe la dependencia a través
de una abstracción (`ChefContract`) y no conoce la implementación concreta.
"""


class ChefContract:
    def prepare_dish(self):
        raise NotImplementedError


class PastryChef(ChefContract):
    def prepare_dish(self):
        print("  PastryChef: Preparando el postre solicitado.")


class OrderManager:
    """Clase de alto nivel que coordina la preparación de órdenes."""

    def __init__(self, chef: ChefContract):
        self._chef = chef

    def process_order(self):
        print("OrderManager: Recibí una orden, delego al cocinero.")
        self._chef.prepare_dish()


def main():
    manager = OrderManager(PastryChef())
    manager.process_order()


if __name__ == "__main__":
    main()

