class ChefRepostero:

    def preparar_pastel_fresas(self):
        print("Preparando pastel de fresas con ingredientes fijos...")

    def preparar_souffle_chocolate(self):
        print("Preparando soufflé de chocolate con ingredientes fijos...")

    # Si debe agregarse un nuevo postre, toca modificar esta clase 😩
    def preparar(self, tipo_postre):
        if tipo_postre == "fresas":
            self.preparar_pastel_fresas()
        elif tipo_postre == "souffle":
            self.preparar_souffle_chocolate()
        # Nuevos postres = nuevos if 🥴


# Uso
chef = ChefRepostero()
chef.preparar("fresas")
chef.preparar("souffle")
