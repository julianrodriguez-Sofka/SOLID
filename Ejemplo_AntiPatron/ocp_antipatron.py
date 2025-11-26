class PreparacionDePostre:
    # Interfaz mal definida (sin métodos abstractos)
    pass


class ChefRepostero:
    def preparar(self, receta):
        # 😱 Condicionales para cada tipo concreto
        if isinstance(receta, PastelFresa):
            print("Preparando pastel de fresa...")
        elif isinstance(receta, SouffleChocolate):
            print("Preparando soufflé de chocolate...")
        # Cuando llega un nuevo postre, hay que editar este método 😓
        else:
            print("Postre no soportado")


class PastelFresa(PreparacionDePostre):
    pass

class SouffleChocolate(PreparacionDePostre):
    pass


# Uso
chef = ChefRepostero()
chef.preparar(PastelFresa())
chef.preparar(SouffleChocolate())
