"""
Escenario 3 – Falta de abstracción:
el OrderManager recibe la dependencia externamente, pero sigue dependiendo de una clase concreta.
"""


class PastryChef:
    def prepare_dish(self):
        print("  PastryChef: Haciendo un postre personalizado.")


class OrderManager:
    def __init__(self, chef: PastryChef):
        self._chef = chef

    def process_order(self):
        print("OrderManager: La dependencia viene desde afuera, pero sigo acoplado a PastryChef.")
        self._chef.prepare_dish()


def main():
    manager = OrderManager(PastryChef())
    manager.process_order()


if __name__ == "__main__":
    main()

