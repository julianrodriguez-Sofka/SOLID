"""
Escenario 2 - Violación del Principio de Segregación de Interfaces con interfaz monolítica.
"""


class MasterChefContract:
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
    def operate(self, chef: MasterChefContract):
        chef.bake_bread()
        chef.make_pastries()
        try:
            chef.fillet_fish()
        except RuntimeError as error:
            print(
                f"  MasterChefStation: No necesito filetear pescado, pero la interfaz me lo exige ({error})."
            )


def bad_scenario():
    print("Escenario 2 - Violación del principio por usar interfaz monolítica:")
    station = MasterChefStation()
    station.operate(PastryChefWithMasterContract())


if __name__ == "__main__":
    bad_scenario()

