"""
Ejemplo del Principio de Segregación de Interfaces (ISP) usando Python.

Contiene tres escenarios consecutivos:
 1. ISP aplicado correctamente con interfaces específicas (clases base simples).
 2. Violación del principio con una interfaz monolítica que obliga a implementar cosas ajenas.
 3. Ausencia de interfaces y dependencia directa de una clase concreta con múltiples responsabilidades.
"""


class Baker:
    """Interfaz mínima que cubre solo las operaciones necesarias para un repostero."""

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
    """Cliente que trabaja únicamente con las operaciones de repostería."""

    def prepare_desserts(self, baker: Baker):
        baker.bake_bread()
        baker.make_pastries()


class MasterChefContract:
    """Interfaz monolítica que combina todas las habilidades del chef."""

    def bake_bread(self):
        raise NotImplementedError

    def make_pastries(self):
        raise NotImplementedError

    def fillet_fish(self):
        raise NotImplementedError

    def cut_vegetables(self):
        raise NotImplementedError

    def mix_cocktails(self):
        raise NotImplementedError


class PastryChefWithMasterContract(MasterChefContract):
    def bake_bread(self):
        print("  PastryChefWithMasterContract: Horneando pan.")

    def make_pastries(self):
        print("  PastryChefWithMasterContract: Preparando pasteles.")

    def fillet_fish(self):
        raise RuntimeError("Este repostero no filetea pescado.")

    def cut_vegetables(self):
        raise RuntimeError("Este repostero no corta vegetales.")

    def mix_cocktails(self):
        raise RuntimeError("Este repostero no prepara cócteles.")


class MasterChefStation:
    """Cliente que depende de la interfaz pesada y debe conocer métodos innecesarios."""

    def operate(self, chef: MasterChefContract):
        chef.bake_bread()
        chef.make_pastries()
        try:
            chef.fillet_fish()
        except RuntimeError as error:
            print(f"  MasterChefStation: No necesito filetear pescado, pero la interfaz me lo exige ({error}).")


class UniversalChef:
    """Clase concreta con múltiples responsabilidades que el cliente llega a conocer."""

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
    """Cliente que depende directamente de la clase concreta."""

    def prepare_desserts(self, chef: UniversalChef):
        chef.bake_bread()
        chef.make_pastries()


def correct_scenario():
    print("Escenario 1 - ISP aplicado correctamente:")
    station = PastryStation()
    station.prepare_desserts(PastryChef())


def bad_scenario():
    print("Escenario 2 - Violación del principio por usar interfaz monolítica:")
    station = MasterChefStation()
    station.operate(PastryChefWithMasterContract())


def missing_scenario():
    print(
        "Escenario 3 - Falta de interfaz: el agente depende de una clase universal con todas las habilidades:"
    )
    station = PastryStationWithoutInterface()
    station.prepare_desserts(UniversalChef())


def main():
    correct_scenario()
    print()
    bad_scenario()
    print()
    missing_scenario()


if __name__ == "__main__":
    main()

