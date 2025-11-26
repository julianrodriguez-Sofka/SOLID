from abc import ABC, abstractmethod

# Interfaz (Contrato)
class PreparacionDePostre(ABC):

    @abstractmethod
    def tiempo_coccion(self):
        pass

    @abstractmethod
    def ingredientes(self):
        pass

    @abstractmethod
    def presentar(self):
        pass


# Clases concretas (Extensiones)
class PastelDeFresas(PreparacionDePostre):
    def tiempo_coccion(self):
        return "30 minutos"

    def ingredientes(self):
        return ["harina", "fresas", "azúcar", "mantequilla"]

    def presentar(self):
        return "Pastel de fresas adornado con crema"


class SouffleChocolate(PreparacionDePostre):
    def tiempo_coccion(self):
        return "20 minutos"

    def ingredientes(self):
        return ["chocolate", "huevos", "azúcar"]

    def presentar(self):
        return "Soufflé de chocolate esponjoso"


# Chef que NO se modifica al agregar nuevos postres
class ChefRepostero:
    def preparar(self, receta: PreparacionDePostre):
        print("⏱️ Tiempo de cocción:", receta.tiempo_coccion())
        print("🧾 Ingredientes:", receta.ingredientes())
        print("🍰 Presentación:", receta.presentar())


# Uso
chef = ChefRepostero()
chef.preparar(PastelDeFresas())
chef.preparar(SouffleChocolate())
