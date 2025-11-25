"""
Escenario 1 - ISP aplicado correctamente con una interfaz especializada.
"""


class Baker:
    def bake_bread(self):
        raise NotImplementedError

    def make_pastries(self):
        raise NotImplementedError


class PastryChef(Baker):
    def bake_bread(self):
        print("  PastryChef: Horneando pan especial para postres.")

    def make_pastries(self):
        print("  PastryChef: Elaborando pasteles para el menú.")


class PastryStation:
    def prepare_desserts(self, baker: Baker):
        baker.bake_bread()
        baker.make_pastries()


def correct_scenario():
    print("Escenario 1 - ISP aplicado correctamente:")
    station = PastryStation()
    station.prepare_desserts(PastryChef())


if __name__ == "__main__":
    correct_scenario()

