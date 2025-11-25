"""
Escenario 3 - Falta de interfaces: el cliente depende de una clase concreta con todas las habilidades.
"""


class UniversalChef:
    def bake_bread(self):
        print("  UniversalChef: Horneando pan común.")

    def make_pastries(self):
        print("  UniversalChef: Haciendo pasteles tradicionales.")

    def fillet_fish(self):
        print("  UniversalChef: Fileteando pescado.")

    def cut_vegetables(self):
        print("  UniversalChef: Cortando vegetales.")

    def mix_cocktails(self):
        print("  UniversalChef: Mezclando cócteles.")


class PastryStationWithoutInterface:
    def prepare_desserts(self, chef: UniversalChef):
        chef.bake_bread()
        chef.make_pastries()


def missing_scenario():
    print(
        "Escenario 3 - Falta de interfaz: el agente depende de una clase universal con todas las habilidades:"
    )
    station = PastryStationWithoutInterface()
    station.prepare_desserts(UniversalChef())


if __name__ == "__main__":
    missing_scenario()

