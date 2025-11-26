"""
Escenario 2 – Mala aplicación del DIP:
la clase de alto nivel crea internamente la clase de bajo nivel, generando dependencias rígidas.
"""


class PastryChef:
    def prepare_dish(self):
        print("  PastryChef: Preparando un postre desde dentro de OrderManager.")


class OrderManager:
    def process_order(self):
        print("OrderManager: Recibí una orden y creo yo al chef (dependencia rígida).")
        chef = PastryChef()
        chef.prepare_dish()


def main():
    OrderManager().process_order()


if __name__ == "__main__":
    main()

